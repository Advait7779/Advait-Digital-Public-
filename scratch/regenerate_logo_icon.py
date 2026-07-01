from PIL import Image

img_path = "c:/Users/advai/OneDrive/Desktop/Advait Digital/src/assets/logo.png"
with Image.open(img_path) as img:
    img = img.convert("RGBA")
    width, height = img.size
    bg_color = (251, 251, 247)
    
    def is_bg(pixel):
        r, g, b, a = pixel
        return abs(r - bg_color[0]) < 10 and abs(g - bg_color[1]) < 10 and abs(b - bg_color[2]) < 10

    # The separator empty columns start at x = 63.
    # Therefore, the circular icon is strictly within x < 63.
    min_x, max_x = width, 0
    min_y, max_y = height, 0
    
    for x in range(63):
        for y in range(height):
            pixel = img.getpixel((x, y))
            if not is_bg(pixel):
                if x < min_x: min_x = x
                if x > max_x: max_x = x
                if y < min_y: min_y = y
                if y > max_y: max_y = y
                
    print(f"Icon bounding box (restricted to x < 63): x in [{min_x}, {max_x}], y in [{min_y}, {max_y}]")
    
    # We crop with 2 pixels padding
    pad = 2
    crop_x1 = max(0, min_x - pad)
    crop_y1 = max(0, min_y - pad)
    crop_x2 = min(63, max_x + pad)
    crop_y2 = min(height, max_y + pad)
    
    icon_w = crop_x2 - crop_x1
    icon_h = crop_y2 - crop_y1
    
    # Make it a perfect square
    if icon_w > icon_h:
        diff = icon_w - icon_h
        crop_y1 = max(0, crop_y1 - diff // 2)
        crop_y2 = min(height, crop_y2 + (diff - diff // 2))
    elif icon_h > icon_w:
        diff = icon_h - icon_w
        crop_x1 = max(0, crop_x1 - diff // 2)
        crop_x2 = min(63, crop_x2 + (diff - diff // 2))
        
    print(f"Final square crop box: ({crop_x1}, {crop_y1}, {crop_x2}, {crop_y2})")
    
    icon = img.crop((crop_x1, crop_y1, crop_x2, crop_y2))
    
    # Make background transparent
    icon_transparent = Image.new("RGBA", icon.size)
    for x in range(icon.width):
        for y in range(icon.height):
            pixel = icon.getpixel((x, y))
            if is_bg(pixel):
                icon_transparent.putpixel((x, y), (0, 0, 0, 0))
            else:
                icon_transparent.putpixel((x, y), pixel)
                
    # Save the processed icon
    icon_transparent.save("c:/Users/advai/OneDrive/Desktop/Advait Digital/src/assets/logo_icon.png")
    icon_transparent.save("c:/Users/advai/OneDrive/Desktop/Advait Digital/public/logo_icon.png")
    print(f"Regenerated logo_icon.png (size={icon_transparent.size}) in assets and public folders")
