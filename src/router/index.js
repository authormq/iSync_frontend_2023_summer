import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import UserView from '../views/UserView.vue'
// import TeamView from '../views/team/TeamView.vue'
// import ChatListView from  '../views/team/subroute/ChatListView.vue'
// import InfoView from  '../views/team/subroute/InfoView.vue'
// import MemberListView from  '../views/team/subroute/MemberListView.vue'
// import ProjectListView from  '../views/team/subroute/ProjectListView.vue'
// import ProjectView from '../views/project/ProjectView.vue'
// import DocListView from '../views/project/subroute/DocListView.vue'
// import PageListView from '../views/project/subroute/PageListView.vue'
// import MessageView from '../views/MessageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    // },
    // {
    //   path: '/user',
    //   component: UserView
    // },
    // {
    //   path: 'message',
    //   component: MessageView
    // },
    // {
    //   path: '/team/all',
    //   component: TeamView
    // },
    // {
    //   path: `/team/${teamid}`,
    //   component: TeamView,
    //   children: [
    //     {
    //       path: 'info',
    //       component: InfoView
    //     },
    //     {
    //       path: 'chat',
    //       component: ChatListView
    //     },
    //     {
    //       path: 'member',
    //       component: MemberListView
    //     },
    //     {
    //       path: 'project',
    //       component: ProjectListView
    //     }
    //   ]
    // },
    // {
    //   path: `project/${projectid}`,
    //   component: ProjectView,
    //   children: [
    //     {
    //       path: 'doc',
    //       component: DocListView
    //     },
    //     {
    //       path: 'page',
    //       component: PageListView
    //     }
    //   ]
    }
  ]
})

export default router
