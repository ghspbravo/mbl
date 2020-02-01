import React, { ReactElement } from 'react'
import Colors from '../constants/colors';

interface Props {
  children: string
  small?: boolean
}

export default function Badge({ children: value, small }: Props): ReactElement {
  return (
    <div className="badge">
      {value}

      <style jsx>{`
        .badge {
          font-size: ${small ? 8 : 16}px;
          position: absolute;
          left: 10%;
          top: -10px;

          padding: 10px 7px;

          background-color: ${Colors.Acsent};
          color: ${Colors.Primary};

          transform: rotate(-15deg);
          pointer-events: none;

          white-space: nowrap;
        }
        `}</style>
    </div>
  )
}
