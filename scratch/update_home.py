import os

path = r'c:\Users\advai\OneDrive\Desktop\Advait Digital\frontend\src\pages\Home.jsx'

with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'className="w-full sm:w-auto bg-brand-charcoal text-white hover:bg-brand-orange' in line:
        lines[i] = line.replace(
            'w-full sm:w-auto',
            'w-auto max-w-[85%] sm:max-w-none'
        ).replace(
            'flex items-center justify-center',
            'inline-flex items-center justify-center'
        )
        print(f"Updated line {i+1}")

with open(path, 'w', encoding='utf-8') as f:
    f.writelines(lines)
