import React, { ReactElement } from 'react'
import ModalWindow from 'react-modal'

interface Props {
  children: any,
  open: boolean,
  closeHandler: Function,

  width?: number | string
}

export default function Modal({ children, open, closeHandler, width }: Props): ReactElement {
  return (
    <ModalWindow
      isOpen={open}
      onRequestClose={closeHandler}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}

      style={{
        overlay: {
          zIndex: 10,
        },
        content: {
          padding: '25px 15px',
          top: '50%',
          left: "50%",
          right: 'unset',
          bottom: 'unset',
          transform: 'translate(-50%, -50%)',
          maxWidth: '600px',
          minWidth: '300px',
          minHeight: '250px',
          boxShadow: "0px 10px 50px rgba(0, 0, 0, 0.3)",
          width: width ? width : 'auto'
        }
      }}
    >
      {children}
    </ModalWindow>
  )
}
