import json

rating = json.load(open('rating.json'))
safety = json.load(open('safety.json'))
present = set(rating.keys()) & set(safety.keys())

alldata = json.load(open('alldata.json'))['airbnb']

new = []
for entry in alldata:
    url = entry['Listing Url']
    eid = url[url.rfind('/')+1:-1]
    if eid in present:
        entry['safety_rating'] = safety[eid]
        entry['satisfaction_rating'] = rating[eid]
    new.append(entry)

with open('newdata.json', 'w') as f:
    json.dump({'airbnb': new}, f)
