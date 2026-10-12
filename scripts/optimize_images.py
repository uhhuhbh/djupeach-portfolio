#!/usr/bin/env python3
"""Build responsive JPEG derivatives for the portfolio's static image assets."""

from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
WORK_SOURCE = ROOT / "assets" / "images"
PHOTO_SOURCE = ROOT / "assets" / "photography"
IMAGE_SUFFIXES = {".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff"}


def save_variant(source: Path, destination: Path, longest_edge: int, quality: int) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original)
        if image.mode in ("RGBA", "LA") or "transparency" in image.info:
            rgba = image.convert("RGBA")
            background = Image.new("RGB", rgba.size, "#101110")
            background.paste(rgba, mask=rgba.getchannel("A"))
            image = background
        else:
            image = image.convert("RGB")
        image.thumbnail((longest_edge, longest_edge), Image.Resampling.LANCZOS)
        image.save(
            destination,
            "JPEG",
            quality=quality,
            optimize=True,
            progressive=True,
        )


def image_files(folder: Path):
    return sorted(
        path
        for path in folder.iterdir()
        if path.is_file()
        and path.suffix.lower() in IMAGE_SUFFIXES
        and not path.stem.endswith("-preview")
    )


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=ROOT / "assets" / "optimized",
        help="directory that will contain the generated site image variants",
    )
    args = parser.parse_args()
    output = args.output_dir.resolve()

    groups = [
        ("work-display", image_files(WORK_SOURCE), 2000, 82),
        ("work-thumbs", image_files(WORK_SOURCE), 520, 74),
        ("photography", image_files(PHOTO_SOURCE), 2400, 83),
        ("photography-thumbs", image_files(PHOTO_SOURCE), 520, 74),
    ]
    source_bytes = sum(path.stat().st_size for _, files, _, _ in groups[:1] for path in files)
    source_bytes += sum(path.stat().st_size for path in groups[2][1])
    output_bytes = 0
    counts: dict[str, int] = {}

    for name, files, longest_edge, quality in groups:
        for source in files:
            destination = output / name / f"{source.stem}.jpg"
            save_variant(source, destination, longest_edge, quality)
            output_bytes += destination.stat().st_size
        counts[name] = len(files)

    print(
        "Generated "
        + ", ".join(f"{name}: {count}" for name, count in counts.items())
        + f"; source payload {source_bytes / 1024 / 1024:.1f} MiB, "
        + f"site variants {output_bytes / 1024 / 1024:.1f} MiB."
    )


if __name__ == "__main__":
    main()
