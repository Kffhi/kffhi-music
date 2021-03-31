import React, { useState, FC } from 'react'
import { Button } from 'antd-mobile'
import Accordion from '../../components/Accordion'
import classNames from 'classnames'

import styles from './style.less'

const pageIndex: FC = () => {
    const [text, setText] = useState('初555')

    const clickText = () => {
        setText('得得得')
    }

    return (
        <div className={classNames(styles.title)} onClick={clickText}>
            测试
            <Accordion title={'创建的歌单'}></Accordion>
            <Button>{text}</Button>
        </div>
    )
}

export default pageIndex
