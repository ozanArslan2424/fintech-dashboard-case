import { AppLayout } from "@/layouts/app.layout";
import { AuthLayout } from "@/layouts/auth.layout";
import { ProtectedLayout } from "@/layouts/protected.layout";
import { PublicLayout } from "@/layouts/public.layout";
import { clientRoutes } from "@/pages/client.routes";
import { DashboardPage } from "@/pages/dashboard/dashboard.page";
import { ErrorBoundary } from "@/pages/error-boundary";
import { LoginPage } from "@/pages/login/login.page";
import { NotFoundPage } from "@/pages/not-found.page";
import { RegisterPage } from "@/pages/register/register.page";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
	{
		Component: AppLayout,
		ErrorBoundary,
		children: [
			{
				Component: PublicLayout,
				children: [],
			},
			{
				Component: ProtectedLayout,
				children: [
					{ path: clientRoutes.dashboard, Component: DashboardPage },
					{ path: "*", Component: NotFoundPage },
				],
			},
			{
				Component: AuthLayout,
				children: [
					{ path: clientRoutes.login, Component: LoginPage },
					{ path: clientRoutes.register, Component: RegisterPage },
				],
			},
			// Fallback route for 404 pages
			{ path: "*", Component: NotFoundPage },
		],
	},
]);
