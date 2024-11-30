import Head from "next/head";
import settings from "@data/settings";
import { useRouter } from "next/router";
import Layout from "@components/layout";
import Loader from "@components/ui/loader";
import Breadcrumb from "@components/ui/breadcrumb";
import { Fragment, useState, useEffect } from "react";
import ProductDetailsContent from "@components/product/details";
import RelatedProducts from "@components/product/feed/related-products";
import ProductDescriptionReview from "@components/product/details/desc-review";
import { useParams } from "next/navigation";
import { useGetProductDetail } from "src/reactQuery/product";
import {
  getProductDetailTransformResponse,
  getProductTransformResponse,
} from "@utils/product";

const ProductDetailsPage = () => {
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState(null);
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useGetProductDetail(params?.slug);

  useEffect(() => {
    if (data) {
      const productDetail = getProductDetailTransformResponse(data.product);
      const products = getProductTransformResponse(data.related_product);
      setProduct(productDetail);
      setProducts(products.edges);
    }
  }, [data]);

  useEffect(() => {
    const handleStart = (url) =>
      url !== router.pathname ? setIsLoading(true) : setIsLoading(false);
    const handleComplete = () => setIsLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  return (
    <Layout>
      <Head>
        <title>{product?.title + " :: " + settings?.title}</title>
        <meta name="description" content={settings?.title} />
      </Head>

      <Breadcrumb
        py={[60, 80]}
        mb={[60, null, 100]}
        pageTitle={product?.title}
      />

      {isLoading ? (
        <Loader />
      ) : product && (
        <Fragment>
          <ProductDetailsContent product={product} />

          <ProductDescriptionReview product={product} mt={[55, null, 93]} />
{/* 
          <RelatedProducts
            products={products}
            tags={product?.tags}
            mt={[48, null, 85]}
            categories={product?.collections?.edges}
          /> */}
        </Fragment>
      )}
    </Layout>
  );
};

export default ProductDetailsPage;
