from PIL import Image

img_path = r"c:\Users\advai\OneDrive\Desktop\Advait Digital\frontend\public\edited-photo.png"
img = Image.open(img_path)
img = img.convert("RGBA")
width, height = img.size

# Sample pixels along a border inset of 50 pixels
samples = []
for x in range(50, width - 50, 100):
    samples.append((x, 50, img.getpixel((x, 50))))
    samples.append((x, height - 50, img.getpixel((x, height - 50))))

for y in range(50, height - 50, 100):
    samples.append((50, y, img.getpixel((50, y))))
    samples.append((width - 50, y, img.getpixel((width - 50, y))))

# Print unique non-transparent colors found
unique_colors = set(c[:3] for x, y, c in samples if c[3] > 0)
print("Unique non-transparent colors sampled:", list(unique_colors)[:15])
