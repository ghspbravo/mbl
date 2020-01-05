import React, { ReactElement } from 'react'
import Colors from '../constants/colors';

interface Props {
  closeHandler: Function,

  children: JSX.Element[] | JSX.Element,
  style?: React.CSSProperties
}

function Dropdown({ closeHandler, children: inner, style, }: Props): ReactElement {
  const overlayClickHandler = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    closeHandler();
  }
  return (<>
    <div style={style} onClick={(e) => { e.preventDefault(); e.stopPropagation() }} className="dropdown">
      {inner}
    </div>
    <div className="dropdown-overlay" onClick={overlayClickHandler} />

    <style jsx>{`
          .dropdown {
            color: ${Colors.Primary};

            position: absolute;
            z-index: 6;
            top: 40px;
            left: 0;

            width: 100%;

            box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.1);
            background-color: white;

            white-space: nowrap;
            overflow-x: hidden;
          }

          .dropdown-overlay {
            position: fixed;
            left: 0;
            top: 0;
            z-index: 5;

            width: 100%;
            height: 100%;
          }
          `}</style>

  </>
  )
}

export default Dropdown
