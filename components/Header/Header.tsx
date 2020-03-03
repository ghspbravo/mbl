import React, { ReactElement, useState, useEffect, useContext } from 'react'
import { withRouter } from 'next/router';

import coloredLine from '../../assets/colored_line.jpg'
import Select from '../Inputs/Select'
import delay from '../../lib/delay';
import Pages from '../../constants/pages';

import Icon from 'react-evil-icons';

import logo from '../../assets/logo_horizontal.svg';
import Line from '../Line';

import Link from 'next/link';
import Badge from '../Badge';
import Modal from '../Modal';
import Login from '../Auth/Login';

import pass from '../../assets/pass.png';
import Dropdown from '../Dropdown';
import { removeToken } from '../../constants/auth';
import { AuthContext } from '../Layout';

function Header({ router }): ReactElement {
  const [openModal, openModalSet] = useState(false);
  const openModalHandler = () => { openModalSet(true) }
  const closeModalHandler = () => { openModalSet(false) }
  const SignInButton = window.innerWidth < 768
    ? <Link href={Pages.SignIn.route}>
      <button>Войти</button>
    </Link>
    : <div>
      <button onClick={openModalHandler}>Войти</button>
      <Modal open={openModal} closeHandler={closeModalHandler} width="100%">
        <Login successHandler={closeModalHandler} />
      </Modal>
    </div>
  const SignUpButton = <Link href={Pages.SignUp.route}>
    <button className="ml-3 primary">Регистрация</button>
  </Link>

  const { setAuthState } = useContext(AuthContext)

  const [profileSubmenuOpen, profileSubmenuOpenSet] = useState(false);
  const onSubmenuOpen = () => { profileSubmenuOpenSet(true) }
  const onSubmenuClose = () => { profileSubmenuOpenSet(false) }
  const onSignOutClick = () => {
    removeToken(setAuthState);
    onSubmenuClose();
  }
  const profileControls = (signedIn, user) => {
    if (signedIn === null) {
      return <div>
        <Icon size="s" name="ei-spinner-2" />
      </div>
    }
    return signedIn
      ? <div onClick={onSubmenuOpen} className="profile-controls">
        <div className="row align-items-center no-gutters">
          <img style={{ width: "48px", height: "48px" }} src={user.photo} alt="Фотография пользователя" />
          <div className="ml-2">
            <div className="profile-controls__label">
              <span>Личный кабинет</span>
              <span className='icon'><Icon name="ei-chevron-down" size="s" /></span>
            </div>
          </div>
        </div>
        {profileSubmenuOpen && <Dropdown style={{ marginTop: '20px' }} closeHandler={onSubmenuClose}>
          <Link href={Pages.Profile.route} passHref>
            <a className="clear primary dropdown__item">Профиль</a>
          </Link>
          <Link href={Pages.MyEvents.route} passHref>
            <a className="clear dropdown__item">Мои мероприятия</a>
          </Link>
          <Link href={Pages.MyCources.route} passHref>
            <a className="clear dropdown__item">Мои программы</a>
          </Link>
          <Link href={Pages.MyProjects.route} passHref>
            <a className="clear dropdown__item">Мои проекты</a>
          </Link>
          <div className="dropdown__item">
            <Line />
          </div>
          {/* TODO: add register company href */}
          <Link href={Pages.Profile.route} passHref>
            <a className="clear dropdown__item">Привязать юр. лицо</a>
          </Link>
          <button onClick={onSignOutClick} className="clear link primary dropdown__item w-100 align-left">Выйти</button>
        </Dropdown>}
        <style jsx>{`
          .profile-controls {
            position: relative;
            z-index: 6;
          }
          .profile-controls__label {
            cursor: pointer;
            display: inline-block;

            padding: 3px 5px;
            border-radius: 5px;

            background-color: transparent;
            transition: background-color 0.3s ease-in-out;
          }
          .profile-controls:hover .profile-controls__label {
            background-color: rgba(0, 102, 198, 0.1);
          }
          .dropdown__item {
            display: block;
            padding: 15px 30px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .icon {
            vertical-align: bottom;
            top: 2px;
            transform: rotate(${profileSubmenuOpen ? 180 : 0}deg);
          }
          `}</style>
      </div>
      : <div className="row no-gutters">
        {SignInButton}
        {SignUpButton}
      </div>
  }

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
    <AuthContext.Consumer>
      {({ isAuth, currentUser }) => <header>
        <img src={coloredLine} alt="" className="line" />
        <section className="d-none d-md-block">
          <div className="container">
            <div className="row no-gutters align-items-center">

              <div style={{ position: 'relative', zIndex: 6 }}>
                <span>Город:&ensp;</span>
                <Select openCallback={onOpenCities} dropdownStyle={{ minWidth: '300px', maxHeight: '250px' }}
                  changeHandler={changeCityHandler} items={citiesList}>
                  <span><b>{currentCity}</b></span>
                </Select>
              </div>

              <div className="ml-auto">
                {profileControls(isAuth, currentUser)}
              </div>

            </div>
          </div>
        </section>

        <section id="navigation" className='inverted'>
          <div className="container">
            <div className="row no-gutters align-items-center navigation">
              <Link href={Home.route}>
                <a className="navigation-logo">
                  <object style={{ pointerEvents: 'none' }} type="image/svg+xml" data={logo} />
                </a>
              </Link>

              <div className="navigation-item d-none d-xl-block">
                <Badge small>в разработке</Badge>
                <Link href={Events.route} passHref={true}>
                  <a>{Events.title}</a>
                </Link>
              </div>
              <div className="navigation-item d-none d-xl-block">
                <Link href={News.route} passHref={true}>
                  <a >{News.title}</a>
                </Link>
              </div>
              <div className="navigation-item d-none d-xl-block">
                <Badge small>в разработке</Badge>
                <Link href={Cources.route} passHref={true}>
                  <a >{Cources.title}</a>
                </Link>
              </div>
              <div className="navigation-item d-none d-xl-block">
                <Link href={Members.route} passHref={true}>
                  <a >{Members.title}</a>
                </Link>
              </div>
              <div className="navigation-item d-none d-xl-block">
                <Badge small>в разработке</Badge>
                <Link href={Companies.route} passHref={true}>
                  <a >{Companies.title}</a>
                </Link>
              </div>
              <div className="navigation-item d-none d-xl-block">
                <Badge small>в разработке</Badge>
                <Link href={Projects.route} passHref={true}>
                  <a >{Projects.title}</a>
                </Link>
              </div>
              <div className="navigation-item d-none d-xl-block">
                <Badge small>в разработке</Badge>
                <Link href={About.route} passHref={true}>
                  <a >{About.title}</a>
                </Link>
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

                <input style={{ borderBottom: "none" }} type="text" onChange={searchQueryChangeHandler} placeholder="Поиск по сайту" value={searchQuery} />

                <div className="interactive" onClick={searchCancelHandler}>
                  <Icon size="s" name="ei-close" />
                </div>
              </div>}

            </div>

            {burgerMenuShow && <div className="d-xl-none burger-inner">

              <div className="d-md-none" style={{ position: 'relative', zIndex: 7 }}>
                <span>Город:&ensp;</span>
                <Select openCallback={onOpenCities} dropdownStyle={{ maxWidth: '300px', maxHeight: '250px' }} changeHandler={changeCityHandler} items={citiesList}>
                  <span><b>{currentCity}</b></span>
                </Select>
              </div>

              <div className="d-md-none mt-4">
                {profileControls(isAuth, currentUser)}
              </div>

              <div className="d-md-none">
                <Line top={30} bottom={10} color="white" />
              </div>

              <div className="row">
                <div className="col-6 col-md-3 burger-navigation-item">
                  <Link href={News.route} passHref={true}>
                    <a >{News.title}</a>
                  </Link>
                </div>
                <div className="col-6 col-md-3 burger-navigation-item">
                  <Badge small>в разработке</Badge>
                  <Link href={Events.route} passHref={true}>
                    <a >{Events.title}</a>
                  </Link>
                </div>
                <div className="col-6 col-md-3 burger-navigation-item">
                  <Badge small>в разработке</Badge>
                  <Link href={Cources.route} passHref={true}>
                    <a >{Cources.title}</a>
                  </Link>
                </div>
                <div className="col-6 col-md-3 burger-navigation-item">
                  <Link href={Members.route} passHref={true}>
                    <a >{Members.title}</a>
                  </Link>
                </div>
                <div className="col-6 col-md-3 burger-navigation-item">
                  <Badge small>в разработке</Badge>
                  <Link href={Companies.route} passHref={true}>
                    <a >{Companies.title}</a>
                  </Link>
                </div>
                <div className="col-6 col-md-3 burger-navigation-item">
                  <Badge small>в разработке</Badge>
                  <Link href={Projects.route} passHref={true}>
                    <a >{Projects.title}</a>
                  </Link>
                </div>
                <div className="col-6 col-md-3 burger-navigation-item">
                  <Badge small>в разработке</Badge>
                  <Link href={About.route} passHref={true}>
                    <a >{About.title}</a>
                  </Link>
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
          .burger-navigation-item,
          .navigation-item {
            position: relative;
          }
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
  
            z-index: 5;
  
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
            left: -25px; top: -300px;
            width: 110%; height: 750px;
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
  
          @media screen and (max-width: 1199px) {
            .line {
              width: 115%;
              height: 600px;
              top: -250px;
            }
            .navigation-logo {
              display: block;
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
            height: 550px;
            top: -200px;
            left: -70px;
          }
        }
        @media screen and (max-width: 767px) {
          header {
            margin-bottom: 0;
            padding-top: 50px;
          }
          .line {
            height: 350px;
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
          header {
            padding-top: 75px;
          }
          .line {
            top: -65px;
            height: 200px
          }
        }
          `}</style>
      </header>}
    </AuthContext.Consumer>
  )
}

export default withRouter(Header);