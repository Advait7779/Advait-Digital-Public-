import os

src_dir = "c:/Users/advai/OneDrive/Desktop/Advait Digital/src"
target_pattern = "0 0 100 100"

found_any = False
for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith((".jsx", ".js", ".html")):
            path = os.path.join(root, file)
            try:
                with open(path, "r", encoding="utf-8") as f:
                    content = f.read()
                    if target_pattern in content:
                        print(f"Found old SVG pattern in: {path}")
                        found_any = True
            except Exception as e:
                print(f"Error reading {path}: {e}")

if not found_any:
    print("No remaining old logo SVG patterns found in components.")
