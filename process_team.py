import os
from PIL import Image

src_dir = "/Users/cjay/Projects/personal/SLAHAB/team"
dest_dir = "/Users/cjay/Projects/personal/SLAHAB/slahab-nextjs/public/images/slahab/team"
os.makedirs(dest_dir, exist_ok=True)

TARGET_WIDTH = 600
TARGET_HEIGHT = 800

def crop_center(img, width, height):
    img_width, img_height = img.size
    img_ratio = img_width / img_height
    target_ratio = width / height

    if img_ratio > target_ratio:
        new_width = int(target_ratio * img_height)
        left = (img_width - new_width) / 2
        top = 0
        right = (img_width + new_width) / 2
        bottom = img_height
    else:
        new_height = int(img_width / target_ratio)
        left = 0
        top = (img_height - new_height) / 2 # Center crop (might cut top of head, let's do a slight top-bias crop)
        # 20% from top instead of 50%
        top = (img_height - new_height) * 0.2
        right = img_width
        bottom = top + new_height

    img = img.crop((left, top, right, bottom))
    return img.resize((width, height), Image.Resampling.LANCZOS)

def process_nihal(img):
    # Cut the left face. Assume the target person is on the right.
    width, height = img.size
    img = img.crop((int(width * 0.45), 0, width, height)) # crop starting from 45% to keep the right person
    return crop_center(img, TARGET_WIDTH, TARGET_HEIGHT)

for filename in os.listdir(src_dir):
    if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        img_path = os.path.join(src_dir, filename)
        img = Image.open(img_path)
        
        if img.mode != 'RGB':
            img = img.convert('RGB')
            
        if "NIHAL" in filename.upper():
            img = process_nihal(img)
        else:
            img = crop_center(img, TARGET_WIDTH, TARGET_HEIGHT)
            
        clean_name = filename.split('.')[0].replace(' - PLEASE CUT and remove THE left FACE', '').strip().replace(' ', '_').lower() + '.jpg'
        out_path = os.path.join(dest_dir, clean_name)
        img.save(out_path, 'JPEG', quality=90)
        print(f"Processed: {clean_name}")
