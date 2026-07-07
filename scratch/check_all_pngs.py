import os
from PIL import Image

def scan_dir(d):
    for root, dirs, files in os.walk(d):
        for f in files:
            if f.endswith('.png'):
                p = os.path.join(root, f)
                try:
                    img = Image.open(p).convert("RGBA")
                    # Count transparent pixels
                    pixels = list(img.getdata())
                    trans = sum(1 for pix in pixels if pix[3] == 0)
                    total = len(pixels)
                    trans_pct = (trans / total) * 100
                    print(f"File: {os.path.basename(p)}, Size: {img.size}, Transparent Pct: {trans_pct:.2f}%")
                except Exception as e:
                    print(f"Failed to read {p}: {e}")

print("=== Scanning public dir ===")
scan_dir(r"c:\Users\advai\OneDrive\Desktop\Advait Digital\frontend\public")
print("\n=== Scanning src/assets dir ===")
scan_dir(r"c:\Users\advai\OneDrive\Desktop\Advait Digital\frontend\src\assets")
