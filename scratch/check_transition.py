from PIL import Image

img_path = r"c:\Users\advai\OneDrive\Desktop\Advait Digital\frontend\public\edited-photo.png"
img = Image.open(img_path).convert("RGBA")
height = img.size[1]
mid_y = height // 2

for x in range(300, 450, 5):
    print(f"x={x}, y={mid_y}:", img.getpixel((x, mid_y)))
