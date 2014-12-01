import json
import time
from pymongo import MongoClient
from os import listdir
from os.path import isfile, join

def main():
    path = "/home/wewe_chang_gmail_com/projects/life-viz/photos/"
    fileNames = [ f for f in listdir(path) if isfile(join(path,f)) ]

    # mongodb objs
    client = MongoClient('localhost', 27017)
    db = client['life_viz']
    photos = db['photos']

    for name in fileNames:
        terms = name.split("-")
        if len(terms) < 2:
            continue
        year = terms[0]
        city = terms[1]
        try:
            photo = {"name": city, "year": year, "path": "photos/" + name}
            #print photo
            photos.insert(photo)
        except Exception, e:
            print "[error]: ", name, " ", e

if __name__ == "__main__":
    main()

