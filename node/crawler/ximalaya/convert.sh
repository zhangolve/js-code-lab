#!/bin/bash

mkdir "mp3s"
for f in *.m4a;
do
    bitrate="128K"
    new_filename=$(echo "${f}" | sed 's/.m4a$/.mp3/g')
    ffmpeg -y -i "${f}" -acodec libmp3lame -ab "${bitrate}" "mp3s/${new_filename}"
done