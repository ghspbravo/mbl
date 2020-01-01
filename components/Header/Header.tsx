import React, { ReactElement } from 'react'
import Icon from 'react-evil-icons';

import coloredLine from '../../assets/colored_line.jpg'

interface Props {

}

function Header({ }: Props): ReactElement {
  return (
    <header>
      <img src={coloredLine} alt="" className="line" />
      <section>
        <div className="container">
          <div className="row no-gutters align-items-center">

            <div className="row no-gutters align-items-center">
              <span>Город:&emsp;<b>Екатеринбург</b></span>
              <Icon name="ei-chevron-down" size="s" />
            </div>

            <div className="ml-auto">
              <div className="row no-gutters">
                <button>Войти</button>
                <button className="ml-3 primary">Регистрация</button>
              </div>
            </div>

          </div>
        </div>
      </section>

      <style jsx>{`
        header {position: relative;}
        .line {
          position: absolute;
          left: 0; top: -180px;
          width: 100%; height: auto;
          z-index: 1;
        }
        section {
          position: relative;
          z-index: 2;
          padding-top: 30px;
          padding-bottom: 30px;
        }
        `}</style>
    </header>
  )
}

export default Header
