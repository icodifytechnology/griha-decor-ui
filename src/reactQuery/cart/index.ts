import { useMutation, useQueryClient } from "react-query";
import { apiEndpoint } from "src/reactQuery/config";
import { getQueryOnly } from "src/reactQuery/common";
import useToast from "src/hooks/useToast";
import { AuthorizedService } from "src/utils/axios";
import { NextPageContext } from "next";

export const cartQueryKey = "cartQueryKey";
export const orderQueryKey = "orderQueryKey";

// Cart
export const useGetCart = (
	params: any = null,
	queryclient: any = null,
	ctx: NextPageContext | null = null,
	config: any = {}
) => {
	return getQueryOnly(
		params,
		queryclient,
		cartQueryKey,
		apiEndpoint.cart,
		ctx,
		config
	);
};

export const useAddToCart = () => {
	const queryClientUse = useQueryClient();
	const { success, error } = useToast();
	return useMutation(
		(body: any) =>
			new AuthorizedService()
				.postForm(apiEndpoint.cart, body)
				.then((res: any) => res.data),
		{
			onSuccess: (response: any) => {
				success("Added to cart.");
			},
			onError: (err: any) => {
				error(err?.data?.message ?? 'Someting wrong!')
			},
			onSettled: () => {
				queryClientUse.refetchQueries(cartQueryKey);
			},
		}
	);
};

export const useRemoveFromCart = () => {
	const queryClientUse = useQueryClient();
	const { success, error } = useToast();
	return useMutation(
		(id: any) =>
			new AuthorizedService()
				.postForm(apiEndpoint.removeCart, { id })
				.then((res: any) => res),
		{
			onSuccess: (data) => {
				success("Removed from cart.");
			},
			onError: (err: any) => {
				if (typeof err?.data?.message != "object") {
					error(err?.data?.message ?? 'Someting wrong!');
				}
			},
			onSettled: () => {
				queryClientUse.refetchQueries(cartQueryKey);
			},
			// retry: 3
		}
	);
};

export const useCartCheckout = () => {
	const queryClientUse = useQueryClient();
	const { success, error } = useToast();
	return useMutation(
		(body: any) =>
			new AuthorizedService()
				.postForm(apiEndpoint.checkout, body)
				.then((res: any) => res),
		{
			onSuccess: (data) => {
				queryClientUse.refetchQueries(cartQueryKey);
			},
			onError: (err: any) => {
				if (typeof err?.data?.message != "object") {
					error(err?.data?.message ?? 'Someting wrong!');
				}
			},
			onSettled: () => {
				queryClientUse.refetchQueries(cartQueryKey);
			},
			// retry: 3
		}
	);
};

export const useEsewaCartCheckout = () => {
	const queryClientUse = useQueryClient();
	const { error } = useToast();
	return useMutation(
		(body: any) =>
			new AuthorizedService()
				.postForm(apiEndpoint.esewaSuccess, body)
				.then((res: any) => res),
		{
			onSuccess: (data) => {
				queryClientUse.refetchQueries(cartQueryKey);
			},
			onError: (err: any) => {
				if (typeof err?.data?.message != "object") {
					error(err?.data?.message ?? 'Someting wrong!');
				}
			}
		}
	);
};

export const useKhaltiCartCheckout = () => {
	const queryClientUse = useQueryClient();
	const { error } = useToast();
	return useMutation(
		(body: any) =>
			new AuthorizedService()
				.postForm(apiEndpoint.khaltiSuccess, body)
				.then((res: any) => res),
		{
			onSuccess: (data) => {
				queryClientUse.refetchQueries(cartQueryKey);
			},
			onError: (err: any) => {
				if (typeof err?.data?.message != "object") {
					error(err?.data?.message ?? 'Someting wrong!');
				}
			},
			onSettled: () => {
				queryClientUse.refetchQueries(cartQueryKey);
			},
		}
	);
};

export const useCartCheckoutComplete = () => {
	const queryClientUse = useQueryClient();
	const { success, error } = useToast();
	return useMutation(
		(body: any) =>
			new AuthorizedService()
				.postForm(apiEndpoint.checkoutComplete, body)
				.then((res: any) => res),
		{
			onSuccess: (data) => {
				success("Product order successfully.");
			},
			onError: (err: any) => {
				if (typeof err?.data?.message != "object") {
					error(err?.data?.message ?? 'Someting wrong!');
				}
			},
			onSettled: () => {
				queryClientUse.refetchQueries(cartQueryKey);
			},
			// retry: 3
		}
	);
};

export const useCartCoupon = () => {
	const queryClientUse = useQueryClient();
	const { success, error } = useToast();
	return useMutation(
		(body: any) =>
			new AuthorizedService()
				.postForm(apiEndpoint.validate_coupon, body)
				.then((res: any) => res.data),
		{
			onSuccess: (data) => {
				// success("Coupon applied successfully.");
			},
			onError: (err: any) => {
				if (typeof err?.data?.message != "object") {
					error(err?.data?.message ?? 'Someting wrong!');
				}
			},
			onSettled: () => {
				queryClientUse.refetchQueries(cartQueryKey);
			},
			// retry: 3
		}
	);
};


export const useGetOrder = (
	params: any = null,
	queryclient: any = null,
	ctx: NextPageContext | null = null,
	config: any = {}
) => {
	return getQueryOnly(
		params,
		queryclient,
		orderQueryKey,
		apiEndpoint.myOrder,
		ctx,
		config
	);
};
