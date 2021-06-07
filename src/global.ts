import * as Sentry from '@sentry/browser'
import { Integrations } from '@sentry/tracing'
import { isProd } from '@/utils/env'

if (isProd()) {
    Sentry.init({
        dsn: 'https://86a43bbedd8148339a2f5552e6a684cb@o635537.ingest.sentry.io/5755819',
        integrations: [new Integrations.BrowserTracing()],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    })
}

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
