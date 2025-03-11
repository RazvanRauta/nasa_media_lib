import type { ControllerProps, FieldPath } from "react-hook-form";
import { type FieldValues, Controller } from "react-hook-form";
import type React from "react";
import type { InputProps } from "./Input";
import { Input } from "./Input";

export type FormTextInputProps<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Pick<ControllerProps<TFieldValues, TName>, "name" | "defaultValue"> &
	InputProps;

function FormTextInput<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: FormTextInputProps<TFieldValues, TName>): React.ReactNode {
	return (
		<Controller
			defaultValue={props.defaultValue}
			name={props.name}
			render={({ field }) => <Input {...field} {...props} />}
		/>
	);
}

export default FormTextInput;
