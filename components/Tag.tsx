import React, { ReactElement } from 'react'
import Colors from '../constants/colors'

interface Props {
  children: string
}

export default function Tag({ children: value }: Props): ReactElement {
  return (
    <div className="tag">
      {value}

      <style jsx>{`
        .tag {
          font-size: 18px;
          font-weight: bold;

          padding: 10px 7px;

          background-color: ${Colors.Acsent};
          color: ${Colors.Primary};

          white-space: nowrap;
        }
        @media screen and (max-width: 576px) {
          .tag {font-size: 12px;}
        }
        `}</style>
    </div>
  )
}
