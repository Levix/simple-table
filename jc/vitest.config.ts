import { defineConfig } from "vitest/config";
import viteConfigFn from "./vite.config";

export default defineConfig({
    test: {
        environment: "jsdom",
        // coverage: {
        //     enabled: true
        // },
    },
    ...viteConfigFn({ mode: "test" })
});
