import React from 'react'
import nextCookie from "next-cookies";
import Cookies from 'js-cookie'
import { setAuthToken, fetcher } from "./fetcher";
import Api from "./api";
import { ProfileFormatter } from './formatters/profileFormatter';

/**
 * search token in cookies and filling fetchers with it
 * @returns {boolean} TRUE on success and FALSE if token not found
 */
export const getTokenFromCtx = ctx => {
  const { token } = nextCookie(ctx);

  if (!token) {
    return false;
  }
  setAuthToken(token);
  return token;
};

export const getToken = () => {
  const token = Cookies.get('token');

  if (!token) {
    return false;
  }
  setAuthToken(token);
  return token;
};

const initialCurrentUser = {
  isAuth: false,
  body: null
}

export let currentUserCtx = { ...initialCurrentUser }

export const setToken = async (token, expires = 30) => {
  Cookies.set('token', token, { expires: expires })
  setAuthToken(token);
  currentUserCtx.isAuth = true;

  const profileFormatter = new ProfileFormatter()

  const apiResponse = fetcher.fetch(Api.GetCurrentProfile);

  const response = await profileFormatter.formatCurrentUser(apiResponse)
  if (response.status > 0) {
    removeToken();
  } else {
    const userInfo = response.body;
    currentUserCtx.body = userInfo;
  }

}

export const removeToken = () => {
  Cookies.remove('token')
  setAuthToken("")
  currentUserCtx = { ...initialCurrentUser };
}