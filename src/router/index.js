import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserView from '../views/UserView.vue'
import TeamView from '../views/team/TeamView.vue'
import ChatView from '../views/chat/ChatView.vue'
import InfoView from  '../views/team/subroute/InfoView.vue'
import MemberListView from  '../views/team/subroute/MemberListView.vue'
import ProjectListView from  '../views/team/subroute/ProjectListView.vue'
import ProjectView from '../views/project/ProjectView.vue'
import DocListView from '../views/project/subroute/DocListView.vue'
import PageListView from '../views/project/subroute/PageListView.vue'
import MessageView from '../views/MessageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/user',
      component: UserView
    },
    {
      path: '/message',
      component: MessageView,
    },
    {
      path: '/team/all',
      component: TeamView
    },
    {
      path: `/team/1`,
      component: TeamView,
      children: [
        {
          path: 'info',
          component: InfoView
        },
        {
          path: 'chat',
          component: ChatView,
          children: [
            // 这里chat应该分为群聊和私聊两种情况
            {
              path: 'group',
            },
            {
              path: 'personal'
            }
          ]
        },
        {
          path: 'member',
          component: MemberListView
        },
        {
          path: 'project',
          component: ProjectListView
        }
      ]
    },
    {
      path: `/project/1`,
      component: ProjectView,
      children: [
        {
          path: 'doc',
          component: DocListView
        },
        {
          path: 'page',
          component: PageListView
        }
      ]
    }
  ]
})

export default router
