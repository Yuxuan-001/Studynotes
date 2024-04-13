/*左侧导航栏
笔记侧边栏
面试侧边栏
*/
import designPatterns from '../../notes/designPatterns/designPatterns.mjs'
export const noteSideBar = [
  {
    text: '学习',
    items: [
      { text: 'webpack', link: '/.vitepress/notes/webpack' },
      {
        text: '设计模式',
        collapsed: true,
        items: designPatterns
      }
    ]
  }
]
export const interviewSideBar = [
  {
    text: '面试题',
    items: [
      {
        text: 'HTML',
        link: '/.vitepress/interview/html.md'
      },
      {
        text: 'CSS',
        link: '/.vitepress/interview/css.md'
      },
      {
        text: 'JS',
        link: '/.vitepress/interview/js.md'
      },
      {
        text: 'Vue',
        link: '/.vitepress/interview/vue.md'
      }
    ]
  }
]
