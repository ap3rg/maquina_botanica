#!/bin/bash
i=91
for file in *Cirujano*.*
 do
    mv "$file" "fv-${i}.png"
    ((i=i+1))
 done 
