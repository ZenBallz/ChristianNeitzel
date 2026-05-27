#!/bin/bash
# Optimize JPEGs in a folder to 1600px long edge, quality 80, sRGB
# Usage: ./optimize-images.sh path/to/folder

if [ -z "$1" ]; then
    echo "Usage: $0 path/to/folder"
    exit 1
fi

FOLDER="$1"
COUNT=0

for img in "$FOLDER"/*.jpg "$FOLDER"/*.jpeg "$FOLDER"/*.JPG "$FOLDER"/*.JPEG; do
    [ -f "$img" ] || continue
    
    # Get original size for reporting
    before=$(du -h "$img" | cut -f1)
    
    # Optimize in place: resize long edge to 1600, quality 80, strip metadata, sRGB
    magick "$img" \
        -resize '1600x1600>' \
        -quality 80 \
        -colorspace sRGB \
        -strip \
        "$img"
    
    after=$(du -h "$img" | cut -f1)
    COUNT=$((COUNT + 1))
    echo "  [$COUNT] $(basename "$img"): $before → $after"
done

echo "Done. Optimized $COUNT images in $FOLDER"