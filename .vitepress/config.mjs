import { defineConfig } from 'vitepress'
import topNav from './layout/toNav/viteToNav.mjs'
import sideBar from './layout/inde.mjs'
// https://vitepress.dev/reference/site-config

export default defineConfig({
  base: '/Studynotes/',
  head: [['link', { rel: 'icon', href: '/Studynotes/huohuo.png' }]],
  title: '狱轩',
  description: 'A VitePress Site',
  themeConfig: {
    outlineTitle: '目录',
    outline: [2, 6],
    logo: '/huohuo.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: topNav,
    // 左侧导航栏
    sidebar: sideBar,
    // sidebar: {
    //   '/.vitepress/notes': noteSideBar,
    //   '/.vitepress/interview': interviewSideBar
    // },
    socialLinks: [{ icon: 'github', link: 'https://github.com/Yuxuan-001' }],
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    // 页脚设置
    footer: {
      copyright: ' © 2024-present YuXuan'
    },
    // 设置搜索框的样式
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换'
            }
          }
        }
      }
    }
  }
})
