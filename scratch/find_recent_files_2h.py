import os
import time

workspace_dir = "c:/Users/advai/OneDrive/Desktop/Advait Digital"
current_time = time.time()

print("Files modified/added in the last 2 hours:")
for root, dirs, files in os.walk(workspace_dir):
    if "node_modules" in root or "dist" in root or ".git" in root:
        continue
    for file in files:
        path = os.path.join(root, file)
        try:
            mtime = os.path.getmtime(path)
            # Check if modified in last 2 hours (7200 seconds)
            if current_time - mtime < 7200:
                size = os.path.getsize(path)
                print(f"{path} (size={size} bytes, age={int(current_time - mtime)}s)")
        except Exception as e:
            pass
