import { withWidth } from "@material-ui/core";

function DisplayComment({comment}) {
    return ( 
        <div className='d-flex my-2 w-100'>
            <div>
                <img src={comment.user.image || "https://www.pavilionweb.com/wp-content/uploads/2017/03/man.png"} className="nav-profile-image-1 mr-3" alt='user who  comment'/>
            </div>
            <div className='p-2 w-100' style={{backgroundColor:'rgb(242,242,242)'}}>
                    <p>{comment.comment}</p>
            </div>
        </div>
     );
}

export default DisplayComment;