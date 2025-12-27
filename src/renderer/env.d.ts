declare global {
    interface Window {
        /* add webview bindings here! */
        getGreeting(name: string): Promise<string>;
    }
}

export {};
