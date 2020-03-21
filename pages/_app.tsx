import React from 'react'
import App from 'next/app'
import withYM from "next-ym";
import { Router } from 'next/router';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}

export default withYM("61175140", Router)(MyApp)