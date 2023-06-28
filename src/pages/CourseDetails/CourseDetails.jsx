import './CourseDetails.scss';

import Button from '../../components/Button/Button';
import Comment from '../../components/Comment/Comment';
import { ReactComponent as RatingStar } from "../../assets/rating_star.svg"

const CourseDetails = () => {
    return (
        <div className="course-container">
            <div className="course-detail-header">
                <h1>Course Name</h1>
                <div className="course-rating"><span>rating</span><RatingStar /></div>
            </div>

            <div className="course-grid">
                <div className="course-image"></div>
                <div className="course-section">
                    <h4>You haven't completed this course.</h4>
                    <Button type="default" text="Mark as Completed"></Button>
                </div>

            </div>
            <div className="comment-section">
                <h4>Comments(0)</h4>
                <Comment />
            </div>
        </div>

    )
}


export default CourseDetails;