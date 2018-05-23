#!/usr/bin/env bash

# Reset
Color_Off='\033[0m'       # Text Reset

# Regular Colors
Black='\033[0;30m'        # Black
Red='\033[0;31m'          # Red
Green='\033[0;32m'        # Green
Yellow='\033[0;33m'       # Yellow
Blue='\033[0;34m'         # Blue
Purple='\033[0;35m'       # Purple
Cyan='\033[0;36m'         # Cyan
White='\033[0;37m'        # White

files=(
 "scrollreveal/dist/scrollreveal.min.js"
 "soundcloud-audio/dist/soundcloud-audio.min.js"
 "isotope-layout/dist/isotope.pkgd.min.js"
 "imagesloaded/imagesloaded.pkgd.min.js"
 "vanilla-lazyload/dist/lazyload.min.js"
)

rm -r "./web/assets/vendor"
mkdir "./web/assets/vendor"

for i in "${files[@]}"
do
   echo -e "copying $Green'node_modules/$i'$Color_Off"
   cp "./node_modules/$i" "./web/assets/vendor/"
done