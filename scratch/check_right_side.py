from PIL import Image

img_path = r"c:\Users\advai\OneDrive\Desktop\Advait Digital\frontend\public\edited-photo.png"
img = Image.open(img_path).convert("RGBA")
width, height = img.size
mid_y = height // 2
bbox = img.getbbox()

if bbox:
    print("Checking right side of bbox at y =", mid_y)
    for x in range(bbox[2] - 50, bbox[2]):
        print(f"x={x}:", img.getpixel((x, mid_y)))
