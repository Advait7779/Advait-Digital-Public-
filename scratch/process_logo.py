import os
from PIL import Image

def process_logo(input_path, output_light_path, output_dark_path, tolerance=15):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    
    # 1. First, let's detect background pixels using flood fill from the borders.
    # The background color is around (251, 251, 247)
    bg_color = (251, 251, 247)
    
    visited = set()
    queue = []
    
    # Add border pixels to the queue
    for x in range(width):
        queue.append((x, 0))
        queue.append((x, height - 1))
    for y in range(1, height - 1):
        queue.append((0, y))
        queue.append((width - 1, y))
        
    bg_pixels = set()
    
    def is_bg_color(pixel):
        r, g, b, a = pixel
        # Check if color is close to the cream background
        return abs(r - bg_color[0]) < tolerance and abs(g - bg_color[1]) < tolerance and abs(b - bg_color[2]) < tolerance

    # Perform BFS flood fill to find the background
    while queue:
        x, y = queue.pop(0)
        if (x, y) in visited:
            continue
        visited.add((x, y))
        
        if 0 <= x < width and 0 <= y < height:
            pixel = img.getpixel((x, y))
            if is_bg_color(pixel):
                bg_pixels.add((x, y))
                # Add neighbors
                for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                    nx, ny = x + dx, y + dy
                    if 0 <= nx < width and 0 <= ny < height and (nx, ny) not in visited:
                        queue.append((nx, ny))

    # Also make sure to include any pixels that are very close to white/cream that might be in letter counters,
    # but let's be careful about the icon. The icon is on the left side of the image.
    # Let's find the bounding box of the icon. Typically the icon is within x < 80.
    # Let's inspect:
    # If x > 80 (where the text is) and the pixel is close to cream/white, we can also make it transparent
    # even if it was not reached by flood fill (to handle letter counters like inside 'o', 'a', 'd', 'g').
    for x in range(width):
        for y in range(height):
            pixel = img.getpixel((x, y))
            if is_bg_color(pixel):
                if x > 75 or (x, y) in bg_pixels:
                    bg_pixels.add((x, y))

    # Create the Light version (for white/light backgrounds)
    img_light = img.copy()
    data_light = img_light.load()
    for x in range(width):
        for y in range(height):
            if (x, y) in bg_pixels:
                r, g, b, _ = data_light[x, y]
                data_light[x, y] = (r, g, b, 0) # Make transparent
                
    img_light.save(output_light_path, "PNG")
    print(f"Created light logo: {output_light_path}")
    
    # Create the Dark version (for dark backgrounds)
    # Convert dark text to white, gray text to light gray
    img_dark = img.copy()
    data_dark = img_dark.load()
    for x in range(width):
        for y in range(height):
            if (x, y) in bg_pixels:
                r, g, b, _ = data_dark[x, y]
                data_dark[x, y] = (r, g, b, 0) # Make transparent
            else:
                r, g, b, a = data_dark[x, y]
                # If it's dark gray text (Advait text): Color is around (44, 41, 39)
                # Let's check distance to (44, 41, 39)
                if abs(r - 44) < 30 and abs(g - 41) < 30 and abs(b - 39) < 30:
                    # Make it white
                    data_dark[x, y] = (255, 255, 255, a)
                # If it's gray text (DIGITAL SERVICES): Color is around (155, 154, 151)
                elif abs(r - 155) < 30 and abs(g - 154) < 30 and abs(b - 151) < 30:
                    # Make it light gray
                    data_dark[x, y] = (220, 220, 220, a)
                    
    img_dark.save(output_dark_path, "PNG")
    print(f"Created dark logo: {output_dark_path}")

if __name__ == "__main__":
    logo_src = "c:/Users/advai/OneDrive/Desktop/Advait Digital/src/assets/logo.png"
    logo_light = "c:/Users/advai/OneDrive/Desktop/Advait Digital/src/assets/logo_light.png"
    logo_dark = "c:/Users/advai/OneDrive/Desktop/Advait Digital/src/assets/logo_dark.png"
    
    process_logo(logo_src, logo_light, logo_dark)
