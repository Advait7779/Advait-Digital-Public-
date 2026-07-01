img_path = "c:/Users/advai/OneDrive/Desktop/Advait Digital/src/pages/Home.jsx"
with open(img_path, "r", encoding="utf-8") as f:
    lines = f.readlines()
    for idx, line in enumerate(lines):
        if "btnText" in line or "Explore" in line:
            if idx > 430: # Look at JSX section
                print(f"Line {idx+1}: {line.strip()}")
