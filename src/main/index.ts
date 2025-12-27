import { Webview } from "webview-bun";
import { ASSETS } from "./manifest";
import { setup } from "./app";

const isDevelopment = process.env.APP_DEVELOPMENT === "development";
const isWorker = process.env.WORKER === "worker";

console.log(`isDevelopment: ${isDevelopment}`);
console.log(`isWorker: ${isWorker}`);

function createAssetsServer() {
    console.log("decoding assets...");
    const assets = Object.fromEntries(
        Object.entries(
            ASSETS as unknown as Record<
                string,
                { data: string; mimeType: string }
            >,
        ).map(([name, { data, mimeType }]) => [
            name,
            {
                data: Buffer.from(data, "base64"),
                mimeType,
            },
        ]),
    );
    console.log("launching local server serving assets...");
    return Bun.serve({
        port: 0,
        fetch(req) {
            const url = new URL(req.url);
            let key = decodeURIComponent(url.pathname).replace(/^\//, "");
            if (key === "") key = "index.html";

            const asset = assets[key];
            if (!asset?.data || !asset?.mimeType) {
                console.error(`asset "${key}" not found`);
                return new Response("Not Found", { status: 404 });
            }
            console.log(`sending asset "${key}", type: "${asset.mimeType}"`);
            return new Response(asset.data, {
                headers: {
                    "Content-Type": asset.mimeType,
                },
            });
        },
    });
}

const webview = new Webview();
setup(webview);

if (isDevelopment) {
    webview.navigate("http://localhost:5173");
    webview.runNonBlocking();
} else {
    const server = createAssetsServer();
    webview.navigate(server.url.href);
    webview.runNonBlocking();
}
