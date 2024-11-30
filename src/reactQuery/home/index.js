import { getQueryOnly } from "src/reactQuery/common";
import { apiEndpoint } from "src/reactQuery/config";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import useToast from "src/hooks/useToast";
import { AuthorizedService } from "src/utils/axios";

// QUERY KEYS
export const bannerQueryKey = "bannerImages";
export const aboutUsQueryKey = "aboutUs";
export const contactUsQueryKey = "contactUs";
export const searchQueryKey = "search";
export const configurationQueryKey = "configuration";
export const pageQueryKey = "page";

// HOOKS
export const useGetBannerImages = () => {
	return useQuery({
		queryKey: [bannerQueryKey],
		queryFn: () => new AuthorizedService()
			.get(apiEndpoint.slider)
			.then((res) => res.data)
			.catch((err) => null),
	})
};

export const useGetAboutUs = () => {
	return useQuery({
		queryKey: [aboutUsQueryKey],
		queryFn: () => new AuthorizedService()
			.get(apiEndpoint.aboutUs)
			.then((res) => res.data)
			.catch((err) => null),
	})
};

export const useGetConfiguration = () => {
	return useQuery({
		queryKey: [configurationQueryKey],
		queryFn: () => new AuthorizedService()
			.get(apiEndpoint.getConfiguration)
			.then((res) => res.data)
			.catch((err) => null),
	})
};

export const useGetSearch = () => {
	return useQuery({
		queryKey: [searchQueryKey],
		queryFn: () => new AuthorizedService()
			.get(apiEndpoint.search)
			.then((res) => res.data)
			.catch((err) => null),
	})
};


export const useGetPage = (slug) => {
	return useQuery({
		queryKey: [pageQueryKey],
		queryFn: () => new AuthorizedService()
			.get(apiEndpoint.pages + "/" + slug)
			.then((res) => res.data)
			.catch((err) => null),
	})
};

export const useContactUs = () => {
	const queryClientUse = useQueryClient();
	const { success, error } = useToast();
	return useMutation(
		(body) =>
			new AuthorizedService()
				.postForm(apiEndpoint.contactUs, body)
				.then((res) => res),
		{
			onSuccess: (data) => {
				success("Successfull.");
			},
			onError: (err) => {
				if (typeof err?.data?.message != "object") {
					error(err?.data?.message ?? 'Something wrong!');
				}
			},
			onSettled: () => {
				queryClientUse.refetchQueries(contactUsQueryKey);
			},
			// retry: 3
		}
	);
};

export const useAddNewsLetter = () => {
	const { success, error } = useToast();
	return useMutation(
		(body) =>
			new AuthorizedService()
				.postForm(apiEndpoint.newsletter, body)
				.then((res) => res.data),
		{
			onSuccess: (response) => {
				// storage.setCookie(ACCESS_TOKEN, response.access_token)
				success("Newsletter subscribed.");
			},
			onError: (err) => {
				error(err?.data?.message ?? 'Something wrong!')
			},
			// retry: 3
		}
	);
};

export const useGetQuotation = () => {
	const { success, error } = useToast();
	return useMutation(
		(body) =>
			new AuthorizedService()
				.postForm(apiEndpoint.quotations, body)
				.then((res) => res.data),
		{
			onSuccess: (response) => {
				// storage.setCookie(ACCESS_TOKEN, response.access_token)
				success("Quotation requested!");
			},
			onError: (err) => {
				error(err?.data?.message ?? 'Something wrong!')
			},
			// retry: 3
		}
	);
};