import Button from "../Button/Button";
import { ReactComponent as UserIcon } from '../../assets/comment_user.svg';
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

import "./ReviewForm.scss"
import StarRating from "../StarRating/StarRating";

const ReviewForm = ({ setIsFormOpen, course_id,disabled}) => {
    const { currentUser } = useContext(UserContext)
    const [input, setInputs] = useState({ user_comment: "", time_taken: 0, user_rating: 0 })

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))


    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const currentDate = new Date();

       input.time_taken = parseInt(input.time_taken)
       input.user_rating = parseInt(input.user_rating)


        const userComment = { ...input, user_name: currentUser.user_name, user_id: currentUser.user_id, date_created: currentDate }

       
        await fetch(`http://localhost:5050/course/${course_id}/comment`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userComment),
        })
            .catch(error => {
                window.alert(error);
                return;
            });
        setInputs({ user_comment: "", time_taken: 0, user_rating: 0 });
        window.location.reload();
    }

    const handleCancel = (event) => {
        event.preventDefault();
        setIsFormOpen(false)
    }

    return (
        <div className="review-form">
            <form onSubmit={handleSubmit} disabled={disabled}>
                <div className="form-header">
                    <UserIcon />
                    <StarRating onChange={handleChange} vlaue={input.user_rating} />
                </div>

                <label>
                    Time Taken to Complete
                    <br />
                    <input type="number" name="time_taken" onChange={handleChange} vlaue={input.time_taken} step={0.1} min={0} /> <span>hours</span>
                </label>
                <textarea name="user_comment" id="" cols="30" rows="5" placeholder="Write a Comment" onChange={handleChange} value={input.user_comment}></textarea>
                <div className="button-area">
                    <Button onClickHandeler={handleCancel} text={"Cancel"} />
                    <input type="submit" value="Submit" text={"Submit"} className="submit" />
                </div>
            </form>
        </div>
    )
}

export default ReviewForm;