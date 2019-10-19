import React, { Fragment, useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import TimeAgo from "react-timeago";

const CommentModal = ({
  modal,
  showCommentForm,
  comments,
  toggle,
  onSaveComment,
  selectedIssue
}) => {
  const [comment, setComment] = useState("");

  const handleChange = e => {
    setComment(e.target.value);
    // console.log(comment);
  };

  return (
    <Fragment>
      <Modal
        isOpen={modal}
        toggle={showCommentForm}
        className="modal-dialog modal-lg"
      >
        <div className="close-icon">
          <i className="material-icons" onClick={showCommentForm}>
            close
          </i>
        </div>
        <ModalHeader toggle={toggle}>A title...</ModalHeader>
        <ModalBody className="modal-content">
          <form>
            <div>
              <textarea
                cols="20"
                rows="1"
                value={comment}
                onChange={handleChange}
              />
            </div>
            <button
              className="btn btn-secondary"
              onClick={e => {
                e.preventDefault();
                onSaveComment(comment);
                setComment("");
              }}
            >
              Save
            </button>
          </form>
        </ModalBody>
        <div className="comments">
          {comments.map(el => {
            return (
              <div className="comment-card">
                <div className="comment-info">
                    <div className="comment-created-at"><TimeAgo date={el.created_at} /></div>
                    <span className="user-comment" ><i className="material-icons">person</i></span>
                </div>
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
