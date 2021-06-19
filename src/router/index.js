import Vue from "vue";
import VueRouter from "vue-router";
import Store from "@/store/index";
import VSmode from "@/views/VSmode.vue";
import Battle from "@/views/Battle.vue";
import Character from "@/views/Character.vue";
import TopMenu from "@/views/TopMenu.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "TopMenu",
    component: TopMenu
  },
  {
    path: "/vsmode",
    name: "VSmode",
    component: VSmode,
    beforeEnter: (to, from, next) => {
      // beforeEnter：コンポーネント単位でルーティング時に任意の処理を突っ込む
      // beforeEach：全てのコンポーネントでルーティング時に任意の処理を突っ込む
      Store.dispatch("hero/initialize");
      next(); // next が必要（マスト）
    }
  },
  {
    path: "/battle",
    name: "Battle",
    component: Battle
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  // {
  //   path: "/character/",
  //   component: CharacterList
  // },
  {
    path: "/character/:id",
    name: "Character",
    component: Character
  }
];

const router = new VueRouter({
  routes
});

export default router;
