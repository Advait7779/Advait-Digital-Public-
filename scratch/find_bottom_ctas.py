import glob
import os
import re

files = glob.glob('src/pages/*.jsx')
for f in files:
    name = os.path.basename(f)
    if name in ['About.jsx', 'Contact.jsx', 'Home.jsx']:
        continue
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
        
    lines = content.split('\n')
    print("=" * 60)
    print(f"File: {name}")
    
    # Let's find all instances of to="/contact"
    matches = []
    for idx, line in enumerate(lines):
        if 'to="/contact"' in line or 'to=\"/contact\"' in line:
            matches.append(idx)
            
    if matches:
        # We want the bottom-most one (usually the typographic CTA banner button)
        target_idx = matches[-1]
        print(f"Bottom-most CTA Link found at line {target_idx + 1}:")
        
        # print from target_idx - 5 to target_idx + 10
        start = max(0, target_idx - 3)
        end = min(len(lines), target_idx + 8)
        for idx in range(start, end):
            print(f"  {idx+1}: {lines[idx]}")
    else:
        print("No Link to /contact found")
