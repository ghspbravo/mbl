import React, { ReactElement } from 'react'
import Colors from '../constants/colors'

interface Props {
  top?: number,
  bottom?: number,

  vertical?: number,
  color?: string,
}

function Line({ top = 0, bottom = 0, vertical, color = Colors.Primary }: Props): ReactElement {
  return (
    <div className="line">
      <style jsx>{`
          .line {
            height: 2px;
            background-color: ${color};

            margin-bottom: ${vertical || bottom}px;
            margin-top: ${vertical || top}px;
          }
        `}</style>
    </div>
  )
}

export default Line
