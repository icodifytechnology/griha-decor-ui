import Head from "next/head";
import { useEffect, useState } from "react";

import settings from "@data/settings";
import Layout from "@components/layout";
import ShopProductsFeed from "@components/shop";
import EmptyProduct from "@components/ui/empty";
import Breadcrumb from "@components/ui/breadcrumb";
import { useGetAllProductByCategory } from "src/reactQuery/product";
import { useParams } from "next/navigation";
import { getProductTransformResponse } from "@utils/product";

const CollectionPage = () => {
  const params = useParams();
  const [collection, setCollection] = useState(null);
  const { data } = useGetAllProductByCategory(params?.slug);

  useEffect(() => {
      const res = getProductTransformResponse(data?.results, params?.slug);
      setCollection(res);
  }, [data, params?.slug]);

  return (
    <Layout>
      <Head>
        <title>{collection?.title + " Products :: " + settings?.title}</title>
        <meta name="description" content={settings?.title} />
      </Head>

      <Breadcrumb
        py={[40, 80]}
        mb={[60, null, 100]}
        pageTitle={collection?.title}
      />

      {collection?.products?.edges?.length > 0 ? (
        <ShopProductsFeed products={collection?.products?.edges} />
      ) : (
        <EmptyProduct />
      )}
    </Layout>
  );
};

export default CollectionPage;
