import './CourseDetails.scss';

import Button from '../../components/Button/Button';
import Comment from '../../components/Comment/Comment';
import ReviewForm from '../../components/ReviewForm/ReviewForm';
import Spinner from "../../components/Spinner/Spinner";
import UserReview from '../../components/UserReview/UserReview';
import { ReactComponent as ExternalLink } from "../../assets/external_link.svg"
import { ReactComponent as RatingStar } from "../../assets/rating_star.svg"
import { useParams } from 'react-router-dom';

import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';



const CourseDetails = () => {
    const { id } = useParams();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { currentUser } = useContext(UserContext);
    const [current_user_comment, setComment] = useState();
    const [commentData, setCommentData] = useState({});
    const [courseDetails, setCourseDetails] = useState({
        title: "",
        externalLink: "",
        tags: [],
        rating: 0,
        comments: []
    })

    useEffect(() => {
        getCourse();

    },
        [courseDetails.length]);

    useEffect(() => {
        const comments = courseDetails.comments;
        const current_user_comment = comments.find((comment) => {
            return (
                comment.user_id === currentUser._id
            )
        });

        setComment(current_user_comment)



    }, [courseDetails])


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

    const openFormWithData = (data) => {
        setCommentData(data)
        setIsFormOpen(true)
    }

    const closeForm = () => {
        getCourse();
        setIsFormOpen(false)
    }



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
                                ? (<ReviewForm closeForm={closeForm} course_id={id} data={commentData} />)

                                : (
                                    <>
                                        {(!current_user_comment) ? (<div className='no-review-found'>
                                            <h4>You haven't completed this course.</h4><Button type="default" text="Mark as Completed" onClickHandeler={() => setIsFormOpen(true)} />
                                        </div>) : (<div>
                                            <UserReview commentDetails={current_user_comment} openFormWithData={openFormWithData} />
                                        </div>)}

                                    </>
                                )

                            }
                        </div>

                    </div>
                    <br />
                    <div className="comment-section">
                        <h4>Comments ({courseDetails.comments.length})</h4>
                        {courseDetails.comments.map((comment_details, index) => {

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