#!/usr/bin/env python3
import os
import json
import urllib.request
import sys

def download_file(url, dest):
    """Download a file from URL to destination path."""
    try:
        print(f"Downloading {url} to {dest}...")
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        
        # Download file
        with urllib.request.urlopen(url) as response:
            with open(dest, 'wb') as f:
                f.write(response.read())
        print(f"✓ Downloaded {dest}")
        return True
    except Exception as e:
        print(f"✗ Failed to download {url}: {e}")
        return False

def main():
    # Read editingData.json
    if not os.path.exists('editingData.json'):
        print("editingData.json not found!")
        sys.exit(1)
    
    with open('editingData.json', 'r') as f:
        data = json.load(f)
    
    # Create assets directory
    assets_dir = 'public/assets'
    os.makedirs(assets_dir, exist_ok=True)
    
    # Download track.wav (background audio)
    track_url = data.get('trackUrl', '')
    if track_url:
        print(f"\nDownloading background track...")
        download_file(track_url, os.path.join(assets_dir, 'track.wav'))
    
    # Download all slide images and TTS audio
    slides = data.get('slides', [])
    for i, slide in enumerate(slides, 1):
        print(f"\nSlide {i}:")
        
        # Download image
        img_url = slide.get('imgUrl', '')
        if img_url:
            img_name = f"img{i}.jpg"
            download_file(img_url, os.path.join(assets_dir, img_name))
        
        # Download TTS audio
        tts_url = slide.get('ttsUrl', '')
        if tts_url:
            tts_name = f"tts{i}.mp3"
            download_file(tts_url, os.path.join(assets_dir, tts_name))
    
    print("\n✓ All assets downloaded to public/assets/")

if __name__ == '__main__':
    main()
