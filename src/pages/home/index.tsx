import React, { FC, useState, useEffect, Fragment } from 'react'
import { connect } from 'dva'
import { getLoveSongList } from '../../utils/cache'
import { getNetBanner, getNetSongList } from '../../services/netease'
import { getTencentBanner, getTencentSongList } from '../../services/tencent'
import { getXiamiBanner, getXiamiSongList } from '../../services/xiami'
import { Tabs, Carousel } from 'antd-mobile'
import PlayerHome from '../../layouts/index'
import Accordion from '../../components/Accordion'
import SongList from '../../components/SongList'
import SongListItem from '../../components/SongListItem'
import Loading from '../../components/Loading'
import styles from './style.less'
interface Player {
    platform: any;
    playPlatform: string;
}
interface Props {
    history: any;
    dispatch: any;
    player: Player;
}

const Home: FC<Props> = props => {
    const { history, player, dispatch } = props
    const [banner, setBanner] = useState<any>([])
    const [songList, setSongList] = useState<any>([])
    const [tab, setTab] = useState('NETEASE')
    const tabs = [
        { title: '我的', sub: 'MY_MUSIC' },
        { title: '网易云音乐', sub: 'NETEASE' },
        { title: 'QQ音乐', sub: 'TENCENT' },
        { title: '虾米音乐', sub: 'XIAMI' },
    ]
    const mySongList = [
        {
            'title': '我喜欢的音乐',
            'url': 'https://kffhi.com/public/images/end/myLoveSongList.png',
            'num': 23,
            'author': ''
        }
    ]

    const myCollList = getLoveSongList()

    /** 初始化执行 */
    useEffect(() => {
        // 默认tab为网易音乐
        getNetData()
    }, [])

    // 获取网易云数据
    const getNetData = () => {
        getNetBanner().then((res: any) => {
            setBanner(res.banners)
        })
        getNetSongList().then((res: any) => {
            const newSongList = [...res.playlists]
            newSongList.forEach(item => {
                item.pic = item.coverImgUrl
                item.title = item.name
            })
            setSongList(newSongList)
        })
    }

    // 获取QQ音乐数据
    const getTencentData = () => {
        getTencentBanner().then((res: any) => {
            const newBanner = [...res.response.data.banner]
            newBanner.forEach(item => {
                item.url = item.jumpurl
                item.pic = item.picurl
            })
            setBanner(newBanner)
        })
        getTencentSongList().then((res: any) => {
            const newSongList = [...res.response.recomPlaylist.data.v_hot]
            newSongList.forEach(item => {
                item.pic = item.cover
                item.id = item.content_id
            })
            setSongList(newSongList)
        })
    }

    // 获取虾米音乐数据
    const getXiamiData = () => {
        getXiamiBanner().then((res: any) => { setBanner(res.banners) })
        getXiamiSongList().then((res: any) => { setSongList(res.data) })
    }

    const changeData = (tab: any) => {
        setTab(tab.sub)
        dispatch({
            type: 'player/changePlatform',
            payLoad: {
                platform: tab.sub
            }
        })
        if (player.playPlatform === '') {
            dispatch({
                type: 'player/changePlayPlatform',
                payLoad: {
                    playPlatform: tab.sub
                }
            })
        }
        switch (tab.sub) {
            case 'MY_MUSIC':
                console.log('来到了我的音乐', tab.sub)
                break
            case 'NETEASE':
                getNetData()
                break
            case 'TENCENT':
                getTencentData()
                break
            case 'XIAMI':
                getXiamiData()
                break
            default:
                return null
        }
    }

    const renderSongList = () => {
        return (
            <div className={styles.songListWrapper}>
                <div className={styles.header}>
                    <span className={styles.text}>推荐歌单</span>
                    <span className={styles.more} onClick={() => { history.push(`/songlistall/${tab}`) }}>
                        歌单广场
            <i className="iconfont icon-jump" style={{ 'fontSize': '1.3rem', 'marginLeft': '0.2rem' }} />
                    </span>
                </div>
                {JSON.stringify(songList) !== '[]' ? <SongList tab={tab} songList={songList} history={history} showAll={false}></SongList> : <Loading />}
            </div>
        )
    }

    const renderMyMusic = () => {
        return (
            <div className={styles.myMusic}>
                <Accordion title={'创建的歌单'} render={() => {
                    return (
                        <Fragment>
                            {mySongList && mySongList.map((item, index) => (<SongListItem listItem={item} history={history} key={index} />))}
                        </Fragment>
                    )
                }}>
                </Accordion>
                <Accordion title={'收藏的歌单'} render={() => {
                    return (
                        <Fragment>
                            {myCollList && myCollList.map((item: any, index: number) => (<SongListItem listItem={item} history={history} key={index} />))}
                        </Fragment>
                    )
                }}>
                </Accordion>
            </div>
        )
    }

    const renderTabsContent = () => {
        return (
            <div className={styles.mainWrapper}>
                <div className={styles.bannerWrapper}>
                    <Carousel
                        autoplay={true}
                        infinite
                    >
                        {banner.map((item: any, index: number) => (
                            <a
                                key={index}
                                href={item.url}
                            >
                                <img
                                    onLoad={() => { window.dispatchEvent(new Event('resize')) }}
                                    src={item.pic}
                                    alt=""
                                />
                            </a>
                        ))}
                    </Carousel>
                </div>
                {renderSongList()}
            </div>
        )
    }

    const renderContainer = () => {

        return (
            <div className={styles.container}>
                <Tabs tabs={tabs}
                    initialPage={1}
                    swipeable={false}
                    onTabClick={tab => { changeData(tab) }}
                >
                    {renderMyMusic()}
                    {renderTabsContent()}
                    {renderTabsContent()}
                    {renderTabsContent()}
                </Tabs>
            </div>
        )
    }

    const renderHeader = () => {
        return (
            <div className={styles.header}>
                <div className={styles.userPic} onClick={() => { history.push('userinfo') }}>
                    <div className={styles.imgWrapper}>
                        <img src="https://kffhi.com/public/images/end/logo.jpg" alt="" />
                    </div>
                </div>
                <div className={styles.name}>
                    <img src="https://kffhi.com/public/images/end/name.png" alt="" />
                </div>
                <div className={styles.search} onClick={() => { history.push(`/search/${tab}`) }}>
                    <i className="iconfont icon-search" />
                </div>
            </div>
        )
    }

    return (
        <PlayerHome>
            <div className={styles.rootContainer}>
                {renderHeader()}
                {renderContainer()}
            </div>
        </PlayerHome>
    )
}

export default connect(({ player }: any) => ({
    player
}))(Home)
