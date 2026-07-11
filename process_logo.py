import sys
from PIL import Image
import numpy as np

in_path = sys.argv[1]
out_path = sys.argv[2]

im = Image.open(in_path).convert("RGBA")
bg_color = im.getpixel((10,10))
arr = np.array(im)
h, w, _ = arr.shape
diff = np.sum(np.abs(arr[:, :, :3].astype(int) - bg_color[:3]), axis=2)

lower_bound = 30
upper_bound = 150

alpha = np.zeros((h, w), dtype=np.uint8)
alpha[diff >= upper_bound] = 255
mask = (diff > lower_bound) & (diff < upper_bound)
alpha[mask] = (255 * (diff[mask] - lower_bound) / (upper_bound - lower_bound)).astype(np.uint8)

arr[:, :, 3] = alpha
new_im = Image.fromarray(arr)

rows_any = np.any(alpha > 0, axis=1)
cols_any = np.any(alpha > 0, axis=0)
if np.any(rows_any) and np.any(cols_any):
    ymin, ymax = np.where(rows_any)[0][[0, -1]]
    xmin, xmax = np.where(cols_any)[0][[0, -1]]
    
    pad = 10
    ymin = max(0, ymin - pad)
    ymax = min(h, ymax + pad)
    xmin = max(0, xmin - pad)
    xmax = min(w, xmax + pad)
    
    cropped = new_im.crop((xmin, ymin, xmax+1, ymax+1))
    cropped.save(out_path, "PNG")
    print(f"Processed seamlessly and cropped to {cropped.size}")
else:
    new_im.save(out_path, "PNG")
