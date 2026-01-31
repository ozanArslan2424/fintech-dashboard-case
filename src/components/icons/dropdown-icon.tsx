type DropdownIconProps = {
	variant?: "filled" | "line";
};

export function DropdownIcon({ variant = "filled" }: DropdownIconProps) {
	if (variant === "line") {
		return (
			<svg
				width="18"
				height="18"
				viewBox="0 0 18 18"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g clip-path="url(#clip0_16018_57)">
					<path
						d="M12.4425 6.4425L9 9.8775L5.5575 6.4425L4.5 7.5L9 12L13.5 7.5L12.4425 6.4425Z"
						fill="#1B212D"
					/>
				</g>
				<defs>
					<clipPath id="clip0_16018_57">
						<rect width="18" height="18" fill="white" />
					</clipPath>
				</defs>
			</svg>
		);
	}

	return (
		<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M12.6926 5.79395H8.27965H4.30588C3.62588 5.79395 3.28588 6.61561 3.76754 7.09729L7.43673 10.7665C8.02465 11.3544 8.9809 11.3544 9.56882 10.7665L10.9642 9.37104L13.238 7.09729C13.7126 6.61561 13.3726 5.79395 12.6926 5.79395Z"
				fill="#1B212D"
			/>
		</svg>
	);
}
