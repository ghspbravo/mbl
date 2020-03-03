import Formatter from "./rootFormatter";

export class RecoverFormatter extends Formatter {
  constructor() {
    super();
  }

  async format(fetchPromise: Promise<Response>) {
    await this.responseHandle(fetchPromise)
      .then(contents => {
        if (this.status > 0) { return; }
        this.body = "Письмо для сброса пароля отправлено на почту"
      })

    return {
      status: this.status,
      body: this.body
    }
  }
}

export class SignInFormatter extends Formatter {
  constructor() {
    super();
  }

  async format(fetchPromise: Promise<Response>) {
    await this.responseHandle(fetchPromise)
      .then(contents => {
        if (this.status > 0) { return; }
        this.body = contents
      })

    return {
      status: this.status,
      body: this.body
    }
  }
}