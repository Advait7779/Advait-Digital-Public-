from PIL import Image

img_path = r"c:\Users\advai\OneDrive\Desktop\Advait Digital\frontend\public\edited-photo (1).png"
img = Image.open(img_path)
print("Image (1) dimensions:", img.size)

# Find bounding box of non-transparent pixels
bbox = img.getbbox()
print("Bounding box of non-transparent pixels:", bbox)
if bbox:
    rgba = img.convert("RGBA")
    print("Color at corner (5, 5):", rgba.getpixel((5, 5)))
    print("Color at corner (width - 5, 5):", rgba.getpixel((img.size[0] - 5, 5)))
