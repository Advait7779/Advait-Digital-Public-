import os
from PIL import Image

media_dir = "C:/Users/advai/.gemini/antigravity/brain/bff9a154-3cbd-49c7-86b1-ab664b048195"
images = [
    "media__1781786574242.png",
    "media__1781786586138.png",
    "media__1781786592593.png"
]

for img_name in images:
    path = os.path.join(media_dir, img_name)
    if os.path.exists(path):
        try:
            with Image.open(path) as img:
                print(f"{img_name}: format={img.format}, size={img.size}, mode={img.mode}")
        except Exception as e:
            print(f"Error opening {img_name}: {e}")
    else:
        print(f"{img_name} does not exist at {path}")
