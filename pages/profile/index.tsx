import React, { ReactElement } from 'react'
import Layout, { AuthContext } from '../../components/Layout'
import Head from 'next/head'

import Pages from '../../constants/pages';
import Tag from '../../components/Tag';

interface Props {

}

export default function Login({ }: Props): ReactElement {

  const buttons = () => <div>
    <div className="mt-3">
      <button disabled className="primary w-100">создать мероприятие</button>
    </div>
    <div className="mt-3">
      <button disabled className="primary w-100">создать программу</button>
    </div>
    <div className="mt-3">
      <button disabled className="primary w-100">создать проект</button>
    </div>
    <div className="mt-3">
      <button disabled className="w-100">редактировать профиль</button>
    </div>
  </div>

  return (
    <Layout>
      <Head>
        <title>{Pages.Profile.title}</title>
      </Head>

      <AuthContext.Consumer>
        {({ isAuth, currentUser }) => <section>
          <div className="container">
            <h1 className="m-align-center">{Pages.Profile.header}</h1>

            {isAuth
              ? <div className="row">
                <div className="d-none d-lg-block col-lg-4">
                  <img className="responsive" src={currentUser.photo} alt="Фотография человека" />

                  <div className="mt-4">
                    {buttons()}
                  </div>
                </div>
                <div className="col-lg-8">
                  <h1>{currentUser.name}</h1>

                  <div className="row no-gutters mb-5">
                    <div className="mb-2">
                      {currentUser.roles?.map(role => <div key={role.id} className="mr-2">
                        <Tag>{role.name}</Tag>
                      </div>)}
                    </div>
                  </div>

                  <div className="d-lg-none mb-4">
                    <img className="responsive mx-auto" style={{ maxWidth: "350px" }} src={currentUser.photo} alt="Фотография человека" />
                  </div>

                  <div className="row mb-3">
                    <div className="col-lg-4 col-xl-3 col-md-6 text"><b>Дата рождния:</b></div>
                    <div className="col-lg-8 col-xl-9 col-md-6 text">28 сентября 1995 г.</div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-4 col-xl-3 col-md-6 text"><b>Место учебы:</b></div>
                    <div className="col-lg-8 col-xl-9 col-md-6 text">Уральский Федеральный Университет</div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-4 col-xl-3 col-md-6 text"><b>Место работы:</b></div>
                    <div className="col-lg-8 col-xl-9 col-md-6 text">
                      Business Consulting Group, бизнес-консультант, с 2017 г.
                    <br /> Строй-Сервис, менеджер по продажам, 2016 - 2017 гг.
                  </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-4 col-xl-3 col-md-6 text"><b>Интересы:</b></div>
                    <div className="col-lg-8 col-xl-9 col-md-6 text">Маркетинг, Бизнес-консалтинг, IT</div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-4 col-xl-3 col-md-6 text"><b>Навыки:</b></div>
                    <div className="col-lg-8 col-xl-9 col-md-6 text">Продажи, Нетворкинг, Публичные выступления, Проджект-менеджмент, Маркетинг, Реклама, Бизнес-консультирование, Коучинг</div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-lg-4 col-xl-3 col-md-6 text"><b>Интересы и достижения:</b></div>
                    <div className="col-lg-8 col-xl-9 col-md-6 text">Моя цель — повысить качество малого бизнеса в России. Поэтому я основал компанию, оказывающую консалтинговые услуги. Я регулярно повышаю уровень своего образования — прохожу развивающие программы, участвую в образовательных проектах, посещаю лекции и мастер-классы.</div>
                  </div>

                  <div className="d-lg-none">
                    {buttons()}
                  </div>
                </div>

              </div>
              : <div>
                Загрузка данных...
            </div>}
          </div>
        </section>}
      </AuthContext.Consumer>
    </Layout>
  )
}
