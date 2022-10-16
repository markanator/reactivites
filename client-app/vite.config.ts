/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
	if (command === "serve") {
		return {
			// dev specific config
			plugins: [tsconfigPaths(), mkcert(), react()],
			test: {
				globals: true,
				setupFiles: ["./test/setup-test-env.ts"],
			},
			server: {
				host: "localhost",
				port: 3000,
				https: true,
			},
		};
	} else {
		// command === 'build'
		return {
			plugins: [tsconfigPaths(), react()],
			build: {
				outDir: "wwwroot",
			},
		};
	}
});
