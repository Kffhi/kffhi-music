import React, { FC } from 'react'
import styles from './style.less'

interface Props {
    songList: any;
    history: any;
    showAll: boolean;
    tab: string
}

const SongList: FC<Props> = props => {
    const {
        songList,
        history,
        showAll = true,
        tab
    } = props

    return (
        <div className={styles.songList}>
            {songList.length > 0 && !showAll ? songList.slice(0, 6).map((item: any, index: number) => (
                <div className={styles.songListBox} key={index} onClick={() => { history.push(`/songlistinfo/${tab}/${item.id}`) }}>
                    <div className={styles.pic}>
                        <img src={item.pic} alt="" />
                    </div>
                    <div className={styles.title}>{item.title}</div>
                </div>
            )) :
                songList.map((item: any, index: number) => (
                    <div className={styles.songListBox} key={index} onClick={() => { history.push(`/songlistinfo/${tab}/${item.id}`) }}>
                        <div className={styles.pic}>
                            <img src={item.pic} alt="" />
                        </div>
                        <div className={styles.title}>{item.title}</div>
                    </div>
                ))
            }
        </div>
    )
}

export default SongList