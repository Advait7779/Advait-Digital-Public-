import os
from PIL import Image

img_path = r"C:\Users\advai\.gemini\antigravity\brain\6732943c-2efe-4994-aac7-a61affe9bda3\media__1783333720693.png"
if os.path.exists(img_path):
    img = Image.open(img_path)
    print("Uploaded image dimensions:", img.size)
    print("Uploaded image bbox:", img.getbbox())
    rgba = img.convert("RGBA")
    print("Corner pixel color (0, 0):", rgba.getpixel((0, 0)))
    print("Corner pixel color (width-1, height-1):", rgba.getpixel((img.size[0]-1, img.size[1]-1)))
else:
    print("Uploaded image does not exist!")
