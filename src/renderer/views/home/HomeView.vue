<script setup lang="ts">
import { ref } from 'vue';
import { Rocket, Zap, Code, Package, BookOpen, MessageSquare } from 'lucide-vue-next';

const count = ref(0)

// IPC 通讯相关
const userName = ref('用户');
const greetingMessage = ref('');
const isLoading = ref(false);

const techStack = [
  { name: 'Vue 3', description: '渐进式 JavaScript 框架' },
  { name: 'TypeScript', description: '类型安全的开发体验' },
  { name: 'Tailwind CSS', description: '实用优先的 CSS 框架' },
  { name: 'Vite', description: '快速的构建工具' },
  { name: 'Bun', description: '快速的 JavaScript 运行时' },
  { name: 'Webview', description: '原生桌面应用支持' }
];

const quickStart = [
  { step: 2, title: '生成清单', command: 'bun run manifest', description: '资源打包' },
  { step: 1, title: '开发模式', command: 'bun run dev', description: '带有热重载的开发环境' },
  { step: 3, title: '开始编码', description: 'src/renderer 负责渲染，src/main 负责主逻辑' },
  { step: 4, title: '构建项目', command: 'bun run build', description: '构建生产版本（默认 Linux amd64，可自行添加其他平台）' }
];

// IPC 通讯函数
async function fetchGreeting() {
  isLoading.value = true;
  try {
    const result = await window.getGreeting(userName.value);
    greetingMessage.value = result;
  } catch (error) {
    greetingMessage.value = `错误: ${error}`;
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="bg-linear-to-br from-blue-50 via-white to-purple-50 p-8 overflow-y-auto">
    <div class="max-w-4xl mx-auto pb-8">
      <!-- 欢迎标题 -->
      <div class="text-center mb-12 animate-fade-in">
        <div class="flex items-center justify-center mb-4">
          <Rocket class="w-16 h-16 text-blue-600" :stroke-width="1.5" />
        </div>
        <h1 class="text-5xl font-bold mb-4 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          你好！
        </h1>
        <p class="text-xl text-gray-600">
          一个简单的的桌面应用开发模板
        </p>
      </div>

      <!-- IPC 通讯示例 -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
        <div class="flex items-center gap-3 mb-4">
          <MessageSquare class="w-6 h-6 text-pink-500" />
          <h2 class="text-2xl font-semibold text-gray-800">Webview ↔ Main 进程通讯</h2>
        </div>
        <p class="text-sm text-gray-600 mb-4">
          演示如何在渲染进程（Webview）和主进程之间进行通讯
        </p>

        <!-- 问候消息 -->
        <div class="p-4 bg-linear-to-r from-pink-50 to-purple-50 rounded-lg">
          <h3 class="font-semibold text-gray-800 mb-3">获取问候消息</h3>
          <div class="flex gap-2 mb-3">
            <input v-model="userName" type="text" placeholder="输入你的名字"
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button @click="fetchGreeting" :disabled="isLoading"
              class="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors font-medium disabled:opacity-50">
              获取
            </button>
          </div>
          <div v-if="greetingMessage" class="p-3 bg-white rounded border border-pink-200 text-gray-700">
            {{ greetingMessage }}
          </div>
        </div>

        <div class="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
          <strong>提示:</strong> 这个功能演示了渲染进程（Webview）与主进程（Bun）之间的通讯。
        </div>
      </div>

      <!-- 计数器示例 -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
        <div class="flex items-center gap-3 mb-4">
          <Zap class="w-6 h-6 text-yellow-500" />
          <h2 class="text-2xl font-semibold text-gray-800">快速开始示例</h2>
        </div>
        <div class="flex items-center gap-4">
          <button @click="count++"
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg">
            点击我
          </button>
          <span class="text-lg text-gray-700">
            计数: <span class="font-bold text-blue-600 text-2xl">{{ count }}</span>
          </span>
        </div>
      </div>

      <!-- 技术栈 -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
        <div class="flex items-center gap-3 mb-4">
          <Package class="w-6 h-6 text-purple-500" />
          <h2 class="text-2xl font-semibold text-gray-800">技术栈</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="tech in techStack" :key="tech.name"
            class="p-4 bg-linear-to-r from-blue-50 to-purple-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
            <h3 class="font-semibold text-gray-800 mb-1">{{ tech.name }}</h3>
            <p class="text-sm text-gray-600">{{ tech.description }}</p>
          </div>
        </div>
      </div>

      <!-- 快速开始指南 -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
        <div class="flex items-center gap-3 mb-4">
          <Code class="w-6 h-6 text-green-500" />
          <h2 class="text-2xl font-semibold text-gray-800">快速开始指南</h2>
        </div>
        <div class="space-y-4">
          <div v-for="item in quickStart" :key="item.step" class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div
              class="shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
              {{ item.step }}
            </div>
            <div class="flex-1">
              <h3 class="font-semibold text-gray-800 mb-1">{{ item.title }}</h3>
              <code v-if="item.command"
                class="block px-3 py-2 bg-gray-800 text-green-400 rounded text-sm mb-1 font-mono">
                {{ item.command }}
              </code>
              <p class="text-sm text-gray-600">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 资源链接 -->
      <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div class="flex items-center gap-3 mb-4">
          <BookOpen class="w-6 h-6 text-orange-500" />
          <h2 class="text-2xl font-semibold text-gray-800">有用的资源</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="https://vuejs.org" target="_blank"
            class="p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all text-center group">
            <div class="text-blue-600 font-semibold mb-1 group-hover:underline">Vue.js 文档</div>
            <div class="text-xs text-gray-500">学习 Vue 3</div>
          </a>
          <a href="https://tailwindcss.com" target="_blank"
            class="p-4 border border-gray-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all text-center group">
            <div class="text-purple-600 font-semibold mb-1 group-hover:underline">Tailwind CSS</div>
            <div class="text-xs text-gray-500">样式文档</div>
          </a>
          <a href="https://vitejs.dev" target="_blank"
            class="p-4 border border-gray-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-all text-center group">
            <div class="text-green-600 font-semibold mb-1 group-hover:underline">Vite 文档</div>
            <div class="text-xs text-gray-500">构建工具</div>
          </a>
        </div>
      </div>

      <!-- 页脚 -->
      <div class="text-center mt-8 text-gray-500 text-sm">
        <p>开始构建你的应用吧！🚀</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}
</style>