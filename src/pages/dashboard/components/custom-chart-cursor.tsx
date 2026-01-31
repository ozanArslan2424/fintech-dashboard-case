// NOT: Recharts prop'ların type'ını doğru vermiyor ve bir callback de geçemiyoruz
// bu sebeple bu component ayrıca tanımlanmak zorunda. SVG düzenleme hakkında
// çok bilgim olmadığı için Gemini'dan yardım aldım, bu yüzden yorumları silmiyorum.
export function CustomChartCursor({
	points,
	height,
	top,
}: {
	points?: { x: number; y: number }[];
	height?: number;
	top?: number;
}) {
	if (!points || points.length < 2) return null;

	// We define a width for the pill (e.g., 40px)
	// and center it by subtracting half from the x coordinate
	const width = 64;
	// The 'x' coordinate is the same for both points in a vertical cursor
	const pointX = points[0].x;
	const x = pointX - width / 2;
	const y = top;

	const rx = 12; // Corner radius for the pill shape

	return (
		<>
			<defs>
				<linearGradient id="cursorGradient" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stopColor="#F1F5F9" stopOpacity="0" />
					<stop offset="100%" stopColor="#F1F5F9" stopOpacity="0.8" />
				</linearGradient>
			</defs>
			<rect
				x={x}
				y={y}
				width={width}
				height={height}
				fill="url(#cursorGradient)"
				rx={rx}
				pointerEvents="none"
			/>
		</>
	);
}
