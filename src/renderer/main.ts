import { createApp } from "vue";

import "./style.css";
import App from "./App.vue";
import { router } from "./router";

// 检测并应用系统主题
function applySystemTheme() {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (isDark) {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
}

// 初始应用主题
applySystemTheme();

// 监听系统主题变化
window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", applySystemTheme);

if (import.meta.env.DEV) {
    import("eruda").then((eruda) => {
        eruda.default.init({
            tool: ["console", "elements", "network", "resources"],
            defaults: { displaySize: 50 },
        });
        console.log("[Dev] Eruda Ready.");

        window.getGreeting("开发者").then(console.log);
    });
}

createApp(App).use(router).mount("#app");
