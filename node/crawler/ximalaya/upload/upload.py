import os
import sys
from youtube_uploader_selenium import YouTubeUploader

work_dir = os.getcwd()

all_files = []
for parent, dirnames, filenames in os.walk(work_dir,  followlinks=True):
        for filename in filenames:
            if filename.endswith('.mp4'):
                file_path = os.path.join(parent, filename)
                all_files.append(file_path)
            # print('文件名：%s' % filename)
            # print('文件完整路径：%s\n' % file_path)

# video_path = './01.mp4'

# metadata_path = '123/rockets_metadata.json'

for video_path in all_files:  
    uploader = YouTubeUploader(video_path)

## need to do : for in loop and windows path handler

# if could do better , we can deploy it to docker 
    was_video_uploaded, video_id = uploader.upload()
    assert was_video_uploaded