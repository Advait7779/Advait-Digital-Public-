import os
from PIL import Image

p = r"c:\Users\advai\OneDrive\Desktop\Advait Digital\frontend\src\assets\wa_marketing_business.png"
if os.path.exists(p):
    img = Image.open(p)
    print("wa_marketing_business.png size:", img.size)
    print("wa_marketing_business.png bbox:", img.getbbox())
else:
    print("wa_marketing_business.png does not exist")
