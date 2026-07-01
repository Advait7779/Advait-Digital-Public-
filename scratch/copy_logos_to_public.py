import shutil
import os

src_assets_dir = "c:/Users/advai/OneDrive/Desktop/Advait Digital/src/assets"
public_dir = "c:/Users/advai/OneDrive/Desktop/Advait Digital/public"

files_to_copy = ["logo.png", "logo_light.png", "logo_dark.png", "logo_icon.png"]

for file in files_to_copy:
    src_path = os.path.join(src_assets_dir, file)
    dst_path = os.path.join(public_dir, file)
    if os.path.exists(src_path):
        shutil.copy2(src_path, dst_path)
        print(f"Copied {src_path} -> {dst_path}")
    else:
        print(f"Error: {src_path} does not exist")
