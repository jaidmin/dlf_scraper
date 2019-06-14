import requests
import argparse
import os
import sys
from peewee import *
from bs4 import BeautifulSoup
from datetime import datetime
from tqdm import tqdm
from mutagen.mp3 import MP3
from mutagen.aac import AAC
from concurrent.futures import ThreadPoolExecutor
from m3u8_downloader import M3U8Downloader
from ffmpy import FFmpeg
import glob



MP3_FOLDER = "./mp3_files"
NUM_THREADS = 4
if not os.path.exists(MP3_FOLDER):
    os.makedirs(MP3_FOLDER)
API_URL = "http://srv.deutschlandradio.de/aodlistaudio.1706.de.rpc"
DB = SqliteDatabase("database.sqlite")
DB.connect()


class Beitrag(Model):
    title = CharField()
    date = DateTimeField()
    station = CharField()
    author = CharField()
    sendung = CharField()
    duration = IntegerField()
    filename = CharField()
    filesize = IntegerField()

    class Meta:
        database = DB




DB.create_tables([Beitrag])
parser = argparse.ArgumentParser()
parser.add_argument("--sendung", type=str, default=None,
                    help="Choose the sendung to download, if None then download all")
parser.add_argument("--station", type=str, default=None,
                    help="Choose the station to download, if None then download all")
parser.add_argument("--from", type=str, default=None,
                    help="from what date to start, if None start as early as possible")
parser.add_argument("--to", type=str, default=None,
                    help="till what date to collect, if None end as late as possible")

STATION_NAME_TO_STATION_ID = {
    "Dlf Nova": 1,
    "Deutschlandfunk": 4,
    "Deutschlandfunk Kultur": 3
}
SENDUNG_NAME_TO_BROADCAST_ID = {
    "Deutschlandfunk - Der Tag": 788,
    "Gesichter Europas": 121,
    "Landerzeit": 148,
    "Europa Heute": 113,
    "Die Reportage":219
}
ARG_TO_QUERY_ARG = {
    "sendung": ("drau:broadcast_id", SENDUNG_NAME_TO_BROADCAST_ID),
    "station": ("drau:station_id", STATION_NAME_TO_STATION_ID)
}




def add_to_db(title, date, station, author, sendung, duration, filename, filesize):
    """creates record for the db and saves it"""
    beitrag = Beitrag(
        title=title,
        date=date,
        station=station,
        author=author,
        sendung=sendung,
        duration=duration,
        filename=filename,
        filesize=filesize
    )
    beitrag.save()


def get_mp3(url):
    """get and save mp3 file at the url, (checks that it is indeed mp3) and returns associated information"""
    response = requests.get(url)
    filesize = int(response.headers["Content-Length"])
    filename = url.split("/")[-1]
    filepath = os.path.join(MP3_FOLDER, filename)
    with open(filepath, "wb") as file_handle:
        file_handle.write(response.content)
    audio = MP3(filepath)
    duration = audio.info.length
    return filename, duration, filesize




def get_m3u8(url):
    response = requests.get(url)
    filesize = int(response.headers["Content-Length"])
    filename = url.split("/")[-2]
    filepath = os.path.join(MP3_FOLDER, filename)
    downloader = M3U8Downloader(url)
    downloader.download(filepath)
    new_filepath = filepath[:-1] + "3"
    ff = FFmpeg(inputs={filepath: None}, outputs={new_filepath: "-f mp3 -acodec mp3 -aq 2"})
    ff.run()
    os.remove(filepath)
    
    audio = MP3(new_filepath)
    duration = audio.info.length
    filesize = os.path.getsize(new_filepath)
    for f in glob.glob("mp3_files/*.ts"):
        os.remove(f)
    for f in glob.glob("mp3_files/*.mp4"):
        os.remove(f)
    return new_filepath, duration, filesize


def get_xml(query_params):
    """gets all items matching the query, thus limit should stay 1000 (as it works) and it iterates over all pages anyways"""
    query_params["drau:limit"] = 1000
    try:
        del query_params["drau:page"]
    except:
        pass
    response = requests.get(API_URL, query_params)
    print(response.request.url)
    soup = BeautifulSoup(response.text, "xml")
    try:
        nr_of_pages = int(soup.find("entries").attrs["pages"])
    except:
        nr_of_pages = 1
    xml_items = []
    print("Getting the XML for your Query with parameters...")
    print(query_params)
    for i in tqdm(list(range(1, nr_of_pages + 1))):
        query_params["drau:page"] = i
        response = requests.get(API_URL, query_params)
        soup = BeautifulSoup(response.text, "xml")
        xml_items += soup.find_all(name="item")
    return xml_items


def download_and_add(xml_item):
    """downloads the audio and adds the info to DB for a single xml_item"""
    url = xml_item.attrs["url"]
    # attention what about daylight saving time??
    timestamp = int(xml_item["timestamp"])
    author = xml_item.find("author")
    title = xml_item.find("title")
    station = xml_item.find("station")
    sendung = xml_item.find("sendung")
    date_time = xml_item.find("datetime")
    #### change later ####
    date_time = datetime.fromtimestamp(timestamp)
    ####
    if url[-4:] == ".mp3":
        filename, duration, filesize = get_mp3(url)
    elif url[-5:] == ".m3u8":
        filename, duration, filesize = get_m3u8(url)
    else:
        raise ValueError("unknown filetype")
    
    add_to_db(title, date_time, station, author,
              sendung, duration, filename, filesize)


def main(args):
    # prase from args later
    args = vars(parser.parse_args(args))
    print(args)
    query_dict = {}
    for arg in args:
        if args[arg] is None:
            continue
        else:
            query_arg, query_map = ARG_TO_QUERY_ARG[arg]
            query_dict[query_arg] = query_map[args[arg]]
    print(query_dict)
    xml_items = get_xml(query_dict)
    print(
        f"Downloading and adding the requested articles in {NUM_THREADS} threads...")

    with ThreadPoolExecutor(max_workers=NUM_THREADS) as e:
        for c in [xml_items[i::NUM_THREADS] for i in range(NUM_THREADS)]:
            tqdm(list(e.map(download_and_add, c)))

   # for i in tqdm(xml_items):
    #    download_and_add(i)


if __name__ == "__main__":
    main(sys.argv[1:])
