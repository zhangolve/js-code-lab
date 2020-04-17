#!/bin/bash

for f in *.m4a;
do
    new_filename=$(echo "${f}" | sed 's/.m4a$/.mp4/g')
    ffmpeg -loop 1 -framerate 1 -i qrcode.jpg -i "${f}"  -c:v libx264 -preset veryslow -crf 0 -c:a copy -shortest "${new_filename}"

done

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