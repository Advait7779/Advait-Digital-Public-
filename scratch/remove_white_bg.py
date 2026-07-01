import os
from PIL import Image, ImageDraw

assets_dir = r"c:\Users\advai\OneDrive\Desktop\Advait Digital\src\assets"

def is_white_corner(img):
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    w, h = img.size
    corners = [(0, 0), (w-1, 0), (0, h-1), (w-1, h-1)]
    for x, y in corners:
        r, g, b, a = img.getpixel((x, y))
        # If any corner is opaque white or near-white
        if a > 0 and r > 240 and g > 240 and b > 240:
            return True
    return False

def make_corners_transparent(file_path):
    print(f"Processing {os.path.basename(file_path)}...")
    img = Image.open(file_path)
    if img.mode != 'RGBA':
        img = img.convert('RGBA')
    
    w, h = img.size
    
    # We want to floodfill from corners
    # Let's define the color we want to fill with: transparent (0, 0, 0, 0)
    # PIL's floodfill modifies the image in place or we can do it on a copy
    # We will use floodfill from corners (0,0), (w-1, 0), (0, h-1), (w-1, h-1)
    # If the corner pixel is white/near-white, we floodfill it
    corners = [(0, 0), (w-1, 0), (0, h-1), (w-1, h-1)]
    
    # We will do thresholding. Because PIL floodfill thresh is in color distance,
    # let's write a custom floodfill or use ImageDraw.floodfill
    # ImageDraw.floodfill supports thresh since Pillow 9.0.0
    for cx, cy in corners:
        r, g, b, a = img.getpixel((cx, cy))
        if a > 0 and r > 230 and g > 230 and b > 230:
            # Flood fill this corner with transparent color
            # Target is the current color of the corner
            ImageDraw.floodfill(img, (cx, cy), (0, 0, 0, 0), thresh=35)
            
    img.save(file_path, "PNG")
    print(f"Successfully processed and saved {os.path.basename(file_path)}.")

# Find all PNG files in assets
for filename in os.listdir(assets_dir):
    if filename.lower().endswith('.png'):
        path = os.path.join(assets_dir, filename)
        try:
            with Image.open(path) as img:
                if is_white_corner(img):
                    print(f"Image with white corners found: {filename}")
                    # Let's process it
                    make_corners_transparent(path)
        except Exception as e:
            print(f"Error reading {filename}: {e}")
