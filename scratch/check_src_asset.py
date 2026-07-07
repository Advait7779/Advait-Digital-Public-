import os
from PIL import Image

src_path = r"c:\Users\advai\OneDrive\Desktop\Advait Digital\frontend\src\assets\edited-photo.png"
if os.path.exists(src_path):
    img = Image.open(src_path)
    print("Src assets image size:", img.size)
    print("Src assets image bbox:", img.getbbox())
    rgba = img.convert("RGBA")
    print("Corner color:", rgba.getpixel((0, 0)))
else:
    print("Src assets image does not exist!")
