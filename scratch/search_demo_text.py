import os

src_dir = "c:/Users/advai/OneDrive/Desktop/Advait Digital/src"

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith((".jsx", ".js")):
            path = os.path.join(root, file)
            try:
                with open(path, "r", encoding="utf-8") as f:
                    content = f.read()
                    if "Free Demo" in content or "Request Free Demo" in content or "Request a Free Demo" in content:
                        print(f"Found in {path}")
            except Exception as e:
                pass
