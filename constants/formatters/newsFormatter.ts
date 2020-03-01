import Formatter, { formatDate } from "./rootFormatter";

import pass from '../../assets/pass.png';

interface newsItemApi {
  announce: string,
  content: string,
  image: string | null,
  id: number,
  title: string,
  imagePreview: string | null,
  createdAt: string
}

export interface newsItem {
  id: number,
  announce: string,
  content: string,
  title: string,
  date: string
}

export class NewsSingleFormatter extends Formatter {
  constructor() {
    super();
  }

  async format(fetchPromise: Promise<Response>) {
    await this.responseHandle(fetchPromise)
      .then(contents => {
        if (this.status > 0) {
          if (!this.body) {
            this.body = 'Ошибка загрузки новости'
          }
          return;
        }
        const newsItem: newsItemApi = contents;

        const { id, announce, content, title, createdAt } = newsItem;
        const result: newsItem = {
          id, title,
          announce, content,
          date: formatDate(createdAt)
        }
        this.body = result;
      });

    return {
      status: this.status,
      body: this.body
    }
  }
}

interface shortNewsApi {
  id: number,
  title: string,
  imagePreview: string | null,
  createdAt: string
}

export interface shortNews {
  id: number,
  title: string,
  preview: string | null,
  date: string
}

export class NewsListFormatter extends Formatter {
  constructor() {
    super();
  }

  async format(fetchPromise: Promise<Response>) {
    await this.responseHandle(fetchPromise)
      .then(contents => {
        if (this.status > 0) {
          if (!this.body) {
            this.body = 'Ошибка загрузки новостей'
          }
          return;
        }
        const newsList: shortNewsApi[] = contents.items;

        this.body = {
          hasNext: contents.isExistNextPage,
          news: newsList.map(newsItem => {
            const { id, title, imagePreview, createdAt } = newsItem;
            return {
              id, title,
              preview: imagePreview || pass,
              date: formatDate(createdAt)
            }
          })
        }
      });

    return {
      status: this.status,
      body: this.body
    }
  }
}