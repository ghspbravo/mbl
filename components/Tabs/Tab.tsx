import React, { ReactElement } from 'react'
import Colors from '../../constants/colors'

interface Props {
  name: string,
  active?: boolean,
  onClick: any
}

export default function Tab({ name, active = false, onClick }: Props): ReactElement {
  return (
    <button onClick={onClick} type="button" data-active={active} className="col tabs-item clear">
      {name}

      <style jsx>{`
          .tabs-item {
            position: relative;
            text-align: center;
            padding: 15px 5px;
          }
          .tabs-item::after {
            content: '';
            position: absolute;

            bottom: 0;
            left: 0;

            width: 100%;
            height: 4px;
            background-color: ${Colors.Primary}
          }
          .tabs-item:focus {
            outline: none;
          }
          .tabs-item:hover:after {background-color: ${Colors.Acsent}}
          .tabs-item[data-active=true]::after {
            bottom: -4.5px;
            height: 10px;
            background-color: ${Colors.Acsent}
          }
        `}</style>
    </button>
  )
}
