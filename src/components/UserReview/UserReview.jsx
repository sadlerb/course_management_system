import { isDisabled } from "@testing-library/user-event/dist/utils";
import {ReactComponent as TimerIcon} from "../../assets/timer.svg";
import StarRating from "../StarRating/StarRating";
import Button from "../Button/Button";

import "./UserReview.scss";

const UserReview = ({commentDetails}) => {

    const editReview = () => {
        
    }
    
    return(
        <div className="user-review">
            <h2>Your Review</h2>
            <StarRating user_rating={commentDetails.user_rating} isDisabled={true}/>
            <div className="time-taken">
                <TimerIcon />
                <p>{commentDetails.time_taken} hrs</p>
            </div>
            <p>"<span>{commentDetails.user_comment}</span>"</p>
            <Button text={"Edit Review"} type={"outline"} onClickHandeler={editReview}/>
        </div>
    )
}

export default UserReview;