import Modal from "#components/Modal/Modal.jsx";
export default function DeletePost(props) {
    const { post, onClose, handleDeletePost } = props;
    const handleDelete = (e) => {
        e.preventDefault();
        handleDeletePost(post.postId);
        onClose();
    }   
    return (
        <form onSubmit={handleDelete}>
            <Modal
                onClose={onClose}
                header={<h5 className="modal-title">Delete notification?</h5>}
                body={
                    <p>Comments will also be deleted.</p>
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