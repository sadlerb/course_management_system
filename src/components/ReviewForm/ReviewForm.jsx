import Button from "../Button/Button";
import { ReactComponent as UserIcon } from '../../assets/comment_user.svg';
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

import "./ReviewForm.scss"
import StarRating from "../StarRating/StarRating";

const ReviewForm = ({ closeForm, course_id, disabled, data }) => {
    const isUpdateMode = ((Object.keys(data).length === 0) ? false : true)
    const { currentUser } = useContext(UserContext);
    const initalInputs = { user_comment: data.user_comment || "", time_taken: data.time_taken || 0, user_rating: data.user_rating || 0 }
    const [input, setInputs] = useState(initalInputs);

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
        const userComment = { ...input, user_name: currentUser.name, user_id: currentUser._id, date_created: currentDate }

        if (isUpdateMode) {
            await fetch(`https://course-management-6osz.onrender.com/courses/${course_id}/comment/${data.user_id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userComment),

            }).catch(error => {
                window.alert(error);
                return;
            });
        } else {
            await fetch(`https://course-management-6osz.onrender.com/courses/${course_id}/comment`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userComment),
            }).catch(error => {
                window.alert(error);
                return;
            });
        }
        setInputs({ user_comment: "", time_taken: 0, user_rating: 0 });
        closeForm();

    }

    const handleCancel = (event) => {
        event.preventDefault();
        closeForm();
    }

    return (
        <div className="review-form">
            <form onSubmit={handleSubmit} disabled={disabled}>
                <div className="form-header">
                    <UserIcon />
                    <StarRating onChange={handleChange} user_rating={input.user_rating} />
                </div>

                <label>
                    Time Taken to Complete
                    <br />
                    <input type="number" name="time_taken" onChange={handleChange} value={input.time_taken} step={0.1} min={0} /> <span>hours</span>
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