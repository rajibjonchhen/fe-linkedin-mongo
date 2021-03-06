import React from "react";
import MyNavbar from "./MyNavbar";
import { Row, Col, Container } from "react-bootstrap";
import NewsFeed from "./NewsFeed";
import LeftSide from "./sidebars/LeftSide";
import RightSide from "./sidebars/RightSide";

import MyHeaderMain from "../profile/Header/MyHeaderMain";
import Footer from "../profile/Header/Footer";

function MyMainFeed({ profile }) {
  return (
    <div>
      <Row className="header-row-myFeed">
        <MyHeaderMain profile={profile} />
      </Row>
      <Container className="pt-5">
        <Row className="justify-content-center myFeeds-cols pt-4">
          <Col className="text-center" xs={12} sm={12} md={12} lg={3}>
            {profile && <LeftSide profile={profile} />}
          </Col>
          <Col className="px-4 newFeed-main-line-col" xs={12} sm={12} md={12} lg={6}>
            <NewsFeed profile={profile} />
          </Col>
          <Col  xs={12} md={12} lg={3}>
            <RightSide />
          </Col>
        </Row>
      </Container>

      <Row className="bottom-chat-row">
        <div className="bottom-cat-main-div d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img className="footer-message-img" src={profile.image} alt="" />
            <h6 className="mb-0">Messaging</h6>
          </div>
          <div className="d-flex align-items-center">
            <i className="text-dark mr-2 bi bi-three-dots"></i>
            <i className="text-dark mr-2 bi bi-pencil-square"></i>
            <i className="text-dark bi bi-caret-up"></i>
          </div>
        </div>
      </Row>
      <Footer />
    </div>
  );
}

export default MyMainFeed;

{
  /* <MyHeaderMain profile={profile}/>
      <Container>
        <Row className="justify-content-center">
          <Col className='text-center' md={3}>{profile && <LeftSide profile={profile} />}</Col>
          <Col className="px-4" md={6}>
          {profile &&  <NewsFeed profile={profile}/>}
          </Col>
          <Col md={4}>
            <RightSide/> */
}
