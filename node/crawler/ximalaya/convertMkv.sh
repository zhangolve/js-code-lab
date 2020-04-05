#!/bin/bash

for f in *.m4a;
do
    new_filename=$(echo "${f}" | sed 's/.m4a$/.mkv/g')
    ffmpeg -loop 1 -framerate 1 -i qrcode.jpg -i "${f}"  -c:v libx264 -preset veryslow -crf 0 -c:a copy -shortest "${new_filename}"

done
