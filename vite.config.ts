import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	build: {
		assetsDir: "static",
	},
	server: {
		proxy: {
			"/api": {
				target: "https://case.nodelabs.dev/api",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
				cookieDomainRewrite: "localhost", // This is the magic line
			},
		},
	},
});
