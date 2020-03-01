import Formatter from "./rootFormatter";

export class ProfileFormatter extends Formatter {
  constructor() {
    super();
  }

  async formatCurrentUser(fetchPromise: Promise<Response>) {
    // TODO: format current user
    await this.responseHandle(fetchPromise)
      .then(contents => {
        console.log(contents)
        if (this.status > 0) { return; }
        this.body = contents;
      })

    return {
      status: this.status,
      body: this.body
    }
  }
}