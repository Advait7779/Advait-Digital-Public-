from PIL import Image

img_path = "c:/Users/advai/OneDrive/Desktop/Advait Digital/src/assets/logo.png"
with Image.open(img_path) as img:
    img = img.convert("RGBA")
    width, height = img.size
    
    # Let's find the vertical column of cream/white background between the icon (left) and the text (right)
    # The background color is close to (251, 251, 247)
    bg_color = (251, 251, 247)
    
    def is_bg(pixel):
        r, g, b, a = pixel
        return abs(r - bg_color[0]) < 10 and abs(g - bg_color[1]) < 10 and abs(b - bg_color[2]) < 10

    # Let's check columns from left to right
    # The icon is on the left, so we expect some non-bg columns, then a few empty bg columns, then the text columns.
    empty_columns = []
    for x in range(width):
        is_column_empty = True
        for y in range(height):
            if not is_bg(img.getpixel((x, y))):
                is_column_empty = False
                break
        if is_column_empty:
            empty_columns.append(x)
            
    print(f"Empty columns: {empty_columns}")
    
    # We want to find the empty column that separates the icon and the text.
    # The icon usually occupies the first ~70 pixels. Let's find the first empty column after x=50.
    separator_x = None
    for x in empty_columns:
        if 50 < x < 90:
            separator_x = x
            break
            
    if separator_x is None:
        # Fallback if no empty column found in that range
        separator_x = 75
        
    print(f"Using separator_x = {separator_x}")
    
    # Crop the icon (0, 0, separator_x, height)
    # Let's crop it as a square if possible, or just the cropped box
    icon = img.crop((0, 0, separator_x, height))
    
    # Make the icon's background transparent
    icon_transparent = Image.new("RGBA", icon.size)
    for x in range(icon.width):
        for y in range(icon.height):
            pixel = icon.getpixel((x, y))
            if is_bg(pixel):
                icon_transparent.putpixel((x, y), (0, 0, 0, 0))
            else:
                icon_transparent.putpixel((x, y), pixel)
                
    # Save the icon
    icon_transparent.save("c:/Users/advai/OneDrive/Desktop/Advait Digital/src/assets/logo_icon.png")
    print("Saved logo_icon.png")
