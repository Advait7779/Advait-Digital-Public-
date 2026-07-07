from PIL import Image

img_path = r"c:\Users\advai\OneDrive\Desktop\Advait Digital\frontend\public\edited-photo.png"
img = Image.open(img_path)
print("Image dimensions:", img.size)

# Find bounding box of non-transparent pixels
bbox = img.getbbox()
print("Bounding box of non-transparent pixels:", bbox)

# Get the color inside the bounding box, e.g. at bbox[0] + 10, bbox[1] + 10
if bbox:
    rgba = img.convert("RGBA")
    sample_x = bbox[0] + 10
    sample_y = bbox[1] + 10
    print(f"Color at sample ({sample_x}, {sample_y}):", rgba.getpixel((sample_x, sample_y)))
