import { Button, Form, Modal } from "react-bootstrap";

function EditDeletePost({post, closeAddPost, addPost, text, setText, handleDeletePost, handleUpdatePost}) {
    return ( <Modal show={addPost} onHide={closeAddPost}>
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
      </Modal> );
}

export default EditDeletePost;