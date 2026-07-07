from PIL import Image

src_path = r"C:\Users\advai\.gemini\antigravity\brain\6732943c-2efe-4994-aac7-a61affe9bda3\media__1783333720693.png"
img = Image.open(src_path).convert("RGBA")
width, height = img.size

# Target background color (cream/off-white)
bg_color = (242, 241, 229, 255)
tolerance = 25  # Allow some tolerance for JPEG compression/noise

# Create a mask of pixels to keep/remove
# We want to do a flood-fill to only remove the outer background, not white inside the phone.
visited = set()
pixels = img.load()

# Queue for BFS flood fill
queue = []
# Initialize queue with all border pixels
for x in range(width):
    queue.append((x, 0))
    queue.append((x, height - 1))
for y in range(height):
    queue.append((0, y))
    queue.append((width - 1, y))

def is_similar(c1, c2):
    return (
        abs(c1[0] - c2[0]) <= tolerance and
        abs(c1[1] - c2[1]) <= tolerance and
        abs(c1[2] - c2[2]) <= tolerance
    )

# Flood fill
while queue:
    x, y = queue.pop(0)
    if (x, y) in visited:
        continue
    if x < 0 or x >= width or y < 0 or y >= height:
        continue
        
    current_color = pixels[x, y]
    # If the color is similar to the background color, turn it transparent and propagate
    if is_similar(current_color, bg_color) or current_color[3] == 0:
        pixels[x, y] = (0, 0, 0, 0)
        visited.add((x, y))
        # Add 4-way neighbors
        queue.append((x + 1, y))
        queue.append((x - 1, y))
        queue.append((x, y + 1))
        queue.append((x, y - 1))

# Also trim/crop transparent edges
bbox = img.getbbox()
if bbox:
    img_cropped = img.crop(bbox)
    print("Cropped size:", img_cropped.size)
    img_cropped.save(r"c:\Users\advai\OneDrive\Desktop\Advait Digital\frontend\public\edited-photo.png", "PNG")
    img_cropped.save(r"c:\Users\advai\OneDrive\Desktop\Advait Digital\frontend\src\assets\edited-photo.png", "PNG")
    print("Background removed and saved successfully!")
else:
    img.save(r"c:\Users\advai\OneDrive\Desktop\Advait Digital\frontend\public\edited-photo.png", "PNG")
    img.save(r"c:\Users\advai\OneDrive\Desktop\Advait Digital\frontend\src\assets\edited-photo.png", "PNG")
    print("Saved without cropping.")
