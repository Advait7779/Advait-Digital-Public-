img_path = "c:/Users/advai/OneDrive/Desktop/Advait Digital/src/index.css"
with open(img_path, "r", encoding="utf-8") as f:
    lines = f.readlines()
    for idx, line in enumerate(lines):
        if "brand-charcoal" in line or "@theme" in line or "colors:" in line:
            print(f"Line {idx+1}: {line.strip()}")
