import React, { ReactElement, forwardRef } from 'react'

interface Props {
  name: string,
  label?: string,
  type?: string,

  error?: any,

  required?: boolean
}

function Input({ name, label, type = "text", error, required, ...otherProps }: Props, ref): any {
  const random = Math.random()
  return (
    <label htmlFor={`${name}_${random}`}>
      {label && <span>{label}{required && <sup>*</sup>}</span>}
      <input data-error={error ? true : false} ref={ref} id={`${name}_${random}`} name={name} type={type} {...otherProps} />
      {error && <span className="error">{error.message}</span>}

      <style jsx>{`
        input {
          margin-bottom: 15px;
        }
        `}</style>
    </label>
  )
}

export default forwardRef<any, Props | HTMLInputElement>(Input);