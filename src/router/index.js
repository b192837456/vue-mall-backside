import { createRouter, createWebHistory } from "vue-router";

const router = new createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/views/HomePage.vue"),
    },
    {
      path: "/login",
      component: () => import("@/views/LoginPage.vue"),
    },
    {
      path: "/members",
      component: () => import("@/views/Members.vue"),
    },
    {
      path: "/products",
      component: () => import("@/views/ProductsMenu.vue"),
    },
    {
      path: "/products/phone",
      component: () => import("@/views/ProductsPhone.vue"),
    },
    {
      path: "/products/mac",
      component: () => import("@/views/ProductsMac.vue"),
    },
    {
      path: "/products/pad",
      component: () => import("@/views/ProductsPad.vue"),
    },
    {
      path: "/products/Spec/",
      name: "Spec",
      component: () => import("@/views/ProductsSpec.vue"),
      
    },
    {
      path: "/statistics",
      component: () => import("@/views/DataStatistics.vue"),
    },
    {
      path: "/orders",
      component: () => import("@/views/MemberOrders.vue"),
    },
    {
      path: "/orders/detail",
      name: "detail",
      component: () => import("@/views/OrdersDetail.vue"),
    },

    {
      path: "/orders/print",
      name: "print",
      component: () => import("@/views/OrdersPrint.vue"),
    },


    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/NotFound.vue"),
    },
    {
      path: "/products/uploadPhotos",
      component: () => import("@/views/UploadPhotos.vue"),
    },
    {
      path: "/products/ShowPhoto",
      component: () => import("@/views/ShowPhoto.vue"),
    },

  
    {
      path: "/test",
      component: () => import("@/views/Test.vue"),
    },
    {
      path:"/feedback",
      component: () => import("@/views/Feedback.vue"),
    },

    

  ],
});

export default router;
