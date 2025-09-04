export default function AlertSuccess(props) {
    const { content } = props;
    return (
        <div className="alert alert-success" role="alert">
            {content}
        </div>
    );
}