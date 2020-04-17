#!/bin/bash

for f in *.m4a ; do echo file \'$f\' >> list.txt; done && ffmpeg -f concat -safe 0 -i list.txt -c copy stitched-video.m4a 

# list.txt 能够知道它的分钟，时间数。文件详情。

