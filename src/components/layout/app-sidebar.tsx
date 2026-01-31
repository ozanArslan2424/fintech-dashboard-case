import { DashboardIcon } from "@/components/icons/dashboard-icon";
import { HelpIcon } from "@/components/icons/help-icon";
import { InvoicesIcon } from "@/components/icons/invoices-icon";
import { LogoutIcon } from "@/components/icons/logout-icon";
import { MyWalletsIcon } from "@/components/icons/my-wallets-icon";
import { SettingsIcon } from "@/components/icons/settings-icon";
import { TransactionsIcon } from "@/components/icons/transactions-icon";
import { AppIcon } from "@/components/layout/app-icon";
import { SidebarItem } from "@/components/layout/sidebar-item";
import { useApiContext } from "@/context/api.context";
import { useLanguage } from "@/hooks/use-language";
import { clientRoutes } from "@/pages/client.routes";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router";

export function AppSidebar() {
	const { makeTranslator } = useLanguage("paths");
	const { authApi } = useApiContext();
	const navigate = useNavigate();
	const location = useLocation();
	const tPaths = makeTranslator("paths");
	const tAuth = makeTranslator("auth");
	const logoutMutation = useMutation(
		authApi.logout((_, err) => {
			if (err === null) {
				navigate(clientRoutes.login);
			}
		}),
	);

	function handleLogout() {
		logoutMutation.mutate();
	}

	const getLabel = useCallback(
		(path: string) => tPaths(path.replaceAll("/", "").replaceAll("-", "")),
		[tPaths],
	);

	const items = useMemo(() => {
		return [
			{
				label: getLabel(clientRoutes.dashboard),
				href: clientRoutes.dashboard,
				Icon: DashboardIcon,
			},
			{
				label: getLabel(clientRoutes.transactions),
				href: clientRoutes.transactions,
				Icon: TransactionsIcon,
			},
			{
				label: getLabel(clientRoutes.invoices),
				href: clientRoutes.invoices,
				Icon: InvoicesIcon,
			},
			{
				label: getLabel(clientRoutes.myWallets),
				href: clientRoutes.myWallets,
				Icon: MyWalletsIcon,
			},
			{
				label: getLabel(clientRoutes.settings),
				href: clientRoutes.settings,
				Icon: SettingsIcon,
			},
		];
	}, [getLabel]);

	return (
		<aside
			className="bg-secondary flex h-full flex-col px-6 pt-8 pb-24"
			style={{ width: "var(--sidebar-width)" }}
		>
			<Link to={clientRoutes.dashboard} className="mb-15 px-1">
				<AppIcon />
			</Link>
			<nav className="flex h-full flex-1 flex-col justify-start gap-1">
				{items.map((item) => (
					<SidebarItem
						key={item.href}
						href={item.href}
						icon={<item.Icon />}
						label={item.label}
						isActive={location.pathname.includes(item.href)}
					/>
				))}
			</nav>

			<div className="flex flex-col justify-start gap-1">
				<SidebarItem
					label={getLabel(clientRoutes.help)}
					href={clientRoutes.help}
					icon={<HelpIcon />}
				/>
				<SidebarItem label={tAuth("logout")} icon={<LogoutIcon />} onClick={handleLogout} />
			</div>
		</aside>
	);
}
