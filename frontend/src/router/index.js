import Vue from "vue";
import VueRouter from "vue-router";
import LoginView from "@/views/LoginView";
import HomeView from "@/views/HomeView";
import ConsoleView from "@/views/console/ConsoleView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "登录",
    component: LoginView,
  },
  {
    path: "/",
    name: "主页",
    meta: {
      requireAuth: true,
    },
    component: HomeView,
    redirect: "hello",
    children: [
      {
        path: "hello",
        name: "你好",
        component: () => import("@/views/hello/HelloView.vue"),
        redirect: "hello/world",
        children: [
          {
            path: "world",
            name: "HelloWorld",
            component: () => import("@/views/hello/HelloWorld.vue"),
          },
        ],
      },
      {
        path: "console",
        name: "后台管理",
        component: ConsoleView,
        redirect: "console/user",
        children: [
          {
            path: "user",
            name: "用户管理",
            component: () => import("@/views/console/UserView.vue"),
          },
        ],
      },
    ]
  },
];

const router = new VueRouter({
  routes,
});

var requireLogin = 0;  // 是否需要登录
if (requireLogin === 1) {
  router.beforeEach((to, from, next) => {
    if (to.matched.some(auth => auth.meta.requireAuth)) {
      let token = localStorage.getItem("token");
      if (token) {
        next();
      } else {
        next({
          path: "/login",
        });
      }
    } else {
      next();
    }
  });
}

export default router;
