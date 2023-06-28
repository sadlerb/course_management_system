import "./Comment.scss";
import { ReactComponent as UserIcon } from "../../assets/comment_user.svg"

const Comment = () => {
    return (
        <div className="comment-container">
            <div className="comment-header">
                <UserIcon />
                <div className="comment-user-details">
                    <p className="user-name">John Doe <span className="rating">rating</span></p>
                    <p className="comment-date">July 4,2023</p>
                </div>
                <p>Great course. I learned a lot, but I had some trouble keeping up during pratical stuff</p>
            </div>



        </div>
    )
}


export default Comment;