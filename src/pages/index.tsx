import React, { useState, FC } from 'react'

import styles from './index.less'

const pageIndex: FC = () => {
    const [text, setText] = useState('初始化')

    const clickText = () => {
        setText('得得得')
    }

    return (
        <div className={styles.title} onClick={clickText}>
            {text}
        </div>
    )
}

export default pageIndex
