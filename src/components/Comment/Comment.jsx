import "./Comment.scss";
import { ReactComponent as UserIcon } from "../../assets/comment_user.svg"

const Comment = ({comment_details}) => {
    const {user_name,user_rating,date_created,user_comment} = comment_details;
    return (
        <div className="comment-container">
            <div className="comment-header">
                <UserIcon />
                <div className="comment-user-details">
                    <p className="user-name">{user_name}<span className="rating">{user_rating}</span></p>
                    <p className="comment-date">{date_created}</p>
                </div>
                <p>{user_comment}</p>
            </div>



        </div>
    )
}


export default Comment;