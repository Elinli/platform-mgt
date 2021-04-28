import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../views/Login.vue';
import BasicLayout from "@layouts/BasicLayout"
const routes = [
  {
    path: '/',
    redirect: '/login',
    component:BasicLayout,
    meta: {
      title: '登陆',
    },
    children: [
      {
        path: '/login',
        name: 'Login',
        component: Login,
      },
      {
        path: '/home',
        name: 'DashBoard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/DashBoard.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
