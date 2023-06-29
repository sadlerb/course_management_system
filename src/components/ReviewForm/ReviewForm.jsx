import Button from "../Button/Button";
import { ReactComponent as UserIcon } from '../../assets/comment_user.svg';
import { useState } from "react";

import "./ReviewForm.scss"
import StarRating from "../StarRating/StarRating";

const ReviewForm = ({ setIsFormOpen }) => {

    const [input, setInputs] = useState({comment:"",time:0,rating:0})

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(input)
        //TODO
    }

    const handleCancel = (event) => {
        event.preventDefault();
        setIsFormOpen(false)
    }

    return (
        <div className="review-form">
            <form onSubmit={handleSubmit}>
                <div className="form-header">
                    <UserIcon />
                    <StarRating onChange={handleChange}/>
                </div>

                <label>
                    Time Taken to Complete
                    <input type="number" name="time" onChange={handleChange} /> <span>hours</span>
                </label>
                <textarea name="comment" id="" cols="30" rows="5" placeholder="Write a Comment" onChange={handleChange}></textarea>
                <div className="button-area">
                    <Button onClickHandeler={handleCancel} text={"Cancel"} />
                    <input type="submit" value="Submit" text={"Submit"} className="submit" />
                </div>
            </form>
        </div>
    )
}

export default ReviewForm;