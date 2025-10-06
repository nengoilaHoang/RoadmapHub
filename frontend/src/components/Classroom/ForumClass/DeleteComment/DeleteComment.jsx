import Modal from "#components/Modal/Modal.jsx";
export default function DeleteComment(props) {
    const { comment, onClose, handleDeleteComment } = props;
    const handleDelete = (e) => {
        e.preventDefault();
        handleDeleteComment(comment.id);
        onClose();
    }   
    return (
        <form onSubmit={handleDelete}>
            <Modal
                onClose={onClose}
                header={<h5 className="modal-title">Delete comment?</h5>}
                body={
                    <p>Are you sure you want to delete this comment?</p>
                }
                footer={
                    <>
                        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button className="btn btn-primary" type="submit">Delete</button>
                    </>
                }
            />
        </form>


    )
} 