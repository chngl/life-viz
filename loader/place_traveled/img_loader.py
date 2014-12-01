import json
import time
from pymongo import MongoClient
from os import listdir
from os.path import isfile, join

def main():
    path = "/Users/changliu/Sites/life_viz/src/place_traveled/img"
    fileNames = [ f for f in listdir(path) if isfile(join(path,f)) ]

    # mongodb objs
    client = MongoClient('localhost', 777)
    db = client['life_viz']
    photos = db['photos']

    for name in fileNames:
        terms = name.split("-")
        if len(terms) < 2:
            continue
        year = terms[0]
        city = terms[1]
        try:
            photo = {"name": city, "year": year, "path": "/src/place_traveled/img/" + name}
            #print photo
            photos.insert(photo)
        except Exception, e:
            print "[error]: ", name, " ", e

if __name__ == "__main__":
    main()

