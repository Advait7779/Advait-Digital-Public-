import os
import re

pages_dir = r"c:\Users\advai\OneDrive\Desktop\Advait Digital\src\pages"
jsx_files = [os.path.join(pages_dir, f) for f in os.listdir(pages_dir) if f.endswith(".jsx")]

for file_path in jsx_files:
    filename = os.path.basename(file_path)
    if filename in ["About.jsx", "Contact.jsx", "Home.jsx"]:
        continue
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    lines = content.splitlines()
    matches = [m.start() for m in re.finditer(r"<img", content)]
    if matches:
        for pos in matches:
            line_no = content[:pos].count("\n")
            start = max(0, line_no - 4)
            context_lines = lines[start:line_no]
            # Check if any parent line has card-like styling
            context_str = " ".join(context_lines)
            if "bg-white" in context_str or "border" in context_str or "shadow" in context_str:
                print(f"File: {filename}, line {line_no+1}")
                for idx, cl in enumerate(context_lines):
                    print(f"  {start+idx+1:3d}: {cl}")
                print(f"->{line_no+1:3d}: {lines[line_no]}")
                print("-" * 50)
