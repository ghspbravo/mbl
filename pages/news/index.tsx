import React, { ReactElement, useState, useEffect } from 'react'
import Layout from '../../components/Layout';
import NewsItem from '../../components/News/NewsItem';
import Breadcrumbs from '../../components/Breadcrumbs';
import Pages from '../../constants/pages';
import Head from 'next/head'
import { fetcher } from '../../constants/fetcher';
import Api from '../../constants/api';
import { NewsListFormatter, shortNews } from '../../constants/formatters/newsFormatter';
import { Status } from '../../constants/formatters/rootFormatter';

interface Props {

}

let currentPage = 0;

export default function News({ }: Props): ReactElement {
  const [status, statusSet] = useState(Status.loading)
  const [message, messageSet] = useState('')
  const [newsList, newsListSet] = useState([])
  const [hasNext, hasNextSet] = useState(false);

  const hasNews = status === Status.success;

  const fetchNews = async () => {
    const newsResponse = fetcher.fetch(Api.NewsList, {
      params: {
        count: 12,
        page: ++currentPage
      }
    })

    const newsFormatter = new NewsListFormatter(),
      newsListResponse = await newsFormatter.format(newsResponse);

    if (newsListResponse.status > 0) {
      statusSet(newsListResponse.status);
      messageSet(newsListResponse.body);
    } else {
      statusSet(newsListResponse.status);
      newsListSet([
        ...newsList,
        ...newsListResponse.body.news
      ]);
      hasNextSet(newsListResponse.body.hasNext);
    }
  }
  useEffect(() => {
    fetchNews();
  }, [])

  const onLoadMoreHandler = () => {
    fetchNews();
  }
  return (
    <Layout>
      <Head>
        <title>Новости</title>
      </Head>
      <section>
        <div className="container">
          <Breadcrumbs pages={[{ title: Pages.News.title }]} />

          <h1>Новости</h1>

          {hasNews
            ? <div>
              {(newsList as shortNews[]).length > 0
                ? <div className="row">
                  {(newsList as shortNews[]).map(item => <div key={item.id} className="col-lg-6 col-12 mb-5">
                    <NewsItem content={item} />
                  </div>)}
                </div>
                : <div>
                  Нет новостей
                </div>}

              {hasNext && <div onClick={onLoadMoreHandler} className="align-center">
                <button className="mx-auto">показать еще</button>
              </div>}
            </div>
            : <div>
              {status === Status.loading ? 'Загрузка новостей...' : message}
            </div>}
        </div>
      </section>
    </Layout>
  )
}