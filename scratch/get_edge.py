from PIL import Image

img_path = r"c:\Users\advai\OneDrive\Desktop\Advait Digital\frontend\public\edited-photo.png"
img = Image.open(img_path).convert("RGBA")
bbox = img.getbbox()

if bbox:
    # Print pixel values along the left edge of the non-transparent area
    for y in range(bbox[1] + 10, bbox[1] + 60, 10):
        print(f"Pixel at ({bbox[0] + 10}, {y}):", img.getpixel((bbox[0] + 10, y)))
