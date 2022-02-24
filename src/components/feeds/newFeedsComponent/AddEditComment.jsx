import { useState } from 'react';
import {BsImage, BsEmojiSmile} from 'react-icons/bs'

function AddEditComment({profile, post, fetchComments}) {

    const [commentObj, setCommentObj] = useState({
        comment:'',
        user:profile._id
    }) 


   

    const addComment = async() => {
    const response = await fetch(`${process.env.REACT_APP_PROD_URL}/posts/${post._id}/comments`,{
            method:'POST',
            body:JSON.stringify(commentObj),
                headers:{
                    "Content-Type":"application/json"
                }
            })
        if(response.ok){
            let data  = await response.json()
            console.log(data)
            fetchComments()
            setCommentObj = {
                comment:'',
                user:profile._id
            }
        }
    } 


    return ( 
        <div>

        <div className="d-flex justify-content-between">
            <img
            className="nav-profile-image-1 mr-3"
            src={profile.image}
            alt="user image"
            />
            <div style={{position:'relative'}}>
                <input
                    className="button start-post-btn second-btn-outline w-100 shadow-none"
                    style={{
                        paddingLeft: "10px",
                        paddingRight: "270px",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        textAlign: "left",
                        fontWeight: "normal",
                    }}
                    value = {commentObj.comment}
                    onChange = {(e)=> setCommentObj({...commentObj, comment:e.target.value})}
                    placeholder="Add a comment"
                    />
                 <button style={{display:commentObj.comment?'block':'none'}}onClick={(e) => addComment(e)} className='post-btn'>Post</button>
                    <div className='d-flex justify-content-around ' style={{position:'absolute', width:'60px',top:'5px' , right:'10px', fontSize:'22px', color:'rgb(102,102,102)'}}>
                        <span className='round-hover px-2' ><BsEmojiSmile/></span>
                        <span className='round-hover px-2'><BsImage/></span>
                </div>
            </div>
        </div>
        </div>
     );
}

export default AddEditComment;