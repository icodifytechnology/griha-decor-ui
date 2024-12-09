import cn from "classnames";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Loader from "@components/ui/loader";
import EmptyProduct from "@components/ui/empty";
import ProductCard from "@components/product/card";
import SectionTitle from "@components/ui/section-title";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Col, Container, Row } from "@bootstrap-styled/v4";
import { ProductNav } from "@components/product/feed/style";
import {
  getFeaturedProducts,
  getProductTransformResponse,
  getSaleProducts,
  getTendingProducts,
} from "@utils/product";

const productNav = [
  {
    key: "new",
    title: "New Arrival",
  },
  {
    key: "featured_products",
    title: "Featured",
  },
];

const ProductsTab = ({ products, limit = 8, className }) => {
  const [data, setData] = useState([]);

  const onHandler = (event) => {
    const target = event.target;
    const key = target.dataset.key;
    switch (key) {
      case "featured":
        handleSetData(products.featured_products);
        break;
      default:
        handleSetData(products.new_products);
    }
  };

  const handleSetData = (data) => {
    const response = getProductTransformResponse(data);
    setData(response?.products?.edges);
  };

  useEffect(() => {
    if (products) {
      handleSetData(products.new_products);
    }
  }, [products]);

  return (
    <div className={cn(className)}>
      <Container>
        <Row>
          <Col xs={12}>
            <SectionTitle
              mb={42}
              align="center"
              title="Our Products"
              content="Include stylish sofa beds, accessories, and furnishings designed with high-quality solutions"
            />
          </Col>
        </Row>

        {!products && <Loader />}

        <Tabs>
          <ProductNav mb={[30, null, 55]} align="center">
            <TabList>
              {productNav.map((item) => (
                <Tab
                  key={item?.key}
                  data-key={item?.key}
                  onClick={(event) => onHandler(event)}
                >
                  {item?.title}
                </Tab>
              ))}
            </TabList>
          </ProductNav>

          <Row className="products-grid-mobile mtn-30">
            {data?.length > 0 ? (
              data?.map((product) => (
                <Col xs={6} md={4} lg={3} key={product?.node?.id}>
                  <ProductCard product={product?.node} />
                </Col>
              ))
            ) : (
              <div className="w-100">
                <EmptyProduct />
              </div>
            )}
          </Row>
        </Tabs>
      </Container>
    </div>
  );
};

ProductsTab.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductsTab;
