#!/bin/bash

# Ensure you have Inkscape and ImageMagick installed
# On Ubuntu/Debian: sudo apt-get install inkscape imagemagick
# On macOS with Homebrew: brew install inkscape imagemagick

# Set the input SVG file name
INPUT_SVG="favicon.svg"

# Create a directory for the output files
mkdir -p favicon_package

# Generate PNG files of various sizes
inkscape -w 16 -h 16 $INPUT_SVG -o favicon_package/favicon-16x16.png
inkscape -w 32 -h 32 $INPUT_SVG -o favicon_package/favicon-32x32.png
inkscape -w 192 -h 192 $INPUT_SVG -o favicon_package/android-chrome-192x192.png
inkscape -w 512 -h 512 $INPUT_SVG -o favicon_package/android-chrome-512x512.png

# Create Apple Touch Icon
inkscape -w 180 -h 180 $INPUT_SVG -o favicon_package/apple-touch-icon.png

# Create favicon.ico (includes 16x16, 32x32, and 48x48 sizes)
convert favicon_package/favicon-16x16.png favicon_package/favicon-32x32.png \
  \( -clone 0 -resize 48x48 \) \
  -delete 0 -delete 0 \
  favicon_package/favicon.ico

# Copy the original SVG
cp $INPUT_SVG favicon_package/favicon.svg

# Create site.webmanifest
cat > favicon_package/site.webmanifest << EOL
{
    "name": "Website Name",
    "short_name": "ShortName",
    "icons": [
        {
            "src": "/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "/android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
        }
    ],
    "theme_color": "#000000",
    "background_color": "#000000",
    "display": "standalone"
}
EOL

echo "Favicon package generated in 'favicon_package' directory."
