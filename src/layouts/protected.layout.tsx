import { AppHeader } from "@/components/layout/app-header";
import { Outlet } from "react-router";
import { PendingCard } from "@/components/ui/pending-card";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import type { CSSProperties } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";

export function ProtectedLayout() {
	const { isPending } = useAuthGuard();

	if (isPending) {
		return <PendingCard />;
	}

	return (
		<div
			className="flex h-screen w-full overflow-hidden"
			style={{ "--sidebar-width": "clamp(160px, 20vw, 240px)" } as CSSProperties}
		>
			<div className="hidden lg:block">
				<AppSidebar />
			</div>

			<div className="relative w-full overflow-x-hidden overflow-y-auto lg:w-[calc(100vw-var(--sidebar-width))]">
				<AppHeader />
				<Outlet />
			</div>
		</div>
	);
}
