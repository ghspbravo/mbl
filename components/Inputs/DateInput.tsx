import React, { ReactElement } from "react";
import composeRefs from "@seznam/compose-react-refs";
import MaskedInput from "react-text-mask";
import Input from "./Input";
import { dateRegexp } from "../../constants/regexp";

interface Props {
	name: string;
	label?: string;
	required?: boolean;

  register: any;
  [x:string]: any
}

export default function DateInput({
	name,
	label,
	required,
	register,
	...otherProps
}: Props): ReactElement {
	return (
		<MaskedInput
			mask={[/\d/, /\d/, ".", /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/]}
			guide={true}
			render={(ref, props) => (
				<Input
					name={name}
					label={label}
					required={required}
					{...otherProps}
					{...props}
					ref={composeRefs(
						register({
							required: !!required,
							pattern: {
								value: dateRegexp,
								message: "Введите корректную дату",
							},
						}),
						ref
					)}
				/>
			)}
		/>
	);
}
