import { useRouter } from "next/router";
import { useMutation } from "react-query";

import { ACCESS_TOKEN, USER_DATA } from "src/utils/constant";
import storage from "src/utils/storage";
import { apiEndpoint } from "src/reactQuery/config";
import useToast from "src/hooks/useToast";
import { AuthorizedService, AxiosService } from "src/utils/axios";
import { NextPageContext } from "next";
import { getQueryOnly } from "src/reactQuery/common";

export const userQueryKey = "userQuery";

// login
export const useLogin = () => {
	const { success, error } = useToast();
	return useMutation(
		(body: any) =>
			new AxiosService()
				.postForm(apiEndpoint.login, body)
				.then((res: any) => res.data),
		{
			onSuccess: (response: any) => {
				storage.setCookie(ACCESS_TOKEN, response.access_token);
				storage.setCookie(USER_DATA, response.user);
				success("You're logged in.");
			},
			onError: (err: any) => {
				error(err?.data?.message ?? 'Someting wrong!')
			},
		}
	);
};

// register
export const useRegister = () => {
	const { success, error } = useToast();
	return useMutation(
		(body: any) =>
			new AuthorizedService()
				.postForm(apiEndpoint.register, body)
				.then((res: any) => res.data),
		{
			onSuccess: (response: any) => {
				// storage.setCookie(ACCESS_TOKEN, response.access_token)
				if (response === 'login')
					success("Register successfully. Login to Continue");
				else
					success("Otp send to your email or phone.");
			},
			onError: (err: any) => {
				error(err?.data?.message ?? 'Someting wrong!')
			},
			// retry: 3
		}
	);
};

export const useLogout = () => {
	const { success, error } = useToast();
	const router = useRouter();
	return useMutation(
		(body: any) =>
			new AuthorizedService()
				.post(apiEndpoint.logout, body)
				.then((res: any) => res.data),
		{
			onSuccess: () => {
				storage.removeCookie(ACCESS_TOKEN);
				storage.removeCookie(USER_DATA);
				router.push('/');
				setTimeout(() => {
					success("Logout successfully.");
				}, 1000);
			},
			onError: (err: any) => {
				error(err?.data?.message ?? 'Someting wrong!')
			},
		}
	);
};


export const useUpdateProfile = () => {
	const { success, error } = useToast();
	return useMutation(
		(body: any) =>
			new AuthorizedService()
				.postForm(apiEndpoint.updateProfile, body)
				.then((res: any) => res.data),
		{
			onSuccess: (response: any) => {
				// storage.setCookie(ACCESS_TOKEN, response.access_token)
				success("Profile updated successfully.");
			},
			onError: (err: any) => {
				error(err?.data?.message ?? 'Someting wrong!')
			},
			// retry: 3
		}
	);
};

export const useChangePassword = () => {
	const { success, error } = useToast();
	return useMutation(
		(body: any) =>
			new AuthorizedService()
				.postForm(apiEndpoint.changePassword, body)
				.then((res: any) => res.data),
		{
			onSuccess: (response: any) => {
				// storage.setCookie(ACCESS_TOKEN, response.access_token)
				success("Password changed successfully.");
			},
			onError: (err: any) => {
				error(err?.data?.message ?? 'Someting wrong!')
			},
			// retry: 3
		}
	);
};

export const useGetUserProfile = (
	params: any = null,
	queryclient: any = null,
	ctx: NextPageContext | null = null,
	config: any = {}
) => {
	return getQueryOnly(params, queryclient, userQueryKey, apiEndpoint.user, ctx, config);
};


export const useVerifyProfile = () => {
	const { success, error } = useToast();
	return useMutation(
		(body: any) =>
			new AuthorizedService()
				.postForm(apiEndpoint.verifyProfile, body)
				.then((res: any) => res.data),
		{
			onSuccess: (response: any) => {
				// storage.setCookie(ACCESS_TOKEN, response.access_token)
				success("User verified successfully.");
			},
			onError: (err: any) => {
				error(err?.data?.message ?? 'Someting wrong!')
			},
			// retry: 3
		}
	);
};

export const useGetOTP = () => {
	const { success, error } = useToast();
	return useMutation(
		(body: any) =>
			new AxiosService()
				.postForm(apiEndpoint.getOTP, body)
				.then((res: any) => res.data),
		{
			onSuccess: (response: any) => {
				// storage.setCookie(ACCESS_TOKEN, response.access_token)
				success('Otp code send to your phone');
			},
			onError: (err: any) => {
				error(err?.data?.message ?? 'Someting wrong!')
			},
			// retry: 3
		}
	);
};

export const useGoogleLogin = () => {
	const { success, error } = useToast();
	return useMutation(
		(body: any) =>
			new AxiosService()
				.post(`${apiEndpoint.socialLogin}/${body.provider}`, body)
				.then((res: any) => res.data),
		{
			onSuccess: (response: any) => {
				storage.setCookie(ACCESS_TOKEN, response.access_token);
				storage.setCookie(USER_DATA, response.user);
				success("You're logged in.");
			},
			onError: (err: any) => {
				error(err?.data?.message)
			},
		}
	);
};