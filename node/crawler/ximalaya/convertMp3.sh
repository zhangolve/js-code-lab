#!/bin/bash
# rename 's/$/jelline/' *
# rename 's/^\d{4}-//' *
# rename 's/更多音频加wx:hktkdy001//' *
# mkdir "mp3s"

mkdir newfiles
for f in *.m4a; do ffmpeg -i "$f" -codec:v copy -codec:a libmp3lame -q:a 2 newfiles/"${f%.m4a}.mp3"; done






# for f in *.m4a;
# do
# for i in {1..4}:
# do
#     echo “${i}”
# done


# # 5

# # I would store the list of files in an array, so that you don't have to read the file system twice, increasing performance and reducing potential race conditions. Then use another variable as the index.

# files=(*.jpg)
# total=${#files[@]}
# i=0
# for f in "${files[@]}"; do
#     i=$(( i + 1 ))
#     echo index $i
#     echo total $total
#     echo "- Processing file: $f"
# done