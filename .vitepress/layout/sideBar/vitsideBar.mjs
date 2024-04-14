/**
 * 左侧导航栏
 * 点击显示对应侧边栏
    笔记侧边栏
    面试侧边栏
**/
import designPatterns from '../../../srca/notes/designPatterns/designPatterns.mjs'
export const noteSideBar = [
  {
    text: '学习',
    items: [
      { text: 'webpack', link: '/srca/notes/webpack' },
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
        link: '/srca/interview/html.md'
      },
      {
        text: 'CSS',
        link: '/srca/interview/css.md'
      },
      {
        text: 'JS',
        link: '/srca/interview/js.md'
      },
      {
        text: 'Vue',
        link: '/srca/interview/vue.md'
      }
    ]
  }
]
