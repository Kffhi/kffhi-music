import React, { FC } from 'react'
import styles from './style.less'
import { getLoveSong } from '../../utils/cache'
import Toast from '../../components/Toast'

interface ListItem {
    id: string;
    url: string;
    title: string;
    trackCount: string;
    author: string
}

interface Props {
    listItem: ListItem;
    history: any
}

const SongListItem: FC<Props> = props => {

    const {
        listItem,
        history
    } = props

    const constLoveSongCount = getLoveSong()
    const ID = listItem.id ? listItem.id : '000000'

    return (
        <div className={styles.songListItem} onClick={() => { history.push(`/songlistinfo/NETEASE/${ID}`) }}>
            <div className={styles.imgWrapper}>
                <img src={listItem.url} alt="" />
            </div>
            <div className={styles.textWrapper}>
                <div className={styles.text}>
                    <div className={styles.title}>{listItem.title}</div>
                    <div className={styles.info}>
                        <span className={styles.num}>{listItem.trackCount ? listItem.trackCount : constLoveSongCount.length}首</span>
                        {listItem.author !== '' ? <span className={styles.author}>by <span>{listItem.author}</span></span> : null}</div>
                </div>
                <i onClick={e => { e.stopPropagation(); Toast.info('详细操作静待秃头开发的努力吧~') }} className="iconfont icon-more" />
            </div>
        </div>
    )
}
export default SongListItem