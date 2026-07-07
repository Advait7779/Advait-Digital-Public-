from PIL import Image
from collections import Counter

img_path = r"c:\Users\advai\OneDrive\Desktop\Advait Digital\frontend\public\edited-photo.png"
img = Image.open(img_path).convert("RGBA")
bbox = img.getbbox()

if bbox:
    # Scan a small region in the top area of the card (where there should only be background)
    region_pixels = []
    for x in range(bbox[0] + 50, bbox[2] - 50):
        for y in range(bbox[1] + 10, bbox[1] + 60):
            region_pixels.append(img.getpixel((x, y)))
            
    # Count the colors (ignoring fully transparent pixels)
    valid_pixels = [c for c in region_pixels if c[3] > 0]
    counter = Counter(valid_pixels)
    print("Most common colors in top of card:", counter.most_common(10))
