import { Ajax } from "./Ajax";
import { NEXT_PUBLIC_API_BASE_URL } from "src/utils/constant";
import { getToken } from "../getToken";

class AuthorizedService extends Ajax {
  constructor(ctx = null) {
    const token = getToken(ctx).accessToken;
    super({
      headerAuthorization: () => {
        if (token) return token;
        return null;
      },
      baseURL: NEXT_PUBLIC_API_BASE_URL,
      context: ctx,
    });
  }
}

class AxiosService extends Ajax {
  constructor(ctx = null) {
    super({
      baseURL: NEXT_PUBLIC_API_BASE_URL,
      context: ctx,
    });
  }
}

export { AxiosService, AuthorizedService };
