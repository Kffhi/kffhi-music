import React, { FC, useState, useEffect } from 'react'
import { connect } from 'dva'
import { getNetSingerInfo } from '../../services/netease'
import { getTencentSingerInfo } from '../../services/tencent'
import { getXiamiSingerInfo } from '../../services/xiami'
import Header from '../../components/Header'
import SongItem from '../../components/SongItem'
import Loading from '../../components/Loading'
import Information from '../../components/Information'
// import { format } from '../../utils/format'
import styles from './style.less'

interface Player {
    showMini: boolean;
    platform: any;
}

interface Props {
    history: any;
    match: any;
    player: Player;
}

const SingerInfo: FC<Props> = props => {
    const {
        history,
        player,
        match
    } = props
    const [singerInfo, setSingerInfo] = useState<any>({})
    const platform = player.platform
    const singerId = match.params.singerId
    const [modal, setModal] = useState(false)

    /** 初始化执行 */
    useEffect(() => {
        // 获取歌单详情
        switch (platform) {
            case 'MY_MUSIC':
                break
            case 'NETEASE':
                getNetData(singerId)
                break
            case 'TENCENT':
                getTencentData(singerId)
                break
            case 'XIAMI':
                getXiamiData()
                break
            default:
                return
        }
    }, [platform, singerId])

    const getNetData = (singerId: string) => {
        getNetSingerInfo(singerId).then((res: { artist: any; hotSongs: any }) => {
            const newSingerInfo = res.artist
            newSingerInfo.description = newSingerInfo.briefDesc
            newSingerInfo.url = newSingerInfo.picUrl
            newSingerInfo.songList = res.hotSongs
            newSingerInfo.songList.forEach((item: { title: any; name: any; singer: any; ar: { name: any }[]; description: any; al: { name: any; picUrl: any }; picUrl: any; time: number; dt: any }) => {
                item.title = item.name
                item.singer = item.ar[0].name
                item.description = item.al.name
                item.picUrl = item.al.picUrl
                item.time = Number.parseInt(String((item.dt) / 1000))
            })
            setSingerInfo(newSingerInfo)
        })
    }

    const getTencentData = (singerId: string) => {
        getTencentSingerInfo(singerId).then((res: { response: { singer: { data: any } } }) => {
            const newSingerInfo = { ...res.response.singer.data }
            newSingerInfo.description = newSingerInfo.singer_brief
            newSingerInfo.url = 'https://y.gtimg.cn/music/photo_new/T002R300x300M000' + newSingerInfo.songlist[0].album.mid + '.jpg'
            newSingerInfo.name = newSingerInfo.singer_info.name
            newSingerInfo.songList = newSingerInfo.songlist
            newSingerInfo.songList.forEach((item: { title: any; name: any; singerList: any; singer: { name: any }[]; description: any; album: { name: any; mid: string }; picUrl: string; time: any; interval: any }) => {
                item.title = item.name
                item.singerList = item.singer
                item.singer = item.singer[0].name
                item.description = item.album.name
                item.picUrl = 'https://y.gtimg.cn/music/photo_new/T002R300x300M000' + item.album.mid + '.jpg'
                item.time = item.interval
            })
            setSingerInfo(newSingerInfo)
        })
    }

    const getXiamiData = () => {
        getXiamiSingerInfo().then((res: { data: React.SetStateAction<{}> }) => {
            setSingerInfo(res.data)
        })
    }

    const renderDetail = () => {
        return (
            <div className={styles.detail}>
                <div className={styles.picBox}>
                    <img src={singerInfo.url} alt="" />
                </div>
                <div className={styles.containerWrapper}>
                    <div className={styles.container}>
                        <div className={styles.textWrapper}>
                            <div className={styles.picWrapper}>
                                <img src={singerInfo.url} alt="" />
                            </div>
                            <div className={styles.text}>
                                <div className={styles.singer}>{singerInfo.name}</div>
                                <div className={styles.description} onClick={() => { setModal(true) }}>
                                    <div className={styles.descriptionText}>{singerInfo.description}</div>
                                    <i className="iconfont icon-jump" />
                                </div>
                            </div>
                        </div>
                        <div className={styles.operation}>
                            <div className={styles.box}>
                                <i className="iconfont icon-pinglun" />
                                <div className={styles.boxText}>{singerInfo.commentNum || '评论'}</div>
                            </div>
                            <div className={styles.box}>
                                <i className="iconfont icon-fenxiang" />
                                <div className={styles.boxText}>{singerInfo.shareNum || '分享'}</div>
                            </div>
                            <div className={styles.box}>
                                <i className="iconfont icon-video-play" />
                                <div className={styles.boxText}>播放</div>
                            </div>
                            <div className={styles.box}>
                                <i className="iconfont icon-shoucang" />
                                <div className={styles.boxText}>收藏</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const renderSongList = () => {
        return (
            <div className={styles.songList}>
                {singerInfo.songList ?
                    singerInfo.songList.map((item: any, index: number) => (
                        <SongItem
                            tab={platform}
                            history={history}
                            songDetail={item}
                            playList={singerInfo.songList}
                            key={index}
                            num={index + 1} />
                    ))
                    : <Loading />}
            </div>
        )
    }

    return (
        <div className={styles.singerInfo}>
            <Information
                modal={modal}
                info={singerInfo}
                handleClose={() => { setModal(false) }}
            />
            <Header history={history} title={'歌手详情'}></Header>
            {renderDetail()}
            {renderSongList()}
        </div>
    )
}
export default connect()(SingerInfo)
