import React, { Fragment, FC } from 'react'
import { connect } from 'dva'
import classNames from 'classnames'
import styles from './style.less'
import { Toast } from 'antd-mobile'

interface Props {
    history: any;
    title: string;
    tab: string;
    dispatch: any;
    render?: Function
}

const Header: FC<Props> = props => {

    const { history, title, tab = 'NETEASE', dispatch } = props

    const goBack = () => {
        fetch('https://www.kffhi.com/public/data/data.json')
            .then(response => response.json())
            .then(data => {
                console.log('报错', data.info)
                data.info.concat([])
                Toast.info(data.info)
            })
        history.push('/')
        dispatch({
            type: 'player/changePlatform',
            payLoad: {
                platform: 'NETEASE'
            }
        })
    }

    return (
        <Fragment>
            <div className={classNames(styles.header)}>
                <div className={classNames(styles.goBack)} onClick={() => { history.goBack(-1) }}>
                    <i className={classNames('iconfont icon-app_back')} />
                </div>
                <div className={classNames(styles.title)} onClick={() => { goBack() }}>{title}</div>
                <div className={classNames(styles.search)} onClick={() => { history.push(`/search/${tab}`) }}>
                    <i className={classNames('iconfont icon-search')} style={{ 'fontSize': '2.2rem' }} />
                </div>
            </div>
            <div style={{ 'width': '100%', 'height': '4.8rem' }}></div>
        </Fragment>
    )
}
export default connect()(Header)
