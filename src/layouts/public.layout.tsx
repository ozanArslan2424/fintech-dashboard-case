import { AppHeader } from "@/components/layout/app-header";
import { Outlet } from "react-router";

export function PublicLayout() {
	return (
		<div className="relative flex h-screen w-full flex-col">
			<AppHeader />

			<div className="flex flex-1 flex-col">
				<div className="flex flex-1 flex-col gap-2">
					<Outlet />
				</div>
			</div>

			<footer className="text-foreground/70 container mx-auto flex items-center justify-between px-4 py-8 text-center"></footer>
		</div>
	);
}
