import spotipy
from spotipy.oauth2 import SpotifyOAuth
import csv
import os
from openai import OpenAI

def spotipy_instance() -> spotipy.Spotify:
    """ Returns a spotipy instance
    """
    return spotipy.Spotify(auth_manager=SpotifyOAuth(client_id=os.getenv('spotify_client_id'), 
                                                     client_secret=os.getenv('spotify_client_secret'), 
                                                     redirect_uri='http://localhost:8080'))

def get_artists() -> list[str]:
    """ returns a list of artist id's
    """
    artists = []
    with open('dataset.csv', newline='', encoding='utf8') as csvfile:
        rows = csv.reader(csvfile)
        next(rows)
        sp = spotipy_instance()
        for i in range(500):
            artist_dict = sp.track(next(rows)[1])['artists']
            for artist in artist_dict:
                artists.append(artist['uri'])
    return artists

def get_genres() -> None:
    """ writes genres to genres.csv
    """
    genres = []
    sp = spotipy_instance()
    for artst in get_artists():
        genres.extend(sp.artist(artst)['genres'])
    with open('genres.csv', 'w') as file:
        for genre in sorted(list(set(genres))):
            file.write(genre + '\n')

def get_descriptions() -> None:
    """ For each genre, generates a description of it
    """
    with open('genres_super_simple.txt') as file:
        genres = file.readlines()
        for i in range(len(genres)):
            genres[i] = genres[i].strip()
        client = OpenAI(api_key=os.getenv('openai_api_key'))
        with open('genre_data.csv', 'w') as writefile:
            for genre in genres:
                response = client.chat.completions.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {"role": "user", "content": f"Describe the traits of this music genre in a paragraph: {genre}"}
                    ]
                )
                writefile.write(f'{genre},{response.choices[0].message.content}\n')

if __name__ == '__main__':
    #get_genres()
    get_descriptions()