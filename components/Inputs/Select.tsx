import React, { ReactElement, useState } from 'react'
import Icon from 'react-evil-icons';
import Dropdown from '../Dropdown';

interface Props {
  className?: string,

  dropdownStyle?: React.CSSProperties,

  children: JSX.Element | Text,
  changeHandler: (value: string | number) => void,
  items: { value: number | string, name: string }[],

  openCallback?: Function
}

function Select({ children: value, changeHandler, openCallback, dropdownStyle, items, className, ...otherProps }: Props): ReactElement {
  const [dropdownVisible, dropdownVisibleSet] = useState(false)
  const toggleDropdownHandler = () => {
    if (openCallback && !dropdownVisible) {
      openCallback()
    }
    dropdownVisibleSet(!dropdownVisible);
  }

  const closeDropDown = () => { dropdownVisibleSet(false); }
  const selectItemHandler = (value: string | number) => {
    closeDropDown();
    changeHandler(value)
  }
  return (
    <>
      <div onClick={toggleDropdownHandler} {...otherProps} className={'select ' + (className || '')}>
        {value}
        <span className='icon'><Icon name="ei-chevron-down" size="s" /></span>

        <style jsx>{`
          .select {
            display: inline-block;

            padding: 3px 5px;
            border-radius: 5px;

            background-color: transparent;
            transition: background-color 0.3s ease-in-out;
          }
          .select:hover {
            cursor: pointer;
            background-color: rgba(0, 102, 198, 0.1);
          }
          .icon {
            vertical-align: bottom;
            top: 2px;
            transform: rotate(${dropdownVisible ? 180 : 0}deg);
          }
        `}</style>
      </div>
      {dropdownVisible && <Dropdown style={dropdownStyle} closeHandler={closeDropDown}>
        {items.length
          ? items.map(({ value, name }, index) => <div key={index} onClick={() => selectItemHandler(value)} className="select-item">
            {name}
            <style jsx>{`
              .select-item {
                cursor: pointer;
                padding: 15px 30px;
              }
              .select-item {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .select-item:hover {
                background-color: rgba(0, 0, 0, 0.05);
              }
            `}</style>
          </div>)
          : <div style={{ padding: 25, textAlign: 'center' }}>
            <Icon name="ei-spinner-3" size="m" />
          </div>}
      </Dropdown>}
    </>
  )
}

export default Select
