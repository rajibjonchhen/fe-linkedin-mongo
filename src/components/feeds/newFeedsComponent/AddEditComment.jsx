import { useState } from 'react';
import {BsImage, BsEmojiSmile} from 'react-icons/bs'

function AddEditComment({profile, post}) {

    const [comment, setComment] = useState({
        comment:'',
        user:profile._id
    }) 


    const handleComment = (e) => {
        e.target.preventDefault()
        if(e.target.key !== 13){
            setComment({comment:e.target.value})
        } else {
            addComment()
        }
    }


    const addComment = async() => {
        const response = await fetch(`${process.env.React_APP_PROD_URL}/posts/${post._id}/comments`,{
            method:'POST',
            body:JSON.stringify(comment),
                headers:{
                    "Content-Type":"application/json"
                }
            })
        if(response.ok){
            let data  = await response.json()
            console.log(data)
        }
    } 


    return ( 
        <div className="d-flex justify-content-between align-items-center">
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

                    value = {comment.comment}
                    onChange = {(e)=> handleComment(e)}
                    placeholder="Add a comment"
                    />
                    <div className='d-flex justify-content-around ' style={{position:'absolute', width:'60px',top:'5px' , right:'10px', fontSize:'22px', color:'rgb(102,102,102)'}}>
                        <span className='round-hover px-2' ><BsEmojiSmile/></span>
                        <span className='round-hover px-2'><BsImage/></span>
                    </div>
            </div>
        </div>
     );
}

export default AddEditComment;