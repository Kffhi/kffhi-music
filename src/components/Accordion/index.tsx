import React, { useState, FC } from 'react'
import { Toast } from 'antd-mobile'
import classNames from 'classnames'
import styles from './style.less'

interface Props {
    title: string;
    render: Function
}

const Accordion: FC<Props> = props => {

    const {
        title = '',
        render
    } = props

    const [showAll, setShowAll] = useState(true)

    return (
        <div className={classNames(styles.accordion)}>
            <div className={classNames(styles.accordionTitle)} onClick={() => { setShowAll(!showAll) }}>
                {showAll ?
                    <i className={classNames('iconfont icon-arrow-down')} /> :
                    <i className={classNames('iconfont icon-jump')} />
                }
                <div className={classNames(styles.text)}>{title}</div>
                <i
                    className={classNames('iconfont icon-add_bold')}
                    style={{ 'fontSize': '2rem', 'position': 'absolute', 'right': '0.2rem' }}
                    onClick={((e) => { e.stopPropagation(); Toast.info('暂不支持新建歌单哦~') })}
                />
            </div>
            {(showAll && render) ? render() : null}
        </div>
    )
}

export default Accordion