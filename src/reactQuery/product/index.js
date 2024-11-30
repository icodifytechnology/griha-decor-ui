import { apiEndpoint } from "src/reactQuery/config";
import { useQuery } from "@tanstack/react-query";
import { AuthorizedService } from "@utils/axios";

// QUERY KEYS
export const productQueryKey = "product";
export const productDetailQueryKey = "productDetail";
export const productCollectionQueryKey = "productCollection";
export const productCategoryQueryKey = "productByCategory";
export const productAttributeQueryKey = "productAttribute";
export const siblingCategoryQueryKey = "siblingCategory";

export const useGetAllProduct = () => {
	return useQuery({
		queryKey: [productQueryKey],
		queryFn: () => new AuthorizedService()
			.get(apiEndpoint.product)
			.then((res) => res.data)
			.catch((err) => null),
	})
};

export const useGetProductCollection = () => {
	return useQuery({
		queryKey: [productCollectionQueryKey],
		queryFn: () => new AuthorizedService()
			.get(apiEndpoint.productCollection)
			.then((res) => res.data)
			.catch((err) => null),
	})
};


export const useGetProductDetail = (slug) => {
	const api = `${apiEndpoint.product}/${slug}`;
	return useQuery({
		enabled: slug ? true : false,
		queryKey: [productDetailQueryKey, slug],
		queryFn: () => new AuthorizedService()
			.get(api)
			.then((res) => res.data)
			.catch((err) => null),
	})
};

export const useGetAllProductByCategory = (slug) => {
	return useQuery({
		enabled: slug ? true : false,
		queryKey: [productCategoryQueryKey, slug],
		queryFn: () => new AuthorizedService()
			.get(`${apiEndpoint.categories}/${slug}`)
			.then((res) => res.data)
			.catch((err) => null),
	})
};

export const useGetAttributes = () => {
	return useQuery({
		queryKey: [productAttributeQueryKey],
		queryFn: () => new AuthorizedService()
			.get(apiEndpoint.attributes)
			.then((res) => res.data)
			.catch((err) => null),
	})
};

export const useGetSiblingCategory = () => {
	return useQuery({
		queryKey: [siblingCategoryQueryKey],
		queryFn: () => new AuthorizedService()
			.get(apiEndpoint.siblingCategory)
			.then((res) => res.data)
			.catch((err) => null),
	})
};
