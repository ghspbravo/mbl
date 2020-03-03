import Formatter from "./rootFormatter";
import { AxiosPromise } from "axios";

export class CommonFormatter extends Formatter {
  constructor() {
    super();
  }

  async formatRoles(fetchPromise: AxiosPromise<any>) {
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

  async formatSkills(fetchPromise: AxiosPromise<any>) {
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