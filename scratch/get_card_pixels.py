from PIL import Image

img_path = r"c:\Users\advai\OneDrive\Desktop\Advait Digital\frontend\public\edited-photo.png"
img = Image.open(img_path).convert("RGBA")
bbox = img.getbbox()

if bbox:
    # Print pixel values at a few coordinates in the left-top margin of the card
    # Bbox is (304, 72, 946, 1197)
    # The hand starts further down. The phone is in the middle.
    # Coordinates like (350, 100), (350, 150), (400, 100), (400, 150) should be on the card background.
    coords = [(350, 100), (350, 150), (400, 100), (400, 150), (330, 200), (330, 300)]
    for x, y in coords:
        print(f"Pixel at ({x}, {y}):", img.getpixel((x, y)))
