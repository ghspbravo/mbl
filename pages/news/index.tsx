import React, { ReactElement } from 'react'
import Layout from '../../components/Layout';
import NewsItem from '../../components/News/NewsItem';
import Breadcrumbs from '../../components/Breadcrumbs';
import Pages from '../../constants/pages';
import Head from 'next/head'

interface Props {

}

const newsMock: {
  id: number,
  title: string,
  createdDate: string,
  previewSrc: string
}[] = new Array(12).fill({
  id: 0,
  title: 'Выпускники + Эндаумент = Молодежная бизнес лига',
  createdDate: '12 ноября 2019',
  previewSrc: 'https://picsum.photos/200/200'
})

export default function News({ }: Props): ReactElement {
  return (
    <Layout>
      <Head>
        <title>Новости</title>
      </Head>
      <section>
        <div className="container">
          <Breadcrumbs pages={[{ title: Pages.News.title }]} />

          <h1>Новости</h1>

          <div className="row">
            {newsMock.map(item => <div key={item.id} className="col-lg-6 col-12 mb-5">
              <NewsItem content={item} />
            </div>)}
          </div>
        </div>
      </section>
    </Layout>
  )
}
