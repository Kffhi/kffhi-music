import React, { FC, useState, useEffect, Fragment } from 'react'
import { connect } from 'dva'
import { getNetSongListCategory, getNetSongList } from '../../services/netease'
import { getTencentSongListCategory, getTencentCartSongList } from '../../services/tencent'
import { getXiamiSongListCategory, getXiamiSongList } from '../../services/xiami'
import { Tabs } from 'antd-mobile'
import PlayerHome from '../../layouts/index'
import Header from '../../components/Header'
import SongList from '../../components/SongList'
import Loading from '../../components/Loading'
import { Models } from 'rmc-tabs'
import styles from './style.less'

interface Props {
    history: any;
    match: any;
}

const SongListAll: FC<Props> = props => {
    const {
        history,
        match
    } = props
    const tabSub = match.params.tab
    const [tabs, setTabs] = useState<any>([])
    const [songList, setSongList] = useState<any>([])

    /** 初始化执行 */
    useEffect(() => {
        switch (tabSub) {
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
                return
        }
    }, [tabSub])

    // 获取网易云数据
    const getNetData = () => {
        getNetSongList().then((res: any) => {
            const newSongList = [...res.playlists]
            newSongList.forEach(item => {
                item.pic = item.coverImgUrl
                item.title = item.name
            })
            setSongList(newSongList)
        })
        getNetSongListCategory().then((res: { tags: any }) => {
            let newCategory = [...res.tags]
            newCategory.forEach(item => {
                item.title = item.playlistTag.name
            })
            newCategory = [{ 'title': '全部' }].concat(newCategory)
            setTabs(newCategory)
        })
    }

    // 获取QQ音乐数据
    const getTencentData = () => {
        getTencentSongListCategory().then((res: { response: { data: { categories: any } } }) => {
            let newCategory = [...res.response.data.categories]
            const all = newCategory[0].items
            newCategory = all.concat(newCategory[2].items)
            newCategory.forEach(item => {
                item.id = item.categoryId
                item.title = item.categoryName
            })
            setTabs(newCategory)
        })
        const categoryId = '10000000'
        getTencentCartSongList(categoryId).then((res: { response: { data: { list: any } } }) => {
            const newSongList = [...res.response.data.list]
            newSongList.forEach(item => {
                item.id = item.dissid
                item.pic = item.imgurl
                item.title = item.dissname
            })
            setSongList(newSongList)
        })
    }

    // 获取虾米音乐数据
    const getXiamiData = () => {
        getXiamiSongList().then((res: { data: any }) => {
            setSongList(res.data)
        })
        getXiamiSongListCategory().then((res: { data: React.SetStateAction<never[]> }) => {
            setTabs(res.data)
        })
    }

    const changeData = (tab: Models.TabData) => {
        switch (tabSub) {
            case 'NETEASE': {
                const cat = tab.name
                getNetSongList(cat).then((res: { playlists: any }) => {
                    const newSongList = [...res.playlists]
                    newSongList.forEach(item => {
                        item.pic = item.coverImgUrl
                        item.title = item.name
                    })
                    setSongList(newSongList)
                })
                break
            }
            case 'TENCENT': {
                const categoryId = tab.id
                getTencentCartSongList(categoryId).then((res: { response: { data: { list: any } } }) => {
                    const newSongList = [...res.response.data.list]
                    newSongList.forEach(item => {
                        item.id = item.dissid
                        item.pic = item.imgurl
                        item.title = item.dissname
                    })
                    setSongList(newSongList)
                })
                break
            }
            case 'XIAMI':
                break
            default:
                return null
        }
    }

    const renderSongList = () => {
        return (
            <div className={styles.songList}>
                {JSON.stringify(songList) !== '[]' ? <SongList tab={tabSub} songList={songList} history={history} /> : <Loading />}
            </div>
        )
    }

    return (
        <PlayerHome>
            <div className={styles.songListAll}>
                <Header title={'歌单广场'} tab={tabSub} history={history} />
                <div className={styles.tabs}>
                    <Tabs
                        tabs={tabs}
                        initialPage={0}
                        onTabClick={tab => { changeData(tab) }}
                    >
                        {
                            tabs.map((index: number) => (
                                <Fragment key={index}>
                                    {renderSongList()}
                                </Fragment>
                            ))}
                    </Tabs>
                </div>
            </div>
        </PlayerHome>
    )
}
export default connect()(SongListAll)