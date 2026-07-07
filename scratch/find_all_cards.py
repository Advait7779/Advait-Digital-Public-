import os
import re

search_dir = "c:/Users/advai/OneDrive/Desktop/Advait Digital/src"

card_patterns = [
    r'bg-white\s+[^"\']*rounded',
    r'rounded-(?:2xl|3xl)\s+p-',
    r'border-brand-charcoal/(?:5|10)',
]

results = []
for root, dirs, files in os.walk(search_dir):
    for file in files:
        if file.endswith(".jsx"):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8") as f:
                content = f.read()
                matches = []
                for p in card_patterns:
                    for m in re.finditer(p, content):
                        line_no = content.count('\n', 0, m.start()) + 1
                        matches.append((line_no, m.group(0)))
                if matches:
                    results.append((file, matches))

for file, matches in results:
    print(f"\nFile: {file}")
    for line, match in sorted(list(set(matches))):
        print(f"  Line {line}: {match}")
