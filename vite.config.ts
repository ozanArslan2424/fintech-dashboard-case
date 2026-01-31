import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	return {
		plugins: [react(), tailwindcss()],
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
		build: {
			assetsDir: "static",
		},
		...(process.env.NODE_ENV !== "production" && {
			server: {
				proxy: {
					"/api": {
						target: process.env.VITE_API_URL,
						changeOrigin: true,
						rewrite: (path) => path.replace(/^\/api/, ""),
						cookieDomainRewrite: process.env.VITE_DOMAIN,
					},
				},
			},
		}),
	};
});
