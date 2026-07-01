from PIL import Image
from collections import Counter

img_path = "c:/Users/advai/OneDrive/Desktop/Advait Digital/src/assets/logo.png"
with Image.open(img_path) as img:
    img = img.convert("RGBA")
    width, height = img.size
    
    # Let's count the frequency of colors to see what the main colors are (excluding white/cream background)
    colors = []
    for x in range(width):
        for y in range(height):
            r, g, b, a = img.getpixel((x, y))
            # Ignore white/cream background
            if r > 240 and g > 240 and b > 240:
                continue
            colors.append((r, g, b))
            
    counter = Counter(colors)
    print("Most common colors (excluding background):")
    for col, count in counter.most_common(20):
        print(f"Color: {col}, Count: {count}")
