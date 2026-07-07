import os
import re

search_dir = "c:/Users/advai/OneDrive/Desktop/Advait Digital/src"

results = []
for root, dirs, files in os.walk(search_dir):
    for file in files:
        if file.endswith(".jsx"):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8") as f:
                content = f.read()
                matches = re.findall(r'className="([^"]*rounded-(?:2xl|3xl)[^"]*)"', content)
                if matches:
                    results.append((file, matches))

for file, matches in results:
    print(f"\nFile: {file}")
    for match in sorted(list(set(matches))):
        print(f"  {match}")
