import Head from "next/head";
import Layout from "@components/layout";
import settings from "@data/settings.json";
import LatestBlog from "@components/blog/posts";
import Promotions from "@components/promotions";
import Categories from "@components/categories";
import sliderData from "@data/slider/home-2.json";
import {ProductsTab} from "@components/product/feed";
import {SliderTwo as Slider} from "@components/slider";

const HomeTwo = () => {
    return (
        <Layout bg="gray250">
            <Head>
                <title>{"Home 2 :: " + settings?.title}</title>
                <meta name="description" content={settings?.description}/>
            </Head>

            <Slider
                animate={true}
                data={sliderData}
                settings={{effect: "fade", speed: 1000}}
            />

            <Categories categories={[]}/>

            <ProductsTab products={[]} limit={8}/>

            <Promotions fluid={true}/>

            <LatestBlog posts={[]} pt={[60, 60, 100]}/>
        </Layout>
    );
};

export default HomeTwo;
