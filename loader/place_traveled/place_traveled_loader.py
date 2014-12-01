import urllib2
import json
import time
from pymongo import MongoClient

def getLngLat(city):
    city = city.lower().replace(" ", "%20")
    try:
        url = 'http://maps.googleapis.com/maps/api/geocode/json?address=' +city + '&sensor=falsew'
        response = urllib2.urlopen(url)
        data = json.loads(response.read())
        
        lng = data[u"results"][0][u"geometry"][u"location"][u"lng"]
        lat = data[u"results"][0][u"geometry"][u"location"][u"lat"]

        return (lng, lat)
    except Exception, e:
        print url
        raise e 

def main():
    infile = open("places.txt", "r")
    lines = infile.readlines()
    infile.close()

    # mongodb objs
    client = MongoClient('localhost', 27017)
    db = client['life_viz']
    placeTraveled = db['place_traveled']

    for line in lines:
        line = line.strip()
        terms = line.split(",")
        year = terms[0]
        cities = terms[1:]
        for city in cities:
            time.sleep(1)
            city = city.strip()
            try:
                lng, lat = getLngLat(city)
                pl = {"name": city, "year": year, "lng": lng, "lat": lat}
                placeTraveled.insert(pl)
            except Exception, e:
                print "[error]: ",city, " ", e


if __name__ == "__main__":
    main()

