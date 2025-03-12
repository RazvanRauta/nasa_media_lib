import type { JSX } from "react";
import clsx from "clsx";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	icon?: JSX.Element;
	error?: string;
	hint?: string;
	large?: boolean;
};

export const Input = ({
	icon,
	className,
	error,
	hint,
	large,
	...props
}: InputProps): JSX.Element => {
	return (
		<fieldset className={clsx("fieldset", className)}>
			<label
				className={clsx(
					"input",
					error && "input-error",
					large && "input-xl w-full"
				)}
			>
				{icon ? icon : null}
				<input {...props} className="grow" />
			</label>
			{hint ? <p className="fieldset-label">{hint}</p> : null}
			{error ? <p className="fieldset-error text-error">{error}</p> : null}
		</fieldset>
	);
};
