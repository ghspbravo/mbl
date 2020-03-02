import React, { ReactElement } from 'react'
import Layout, { AuthContext } from '../../components/Layout'
import Head from 'next/head'

import Pages from '../../constants/pages';
import Tag from '../../components/Tag';
import moment from 'moment';

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

                  {currentUser.birthday && <div className="row mb-3">
                    <div className="col-lg-4 col-xl-3 col-md-6 text"><b>Дата рождния:</b></div>
                    <div className="col-lg-8 col-xl-9 col-md-6 text">{moment(currentUser.birthday).format("LL")}</div>
                  </div>}
                  {currentUser.education && <div className="row mb-3">
                    <div className="col-lg-4 col-xl-3 col-md-6 text"><b>Место учебы:</b></div>
                    <div className="col-lg-8 col-xl-9 col-md-6 text">{currentUser.education}</div>
                  </div>}
                  {currentUser.workList?.length > 0 && <div className="row mb-3">
                    <div className="col-lg-4 col-xl-3 col-md-6 text"><b>Место работы:</b></div>
                    <div className="col-lg-8 col-xl-9 col-md-6 text">
                      {currentUser.workList.map((work, index) => <div key={index}>
                        {`${work.name}, ${work.end ? `${work.start} – ${work.end} гг.` : `с ${work.start} г.`}`}
                      </div>)}
                    </div>
                  </div>}
                  {currentUser.spheresList?.length > 0 && <div className="row mb-3">
                    <div className="col-lg-4 col-xl-3 col-md-6 text"><b>Интересы:</b></div>
                    <div className="col-lg-8 col-xl-9 col-md-6 text">{currentUser.spheresList.map(sphere => sphere.name).join(',')}</div>
                  </div>}
                  {currentUser.interests && <div className="row mb-3">
                    <div className="col-lg-4 col-xl-3 col-md-6 text"><b>Навыки:</b></div>
                    <div className="col-lg-8 col-xl-9 col-md-6 text">{currentUser.interests}</div>
                  </div>}
                  {currentUser.achievements && <div className="row mb-3">
                    <div className="col-lg-4 col-xl-3 col-md-6 text"><b>Интересы и достижения:</b></div>
                    <div className="col-lg-8 col-xl-9 col-md-6 text">{currentUser.achievements}</div>
                  </div>}

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
    </Layout >
  )
}
