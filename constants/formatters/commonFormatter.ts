import Formatter from "./rootFormatter";

export class CommonFormatter extends Formatter {
  constructor() {
    super();
  }

  async formatRoles(fetchPromise: Promise<Response>) {
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

  async formatSkills(fetchPromise: Promise<Response>) {
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