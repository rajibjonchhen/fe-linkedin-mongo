import React from "react";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import "./style.css";
import { useState, useEffect } from "react";
import SingleNews from "./SingleNews";
import Loader from "./Loader";

function NewsFeed({ profile }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState("");
  const [addPost, setAddPost] = useState(false);
  const showAddPost = () => setAddPost(true);
  const closeAddPost = () => setAddPost(false);
  const [postValue, setPostValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [endPost, setEndPost] = useState(10);

  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handlePostValue = (e) => {
    setPostValue(e.target.value);
    setSubmitted(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_PROD_URL}/posts`,
      );
      if (response.ok) {
        let dataRes = await response.json();
        closeAddPost();
        dataRes.post.map((item,i) => {
          const isLiked = (item.likes.find(like => like._id === profile._id))? true:false
          dataRes.post[i].isLiked = isLiked
         })
        console.log( dataRes.post.isLiked)
        setPosts(dataRes.post);
        console.log(dataRes)
        setIsLoading(false);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const addPostFunction = async (e) => {
    e.preventDefault();
    closeAddPost();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_PROD_URL}/posts`,
        {
          method:'POST',
          body: JSON.stringify({
            text: text,
            user : profile._id
          }),
          headers:{
            'Content-Type':'application/json'
          }
        }
      );
      if (res.ok) {
        let data = await res.json();
        console.log(data);
        fetchData();
        // setPost(data.stringify());
      } else {
        console.error("fetch failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const showMore = (number) => {
    if (posts.length > 10) {
      setEndPost(endPost + 10);
    }
  };

  const showLess = (number) => {
    if (endPost > 10) {
      setEndPost(endPost - 10);
    }
  };

  return (
    <div>
      <Col className="d-flex flex-column align-items-center">
        <Row className="mt-2 start-post-div px-4 pt-4 pb-2 flex-column">
          <div className="d-flex justify-content-between align-items-center">
            <img
              className="nav-profile-image-1 mr-3"
              src={profile.image}
              alt="user image"
            />
            <div>
              <Button
                onClick={showAddPost}
                className="button start-post-btn second-btn-outline w-100 shadow-none"
                style={{
                  paddingLeft: "10px",
                  paddingRight: "270px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  textAlign: "left",
                  fontWeight: "normal",
                }}
              >
                Start a post
              </Button>
            </div>
          </div>
          <div className="d-flex justify-content-between px-4 mt-2 post-post-icons-div">
            <p>
              <i className="bi mr-2 bi-image-fill"></i>Photo
            </p>
            <p>
              <i className="bi mr-2 bi-youtube"></i>Video
            </p>
            <p>
              <i className="bi mr-2 bi-calendar-event"></i>Event
            </p>
            <p>
              <i className="bi mr-2 bi-newspaper"></i>Write Article
            </p>
          </div>
        </Row>

        <hr
          style={{
            width: "500px",
            color: "#000000",
            backgroundColor: "#000000",
            height: 0.5,
            borderColor: "#000000",
          }}
        />
        <Row className="px-3 pb-2 flex-column mb-5">
          {isLoading ? (
            <Loader />
          ) : (
            posts
              .reverse()
              .slice(0, endPost)
              .map((post) => {
                return (
                  <SingleNews
                    key={post._id}
                    post={post}
                    fetchData={fetchData}
                    profile={profile}
                  />
                );
              })
          )}
        </Row>
        <div>
          <span
            className="mr-4 mb-4 p-2 round-border grey-border pointer"
            onClick={(e) => showMore(+10)}
          >
            Show More
          </span>
          <span
            className="mr-4 mb-4 p-2 round-border grey-border pointer"
            onClick={(e) => showLess(-10)}
          >
            Show Less
          </span>
        </div>
      </Col>
      <Modal show={addPost} onHide={closeAddPost}>
        <Modal.Dialog className="w-100 border-0 px-3">
          <Modal.Header closeButton>
            <Modal.Title>Create a post</Modal.Title>
          </Modal.Header>
          <Modal.Header>
            <Modal.Title className="d-flex align-items-center">
              <img
                className="nav-profile-image-1 mr-3"
                src={profile.image}
                alt=""
              />
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control className="mt-3 shadow-none" as="select">
                  <option>Anyone</option>
                  <option>Connections</option>
                  <option>Anyone + Twitter</option>
                  <option>Group Members</option>
                </Form.Control>
              </Form.Group>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="px-1">
            <Form onSubmit={addPostFunction}>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>What do you want to talk about????</Form.Label>
                <Form.Control
                  className="w-100 shadow-none border-0"
                  as="textarea"
                  required
                  onChange={(e) => setText(e.target.value)}
                  rows={4}
                />
              </Form.Group>
              <div className="d-flex justify-content-between px-3">
                <div className="d-flex justify-content-between align-items-center">
                  <i className="bi mr-2 bi-image-fill"></i>
                  <i className="bi mr-2 bi-youtube"></i>
                  <i className="bi mr-2 bi-calendar-event"></i>
                  <i className="bi mr-2 bi-briefcase-fill"></i>
                  <i className="bi mr-2 bi-patch-check-fill"></i>
                  <i className="bi mr-2 bi-bar-chart-line"></i>
                  <i className="bi mr-2 bi-three-dots"></i>
                  <div
                    style={{ borderRight: "1px solid black", height: "30px" }}
                  ></div>
                  <i class="bi mx-2 bi-chat-dots"></i>
                  <i>Anyone</i>
                </div>
                <Button
                  onClick={addPostFunction}
                  className="shadow-none modal-post-btn border-0"
                  disabled={!text}
                >
                  Post
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal.Dialog>
      </Modal>
    </div>
  );
}

export default NewsFeed;
