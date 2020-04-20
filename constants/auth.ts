import React from "react";
import nextCookie from "next-cookies";
import Cookies from "js-cookie";
import { setAuthToken, fetcher } from "./fetcher";
import Api from "./api";
import { ProfileFormatter, userInterface } from "./formatters/profileFormatter";
import { AuthContext } from "../components/Layout";
import CompanyFormatter from "./formatters/companyFormatter";
import { Status } from "./formatters/rootFormatter";

/**
 * search token in cookies and filling fetchers with it
 * @returns {boolean} TRUE on success and FALSE if token not found
 */
export const getTokenFromCtx = (ctx) => {
	const { token } = nextCookie(ctx);

	if (!token) {
		return false;
	}
	setAuthToken(token);
	return token;
};

export const getToken = () => {
	const token = Cookies.get("token");

	if (!token) {
		return false;
	}
	setAuthToken(token);
	return token;
};

export const setToken = async (token, setAuthState, expires = 30) => {
	Cookies.set("token", token, { expires: expires });
	setAuthToken(token);

	const profileFormatter = new ProfileFormatter();

	const apiResponse = fetcher.fetch(Api.GetCurrentProfile);

	const response = await profileFormatter.formatUser(apiResponse);
	if (response.status > 0) {
		removeToken();
	} else {
		const userInfo: userInterface = response.body;
    if (userInfo.companyId !== undefined) {
			const companyFormatter = new CompanyFormatter();

			const companyApiResponse = fetcher.fetch(Api.CompanySingle, {
				params: { id: userInfo.companyId },
			});
			const companyResponse = await companyFormatter.companySingle(
				companyApiResponse
			);
			if (companyResponse.status === Status.success) {
				userInfo.company = companyResponse.body;
			}
		}
		setAuthState(userInfo);
	}
};

export const removeToken = (setAuthState = (arg) => null) => {
	Cookies.remove("token");

	setAuthToken("");
	setAuthState(null);
};
