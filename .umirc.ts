import { defineConfig } from 'umi'

export default defineConfig({
    nodeModulesTransform: {
        type: 'none'
    },
    routes: [
        { path: '/', component: '@/pages/home/index' },
        { path: '/page', component: '@/pages/page/index' }
    ],
    fastRefresh: {},
    extraBabelPlugins: [
        ['import', { libraryName: 'antd-mobile', style: true }] //按需加载 antd-mobile 样式文件
    ]
})
