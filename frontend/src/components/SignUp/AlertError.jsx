export default function AlertError(props){
    const {content} = props;
    return(
        <div className="alert alert-danger" role="alert">
            {content}
        </div>
    )
}