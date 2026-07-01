from PIL import Image

img_path = "c:/Users/advai/OneDrive/Desktop/Advait Digital/src/assets/logo.png"
with Image.open(img_path) as img:
    # Get top-left pixel
    pixel = img.getpixel((0, 0))
    print(f"Top-left pixel: {pixel}")
    
    # Check if there are any non-transparent pixels that are white or near-white
    # Let's inspect a few pixels
    has_alpha = False
    for x in range(img.width):
        for y in range(img.height):
            p = img.getpixel((x, y))
            if p[3] < 255:
                has_alpha = True
                break
        if has_alpha:
            break
    print(f"Has transparency: {has_alpha}")
