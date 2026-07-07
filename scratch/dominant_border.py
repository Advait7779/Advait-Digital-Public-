from PIL import Image
from collections import Counter

img_path = r"c:\Users\advai\OneDrive\Desktop\Advait Digital\frontend\public\edited-photo.png"
img = Image.open(img_path).convert("RGBA")
bbox = img.getbbox()

if bbox:
    # Let's inspect the pixels just inside the bbox (say, 5 pixels inset from all 4 sides)
    border_pixels = []
    # Top and bottom rows of the bbox
    for x in range(bbox[0], bbox[2]):
        border_pixels.append(img.getpixel((x, bbox[1] + 2)))
        border_pixels.append(img.getpixel((x, bbox[3] - 3)))
    # Left and right columns of the bbox
    for y in range(bbox[1], bbox[3]):
        border_pixels.append(img.getpixel((bbox[0] + 2, y)))
        border_pixels.append(img.getpixel((bbox[2] - 3, y)))
        
    # Count the colors (ignoring transparent pixels)
    non_trans = [c for c in border_pixels if c[3] > 10]
    counter = Counter(non_trans)
    print("Most common non-transparent border colors:", counter.most_common(10))
