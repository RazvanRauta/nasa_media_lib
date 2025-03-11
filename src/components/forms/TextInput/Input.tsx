import type { JSX } from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
	icon?: JSX.Element;
};

export const Input = ({ icon, ...props }: InputProps): JSX.Element => {
	return (
		<label className="input input-xl">
			{icon ? icon : null}
			<input className="grow" {...props} />
		</label>
	);
};
