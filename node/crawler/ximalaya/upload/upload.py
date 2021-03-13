from youtube_uploader_selenium import YouTubeUploader

video_path = './01.mp4'
# metadata_path = '123/rockets_metadata.json'

uploader = YouTubeUploader(video_path)

## need to do : for in loop and windows path handler

# if could do better , we can deploy it to docker 
was_video_uploaded, video_id = uploader.upload()
assert was_video_uploaded