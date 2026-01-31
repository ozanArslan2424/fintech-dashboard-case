import { CreditCardMastercardIcon } from "@/components/icons/credit-card-mastercard-icon";
import { CreditCardChipIcon } from "@/components/icons/credit-card-chip-icon";
import { CreditCardContactlessIcon } from "@/components/icons/credit-card-contactless-icon";
import { CreditCardVisaIcon } from "@/components/icons/credit-card-visa-icon";
import { cn } from "@/lib/utils";
import type { WalletCard } from "@/api/financial/financial.model";
import { useMemo, type CSSProperties } from "react";

type WalletCardCardProps = {
	className?: string;
	card: WalletCard;
};

export function WalletCardCard({ className, card }: WalletCardCardProps) {
	const colors = useMemo(() => {
		function getRGB(hexColor: string) {
			const hex = hexColor.replace("#", "");

			const r = parseInt(hex.substring(0, 2), 16);
			const g = parseInt(hex.substring(2, 4), 16);
			const b = parseInt(hex.substring(4, 6), 16);

			return { r, g, b };
		}

		function applyOpacity(hexColor: string, op: number) {
			const { r, g, b } = getRGB(hexColor);
			return `rgb(${r},${g},${b},${op})`;
		}

		// NOT: Kart renkleri neye göre seçiliyor bilmediğim için ve API bir text color
		// dönmediği için böyle bir fonksiyon buldum.
		// Calculate luminance (YIQ standard)
		function getContrastColor(hexColor: string) {
			const { r, g, b } = getRGB(hexColor);
			const brightness = (r * 299 + g * 587 + b * 114) / 1000;
			return brightness > 128 ? "#000000" : "#FFFFFF";
		}

		const backgroundColor = card.isDefault ? card.color : applyOpacity(card.color, 0.8);
		const contrastColor = getContrastColor(card.color);

		return {
			backgroundColor,
			color: contrastColor,
			gradientFrom: applyOpacity(contrastColor, 0.225),
			gradientTo: applyOpacity(contrastColor, 0.1),
		};
	}, [card]);

	return (
		<div
			className={cn(
				"relative w-[340px] overflow-hidden rounded-2xl shadow-lg backdrop-blur-lg",
				className,
			)}
			style={{
				backgroundColor: colors.backgroundColor,
				color: colors.color,
			}}
		>
			<div
				className="absolute top-0 left-0 h-full w-full bg-linear-to-br from-white/20 from-5% to-white/10 to-90%"
				style={
					{
						"--tw-gradient-from": colors.gradientFrom,
						"--tw-gradient-to": colors.gradientTo,
					} as CSSProperties
				}
			/>

			<div className="w-full rounded-2xl px-7 py-5">
				<div className="pb-6">
					<span className="font-medium">{card.bank.split("|")[0]}</span>
					<span className="opacity-50"> | </span>
					<span className="text-sm opacity-50">{card.bank.split("|")[1]}</span>

					{/* NOT: Tasarımda | sonrasi muted olmasına rağmen dönen veride "bank"in içine yazılmış.
						aşağıdaki iki span'i yoruma aldım çünkü tasarımda hiçbir yerde "type" kullanılmıyor.

					<span className="opacity-50"> | </span>
					<span className="text-sm opacity-50">{card.type}</span>
						*/}
				</div>

				<div className="flex items-start justify-between">
					<CreditCardChipIcon />
					<CreditCardContactlessIcon />
				</div>

				<div className="pt-4 text-lg font-bold tracking-widest">{card.cardNumber}</div>

				<div className="flex items-start justify-between">
					<span className="text-sm opacity-50">{`${String(card.expiryMonth).padStart(2, "0")}/${card.expiryYear}`}</span>
					{card.network.toLocaleLowerCase() === "mastercard" && <CreditCardMastercardIcon />}
					{card.network.toLocaleLowerCase() === "visa" && <CreditCardVisaIcon />}
				</div>
			</div>
		</div>
	);
}
