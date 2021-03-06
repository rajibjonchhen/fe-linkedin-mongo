import React, { useEffect } from "react";
import { Row, Button, Modal, Form, Dropdown } from "react-bootstrap";
import "./style.css";
import { parseISO, format, nextDay } from "date-fns";
// import PostDropDown from "./PostDropDown";
import { useState } from "react";
import { StylesContext } from "@material-ui/styles";
import { BsImage, BsEmojiSmile } from 'react-icons/bs'
import { BiLike } from 'react-icons/bi'
import AddEditComment from "./newFeedsComponent/AddEditComment";
import DisplayComment from "./newFeedsComponent/DisplayComment";
import { GiLinkedRings } from "react-icons/gi";
import {AiFillLike, AiOutlineLike} from 'react-icons/ai'
import Likes from "./newFeedsComponent/Likes";
import PostEditDropdown from "./newFeedsComponent/PostEditDropdown";
import EditDeletePost from "./newFeedsComponent/EditDeletePost";

function SingleNews({ post, fetchData, profile }) {
  const [addPost, setAddPost] = useState(false);
  const [showComment, setShowComment] = useState(false)
  const [showReations, setShowReations] = useState(false)
  const [comments, setComments] = useState([])
  const showAddPost = () => setAddPost(true);
  const closeAddPost = () => setAddPost(false);

  const [postId, setPostId] = useState();
  const [text, setText] = useState();

  useEffect(() => {
    setPostId(post._id);
    setText(post.text);
    fetchComments()
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
    const response = await fetch(`${process.env.REACT_APP_PROD_URL}/posts/${post._id}/likes`,{
      method: "POST",
      body: JSON.stringify({user:profile._id}),
      headers:{
        "Content-Type" : "application/json"
      }
    })
    if(response.ok){
      fetchData()
    }
  }

  const fetchComments = async() => {
    const response = await fetch(`${process.env.REACT_APP_PROD_URL}/posts/${post._id}/comments`)
    try {
      if(response.ok){
        let data = await response.json()
        setComments(data)
    } else{
      console.log('Error fetching comments')
    }
    } catch (error) {
      console.log(error)
    }
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
                />
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
                    <i className="bi bi-dot"/>1st
                  </p>
                  <p className="mb-n1" style={{ fontSize: "12px" }}>
                    {post.user.title}
                  </p>
                  <p className="mb-n1" style={{ fontSize: "10px" }}>
                    {format(parseISO(post.updatedAt), "MMMM do yyyy | HH:mm")}
                    <i className="bi bi-dot"/><i className="bi bi-globe2"/>
                  </p>
                </div>
                  <div className='ml-auto'>
                    <PostEditDropdown CustomToggle={CustomToggle} CustomMenu={CustomMenu} showAddPost={showAddPost} />
                  </div>
              </div>
              <div>
                <p className="w-100">{post.text}</p>
              </div>
              <div>
               
                <div className='d-flex justify-content-between text-left w-100  pb-1 border-bottom' style={{fontSize:'13px'}}>
                  <div className ='d-flex' onClick={(e) => setShowReations(true)} >
                    <span style={{ display: post.likes.length>0? 'block' : 'none',color:'rgb(208,231,255)' }} className='likes mr-1 flip-horizontally'><AiFillLike/></span>
                    <span style={{ display: post.likes.length>0? 'block' : 'none' }}>{post.likes.length}</span>
                  </div>
                  <div>
                   <span style={{display:comments.length>0? 'block':'none'}}>{comments.length} comments</span>
                  </div>
                  <div className='pAbsolute w-100 modal-box' style={{display: post.likes.length>0 && showReations ? "block" : "none"}}>
                    <Likes post={post} setShowReations={setShowReations}/>
                  </div>
                </div>
              
                <div className="d-flex justify-content-between px-2 pt-1 like-comment-share-save">
                  <p className='d-flex align-items-baseline'
                    onClick={() => 
                      handleLike()
                        }>
                    <span  className='flip-horizontally' style={{ color: "rgb(55,143,233)", fontSize: "20px", display:post.isLiked? "block":"none"}}><AiFillLike/></span>
                    <span className='flip-horizontally' style={{ color: "rgb(55,143,233)", fontSize: "20px", display:!post.isLiked? "block":"none"}}><AiOutlineLike/></span>
                    <span className='ml-1'>Like</span>
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
        
          {/* add comment section */}
          <div style={{ display: showComment ? 'block' : 'none' }} >
            {/* comment box */}
            {profile && <AddEditComment profile={profile} post={post} fetchComments={fetchComments}/>}
            {/* display comments */}
            <div>
            {comments && comments.map(comment => <DisplayComment key={comment._id} comment={comment}/>)}
            </div>
          </div>
        </div>
      </Row>
    }
{post && <EditDeletePost post={post} closeAddPost={closeAddPost} addPost={addPost} text={text} setText={setText} handleDeletePost={handleDeletePost} handleUpdatePost={handleUpdatePost}/>}    </div>
  );
}
export default SingleNews;
