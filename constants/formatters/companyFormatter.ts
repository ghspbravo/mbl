import Formatter from "./rootFormatter";

export class CompanyFormatter extends Formatter {
  constructor() {
    super();
  }

  async createCompany(fetchPromise: Promise<Response>) {
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

export default CompanyFormatter