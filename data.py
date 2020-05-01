import json
import time
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

http = requests.Session()
retries = Retry(total=5, backoff_factor=0.1, status_forcelist=[500,502,503,504])
http.mount('http://', HTTPAdapter(max_retries=retries))
purpleURL = "https://www.purpleair.com/json?exclude=true&nwlat=40.848408897085505&selat=40.31274798061381&nwlng=-112.69461251351721&selng=-111.04050070679989"
sensors=http.get(url=purpleURL).json()['results']
time.sleep(0.5)
yearList={}
for year in range(2019,2020):
	for m in range(1,13):
		month="{:02d}".format(m)
		monthEntries=[]
		for i in sensors:
			id=i['THINGSPEAK_PRIMARY_ID']
			key=i['THINGSPEAK_PRIMARY_ID_READ_KEY']
			URL=f"https://api.thingspeak.com/channels/{id}/feeds.json?api_key={key}&average=daily&round=2&start={year}-{month}-01%2000:00:00&end={year}-{month}-01%2023:59:59"
			resp=http.get(url=URL)
			time.sleep(0.5)
			d=resp.json()
			l=d['channel']
			for f in d['feeds']:
				entry={'id':id, 'lat':i['Lat'], 'lon':i['Lon'], 'label':i['Label']}
				for v in range(1,9):
					label=f"field{v}"
					if label in f:
						entry[l[label]]=f[label]
				monthEntries.append(entry)
		yearList[f"{year}-{month}-01"]=monthEntries
with open('./data.json', 'w') as fp:
  	json.dump(yearList, fp, indent=4)