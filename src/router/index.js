import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserView from '../views/UserView.vue'
import TeamView from '../views/team/TeamView.vue'
import ChatView from '../views/chat/ChatView.vue'
import InfoView from  '../views/team/subroute/InfoView.vue'
import MemberListView from  '../views/team/subroute/MemberListView.vue'
import ProjectListView from  '../views/team/subroute/ProjectListView.vue'
import ProjectView from '../views/project/ProjectView.vue'
import DocEditingView from '../views/editing/DocEditingView.vue'
import DocListView from '../views/project/subroute/DocListView.vue'
import PageListView from '../views/project/subroute/PageListView.vue'
import MessageView from '../views/MessageView.vue'
import WebBuilder from '../views/editing/WebBuilder.vue'
import FirstView from '../views/FirstView.vue'
import DocumentView from '../components/DocumentWheels/DocumentView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/main',
      name: 'main',
      component: FirstView
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
      path: `/team/:teamId`,
      component: TeamView,
      children: [
        {
          path: 'info',
          component: InfoView
        },
        {
          path: 'chat',
          component: ChatView
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
      path: `/project/:projectId`,
      component: ProjectView,
      children: [
        {
          // path: 'doc/:docId',
          path: 'doc',
          // component: DocEditingView
          component: DocListView,
        },
        {
          // path: 'page/:pageId',
          path: 'page',
          component: PageListView
        }
      ]
    },
    {
      path: `/doc/:docId`,
      component: DocumentView
    },
    // {
    //   path: `/page/:protoId`,
    //   component: 
    // } 
  ]
})

export default router
