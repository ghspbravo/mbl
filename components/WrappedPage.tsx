import React, { ReactElement } from 'react'
import Colors from '../constants/colors'

interface Props {
  children: any
}

export default function WrappedPage({children, ...otherProps }: Props): ReactElement {
  return (
    <div className="wrapped" {...otherProps}>
      {children}

      <style jsx>{`
              .wrapped {
                border: 3px solid ${Colors.Primary};
                padding: 70px 100px;
              }
              @media screen and (max-width: 991px) {
                .wrapped {
                  padding: 25px 15px;
                }
              }
              @media screen and (max-width: 576px) {
                .wrapped {
                  min-width: unset;
                  padding: unset;
                  border: none;
                }
              }
        `}</style>
    </div>
  )
}
