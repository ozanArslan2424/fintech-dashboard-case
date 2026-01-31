import type { ReactNode } from "react";

type FormFieldProps = {
	id: string;
	label: string;
	error: string | undefined;
	children: ReactNode;
};

export function FormField({ id, label, error, children }: FormFieldProps) {
	return (
		<div className="space-y-1">
			<label htmlFor={id}>{label}</label>
			{children}
			{error && (
				<label htmlFor={id} className="text-destructive text-sm">
					{error}
				</label>
			)}
		</div>
	);
}
