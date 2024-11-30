import { NextPageContext } from "next";
import { getQueryOnly } from "src/reactQuery/common";
import { apiEndpoint } from "src/reactQuery/config";

// QUERY KEYS
export const blogQueryKey = "blog";
export const blogDetailQueryKey = "blogDetail";

export const useGetBlog = (
	params: any = null,
	queryclient: any = null,
	ctx: NextPageContext | null = null,
	config: any = {}
) => {
	return getQueryOnly(params, queryclient, blogQueryKey, apiEndpoint.blog, ctx);
};


export const useGetBlogDetail = (
	slug: string,
	queryclient: any = null,
	ctx: NextPageContext | null = null,
	config: any = {}
) => {
	const api = `${apiEndpoint.blog}/${slug}`;
	return getQueryOnly(null, queryclient, blogDetailQueryKey, api, ctx, config);
};
