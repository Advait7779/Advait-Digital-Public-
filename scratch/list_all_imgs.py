import os
import re

pages_dir = r"c:\Users\advai\OneDrive\Desktop\Advait Digital\src\pages"
jsx_files = [os.path.join(pages_dir, f) for f in os.listdir(pages_dir) if f.endswith(".jsx")]

def find_img_tags(content):
    # Match <img ... /> or open <img tags
    # Let's parse parent tags using simple indentation/brace level or context lines
    lines = content.splitlines()
    matches = []
    for line_idx, line in enumerate(lines):
        if "<img" in line:
            matches.append(line_idx)
    return matches

for file_path in jsx_files:
    filename = os.path.basename(file_path)
    if filename in ["About.jsx", "Contact.jsx", "Home.jsx"]:
        continue
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    line_indices = find_img_tags(content)
    if line_indices:
        print(f"=== {filename} ({len(line_indices)} images) ===")
        lines = content.splitlines()
        for idx in line_indices:
            print(f"  Line {idx+1}: {lines[idx].strip()}")
            # print up to 5 preceding lines
            start = max(0, idx - 4)
            print("  Context:")
            for c_idx in range(start, idx):
                print(f"    {c_idx+1:3d}: {lines[c_idx]}")
            print("-" * 30)
