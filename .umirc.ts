import { defineConfig } from 'umi'
const SentryWebpackPlugin = require("@sentry/webpack-plugin");

export default defineConfig({
    nodeModulesTransform: {
        type: 'none'
    },
    routes: [
        {
            exact: false,
            path: '/',
            component: '@/layouts/index',
            routes: [
                { exact: true, path: '/', component: '@/pages/home/index' },
                { exact: true, path: '/home', component: '@/pages/home/index' },
                { exact: true, path: '/songlistall/:tab', component: '@/pages/songListAll/index' },
                { exact: true, path: '/songlistinfo/:tab/:id', component: '@/pages/songListInfo/index' },
                { exact: true, path: '/search/:tab', component: '@/pages/search/index' },
                { exact: true, path: '/singerinfo/:platform/:singerId', component: '@/pages/singerInfo/index' },
                { exact: true, path: '/userinfo', component: '@/pages/userInfo/index' }
            ]
        }
    ],
    fastRefresh: {},
    base: '/kffhi-music',
    title: 'Kffhi-Music',
    publicPath: process.env.NODE_ENV === 'production' ? '/kffhi-music/' : '/',
    extraBabelPlugins: [
        ['import', { libraryName: 'antd-mobile', style: true }] //按需加载 antd-mobile 样式文件
    ],
    proxy: {
        '/api': {
            target: 'https://www.kffhi.com/api/',
            changeOrigin: true,
            pathRewrite: { '^/api': '' }
        }
    },
    chainWebpack(config, { webpack }) {
        if (process.env.NODE_ENV === 'production') {
            config.plugin('sentry').use(SentryWebpackPlugin, [
                {
                    include: './dist',
                    release: 'test@0.0.1',
                    ignore: ['node_modules'],
                    urlPrefix: '~/static',
                    org: 'kffhi-f2e',
                    project: 'kffhi-music',
                    authToken: 'e0efbcd393f44e4e8a7a53db36e8e6c5d1166bfd0cbd48309e5105dbd0228fa4'
                }
            ])
        }
    }
})
