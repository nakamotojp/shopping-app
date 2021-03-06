import * as React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../_reducer";
import { LOAD_MAIN_POSTS_REQUEST } from "../../../_reducer/post";
import { Col, Card, Row } from "antd";
import { RocketOutlined } from "@ant-design/icons";
import ImageSlider from "../../utils/ImageSlider";

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const MainLabel = styled.div`
  text-align: center;
`;

const CardContent = styled.div`
  display: flex;
  height: 300px;
  justify-content: center;
  align-items: center;
`;

const CardBox = styled(Card)`
  max-width: 300px;
`;

const { Meta } = Card;

const LandingPage: React.FC = () => {
  const dispatch = useDispatch();
  const { mainPosts } = useSelector((state: RootState) => state.post);
  const { productInfo } = mainPosts;
  React.useEffect(() => {
    dispatch({
      type: LOAD_MAIN_POSTS_REQUEST
    });
  }, []);

  const renderCards = productInfo.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24}>
        <CardBox
          key={index}
          hoverable={true}
          cover={<ImageSlider images={product.images} />}>
          <Meta title={product.title} description={`$${product.price}`} />
        </CardBox>
      </Col>
    );
  });

  return (
    <Main>
      <MainLabel>
        <h2>
          Let's get gaming gear <RocketOutlined />
        </h2>
      </MainLabel>
      {mainPosts?.productInfo.length === 0 ? (
        <CardContent>
          <h2>No post yet...</h2>
        </CardContent>
      ) : (
        <div>
          <Row gutter={[16, 16]}>{renderCards}</Row>
        </div>
      )}
      <br />
      <br />
    </Main>
  );
};

export default LandingPage;
