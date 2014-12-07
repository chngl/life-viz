import json
import pdb
from pymongo import MongoClient

def main():
    infile = open("hobbies.txt", "r")
    lines = infile.readlines()
    infile.close()

    # mongodb objs
    client = MongoClient('localhost', 777)
    db = client['life_viz']
    hobby = db['hobby']
    
    hobbyDic = {}
    for line in lines:
        line = line.strip()
        terms = [term.strip() for term in line.split(":")]
        hobbyName = terms[0]
        years = terms[1].split("-")
        startYear = int(years[0].strip()) + 1987
        endYear = int(years[1].strip()) + 1987

        if (startYear == endYear):
            value = 4
            hb = {"name": hobbyName, "value": value}
            if startYear in hobbyDic:
                hobbyDic[startYear].append(hb)
            else:
                hobbyDic[startYear] = [hb]
            continue

        currYear = startYear
        while currYear <= endYear:
            value = 4 - int( 4 * (currYear - startYear) / (endYear - startYear))
            hb = {"name": hobbyName, "value": value}
            if (currYear in hobbyDic):
                hobbyDic[currYear].append(hb)
            else:
                hobbyDic[currYear] = [hb]
            currYear += 1

    pdb.set_trace()
    for key, value in hobbyDic.iteritems():
        hobby.insert({"year": key, "hobbies": value})

        #pl = {"name": city, "year": year, "lng": lng, "lat": lat}
        #placeTraveled.insert(pl)

if __name__ == "__main__":
    main()

