import React, { ReactElement } from 'react'
import Layout from '../../components/Layout';
import Breadcrumbs from '../../components/Breadcrumbs';
import Pages from '../../constants/pages';
import { useRouter } from 'next/router'
import Head from 'next/head'
import Colors from '../../constants/colors';

interface Props {

}

export default function NewsSingle({ }: Props): ReactElement {
  const router = useRouter();
  const { id: newsId } = router.query;
  return (
    <Layout>
      {/* Load font for this page only */}
      <Head>
        <title>Новости | Выпускники + Эндаумент = Молодежная бизнес лига</title>
        <link href="https://fonts.googleapis.com/css?family=Montserrat:600&display=swap" rel="stylesheet"></link>
        </Head>

      <section>
        <div className="container">
          <Breadcrumbs pages={[
            { title: Pages.News.title, href: Pages.News.route },
            { title: 'Выпускники + Эндаумент = Молодежная бизнес лига' }
          ]} />

          <div className="col-lg-8 col-md-10 col-12 news">
            <h1 className="news__title">Выпускники + Эндаумент = Молодежная бизнес лига</h1>

            <div className="news__annotation mb-md-5 mb-4">
              20 июля 2019 года с 10.00 до 16.00 в Точке кипения Ельцин Центра состоялось открытие «Молодежной бизнес лиги».
            </div>

            <div className="news__body">
              <p>news id: {newsId}</p>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit, neque dolorum porro aliquam vero provident qui perspiciatis rerum, reprehenderit exercitationem aut minus ad in dolore distinctio ipsam debitis! Error, voluptatem!</p>
            </div>

          </div>

        </div>
        <style jsx>{`
          .news__annotation {
            font-weight: 600;
            padding-left: 30px;

            border-left: 10px solid ${Colors.Acsent};
            line-height: 1.5;
          }
          `}</style>
      </section>
    </Layout>
  )
}