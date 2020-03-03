import Formatter from "./rootFormatter";
import { AxiosPromise } from "axios";

export class RegistrationFormatter extends Formatter {
  constructor() {
    super();
  }

  async format(fetchPromise: AxiosPromise<any>) {
    await this.responseHandle(fetchPromise)
      .then(contents => {
        if (this.status > 0) { return; }
        this.body = contents;
      })

    return {
      status: this.status,
      body: this.body
    }
  }
}