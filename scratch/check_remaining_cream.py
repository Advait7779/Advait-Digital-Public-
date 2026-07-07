from PIL import Image

img_path = r"c:\Users\advai\OneDrive\Desktop\Advait Digital\frontend\public\edited-photo.png"
img = Image.open(img_path).convert("RGBA")
width, height = img.size

# Check if there are any pixels near the boundary that are still cream colored
cream_pixels = 0
for x in range(width):
    for y in range(height):
        c = img.getpixel((x, y))
        if c[3] > 0:
            # Check if color is close to (242, 241, 229)
            if abs(c[0] - 242) < 15 and abs(c[1] - 241) < 15 and abs(c[2] - 229) < 15:
                cream_pixels += 1

print(f"Found {cream_pixels} cream colored pixels remaining in the cropped image.")
