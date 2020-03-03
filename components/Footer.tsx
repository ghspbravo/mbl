import React, { ReactElement } from 'react'
import Pages from '../constants/pages'


import logo from '../assets/logo_horizontal.svg';

import cbo from '../assets/credits-cbo.svg';
import fund from '../assets/credits-fund.svg';
import koriphey from '../assets/credits-koriphey.svg';
import mybusiness from '../assets/credits-mybusiness.svg';
import Icon from './Icon';
import Badge from './Badge';


function Footer(): ReactElement {
  const { News, Events, Cources, About, Members, Companies, Projects } = Pages
  return (
    <footer>
      <section className="inverted">
        <div className="container">

          <div className="row">
            <div className="col-md-7">
              <div className="row">
                <div className="col-6 col-xl-3 col-md-4">
                  <a className="footer-nav-item" href={News.route}>
                    {News.title}</a>
                </div>
                <div className="col-6 col-xl-3 col-md-4">
                  <a className="footer-nav-item" href={Events.route}>
                    <Badge small>В разработке</Badge>
                    {Events.title}</a>
                </div>
                <div className="col-6 col-xl-3 col-md-4">
                  <a className="footer-nav-item" href={Cources.route}>
                    <Badge small>В разработке</Badge>
                    {Cources.title}</a>
                </div>
                <div className="col-6 col-xl-3 col-md-4">
                  <a className="footer-nav-item" href={About.route}>
                    <Badge small>В разработке</Badge>
                    {About.title}</a>
                </div>
                <div className="col-6 col-xl-3 col-md-4">
                  <a className="footer-nav-item" href={Members.route}>
                    {Members.title}</a>
                </div>
                <div className="col-6 col-xl-3 col-md-4">
                  <a className="footer-nav-item" href={Companies.route}>
                    <Badge small>В разработке</Badge>
                    {Companies.title}</a>
                </div>
                <div className="col-6 col-xl-3 col-md-4">
                  <a className="footer-nav-item" href={Projects.route}>
                    <Badge small>В разработке</Badge>
                    {Projects.title}</a>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className=" mt-3 mt-md-0 row no-gutters justify-content-md-end justify-content-center">

                <a href="#" className="social-item">
                  <Icon size={35} name="ei-sc-facebook" />
                </a>

                <a href="#" className="ml-3 social-item">
                  <Icon size={35} name="ei-sc-vk" />
                </a>

                <a href="#" className="ml-3 social-item">
                  <Icon size={35} name="ei-sc-youtube" />
                </a>

                <a href="#" className="ml-3 social-item">
                  <Icon size={35} name="ei-sc-instagram" />
                </a>

              </div>
            </div>
          </div>

          <div className="row no-gutters mt-4">
            <object className="d-none d-md-block" style={{ pointerEvents: 'none' }} type="image/svg+xml" data={logo} />

            <div className="ml-md-auto row no-gutters align-items-center">
              <span>Идея:</span>
              <a target="_blank" className="ml-md-3 ml-2" href="https://cbo.ru/">
                <object id="credits-cbo" style={{ pointerEvents: 'none' }} type="image/svg+xml" data={cbo} />
              </a>
              <a target="_blank" className="ml-md-3 ml-2" href="https://koriphey.ru/">
                <object id="credits-koriphey" style={{ pointerEvents: 'none' }} type="image/svg+xml" data={koriphey} />
              </a>
              <a target="_blank" className="ml-md-3 ml-2" href="#">
                <object id="credits-mybusiness" style={{ pointerEvents: 'none' }} type="image/svg+xml" data={mybusiness} />
              </a>
              <a target="_blank" className="ml-md-3 ml-2" href="#">
                <object id="credits-fund" style={{ pointerEvents: 'none' }} type="image/svg+xml" data={fund} />
              </a>
            </div>

            <div className="d-md-none mt-4 col-12">
              <object style={{ pointerEvents: 'none' }} type="image/svg+xml" data={logo} />
            </div>
          </div>

        </div>
        <style jsx>{`
          @media screen and (max-width: 576px) {
            #credits-cbo {
              width: 68px;
            }
            #credits-koriphey {
              width: 32px;
            }
            #credits-mybusiness {
              width: 61px;
            }
            #credits-fund {
              width: 31px;
            }
          }
          .social-item { 
            background-color: white;
            transition: background-color 0.3s ease-in-out;

            padding-left: 2px;
            padding-right: 2px;
            
            border-radius: 50%;
          }
          .social-item:hover {
            background-color: rgba(255, 255, 255, 0.8);
          }
          section {
            padding-top: 25px;
            padding-bottom: 35px;
          }
        .footer-nav-item {
          position: relative;
          display: inline-block;
          padding-top: 10px;
          padding-bottom: 10px;
          color: white;
        }
        .footer-nav-item:hover {
          text-decoration-color: white;
          color: white;
        }
        `}</style>

      </section>
    </footer>
  )
}

export default Footer
