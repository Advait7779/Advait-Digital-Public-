from PIL import Image

img_path = r"c:\Users\advai\OneDrive\Desktop\Advait Digital\frontend\public\edited-photo (1).png"
img = Image.open(img_path).convert("RGBA")
bbox = img.getbbox()

if bbox:
    # Print pixel values in the top-left area inside the bbox of edited-photo (1).png
    # Bbox is (171, 82, 1335, 1050)
    coords = [(190, 100), (190, 200), (220, 100), (220, 200), (180, 300), (180, 500)]
    for x, y in coords:
        print(f"Pixel at ({x}, {y}):", img.getpixel((x, y)))
