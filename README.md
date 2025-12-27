# 桌面应用开发模板

一个简单的桌面应用开发模板，使用现代化技术栈构建。

## 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **TypeScript** - 类型安全的开发体验
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Vite** - 快速的构建工具
- **Bun** - 快速的 JavaScript 运行时
- **Webview** - 原生桌面应用支持

## 快速开始

### 安装依赖

```bash
bun install
```

### 开发模式

启动开发服务器（支持热重载）：

```bash
bun run dev
```

### 构建应用

构建生产版本（默认 Linux amd64，可自行添加其他平台）：

```bash
bun run build
```

构建后的可执行文件将位于 `dist/` 目录。

## 项目结构

```
.
├── src/
│   ├── main/           # 主进程代码
│   │   ├── app.ts      # 主进程逻辑（webview bindings）
│   │   ├── index.ts    # 入口文件
│   │   └── manifest.ts # 生成的资源清单（构建时自动生成）
│   └── renderer/       # 渲染进程代码
│       ├── views/      # Vue 页面组件
│       ├── App.vue     # 根组件
│       ├── main.ts     # 渲染进程入口
│       └── env.d.ts    # 类型声明（webview API）
├── public/             # 静态资源
└── dist/               # 构建输出
```

## Webview 与主进程通讯

### 1. 在主进程中绑定函数 (`src/main/app.ts`)

```typescript
webview.bind("getGreeting", (name: string) => {
    return `你好, ${name}!`;
});
```

### 2. 在 env.d.ts 中声明类型

```typescript
declare global {
    interface Window {
        getGreeting(name: string): Promise<string>;
    }
}
```

### 3. 在渲染进程中调用

```typescript
const result = await window.getGreeting("世界");
console.log(result); // "你好, 世界!"
```

## License

MIT
