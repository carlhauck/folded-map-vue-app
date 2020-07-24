import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Signup from '../views/Signup.vue';
import Login from '../views/Login.vue';
import Logout from '../views/Logout.vue';
import UsersShow from '../views/UsersShow.vue';
import UsersEdit from '../views/UsersEdit.vue';
import ConversationsIndex from '../views/ConversationsIndex.vue';
import ConversationsShow from '../views/ConversationsShow.vue';
import ProfileShow from '../views/ProfileShow.vue';
import CommunityShow from '../views/CommunityShow.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  },
  {
    path: '/users/:id',
    name: 'users-show',
    component: UsersShow
  },
  {
    path: '/users/:id/edit',
    name: 'users-edit',
    component: UsersEdit
  },
  {
    path: '/conversations',
    name: 'conversations-index',
    component: ConversationsIndex
  },
  {
    path: '/conversations/:id',
    name: 'conversations-show',
    component: ConversationsShow
  },
  {
    path: '/profile',
    name: 'profile-show',
    component: ProfileShow
  },
  {
    path: '/community',
    name: 'community-show',
    component: CommunityShow
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
