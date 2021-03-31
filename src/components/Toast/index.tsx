/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react'
import { Toast } from 'antd-mobile'
import classNames from 'classnames'
import styles from './style.less'

export default {
    error(content = '网络错误') {
        Toast.info((
            <div className={styles.toastWrap}>
                <span>{content}</span>
            </div>
        ), 2, undefined, false)
    },
    success(content = '操作成功', duration = 2, callback = undefined) {
        Toast.info((
            <div className={styles.toastWrap}>
                <i className={classNames(styles.successIcon, 'iconfont icon-right_big')} />
                <span>{content}</span>
            </div>
        ), duration, callback, false)
    },
    info(content = '提示信息', duration = 2, callback = undefined) {
        Toast.info((
            <div className={styles.toastWrap}>
                <span>{content}</span>
            </div>
        ), duration, callback, false)
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    loading({ content = '', duration = 0, onClose = () => {}, mask = false }) {
        Toast.loading(content, duration, onClose, mask)
    },
    hide() {
        Toast.hide()
    }
}
