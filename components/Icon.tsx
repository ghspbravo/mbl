import React, { ReactElement } from 'react'
import Colors from '../constants/colors'

interface Props {
  name: string,
  color?: string,

  size?: number
}

function Icon({ name, size = 25, color = Colors.Primary }: Props): ReactElement {
  return (
    <div className="icon">
      <svg className="icon__inner">
        <use xlinkHref={`#${name}-icon`} ></use>
      </svg>

      <style jsx>{`
        .icon {
          position: relative;
          display: inline-block;
          width: ${size}px;
          height: ${size}px;
          overflow: hidden;
          fill: ${color}
        }
        .icon__inner {
          width: 100%;
          height: 100%;
          background: inherit;
          fill: inherit;
          pointer-events: none;
          transform: translateY(2px);
        }
        `}</style>
    </div>
  )
}

export default Icon
