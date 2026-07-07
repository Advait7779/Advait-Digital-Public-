from PIL import Image

img_path = r"c:\Users\advai\OneDrive\Desktop\Advait Digital\frontend\public\edited-photo.png"
img = Image.open(img_path).convert("RGBA")
width, height = img.size
mid_y = height // 2

for x in range(width):
    pixel = img.getpixel((x, mid_y))
    if pixel[3] > 0:
        print(f"First non-transparent pixel at x={x}, y={mid_y} color:", pixel)
        break
