import React, { FC } from 'react'
import classNames from 'classnames'
import styles from './style.less'

const Loading: FC = () => {

    return (
        <div className={classNames(styles.loadingWrapper)}>
            <img src="https://www.kffhi.com/public/images/loading.gif" alt="" />
            <div>哎呀，数据去哪了 ┗|｀O′|┛</div>
        </div>
    )
}
export default Loading