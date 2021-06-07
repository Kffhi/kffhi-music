/**
 * 是否为生产环境
 */
export const isProd = (): Boolean => {
    console.log('环境参数', process.env)
    if (process.env.NODE_ENV === 'production') {
        return true
    }
    return false
}


/**
 * 判断那一条生产环境
 */
export const getProd = (): String => {
    if (/kffhi-music/i.test(window.location.href)) {
        return 'MASTER'
    }
    if (/music-test1/i.test(window.location.href)) {
        return 'TEST1'
    }
    if (/music-test2/i.test(window.location.href)) {
        return 'TEST2'
    }
    return ''
}
