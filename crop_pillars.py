import os
from PIL import Image

def smart_crop(src_path, dest_path, target_width, target_height):
    if not os.path.exists(src_path):
        print(f"Source file not found: {src_path}")
        return False
    try:
        with Image.open(src_path) as img:
            img_width, img_height = img.size
            # Calculate scale factor to cover the target box
            scale = max(target_width / img_width, target_height / img_height)
            new_width = int(img_width * scale)
            new_height = int(img_height * scale)
            
            # Resize image
            try:
                resampling = Image.Resampling.LANCZOS
            except AttributeError:
                try:
                    resampling = Image.ANTIALIAS
                except AttributeError:
                    resampling = Image.BICUBIC
            
            resized_img = img.resize((new_width, new_height), resampling)
            
            # Center crop
            left = (new_width - target_width) // 2
            top = (new_height - target_height) // 2
            right = left + target_width
            bottom = top + target_height
            
            cropped_img = resized_img.crop((left, top, right, bottom))
            
            # Convert modes if saving to JPEG
            if dest_path.lower().endswith(('.jpg', '.jpeg')):
                if cropped_img.mode != 'RGB':
                    cropped_img = cropped_img.convert('RGB')
                    
            cropped_img.save(dest_path, quality=95)
            print(f"Success: {os.path.basename(src_path)} ({img_width}x{img_height}) -> {os.path.basename(dest_path)} ({target_width}x{target_height})")
            return True
    except Exception as e:
        print(f"Error processing {src_path}: {e}")
        return False

base_dir = '/Users/cjay/Projects/personal/SLAHAB/slahab-nextjs/public/images/slahab'

# Define target dimensions for larger UX
w, h = 480, 640

# Crop from raw source images
smart_crop(
    os.path.join(base_dir, 'Niranjala Wijekoon 3.jpg'),
    os.path.join(base_dir, 'card_education.jpg'),
    w, h
)
smart_crop(
    os.path.join(base_dir, 'winnings_trophy.jpg'),
    os.path.join(base_dir, 'card_awards.jpg'),
    w, h
)
smart_crop(
    os.path.join(base_dir, 'OMC Asia Cup Malaysia with winners.jpg'),
    os.path.join(base_dir, 'card_omc.jpg'),
    w, h
)
smart_crop(
    os.path.join(base_dir, 'icd/IMG_1227.JPG'),
    os.path.join(base_dir, 'card_icd.jpg'),
    w, h
)
