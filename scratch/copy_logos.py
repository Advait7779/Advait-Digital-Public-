import os
import shutil

brain_dir = "C:/Users/advai/.gemini/antigravity/brain/bff9a154-3cbd-49c7-86b1-ab664b048195"
src_assets_dir = "c:/Users/advai/OneDrive/Desktop/Advait Digital/src/assets"
public_dir = "c:/Users/advai/OneDrive/Desktop/Advait Digital/public"

# Target files
map_pin_src = os.path.join(brain_dir, "media__1781786574242.png")
wide_logo_src = os.path.join(brain_dir, "media__1781786586138.png")

map_pin_dst = os.path.join(public_dir, "favicon.png")
wide_logo_dst = os.path.join(src_assets_dir, "logo.png")

# Copy map pin to public/favicon.png
if os.path.exists(map_pin_src):
    shutil.copy2(map_pin_src, map_pin_dst)
    print(f"Copied {map_pin_src} -> {map_pin_dst}")
else:
    print(f"Error: {map_pin_src} not found")

# Copy wide logo to src/assets/logo.png
if os.path.exists(wide_logo_src):
    shutil.copy2(wide_logo_src, wide_logo_dst)
    print(f"Copied {wide_logo_src} -> {wide_logo_dst}")
else:
    print(f"Error: {wide_logo_src} not found")
