import { withWidth } from "@material-ui/core";
import { useEffect, useState } from "react";

function DisplayComment({post}) {

    const [comments, setComments] = useState()

    useEffect(() => {
        fetchComments()
    })
    const fetchComments = async() => {
        const response = await fetch(`${process.env.REACT_APP_PROD_URL}/posts/${post._id}/comments`)
        if(response.ok){
            let data = await response.json()
            setComments(data)
        }
    }
    return ( 
        <div className='d-flex my-2 w-100'>
           {comments && comments.map( comment =><>
             <div>
                <img src={comment.user.image || "https://www.pavilionweb.com/wp-content/uploads/2017/03/man.png"} className="nav-profile-image-1 mr-3" alt='user who  comment'/>
            </div>
            <div className='p-2 w-100' style={{backgroundColor:'rgb(242,242,242)'}}>
                    <p>{comment.comment}</p>
            </div>
           </>
            )}
        </div>
     );
}

export default DisplayComment;