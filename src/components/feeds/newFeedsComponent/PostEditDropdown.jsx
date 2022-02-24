import { Dropdown } from "react-bootstrap";
import { StylesContext } from "@material-ui/styles";


function PostEditDropdown({showAddPost, CustomToggle, CustomMenu}) {
    return ( 
        <div className="ml-auto d-flex align-items-center">
               
        <Dropdown alignRight>
          <Dropdown.Toggle
            alignRight
            as={CustomToggle}
            id="dropdown-custom-components"
            style={{ color: "black !important" }}
          >
            <i className="bi bi-three-dots single-post-three-dots"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu
            style={{ width: "240px" }}
            as={CustomMenu}
            alignRight
          >
            <div className="post-dropdown">
              <div
                onClick={showAddPost}
                className="d-flex align-items-center justify-content-between px-3 py-2 mx-2"
              >
                <i class="bi bi-pencil-square"></i>
                <div>
                  <p
                    className="mb-0"
                    style={{ fontWeight: "600", fontSize: "12px" }}
                  >
                    Edit
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between px-3 py-2 mx-2">
                <i class="bi bi-download"></i>
                <div>
                  <p
                    className="mb-n1"
                    style={{ fontWeight: "600", fontSize: "12px" }}
                  >
                    Save
                  </p>
                  <p className="mb-0" style={{ fontSize: "10px" }}>
                    Save for later
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between px-3 py-2 mx-2">
                <i class="bi bi-link"></i>
                <div>
                  <p
                    className="mb-0"
                    style={{ fontWeight: "600", fontSize: "12px" }}
                  >
                    Copy link to post
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between px-3 py-2 mx-2">
                <i class="bi bi-code-slash"></i>
                <div>
                  <p
                    className="mb-n1"
                    style={{ fontWeight: "600", fontSize: "12px" }}
                  >
                    Embed this post
                  </p>
                  <p className="mb-0" style={{ fontSize: "10px" }}>
                    Copy and Paste embed to you site
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between px-3 py-2 mx-2">
                <i class="bi bi-flag-fill"></i>
                <div>
                  <p
                    className="mb-n1"
                    style={{ fontWeight: "600", fontSize: "12px" }}
                  >
                    Report this post
                  </p>
                  <p className="mb-0" style={{ fontSize: "10px" }}>
                    I don't want to see this post
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between px-3 py-2 mx-2">
                <i class="bi bi-ui-radios"></i>
                <div>
                  <p
                    className="mb-n1"
                    style={{ fontWeight: "600", fontSize: "12px" }}
                  >
                    Improve my feed
                  </p>
                  <p className="mb-0" style={{ fontSize: "10px" }}>
                    Get recommended source to follow
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between px-3 py-2 mx-2">
                <i class="bi bi-eye-fill"></i>
                <div>
                  <p
                    className="mb-n1"
                    style={{ fontWeight: "600", fontSize: "12px" }}
                  >
                    Who can see that post?
                  </p>
                  <p className="mb-0" style={{ fontSize: "10px" }}>
                    Visible to anyone on or off LinkedIn
                  </p>
                </div>
              </div>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
     );
}

export default PostEditDropdown;