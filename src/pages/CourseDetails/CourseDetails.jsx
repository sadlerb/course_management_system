import './CourseDetails.scss';

import Button from '../../components/Button/Button';
import Comment from '../../components/Comment/Comment';
import { ReactComponent as RatingStar } from "../../assets/rating_star.svg"
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import ReviewForm from '../../components/ReviewForm/ReviewForm';


const CourseDetails = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const { title, externalLink, id, rating, tags, comments } = useLocation().state.state;


    return (
        <div className="course-container">
            <div className="course-detail-header">
                <h1>{title}</h1>
                <div className="course-rating"><span>{rating}</span><RatingStar /></div>
            </div>

            <div className="course-grid">
                <div className="course-image"></div>
                <div className="review-section">
                    {isFormOpen
                        ? <ReviewForm setIsFormOpen={setIsFormOpen} />

                        : <div className='no-review-found'>
                            <h4>You haven't completed this course.</h4><Button type="default" text="Mark as Completed" onClickHandeler={() => setIsFormOpen(true)} />
                        </div>

                    }
                </div>

            </div>
            <br />
            <div className="comment-section">
                <h4>Comments ({comments.length})</h4>
                {comments.map((comment_details) => {

                    return (

                        <Comment comment_details={comment_details} key={comment_details.user_id} />
                    )

                })}
            </div>
        </div>

    )
}


export default CourseDetails;