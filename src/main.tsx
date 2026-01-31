import { ColorRegister } from "@/components/layout/color-register";
import { Toaster } from "@/components/ui/sonner";
import { ApiContextProvider } from "@/context/api.context";
import { router } from "@/router";
import { ThemeProvider } from "next-themes";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import "@/lib/locale/locale.config.ts";
import "./styles/theme.ts";

function App() {
	return (
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
			<ApiContextProvider>
				<ColorRegister />
				<Toaster richColors position="top-center" />
				<RouterProvider router={router} />
			</ApiContextProvider>
		</ThemeProvider>
	);
}

function main() {
	const el = document.getElementById("root");
	if (!el) throw new Error("DOM element not found.");
	const root = ReactDOM.createRoot(el);
	root.render(<App />);
}

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", main);
} else {
	main();
}
