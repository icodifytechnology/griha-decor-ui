import { ACCESS_TOKEN, USER_DATA } from "./constant";
import storage from "./storage";
import cookies from "next-cookies";

export function getToken(ctx = null) {
    const accessToken = ctx ? cookies(ctx)?.[ACCESS_TOKEN] : storage.getCookie(ACCESS_TOKEN);
    const userData = ctx ? cookies(ctx)?.[USER_DATA] : storage.getCookie(USER_DATA);
    const isLoggedIn = accessToken ? true : false;
    return { isLoggedIn, accessToken, userData };
}