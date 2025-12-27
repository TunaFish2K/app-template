import { readdirSync } from "fs";
import { dirname, relative, resolve } from "path";
import { fileURLToPath } from "url";

const PROJECT = resolve(dirname(fileURLToPath(import.meta.url)));
const RENDERER_DIST = resolve(PROJECT, "dist", "renderer");
const ASSETS_MANIFEST = resolve(PROJECT, "src", "main", "manifest.ts");

async function generateManifest() {
    const assets = readdirSync(RENDERER_DIST, {
        recursive: true,
        withFileTypes: true,
    })
        .filter((file) => file.isFile())
        .map((file) => ({
            name: relative(RENDERER_DIST, resolve(file.parentPath, file.name)),
            path: resolve(file.parentPath, file.name),
        }))
        .map((file) =>
            Object.assign(file, {
                mimeType: Bun.file(file.path).type,
            }),
        )
        .map((file) => {
            const type = file.mimeType;
            const isBinary =
                !type.startsWith("text") &&
                !type.includes("javascript") &&
                !type.includes("json") &&
                !type.includes("svg");
            const loader = isBinary ? "buffer" : "raw";
            return Object.assign(file, { loader });
        });

    const output = [
        "/* this file is auto generated, please don't edit */",
        "export const ASSETS = {",
        ...(await Promise.all(
            assets.map(
                async (asset) =>
                    `    "${asset.name}": { data: "${(await Bun.file(asset.path).bytes()).toBase64()}", mimeType: "${asset.mimeType}" },`,
            ),
        )),
        "};",
    ].join("\n");

    Bun.write(ASSETS_MANIFEST, output);
}

const PLATFORMS: Bun.CompileBuildOptions[] = [
    {
        target: "bun-linux-x64",
        outfile: "app",
    },
];

async function build() {
    for (const platform of PLATFORMS) {
        Bun.build({
            entrypoints: [resolve(PROJECT, "src", "main", "index.ts")],
            outdir: resolve(PROJECT, "dist", "app"),
            minify: true,
            compile: platform,
            loader: {
                ".svg": "text",
                ".html": "text",
                ".css": "text",
                ".js": "text",
                ".png": "file",
                ".jpg": "file",
            },
        });
    }
}

switch (process.argv[2]) {
    case "manifest":
        await generateManifest();
        break;
    case "build":
        await build();
        break;
    default:
        console.error("unknown command!");
        process.exit(0);
}
