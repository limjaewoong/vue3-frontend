import Home from "@/pages/Home.vue";
import Login from "@/pages/Login.vue";
import {createRouter, createWebHistory} from "vue-router";
import Cart from "@/pages/Cart.vue";
import Order from "@/pages/Order.vue";
import Orders from "@/pages/Orders.vue";

const routes = [
    {path: '/', name : 'home', component: Home}
    ,{path: '/login', name: 'login',component: Login}
    ,{path: '/cart', name: 'cart',component: Cart}
    ,{path: '/order', name: 'order',component: Order}
    ,{path: '/orders', name: 'orders',component: Orders}
]

const router = createRouter({
    history: createWebHistory(),routes
})

export default router;
