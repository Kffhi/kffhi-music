// resize html root font size for rem
function resizeREM(doc: any, win: any) {
    const docEl = doc.documentElement
    const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
    const recalc = function () {
        const { clientWidth } = docEl
        if (!clientWidth) return
        if (clientWidth < 320 || clientWidth >= 768) {
            docEl.style.fontSize = '10px'
        } else {
            docEl.style.fontSize = `${10 * (clientWidth / 375)}px`
        }
    }

    if (!doc.addEventListener) return
    win.addEventListener(resizeEvt, recalc, false)
    doc.addEventListener('DOMContentLoaded', recalc, false)
}

resizeREM(document, window)
