import { NextPageContext } from "next";
import { queryConfig } from "src/reactQuery/config";
import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthorizedService } from "src/utils/axios";

export const toJson = (res) => {
    if (typeof res === "object") {
        return JSON.parse(JSON.stringify(res));
    }
    return JSON.parse(JSON.stringify({}));
};

// get by slug
const getBySlugServer = async (
	filterParams,
	slug,
	queryClient,
	cacheKey,
	endpoint,
	ctx
) => {
	await queryClient.prefetchQuery([cacheKey, slug], async () => {
		const response = await new AuthorizedService(ctx)
			.get(`${endpoint}/${slug}`, filterParams)
			.catch((err) => null);
		return toJson(response?.data);
	});

	return queryClient;
};

export const getQueryBySlug = (
	filterParams = null,
	slug,
	queryClient = null,
	cacheKey,
	endpoint,
	ctx
) => {
	if (ctx)
		return getBySlugServer(
			filterParams,
			slug,
			queryClient,
			cacheKey,
			endpoint,
			ctx
		);
	else return getBySlugClient(filterParams, slug, cacheKey, endpoint);
};

//FOR OUR INTERNAL API
const getQueryServer = async (
	params,
	queryClient,
	cacheKey,
	endpoint,
	ctx
) => {
	await queryClient.prefetchQuery([cacheKey, params], async () => {
		const response = await new AuthorizedService(ctx)
			.get(endpoint, params)
			.catch((err) => null);
		return toJson(response?.data);
	});

	return queryClient;
};

export const getQueryClient = (
	params,
	cacheKey,
	endpoint,
	config = {},
) => {

	return useQuery(
		[cacheKey, params],
		() =>
			new AuthorizedService()
				.get(endpoint, params)
				.then((res) => res.data)
				.catch((err) => null),
		{ ...queryConfig, ...config }
	);
};

export const getQueryOnly = (
	params = null,
	queryClient = null,
	cacheKey,
	endpoint,
	ctx,
	config = {},
) => {
	if (ctx) return getQueryServer(params, queryClient, cacheKey, endpoint, ctx);
	else return getQueryClient(params, cacheKey, endpoint, config);
};

// get data infinite query
// get by slug

export const getDataInfiniteQuery = (
	slug,
	cacheKey,
	endpoint
) => {
	return useInfiniteQuery(
		[cacheKey, slug],
		({ pageParam = { page: 0, size: 5 } }) =>
			new AuthorizedService()
				.get(`${endpoint}/${slug}`, pageParam)
				.then((res) => res.data)
				.catch((err) => null),
		{
			getNextPageParam: (lastPage, pages) => {
				if (lastPage?.currentPage < lastPage?.totalPage)
					return { page: lastPage?.currentPage + 1, size: 5 };
				return false;
			},
		}
	);
};

export const getDataInfiniteQueryById = (
	slug,
	id,
	cacheKey,
	endpoint
) => {
	return useInfiniteQuery(
		[cacheKey, slug],
		({ pageParam = { page: 0, size: 5 } }) =>
			new AuthorizedService()
				.get(`${endpoint}/${id}`, pageParam)
				.then((res) => res.data)
				.catch((err) => null),
		{
			getNextPageParam: (lastPage, pages) => {
				if (lastPage?.currentPage < lastPage?.totalPage)
					return { page: lastPage?.currentPage + 1, size: 5 };
				return false;
			},
		}
	);
};


export const useCacheQueryData = (cacheKey, params = null) => {
	const queryClientUse = useQueryClient();

	return queryClientUse.getQueryData([cacheKey, params]);
};

