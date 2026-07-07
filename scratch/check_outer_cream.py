from PIL import Image

img_path = r"c:\Users\advai\OneDrive\Desktop\Advait Digital\frontend\public\edited-photo.png"
img = Image.open(img_path).convert("RGBA")
width, height = img.size

# Check cream pixels on the outer margins of the cropped image
outer_cream = 0
for x in range(width):
    for y in range(height):
        if x < 15 or x > width - 15 or y < 15 or y > height - 15:
            c = img.getpixel((x, y))
            if c[3] > 0:
                if abs(c[0] - 242) < 20 and abs(c[1] - 241) < 20 and abs(c[2] - 229) < 20:
                    outer_cream += 1
                    # Let's print the first few
                    if outer_cream <= 10:
                        print(f"Cream pixel at ({x}, {y}) color: {c}")

print(f"Total outer margin cream pixels: {outer_cream}")
