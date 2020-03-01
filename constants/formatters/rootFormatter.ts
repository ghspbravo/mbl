import moment from "moment";
import { nameRegexp } from "../regexp";

export enum Status {
  success = 0,
  error = 1,
  critical = 9,

  loading = 10
};

export function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return moment(date).format('LL');
}

export function formatName(nameStr: string) {
  const results = nameStr.match(nameRegexp)
  if (!results) {
    return {
      name: '',
      surname: '',
      middlename: ''
    }
  } else {
    return {
      name: results[2].trim(),
      surname: results[1].trim(),
      middlename: results[3].trim()
    }
  }
}

export default class Formatter {
  protected status: number;
  protected body: any;

  protected responseHandle(fetchPromise: Promise<Response>) {
    return fetchPromise.then(response => {
      const contentType = response.headers.get("content-type");
      const isJson = contentType && contentType.indexOf("application/json") !== -1
      const status = response.status;
      switch (status) {
        case 200:
          this.status = Status.success
          return isJson ? response.json() : response.text();

        case 500:
          this.status = Status.critical
          return 'Критическая ошибка сервера. Корректная работа сайта невозможна.';

        default:
          this.status = Status.error
          return isJson ? response.json() : response.text();
      }
    }).then((contents: any) => {
      // if error message exists
      if (this.status > 0) {
        this.body = contents?.error || "Ошибка запроса данных от сервера"
      }
      // pass to other formatter
      return contents;
    }).catch((err) => {
      this.status = Status.error;
      this.body = 'Ошибка парсинга ответа от сервера';
    })
  }

}