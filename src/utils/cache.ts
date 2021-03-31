/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 10

const LOVE_SONG_KEY = '__song__'
const LOVE_SONG_LEN = 200

const LOVE_SONG_LIST_KEY = '__songlist__'
const LOVE_SONG_LIST_LEN = 20

function mapArr(arr: any) {
    let newArr: any = []
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            const dealArr = mapArr(arr[i])
            newArr = [...newArr, ...dealArr]
        } else {
            newArr.push(arr[i])
        }
    }
    const shoArr = [...new Set(newArr)]
    const arrs = shoArr.sort((a: any, b: any) => a - b) //a-b<0 升序
    return arrs
}

export function saveSearch(query: any) {
    const searches = storage.get(SEARCH_KEY, [])
    searches.unshift(query)
    if (searches.length > SEARCH_MAX_LEN) {
        searches.splice(-1, 1)
    }
    storage.set(SEARCH_KEY, mapArr(searches))
}

export const getSearch = () => {
    return storage.get(SEARCH_KEY, [])
}

export function saveLoveSong(song: any) {
    const songList = storage.get(LOVE_SONG_KEY, [])
    songList.unshift(song)
    if (songList.length > LOVE_SONG_LEN) {
        songList.splice(-1, 1)
    }
    storage.set(LOVE_SONG_KEY, mapArr(songList))
}

export function deleteLoveSong(song: any) {
    const songList = storage.get(LOVE_SONG_KEY, [])
    const newSongList = songList.filter((item: any) => item.id !== song.id)
    storage.set(LOVE_SONG_KEY, mapArr(newSongList))
}

export const getLoveSong = () => {
    return storage.get(LOVE_SONG_KEY, [])
}

export function saveLoveSongList(songList: any) {
    const localList = storage.get(LOVE_SONG_LIST_KEY, [])
    localList.unshift(songList)
    if (localList.length > LOVE_SONG_LIST_LEN) {
        localList.splice(-1, 1)
    }
    storage.set(LOVE_SONG_LIST_KEY, mapArr(localList))
}

export function deleteLoveSongList(songList: any) {
    const localList = storage.get(LOVE_SONG_LIST_KEY, [])
    const newLocalList = localList.filter((item: any) => item.id !== songList.id)
    storage.set(LOVE_SONG_LIST_KEY, mapArr(newLocalList))
}

export const getLoveSongList = () => {
    return storage.get(LOVE_SONG_LIST_KEY, [])
}
