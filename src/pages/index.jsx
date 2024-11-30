import Head from "next/head";
import Layout from "@components/layout";
import settings from "@data/settings.json";
import LatestBlog from "@components/blog/posts";
import Promotions from "@components/promotions";
import Categories from "@components/categories";
import sliderData from "@data/slider/home-1.json";
import { ProductsTab } from "@components/product/feed";
import { SliderOne as Slider } from "@components/slider";
import { useGetBannerImages } from "src/reactQuery/home";
import { useGetProductCollection } from "src/reactQuery/product";
import { useEffect, useState } from "react";
import { getProductTransformResponse } from "@utils/product";

const Home = () => {
  const { data: sliderData } = useGetBannerImages();
  const [products, setProducts] = useState([]);
  const { data } = useGetProductCollection();

  useEffect(() => {
    if (data?.featured_products) {
      const response = getProductTransformResponse(data.featured_products);
      setProducts(response?.products?.edges);
    }
  }, [data]);

  return (
    <Layout>
      <Head>
        <title>{settings?.title}</title>
        <meta name="description" content={settings?.description} />
      </Head>

      <Slider animate={true} data={sliderData} />

      <Categories />

      <ProductsTab products={products} limit={8} />

      <Promotions />

      <LatestBlog posts={[]} pt={[60, 60, 100]} />
    </Layout>
  );
};

// export const getStaticProps = async () => {
//     const blogsData = await client(blogsQuery(4)),
//         blogs = blogsData?.blogs?.edges[0]?.node?.articles?.edges,
//         productsData = await client(productsQuery(50)),
//         products = productsData?.products?.edges,
//         collectionsData = await client(collectionsQuery(5)),
//         collections = collectionsData?.collections?.edges;

//     return {
//         props: {
//             blogs,
//             products,
//             collections,
//         },
//         revalidate: 60,
//     };
// };

export default Home;
