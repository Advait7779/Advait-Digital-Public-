from PIL import Image

img_path = r"c:\Users\advai\OneDrive\Desktop\Advait Digital\frontend\public\edited-photo.png"
img = Image.open(img_path).convert("RGBA")
bbox = img.getbbox()

if bbox:
    # Scan a grid inside the bbox
    colors = []
    x_step = (bbox[2] - bbox[0]) // 10
    y_step = (bbox[3] - bbox[1]) // 10
    
    for x in range(bbox[0], bbox[2], x_step):
        for y in range(bbox[1], bbox[3], y_step):
            c = img.getpixel((x, y))
            if c[3] > 0:
                colors.append(c)
                
    print("Unique colors inside bbox (first 20):", list(set(colors))[:20])
