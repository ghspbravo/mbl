import React, { ReactElement } from 'react'
import Layout from '../../components/Layout';
import Breadcrumbs from '../../components/Breadcrumbs';
import Pages from '../../constants/pages';
import Head from 'next/head'
import Colors from '../../constants/colors';
import { isoFetcher } from '../../constants/fetcher';
import Api from '../../constants/api';
import { NewsSingleFormatter, newsItem } from '../../constants/formatters/newsFormatter';
import { Status } from '../../constants/formatters/rootFormatter';
import Link from 'next/link';
import parse from 'html-react-parser';

interface Props {
  status: number,
  body: newsItem
}

export default function NewsSingle({ status, body }: Props): ReactElement {

  return status === Status.success
    ? (
      <Layout>
        {/* Load font for this page only */}
        <Head>
          <title>{Pages.News.title} | {body.title}</title>
          <link href="https://fonts.googleapis.com/css?family=Montserrat:600&display=swap" rel="stylesheet"></link>
        </Head>

        <section>
          <div className="container">
            <Breadcrumbs pages={[
              { title: Pages.News.title, href: Pages.News.route },
              { title: body.title }
            ]} />

            <div className="col-lg-8 col-md-10 col-12 news">
              <h1 className="news__title">{body.title}</h1>

              <div className="news__annotation mb-md-5 mb-4">
                {body.announce}
              </div>

              <div className="news__body">
                {parse(body.content)}
              </div>

              <div className="news__date mt-5">{body.date}</div>

            </div>

          </div>
          <style jsx>{`
          .news__annotation {
            font-weight: 600;
            padding-left: 30px;

            border-left: 10px solid ${Colors.Acsent};
            line-height: 1.5;
          }
          .news__date {color: ${Colors.TextDark}}
          `}</style>
        </section>
      </Layout>
    )
    : (<Layout>
      <div className="container">
        <h1>Неопознанная новость</h1>
        <p>Не удалось загрузить новость. Обновите страницу или <Link href='/' passHref>
          <a>перейдите на главную</a>
        </Link></p>
      </div>
    </Layout>)
}

NewsSingle.getInitialProps = async (context) => {
  const { id: newsId } = context.query;

  // NEWS
  const newsResponse = isoFetcher.fetch(Api.NewsSingle, {
    params: {
      id: newsId
    }
  });
  const newsFormatter = new NewsSingleFormatter(),
    newsItem = await newsFormatter.format(newsResponse);

  const props = {
    status: newsItem.status,
    body: newsItem.body
  };

  return props;
}