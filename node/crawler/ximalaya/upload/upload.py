from youtube_uploader_selenium import YouTubeUploader

video_path = ' /mnt/c/Users/13823/Music/mp4/人生/mp4s/人生01.mp4'
# metadata_path = '123/rockets_metadata.json'

uploader = YouTubeUploader(video_path)
was_video_uploaded, video_id = uploader.upload()
assert was_video_uploaded