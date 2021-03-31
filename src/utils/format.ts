/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const format = (interval: number) => {
    interval = interval | 0
    const minute = (interval / 60) | 0
    const second = _pad(interval % 60)
    return `${minute}:${second}`
}

export const _pad = (num: string | number, n = 2) => {
    let len = num.toString().length
    while (len < n) {
        num = '0' + num
        len++
    }
    return num
}

export const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const shuffle = (arr: string | any) => {
    for (let i = 0; i < arr.length; i++) {
        const j = getRandomInt(0, i)
        const t = arr[i]
        arr[i] = arr[j]
        arr[j] = t
    }
    return arr
}

/**
 * 根据 pageBean 判断是否存在下一页
 * @param {Object} pageBean 分页结构
 */
export const hasNextPage = (pageBean: { pageNo: any; pageSize: any; totalCount: any }) => {
    const { pageNo, pageSize, totalCount } = pageBean

    return pageNo < Math.floor(totalCount / pageSize) + (totalCount % pageSize === 0 ? 0 : 1)
}
