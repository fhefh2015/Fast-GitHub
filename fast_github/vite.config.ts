import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import { default as webExtension } from "vite-plugin-web-extension";

function root(...paths: string[]): string {
	return path.resolve(__dirname, ...paths);
}

export default defineConfig({
	root: "src",
	build: {
		outDir: root("dist"),
		emptyOutDir: true,
		sourcemap: true,
		minify: "terser",
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
			},
		},
	},
	plugins: [
		react(),
		webExtension({
			disableAutoLaunch: true,
			manifest: root("src/manifest.json"),
			assets: "assets",
		}),
		// browserExtension({
		// 	manifest: root("src/manifest.json"),
		// 	assets: "assets",
		// }),
	],
});
