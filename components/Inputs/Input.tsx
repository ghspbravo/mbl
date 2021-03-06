import React, { forwardRef } from "react";

interface Props {
	name: string;
	label?: string;
	type?: string;

	multiline?: boolean;

	error?: any;

	required?: boolean;
}

function Input(
	{
		name,
		label,
		type = "text",
		error,
		required,
		multiline,
		...otherProps
	}: Props,
	ref
): any {
	const random = Math.random();
	return (
		<label htmlFor={`${name}_${random}`}>
			{label && (
				<span className="label-text">
					{label}
					{required && <sup>*</sup>}
				</span>
			)}
			{!multiline ? (
				<input
					data-error={error ? true : false}
					ref={ref}
					id={`${name}_${random}`}
					name={name}
					type={type}
					tabIndex={0}
					{...otherProps}
				/>
			) : (
				<textarea
					data-error={error ? true : false}
					ref={ref}
					rows={4}
					id={`${name}_${random}`}
					name={name}
					tabIndex={0}
					{...otherProps}
				/>
			)}
			{error && <span className="error">{error.message}</span>}

			<style jsx>{`
				input {
					margin-bottom: 15px;
				}
			`}</style>
		</label>
	);
}

export default forwardRef<any, Props | React.HTMLProps<HTMLInputElement>>(
	Input
);
