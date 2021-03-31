/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export default {
    namespace: 'player',

    state: {
        showMini: true,
        playList: [],
        sequenceList: [],
        currentIndex: 0,
        playUrl: '',
        platform: 'NETEASE',
        playPlatform: '',
        loveSong: [],
        loveSongList: []
    },

    subscriptions: {},

    effects: {},

    reducers: {
        changeShowMiniState(state: { showMini: any }) {
            console.log('changeShowMiniState')
            const { showMini } = state
            return {
                ...state,
                showMini: !showMini
            }
        },
        chageCurrentIndex(state: any, action: { payLoad: { currentIndex: any } }) {
            console.log('chageCurrentIndex')
            return {
                ...state,
                currentIndex: action.payLoad.currentIndex
            }
        },
        changePlayList(state: any, action: { payLoad: { playList: any } }) {
            console.log('changePlayList')
            return {
                ...state,
                playList: action.payLoad.playList
            }
        },
        changePlayUrl(state: any, action: { payLoad: { playUrl: any } }) {
            console.log('changePlayUrl')
            return {
                ...state,
                playUrl: action.payLoad.playUrl
            }
        },
        changeSequenceList(state: any, action: { payLoad: { sequenceList: any } }) {
            console.log('changeSequenceList')
            return {
                ...state,
                sequenceList: action.payLoad.sequenceList
            }
        },
        changePlatform(state: any, action: { payLoad: { platform: any } }) {
            console.log('changePlatform')
            return {
                ...state,
                platform: action.payLoad.platform
            }
        },
        changePlayPlatform(state: any, action: { payLoad: { playPlatform: any } }) {
            console.log('changePlayPlatform')
            return {
                ...state,
                playPlatform: action.payLoad.playPlatform
            }
        },
        changeLovaSong(state: any, action: { payLoad: { loveSong: any } }) {
            console.log('changeLovaSong', action.payLoad.loveSong)
            return {
                ...state,
                loveSong: action.payLoad.loveSong
            }
        },
        changeLovaSongList(state: any, action: { payLoad: { loveSongList: any } }) {
            console.log('changeLovaSongList')
            return {
                ...state,
                loveSongList: action.payLoad.loveSongList
            }
        }
    }
}
