#!/bin/bash

PLATFORM=chrome

#echo "making distribution..."
#grunt build

echo "removing previous release..."
rm -rf release/$PLATFORM/*

echo "copying distribution..."
#cp -r dist/* release/$PLATFORM/
cp -r app/* release/$PLATFORM/

echo "copying platform..."
cp -r platforms/$PLATFORM/* release/$PLATFORM/

echo "done."
