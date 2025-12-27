import { Webview } from "webview-bun";

export async function setup(webview: Webview) {
    webview.title = "Hello!";

    // 绑定一个简单的函数，返回问候语
    webview.bind("getGreeting", (name: string) => {
        console.log(`[Main Process] Received request for greeting: ${name}`);
        return `你好, ${name}! 这条消息来自主进程 🚀`;
    });
}
