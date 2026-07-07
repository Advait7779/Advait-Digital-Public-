from PIL import Image

img_path = r"c:\Users\advai\OneDrive\Desktop\Advait Digital\frontend\public\edited-photo.png"
img = Image.open(img_path)
img = img.convert("RGBA")
width, height = img.size

# Check the color of the corners to find the background color
corners = [
    img.getpixel((0, 0)),
    img.getpixel((width - 1, 0)),
    img.getpixel((0, height - 1)),
    img.getpixel((width - 1, height - 1))
]

print("Corner pixels RGB:", corners)
