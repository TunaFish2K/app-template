import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import VueDevTools from "vite-plugin-vue-devtools";
import tailwindcss from "@tailwindcss/vite";

const PROJECT_PATH = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
    root: resolve(PROJECT_PATH, "src", "renderer"),
    base: "./",
    publicDir: resolve(PROJECT_PATH, "public"),
    build: {
        outDir: resolve(PROJECT_PATH, "dist", "renderer"),
        rollupOptions: {
            input: resolve(PROJECT_PATH, "src", "renderer", "index.html"),
        },
        emptyOutDir: true,
    },
    plugins: [vue(), VueDevTools(), tailwindcss()],
    resolve: {
        alias: {
            "@": resolve(PROJECT_PATH, "src", "renderer"),
        },
    },
    server: {
        watch: {
            // 只监听 src/renderer 目录
            ignored: [
                "!**/src/renderer/**",
                "**/src/main/**",
                "**/node_modules/**",
                "**/dist/**",
                "**/.git/**",
            ],
        },
    },
});
