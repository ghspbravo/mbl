import React, { ReactElement } from 'react'
import Icon from '../Icon'

interface Props {
  children: any,
  removeHandler?: any
}

export default function DynamicField({ children, removeHandler }: Props): ReactElement {
  const isMobile = window.innerWidth < 768;
  return (
    <div className="dynamic-wrapper">
      {removeHandler && !isMobile && <button type="button" onClick={removeHandler} className="dynamic-remove">
        <Icon size={24} name="ei-close" />
      </button>}

      {children}

      {isMobile && <button type="button" className="link primary clear" onClick={removeHandler}>
        <Icon size={14} name="ei-close" /> убрать
        </button>}

      <style jsx>{`
        .dynamic-wrapper {
          position: relative;
        } 
        .dynamic-wrapper:hover .dynamic-remove {
          display: block;
        }
        .dynamic-remove {
          display: none;
          border: none;
          padding: 2px;

          position: absolute;
          top: 5px;
          right: 5px;
        }
        `}</style>
    </div>
  )
}
