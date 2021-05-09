import { defineConfig } from 'umi'

export default defineConfig({
    nodeModulesTransform: {
        type: 'none'
    },
    routes: [
        {
            exact: false, path: '/', component: '@/layouts/index',
            routes: [
                { exact: true, path: '/', component: '@/pages/home/index' },
                { exact: true, path: '/home', component: '@/pages/home/index' },
                { exact: true, path: '/songlistall/:tab', component: '@/pages/songListAll/index' },
                { exact: true, path: '/songlistinfo/:tab/:id', component: '@/pages/songListInfo/index' },
                { exact: true, path: '/search/:tab', component: '@/pages/search/index' },
                { exact: true, path: '/singerinfo/:platform/:singerId', component: '@/pages/singerInfo/index' },
                { exact: true, path: '/userinfo', component: '@/pages/userInfo/index' },
            ],
        }
    ],
    fastRefresh: {},
    base: '/kffhi-music',
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
    }
})
