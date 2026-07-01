img_path = "c:/Users/advai/OneDrive/Desktop/Advait Digital/src/components/DemoForm.jsx"
with open(img_path, "r", encoding="utf-8") as f:
    lines = f.readlines()
    for idx, line in enumerate(lines):
        if "Free Demo" in line or "Free demo" in line or "free demo" in line:
            print(f"Line {idx+1}: {line.strip()}")
