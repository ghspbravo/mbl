// This page doesn't define `getInitialProps`.
// Next.js will export the page to HTML at build time with the loading state
// When the page is loaded in the browser SWR will fetch the data
// Using the defined fetcher function
import unfetch from 'unfetch'

// This page has defined `getInitialProps` to do data fetching.
// Next.js will execute `getInitialProps`
// It will wait for the result of `getInitialProps`
// When the results comes back Next.js will render the page.
// Next.js will do this for every request that comes in.
import isounfetch from 'isomorphic-unfetch'
import { API_BASE } from './api';

interface userOptions {
  method?: 'POST' | 'GET',
  headers?: any,
  body?: any,
  params?: any
}

class Api {
  private base: string;
  private token: string

  constructor() {
    this.base = API_BASE;
  }

  setToken(token: string) {
    this.token = token;
  }

  protected processFetchParams(path: string, options: userOptions) {
    if (options.params) {
      const paramsStr = Object.keys(options.params).reduce((result, key) => {
        const value = options.params[key]
        return `${result}${key}=${value}&`
      }, '?')
      path += paramsStr.slice(0, -1);
    }
    const fetchOptions: any = {
      method: options.method || "GET",
      headers: {}
    };
    if (options.body) {
      fetchOptions["body"] = options.body;
      fetchOptions.method = options.method || "POST"
    }
    if (options.headers) {
      fetchOptions["headers"] = options.headers;
    }
    if (this.token) {
      fetchOptions["headers"] = {
        ...fetchOptions.headers,
        Authorization: `Bearer ${this.token}`
      }
    }

    return {
      path: this.base + path,
      options: fetchOptions
    }
  }
}

class Fetcher extends Api {
  constructor() {
    super();
  }

  fetch(userPath: string, userOptions: userOptions = {}) {
    const { path, options } = this.processFetchParams(userPath, userOptions);
    return unfetch(path, options);
  }
}

class IsoFetcher extends Api {
  constructor() {
    super();
  }

  fetch(userPath: string, userOptions: userOptions = {}) {
    const { path, options } = this.processFetchParams(userPath, userOptions);
    return isounfetch(path, options);
  }
}


export const fetcher = new Fetcher();
export const isoFetcher = new IsoFetcher();

/**
 * set token in:
 * - Layout
 */
export function setAuthToken(token: string) {
  fetcher.setToken(token);
  isoFetcher.setToken(token);
}