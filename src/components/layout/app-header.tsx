import { DropdownIcon } from "@/components/icons/dropdown-icon";
import { NotificationsIcon } from "@/components/icons/notifications-icon";
import { SearchIcon } from "@/components/icons/search-icon";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PersonAvatar } from "@/components/ui/person-avatar";
import { useApiContext } from "@/context/api.context";
import { useLanguage } from "@/hooks/use-language";
import { usePageTitle } from "@/hooks/use-page-title";
import { clientRoutes } from "@/pages/client.routes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { MenuIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function AppHeader() {
	const { t } = useLanguage("paths");
	const { authApi } = useApiContext();
	const { pageHeading } = usePageTitle();
	const navigate = useNavigate();
	const meQuery = useSuspenseQuery(authApi.queryMe());

	function handleNotImplementedClick() {
		toast.message("This feature is not implemented.");
	}

	return (
		<Drawer>
			<header className="px-4 py-4 sm:px-10 sm:py-8">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-1 sm:gap-5">
						<DrawerTrigger className="ghost grid place-items-center lg:hidden [&_svg]:size-6">
							<MenuIcon />
						</DrawerTrigger>
						<h1 className="hidden text-2xl font-semibold sm:block">{pageHeading}</h1>
					</div>

					<DrawerContent>
						<AppSidebar />
					</DrawerContent>

					<div className="flex items-center gap-1 sm:gap-5">
						<button className="icon ghost" onClick={handleNotImplementedClick}>
							<SearchIcon />
						</button>
						<button className="icon ghost" onClick={handleNotImplementedClick}>
							<NotificationsIcon />
						</button>

						<DropdownMenu>
							<DropdownMenuTrigger className="ghost bg-secondary/60 hover:bg-primary/20 rounded-full py-1.5 ps-1.5 pe-3">
								<PersonAvatar person={meQuery.data.data} />
								{meQuery.data.data.fullName}
								<DropdownIcon />
							</DropdownMenuTrigger>

							<DropdownMenuContent>
								<DropdownMenuItem onClick={() => navigate(clientRoutes.settings)}>
									{t("settings")}
								</DropdownMenuItem>
								<DropdownMenuItem>Figma'da menü tasarımı yok.</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</header>
		</Drawer>
	);
}
