module.exports = [{
        text: '前端笔记',
        link: '/guide/'
    },
    {
        text: '后端笔记',
        link: '/back-end/'
    },
    {
        text: '学习', //栏目名
        items: [ //可以继续反复套用组成复杂的菜单
            { text: '算法', link: '/baodian/algorithm/' },
            { text: '杂七杂八', link: '/baodian/high/' },
        ]
    },
    {
        text: '工具箱',
        items: [{
                text: '在线编辑',
                items: [
                    { text: '图片压缩', link: 'https://tinypng.com/' }
                ]
            },
            {
                text: '在线服务',
                items: [
                    { text: '阿里云', link: 'https://www.aliyun.com/' },
                    { text: '腾讯云', link: 'https://cloud.tencent.com/' }
                ]
            },
            {
                text: '博客指南',
                items: [
                    { text: 'github', link: 'https://github.com/Shallrise' },
                    { text: 'CSDN', link: 'https://blog.csdn.net/weixin_50818816' }
                ]
            }
        ]
    }
]