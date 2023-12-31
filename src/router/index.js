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
import GrapesjsView from '../components/PrototypeWheels/GrapesjsView.vue'
import TeamInviteConfirm from '../views/TeamInviteConfirm.vue'
import PagePreview from '../components/PrototypeWheels/PagePreview.vue'

import store from '../store'

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
          path: 'doc',
          component: DocListView,
        },
        {
          path: 'page',
          component: PageListView
        },
      ]
    },
    {
      path: `/projects/:projectId/page/:protoId`,
      component: GrapesjsView
    },
    {
      path: `/doc/:docId`,
      component: DocumentView
    },
    {
      path: '/team/:teamId/invite/confirm',
      component: TeamInviteConfirm
    },
    {
      path: `/preview/projects/:projectId/page/:protoId`,
      component: PagePreview
    },
  ]
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.state.isLoggedIn
  if (!isLoggedIn && to.path !== '/') {
    console.log('not log', isLoggedIn)
    next('/')
  } else {
    next()
  }
})

export default router
