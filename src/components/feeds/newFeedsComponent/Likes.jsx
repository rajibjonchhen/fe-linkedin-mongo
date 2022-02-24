import { Modal } from "react-bootstrap";

function Likes(post) {


    return ( 
        <Modal.Dialog>
      <Modal.Header closeButton>
        <Modal.Title>Reactions</Modal.Title>
      </Modal.Header>

      <Modal.Body className="d-flex flex-column text-left">
       {/* {post && post.likes.map(user => <div>
            <hr/>
            <div>
                <img src={user.image} alt='user who has reacted'/>
            </div>
            <div>
                {user.name}
            </div>
        </div>)} */}
      </Modal.Body>

      <Modal.Footer>
        
      </Modal.Footer>
    </Modal.Dialog>
     );
}

export default Likes;