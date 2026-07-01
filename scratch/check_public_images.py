import os
from PIL import Image

public_dir = "c:/Users/advai/OneDrive/Desktop/Advait Digital/public"
for file in os.listdir(public_dir):
    path = os.path.join(public_dir, file)
    if file.lower().endswith((".png", ".jpg", ".jpeg")):
        try:
            with Image.open(path) as img:
                print(f"PNG: {file}, size={img.size}, mode={img.mode}, format={img.format}")
        except Exception as e:
            print(f"Error reading {file}: {e}")
    elif file.lower().endswith(".svg"):
        print(f"SVG: {file}, size={os.path.getsize(path)} bytes")
