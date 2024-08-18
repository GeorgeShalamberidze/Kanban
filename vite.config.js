import path from "path";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
// https://vitejs.dev/config/
export default defineConfig(function () {
    var rootPath = path.resolve(process.cwd());
    var srcPath = "".concat(rootPath, "/src");
    return {
        plugins: [react(), svgr()],
        resolve: {
            alias: {
                "~": rootPath,
                "@": srcPath,
            },
        },
    };
});
