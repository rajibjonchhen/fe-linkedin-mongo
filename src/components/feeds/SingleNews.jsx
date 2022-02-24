import React, { useEffect } from "react";
import { Row, Button, Modal, Form, Dropdown } from "react-bootstrap";
import "./style.css";
import { parseISO, format } from "date-fns";
// import PostDropDown from "./PostDropDown";
import { useState } from "react";
import { StylesContext } from "@material-ui/styles";
import { BsImage, BsEmojiSmile } from 'react-icons/bs'
import { BiLike } from 'react-icons/bi'
import AddEditComment from "./newFeedsComponent/AddEditComment";
import DisplayComment from "./newFeedsComponent/DisplayComment";
import { GiLinkedRings } from "react-icons/gi";
import Likes from "./newFeedsComponent/Likes";
import PostEditDropdown from "./newFeedsComponent/PostEditDropdown";

function SingleNews({ post, fetchData, profile }) {
  const [addPost, setAddPost] = useState(false);
  const [showComment, setShowComment] = useState(false)
  const [showReations, setShowReations] = useState(false)
  const showAddPost = () => setAddPost(true);
  const closeAddPost = () => setAddPost(false);

  const [postId, setPostId] = useState();
  const [text, setText] = useState();

  useEffect(() => {
    setPostId(post._id);
    setText(post.text);
  }, []);

  const handleDeletePost = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_PROD_URL}/posts/` + postId,
        {
          method: "DELETE"
        }
      );

      if (response.ok) {
        setAddPost(false);
        fetchData();
      } else if (response.status === 401)
        alert("You Can not Delete others post");
      else {
        console.log("delete error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdatePost = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_PROD_URL}/posts/` + postId,
        {
          method: "PUT",
          body: JSON.stringify({
            text: text,
          }),
          headers: {
            "Content-Type": "application/json"
          },
        }
      );
      if (response.status === 401) alert("you can not update others post");
      if (response.ok) {
        closeAddPost();
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (id) => {
    showAddPost();
  };
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      style={{ color: "black" }}
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      {/* &#x25bc; */}
    </a>
  ));

  const handleLike = async() => {
    const response = await fetch(`${process.env.REACT_APP_PROD_URL}/posts/${post._id}/likes`)
  }

  // forwardRef again here!
  // Dropdown needs access to the DOM of the Menu to measure it
  const CustomMenu = React.forwardRef(
    ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
      const [value, setValue] = useState("");

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <div className="mx-3 d-flex justify-content-center"></div>
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value)
            )}
          </ul>
        </div>
      );
    }
  );

  return (
    <div>{post &&
      <Row
        className=" start-post-div px-4 pt-4 pb-2 flex-column mb-2"
        style={{ width: "550px" }}
      >
        <div>
          <div className="d-flex flex-column">
            <div className="d-flex  flex-column">
              <div className="d-flex align-items-center mb-3">
                <img
                  className="nav-profile-image-1"
                  src={post.user.image}
                  alt=""
                ></img>
                <div className="ml-3">
                  <p
                    className="mb-n1 mt-n2"
                    style={{ fontSize: "14px", fontWeight: "600" }}
                  >
                    <a
                      href={"/OtherUser/" + post.user._id}
                      style={{
                        color: "black",
                      }}
                    >
                      {post.user.name} {post.user.surname}
                    </a>
                    <i className="bi bi-dot ml-auto"></i> 1st
                  </p>
                  <p className="mb-n1" style={{ fontSize: "12px" }}>
                    {post.user.title}
                  </p>
                  <p className="mb-n1" style={{ fontSize: "10px" }}>
                    {format(parseISO(post.updatedAt), "MMMM do yyyy | HH:mm")}
                    <i className="bi bi-dot"></i> <i className="bi bi-globe2"></i>
                  </p>
                </div>
                <div>
                  <PostEditDropdown CustomToggle={CustomToggle} CustomMenu={CustomMenu} showAddPost={showAddPost} />
                </div>
              </div>
              <div>
                <p className="w-100">{post.text}</p>
              </div>
              <div>
                <hr />
                <div className='text-left w-100' >
                  <p onClick={(e) => setShowReations(true)}><span className='likes'><BiLike /></span><span style={{ display: post.likes.length ? 'block' : 'none' }}>{post.likes.length}</span></p>
                  <div className='pAbsolute w-100 modal-box' style={{display: post.likes.length>0 && showReations ? "block" : "none"}}>
                    <Likes post={post} setShowReations={setShowReations}/>
                  </div>
                </div>
                <hr />
                <div className="d-flex justify-content-between px-2 like-comment-share-save">
                  <p
                    onClick={() => {
                      var x = document
                        .querySelectorAll(".bi-hand-thumbs-up")
                        .forEach((item) => {
                          item.style.color = "blue";
                        });
                    }}
                  >
                    <i
                      id="bi-hand-thumbs-up"
                      className="bi bi-hand-thumbs-up mr-2"
                      style={{ color: "grey", fontSize: "20px" }}
                      onClick={(e) => handleLike(e) }
                    ></i>
                    Like
                  </p>
                  <p onClick={(e) => setShowComment(true)}>
                    <i
                      className="bi bi-chat-dots mr-2"
                      style={{ color: "grey", fontSize: "20px" }}
                    ></i>
                    Comment
                  </p>
                  <p>
                    <i
                      style={{ color: "grey", fontSize: "20px" }}
                      className="bi bi-arrow-return-right mr-2"
                    ></i>
                    Share
                  </p>
                  <p>
                    <i
                      style={{ color: "grey", fontSize: "20px" }}
                      className="bi bi-send-fill mr-2"
                    ></i>
                    Send
                  </p>
                </div>
              </div>
            </div>
          </div>
          <hr />
          {/* add comment section */}
          <div style={{ display: showComment ? 'block' : 'none' }} >
            {/* comment box */}
            {profile && <AddEditComment profile={profile} post={post} />}
            {/* display comments */}
            {/* {post && post.comments.map(comment => <DisplayComment comment={comment}/>)} */}
          </div>
        </div>
      </Row>
    }
      <Modal show={addPost} onHide={closeAddPost}>
        <Modal.Dialog className="w-100 border-0 px-3">
          <Modal.Header closeButton>
            <Modal.Title>
              Updated Post of
              <a
                href={"/OtherUser/" + post.user._id}
                style={{
                  color: "black",
                }}
              >
                {" "}
                {post.user.name} {post.user.surname}
              </a>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>What do you want to talk about?</Form.Label>
                <Form.Control
                  className="w-100 shadow-none border-0"
                  as="textarea"
                  required
                  value={text}
                  // onChange={e => setPost(e.target.value)}
                  rows={4}
                  onChange={(e) => setText(e.target.value)}
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
                </div>
                <div>
                  <Button
                    variant="danger"
                    className="shadow-none modal-post-btn-delete border-0"
                    onClick={handleDeletePost}
                  >
                    Delete
                  </Button>
                  <Button
                    className="shadow-none modal-post-btn border-0"
                    onClick={handleUpdatePost}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </Form>
          </Modal.Body>
        </Modal.Dialog>
      </Modal>
    </div>
  );
}
export default SingleNews;
