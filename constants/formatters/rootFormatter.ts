import moment from "moment";

export enum Status {
  success = 0,
  error = 1,
  critical = 9,
  
  loading = 10
};

export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return moment(date).format('LL');
}

export default class Formatter {
  protected status: number;
  protected body: any;

  protected responseHandle(fetchPromise: Promise<Response>) {
    return fetchPromise.then(response => {
      const status = response.status;
      switch (status) {
        case 200:
          this.status = Status.success
          return response.json();

        case 500:
          this.status = Status.critical
          return 'Критическая ошибка сервера. Корректная работа сайта невозможна.';

        default:
          this.status = Status.error
          return response.json();
      }
    }).then((contents: any) => {
      // if error message exists
      if (contents.error) {
        this.body = contents.error
      }
      // pass to other formatter
      return contents;
    }).catch((err) => {
      alert('Ошибка парсинга ответа от сервера')
    })
  }

}