import React, { ReactElement, useState, useEffect } from 'react'
import { withRouter } from 'next/router';

import coloredLine from '../../assets/colored_line.jpg'
import Select from '../Inputs/Select'
import delay from '../../lib/delay';
import Pages from '../../constants/pages';

import Icon from 'react-evil-icons';

import logo from '../../assets/logo_horizontal.svg';
import Line from '../Line';

function Header({ router }): ReactElement {

  const [stickyHeader, stickyHeaderSet] = useState(false);
  let stickyEnabled: boolean = false;
  const stickyHeaderFunc = () => {
    if (window.innerWidth < 768) { return; }
    const scrollFromTop = window.pageYOffset;
    if (scrollFromTop >= 108) {
      if (!stickyEnabled) {
        stickyEnabled = true;
        stickyHeaderSet(true);
      }
    }
    if (scrollFromTop < 108 && stickyEnabled) {
      stickyEnabled = false;
      stickyHeaderSet(false)
    }
  }
  useEffect(() => {
    stickyHeaderFunc()

    window.addEventListener('scroll', stickyHeaderFunc)

    return () => {
      window.removeEventListener('scroll', stickyHeaderFunc);
    }
  }, [])

  const isMain = router.route === '/';

  const [currentCity, currentCitySet] = useState('Екатеринбург');

  const [citiesList, citiesListSet] = useState([]);

  const citiesById: { [value: number]: string } = citiesList.reduce((result, { value, name }) => ({
    ...result,
    [value]: name
  }), {});

  const onOpenCities = () => {
    if (citiesList.length) { return; }
    delay().then(() => {
      const mockCitiesList = [
        { value: 0, name: 'Екатеринбург' },
        { value: 1, name: 'Москва' },
        { value: 2, name: 'Санкт-Петербург' },
        { value: 3, name: 'Московская область и регионы' },
      ]
      citiesListSet(mockCitiesList);
    })
  }

  const changeCityHandler = ((id: number): void => {
    currentCitySet(citiesById[id])
  })


  const { Home, Events, News, Cources, Members, Companies, Projects, About } = Pages

  const [searchEnable, searchEnableSet] = useState(false);
  const searchToggleHandler = () => { searchEnableSet(!searchEnable) }

  const [searchQuery, searchQuerySet] = useState('')
  const searchQueryChangeHandler = (e: React.SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    searchQuerySet(target.value)
  }

  const searchCancelHandler = () => {
    searchQuerySet('');
    searchToggleHandler()
  }

  const searchHandler = () => {
    searchToggleHandler();
  }

  const [burgerMenuShow, burgerMenuShowSet] = useState(false);
  const burgerMenuToggle = () => {
    burgerMenuShowSet(!burgerMenuShow);
  }

  return (
    <header>
      <img src={coloredLine} alt="" className="line" />
      <section className="d-none d-md-block">
        <div className="container">
          <div className="row no-gutters align-items-center">

            <div style={{ position: 'relative', zIndex: 6 }}>
              <span>Город:&ensp;</span>
              <Select openCallback={onOpenCities} dropdownStyle={{ minWidth: '300px', maxHeight: '250px' }} changeHandler={changeCityHandler} items={citiesList}>
                <span><b>{currentCity}</b></span>
              </Select>
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

      <section id="navigation" className='inverted'>
        <div className="container">
          <div className="row no-gutters align-items-center navigation">
            <a className="navigation-logo" href={Home.route}>
              <object style={{ pointerEvents: 'none' }} type="image/svg+xml" data={logo} />
            </a>

            <div className="navigation-item d-none d-xl-block">
              <a href={Events.route}>{Events.title}</a>
            </div>
            <div className="navigation-item d-none d-xl-block">
              <a href={News.route}>{News.title}</a>
            </div>
            <div className="navigation-item d-none d-xl-block">
              <a href={Cources.route}>{Cources.title}</a>
            </div>
            <div className="navigation-item d-none d-xl-block">
              <a href={Members.route}>{Members.title}</a>
            </div>
            <div className="navigation-item d-none d-xl-block">
              <a href={Companies.route}>{Companies.title}</a>
            </div>
            <div className="navigation-item d-none d-xl-block">
              <a href={Projects.route}>{Projects.title}</a>
            </div>
            <div className="navigation-item d-none d-xl-block">
              <a href={About.route}>{About.title}</a>
            </div>

            <div className="ml-auto d-none d-xl-block">
              <div onClick={searchToggleHandler} className="row no-gutters align-items-center search">
                <span>Найти</span>
                <div style={{ paddingBottom: '3px' }}>
                  <Icon size="s" name="ei-search" />
                </div>
              </div>
            </div>

            <div className="ml-auto d-xl-none">
              {!burgerMenuShow && <div onClick={burgerMenuToggle} className="interactive">
                <Icon size="s" name="ei-navicon" />
              </div>}

              {burgerMenuShow && <div className="row no-gutters align-items-center">
                <div onClick={searchToggleHandler}>
                  <Icon size="s" name="ei-search" />
                </div>
                <div onClick={burgerMenuToggle} className="ml-3">
                  <Icon size="s" name="ei-close" />
                </div>
              </div>}
            </div>

            {searchEnable && <div className="search-input row no-gutters align-items-center justify-content-end">
              <div className="interactive mr-2" onClick={searchHandler}>
                <Icon size="s" name="ei-search" />
              </div>

              <input type="text" onChange={searchQueryChangeHandler} placeholder="Поиск по сайту" value={searchQuery} />

              <div className="interactive" onClick={searchCancelHandler}>
                <Icon size="s" name="ei-close" />
              </div>
            </div>}

          </div>

          {burgerMenuShow && <div className="d-xl-none burger-inner">

            <div className="d-md-none" style={{ position: 'relative', zIndex: 6 }}>
              <span>Город:&ensp;</span>
              <Select openCallback={onOpenCities} dropdownStyle={{ maxWidth: '300px', maxHeight: '250px' }} changeHandler={changeCityHandler} items={citiesList}>
                <span><b>{currentCity}</b></span>
              </Select>
            </div>

            <div className="d-md-none row no-gutters mt-4">
              <button>Войти</button>
              <button className="ml-3 primary">Регистрация</button>
            </div>

            <div className="d-md-none">
              <Line top={30} bottom={10} color="white" />
            </div>

            <div className="row">
              <div className="col-6 col-md-3 burger-navigation-item">
                <a href={News.route}>{News.title}</a>
              </div>
              <div className="col-6 col-md-3 burger-navigation-item">
                <a href={Events.route}>{Events.title}</a>
              </div>
              <div className="col-6 col-md-3 burger-navigation-item">
                <a href={Cources.route}>{Cources.title}</a>
              </div>
              <div className="col-6 col-md-3 burger-navigation-item">
                <a href={Members.route}>{Members.title}</a>
              </div>
              <div className="col-6 col-md-3 burger-navigation-item">
                <a href={Companies.route}>{Companies.title}</a>
              </div>
              <div className="col-6 col-md-3 burger-navigation-item">
                <a href={Projects.route}>{Projects.title}</a>
              </div>
              <div className="col-6 col-md-3 burger-navigation-item">
                <a href={About.route}>{About.title}</a>
              </div>
            </div>

          </div>}
        </div>

      </section>

      {burgerMenuShow && <div onClick={burgerMenuToggle} className="d-xl-none burger-menu-wrapper" />}

      <style jsx global>{`
            body, html {overflow-y: ${burgerMenuShow ? "hidden" : "auto"}}
        `}</style>

      <style jsx>{`
        .burger-navigation-item a {
          display: inline-block;

          color: white;
          padding-top: 10px;
          padding-bottom: 10px;
        }
        .burger-navigation-item a:hover {
          text-decoration: unset;
        }
            .burger-inner {
              padding-top: 30px;
              padding-bottom: 30px;
            }

        .burger-menu-wrapper {
          position: fixed;
          width: 100%;
          height: 100%;
          top: 108px;
          left: 0;

          z-index: 4;

          background-color: rgba(0, 101, 198, 0.5);
        }

        .search-input {
          position: absolute;
          right: 0;
          top: 0;

          height: 78px;
          min-width: 920px;

          padding-right: 15px;

          background: rgb(255,255,255);
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 35%, rgba(255,255,255,1) 100%);

          color: black;
        }

        .search-input input {
          width: 500px;
          padding-top: 30px;
          padding-bottom: 30px;
        }


        .search {
          cursor: pointer;
          vertical-align: middle;
        }

        .navigation-item a {
          display: inline-block;
          padding-top: 30px;
          padding-bottom: 30px;
          color: white;

          transition: background-color 0.3s ease-out;
        }
        .navigation-item a:hover {
          background-color: rgba(255, 255, 255, 0.1);
          text-decoration: unset;
        }
        .navigation-item a {
          padding-left: 10px;
          padding-right: 10px
        }
        .navigation-item:first-child {
          padding-left: 0;
        }

        .navigation-logo {
          margin-right: 40px; 
          display: ${isMain ? 'none' : 'block'};
        }
        .navigation-logo object {
          height: 30px;
        }

        .navigation {
          position: relative;
          min-height: 78px;
        }

        header {
          position: relative;
          margin-bottom: ${stickyHeader ? 78 : 0}px; 
          }
        .line {
          position: absolute;
          left: -25px; top: -250px;
          width: 110%; height: auto;
          z-index: 0;
        }
        section {
          padding-top: 30px;
          padding-bottom: 30px;
        }
        section#navigation {
          position: ${stickyHeader ? 'fixed' : 'relative'};
          top: 0; left: 0;
          width: 100%;
          z-index: ${stickyHeader ? 7 : 5};

          padding-top: 0;
          padding-bottom: 0;
        }

        @media screen and (max-width: 1440px) {
          .line {
            top: -180px;
          }
        }
        @media screen and (max-width: 1199px) {
          .navigation-logo {
            display: block;
          }
          .line {
            top: -130px;
          }
          .search-input input {
            width: 90%;
            padding-top: 30px;
            padding-bottom: 30px;
          }
          .search-input {
            background: white;
            min-width: 100%;
          }
        }
        @media screen and (max-width: 991px) {
        .line {
          width: 130%;
          top: -100px;
          left: -70px;
        }
      }
      @media screen and (max-width: 767px) {
        header {
          margin-bottom: 0;
        }
        .line {
          top: -150px;
        }
        .search-input {
          height: 50px;
        }
        .search-input input {
            width: 75%;
            padding-top: 0;
            padding-bottom: 0;
          }
        section#navigation {
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          z-index: 7;
        }
        .navigation {
          min-height: 50px;
        }
        .navigation-logo object {
          height: 20px;
        }
      }
      @media screen and (max-width: 576px) {
        .line {
          top: -110px;
        }
      }
      @media screen and (max-width: 425px) {
        .line {
          top: -70px;
        }
      }
      @media screen and (max-width: 375px) {
        .line {
          top: -40px;
        }
      }
        `}</style>
    </header>
  )
}

export default withRouter(Header);