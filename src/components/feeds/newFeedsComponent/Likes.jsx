import { Modal } from "react-bootstrap";

function Likes({post, setShowReations}) {


    return ( 
        <Modal.Dialog>
      <Modal.Header closeButton onClick={() =>setShowReations(false)}>
        <Modal.Title>Reactions</Modal.Title>
      </Modal.Header>

      <Modal.Body className="d-flex flex-column text-left">
       {post && post.likes.map((user, i ) => <div key={i} style={{font:'10px'}}>

            <div className='d-flex'>
            <div className='round mr-3'>
                <img src={user.image} className='round-pic' alt='user who has reacted'/>
            </div>
            <div >
               <p>
                   {user.name}
                   {user.surname}
                </p> 
               <p>
                   {user.bio}
                </p> 
            </div>
            </div>
        </div>)}
      </Modal.Body>

      <Modal.Footer>
        
      </Modal.Footer>
    </Modal.Dialog>
     );
}

export default Likes;