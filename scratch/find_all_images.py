import os

workspace_dir = "c:/Users/advai/OneDrive/Desktop/Advait Digital"
for root, dirs, files in os.walk(workspace_dir):
    if "node_modules" in root or "dist" in root or ".git" in root:
        continue
    for file in files:
        if file.lower().endswith((".png", ".svg", ".jpg", ".jpeg")):
            path = os.path.join(root, file)
            print(f"{path} ({os.path.getsize(path)} bytes)")
