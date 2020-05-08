module.exports = {
    title: 'dog-vuejs',
    description: 'record tips of dog-vuejs',
    base: '/dog-vuejs-site',
    themeConfig: {
        nav: [
            { text: '指南', link: '/appreciate/' },
            { text: '进阶', link: '/artisan/' },
            { text: '在线预览', link: 'https://github.com/strayjoke/dog-vuejs' },
            { text: 'Github', link: 'https://github.com/strayjoke/dog-vuejs' },
        ],
        sidebar: [
            {
                title: '项目',   // 必要的
                path: '/appreciate/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 1,    // 可选的, 默认值是 1
                children: [
                    { title: '指南', path: '/appreciate/' },
                ]
            },
            {
                title: '进阶',   // 必要的
                path: '/artisan/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 1,    // 可选的, 默认值是 1
                children: [
                    { title: '响应式原理', path: '/artisan/' },
                    { title: '状态', path: '/artisan/vuex' },
                    { title: '路由', path: '/artisan/router' },
                    { title: '插件', path: '/artisan/plugin' },
                    { title: '自定义指令', path: '/artisan/directive' },
                    { title: '混入', path: '/artisan/mixin' },
                    { title: '过滤器', path: '/artisan/filter' },
                    { title: '图标', path: '/artisan/icon' },
                    { title: 'webpack 相关', path: '/artisan/webpack' },
                ]
            },
            {
                title: '其他',   // 必要的
                path: '/other/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
                collapsable: false, // 可选的, 默认值是 true,
                sidebarDepth: 1,    // 可选的, 默认值是 1
                children: [
                    { title: '其他项目', path: '/other/' }
                ]
            }
        ]

    }
}