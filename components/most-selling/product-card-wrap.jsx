import { Row, Col } from "antd";
import ProductCard from "../product-card";

const ProductCardWrap = ({ products = [] }) => (
  <Row
    gutter={[
      {
        xs: 25,
        sm: 12,
        md: 45,
        lg: 45,
      },
      {
        xs: 25,
        sm: 12,
        md: 45,
        lg: 45,
      },
    ]}
  >
    {products &&
      products.length > 0 &&
      products.map((product, index) => (
        <Col key={index} xs={24}>
          <ProductCard data={product} />
        </Col>
      ))}
  </Row>
);

export default ProductCardWrap;
