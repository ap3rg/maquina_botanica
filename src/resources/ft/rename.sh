#!/bin/bash
i=1 
for file in *.jpg
 do
    mv "$file" "ft-${i}.jpg"
    ((i=i+1))
 done 
