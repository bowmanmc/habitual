#!/bin/bash

PLATFORM=chrome

#echo "making distribution..."
grunt build

echo "removing previous release..."
rm -rf release/$PLATFORM/*

echo "copying distribution..."
mkdir -p release/$PLATFORM/habitual
cp -r dist/* release/$PLATFORM/habitual/
#cp -r app/* release/$PLATFORM/habitual/

echo "copying platform..."
cp -r platforms/$PLATFORM/* release/$PLATFORM/habitual/

cd release/$PLATFORM/
zip -r habitual.zip .
rm -rf habitual

echo "done."
