import os
from PIL import Image
import imagehash
import shutil


def remove_corrupted_images(folder):
    print("Step 1: Removing corrupted images...")
    for filename in os.listdir(folder):
        file_path = os.path.join(folder, filename)
        try:
            img = Image.open(file_path)
            img.verify()
        except Exception as e:
            print(f"Removing corrupted image: {filename}")
            os.remove(file_path)

def resize_images(folder, size=(256, 256)):
    print("Step 2: Resizing images to", size)
    for filename in os.listdir(folder):
        file_path = os.path.join(folder, filename)
        try:
            img = Image.open(file_path)
            img = img.resize(size)
            img.save(file_path)
        except Exception as e:
            print(f"Error resizing {filename}: {e}")

def remove_duplicate_images(folder):
    print("Step 3: Removing duplicate images...")
    hashes = {}
    for filename in os.listdir(folder):
        file_path = os.path.join(folder, filename)
        try:
            img = Image.open(file_path)
            hash = str(imagehash.average_hash(img))
            if hash in hashes:
                print(f"Removing duplicate: {filename}")
                os.remove(file_path)
            else:
                hashes[hash] = filename
        except Exception as e:
            print(f"Error checking {filename}: {e}")

def keep_only_jpeg(folder):
    print("Step 4: Keeping only JPEG images...")
    for filename in os.listdir(folder):
        if not filename.lower().endswith('.jpg') and not filename.lower().endswith('.jpeg'):
            print(f"Removing non-JPEG file: {filename}")
            os.remove(os.path.join(folder, filename))

def separate_cleaned_images(src_folder, dest_folder):
    print("Step 5: Separating cleaned images...")
    os.makedirs(dest_folder, exist_ok=True)
    for filename in os.listdir(src_folder):
        src_path = os.path.join(src_folder, filename)
        dest_path = os.path.join(dest_folder, filename)
        try:
            shutil.copy2(src_path, dest_path)
        except Exception as e:
            print(f"Error copying {filename}: {e}")

def separate_duplicate_images(folder, duplicate_folder):
    print("Step 3: Separating duplicate images...")
    os.makedirs(duplicate_folder, exist_ok=True)
    hashes = {}
    for filename in os.listdir(folder):
        file_path = os.path.join(folder, filename)
        try:
            img = Image.open(file_path)
            hash_val = str(imagehash.average_hash(img))
            if hash_val in hashes:
                print(f"Moving duplicate: {filename}")
                shutil.move(file_path, os.path.join(duplicate_folder, filename))
            else:
                hashes[hash_val] = filename
        except Exception as e:
            print(f"Error checking {filename}: {e}")

if __name__ == "__main__":
    folder = r"D:\Project\raw_images"
    cleaned_folder = r"D:\Project\cleaned_images"
    duplicate_folder = r"D:\Project\duplicate_images"

    remove_corrupted_images(folder)
    resize_images(folder, size=(256, 256))
    separate_duplicate_images(folder, duplicate_folder)
    keep_only_jpeg(folder)
    separate_cleaned_images(folder, cleaned_folder)

    print("Photo dataset cleaning and separation complete!")