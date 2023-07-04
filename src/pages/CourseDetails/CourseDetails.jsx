import './CourseDetails.scss';

import Button from '../../components/Button/Button';
import Comment from '../../components/Comment/Comment';
import ReviewForm from '../../components/ReviewForm/ReviewForm';
import Spinner from "../../components/Spinner/Spinner";
import { ReactComponent as ExternalLink } from "../../assets/external_link.svg"
import { ReactComponent as RatingStar } from "../../assets/rating_star.svg"
import { useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';



const CourseDetails = () => {
    const { id } = useParams();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
    const [courseDetails, setCourseDetails] = useState({
        title: "",
        externalLink: "",
        tags: [],
        rating: 0,
        comments: []
    })

    useEffect(() => {
        const getCourse = async () => {
            const response = await fetch(`http://localhost:5050/courses/${id}`);
            if (!response.ok) {
                console.log(response.statusText);
                setIsLoading(false)
                return
            }
            const data = await response.json();
            setCourseDetails(data);
            setIsLoading(false);


        }
        getCourse();

    },
        []);




    return (
        <>
            {isLoading ? (<Spinner />) : (

                <div className="course-container">
                    <div className="course-detail-header">
                        <h1>{courseDetails.title}</h1>
                        <div className="course-rating"><span>{courseDetails.rating}</span><RatingStar /></div>
                    </div>

                    <div className="course-grid">
                        <div className="course-image">
                            <a href={courseDetails.externalLink} target="_blank" rel="noopener noreferrer">

                                <ExternalLink />    
                            </a>
                        </div>
                        <div className="review-section">
                            {isFormOpen
                                ? <ReviewForm setIsFormOpen={setIsFormOpen} course_id={id} />

                                : <div className='no-review-found'>
                                    <h4>You haven't completed this course.</h4><Button type="default" text="Mark as Completed" onClickHandeler={() => setIsFormOpen(true)} />
                                </div>

                            }
                        </div>

                    </div>
                    <br />
                    <div className="comment-section">
                        <h4>Comments ({courseDetails.comments.length})</h4>
                        {courseDetails.comments.map((comment_details,index) => {

                            return (

                                <Comment comment_details={comment_details} key={index} />
                            )

                        })}
                    </div>
                </div>
            )}
        </>

    )
}


export default CourseDetails;