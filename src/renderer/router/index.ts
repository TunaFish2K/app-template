import HomeView from "@/views/home/HomeView.vue";
import { createRouter, createMemoryHistory } from "vue-router";

const routes = [
    {
        path: "/",
        component: HomeView,
    },
];

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
});
