import React, { ReactElement, forwardRef } from 'react'
import Colors from '../../constants/colors'

interface Props {
  name: string,
  checked?: boolean,

  children: any
}

function Checkbox({ name, checked = false, children }: Props, ref): ReactElement {
  const random = Math.random()
  return (
    <div>
      <input ref={ref} type="checkbox" defaultChecked={checked} name={name} id={`${name}_${random}`} />
      <label className="checkbox" htmlFor={`${name}_${random}`}>
        {children}
      </label>


      <style jsx>{`
          .checkbox {
            display: inline-block;
            padding: 8px 10px;
            border: 2px solid ${Colors.Primary};
            cursor: pointer;
          }
          .checkbox:hover {
            background-color: rgba(204, 235, 5, 0.459)
          }
          input {
            display: none;
          }
          input:checked + .checkbox {
            border-color: ${Colors.Acsent};
            background-color: ${Colors.Acsent};
          }
          `}</style>
    </div>
  )
}

export default forwardRef(Checkbox)