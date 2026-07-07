from PIL import Image
from collections import Counter

img_path = r"c:\Users\advai\OneDrive\Desktop\Advait Digital\frontend\public\edited-photo.png"
img = Image.open(img_path).convert("RGBA")
width, height = img.size

# Count all pixel colors
pixels = list(img.getdata())
counter = Counter(pixels)

# Print the most common colors
print("Top 30 most common colors in the entire image:")
for color, count in counter.most_common(30):
    print(f"Color: {color}, Count: {count} ({count/(width*height)*100:.2f}%)")
