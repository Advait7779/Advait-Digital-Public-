import os
import time

public_dir = "c:/Users/advai/OneDrive/Desktop/Advait Digital/public"
for file in os.listdir(public_dir):
    path = os.path.join(public_dir, file)
    mtime = os.path.getmtime(path)
    size = os.path.getsize(path)
    formatted_time = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(mtime))
    print(f"File: {file}, Size: {size} bytes, Modified: {formatted_time}")
