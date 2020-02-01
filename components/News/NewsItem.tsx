import React, { ReactElement } from 'react'
import Link from 'next/link';
import Colors from '../../constants/colors';
import Pages from '../../constants/pages';

interface Props {
  content: {
    id: number,
    title: string,
    createdDate: string,
    previewSrc: string
  }
}

export default function NewsItem({ content }: Props): ReactElement {
  const { id, title, previewSrc, createdDate } = content;

  return <Link href={`${Pages.News.route}/${id}`} as={`${Pages.News.route}/${title}`} prefetch={false} passHref={true}>
    <a className="clear news interactive row no-gutters">
      <div className="news__preview">
        <img src={previewSrc} alt="Изображение к новости" />
      </div>
  
      <div className="col ml-4 ml-md-5">
        <div className="news__title">{title}</div>
        <div className="news__date mt-4">{createdDate}</div>
      </div>
  
      <style jsx>{`
        .news:hover .news__title {
          text-decoration: underline;
        }
        .news__preview img {
          width: 150px;
          height: 150px;
          object-fit: cover;
        }
        .news__title {font-size: 1.25em;}
        .news__date {color: ${Colors.TextDark};}

        @media screen and (max-width: 576px) {
          .news__preview img {
            width: 80px;
            height: 80px;
          }
        }
        `}</style>
    </a>
  </Link>
}
