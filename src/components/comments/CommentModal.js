import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";

const CommentModal = ({ modal, showCommentForm, comments, toggle }) => {
  console.log(comments[1]);

  //const [comments,setComments] = useState({comments: []});

  const expandTA = e => {
    document.getElementById(e.target.id).setAttribute("width", "80%");
  };

  const handleCommentSubmit = e => {
    e.preventDefault();
    console.log("submitting something");
  };

  return (
    <Fragment>
      <Modal
        isOpen={modal}
        toggle={showCommentForm}
        className="modal-dialog modal-lg"
      >
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody className="modal-content">
          <form onSubmit={e => handleCommentSubmit(e)}>
            <div>
              <textarea
                id="comment-ta"
                cols="20"
                rows="1"
                onFocus={e => expandTA(e)}
              />
            </div>
            <button>Save</button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={showCommentForm}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={showCommentForm}>
            Cancel
          </Button>
        </ModalFooter>

        <div>
          {comments.map(el => {
            return (
              <div className="comment-card">
                <div className="comment-container">{el.comment}</div>
              </div>
            );
          })}
        </div>
      </Modal>
    </Fragment>
  );
};

export default CommentModal;
