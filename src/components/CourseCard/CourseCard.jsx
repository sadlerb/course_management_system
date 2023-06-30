import './CourseCard.scss';
import { Link } from 'react-router-dom';
import { ReactComponent as ExternalLinkIcon } from "../../assets/external_link.svg";
import { ReactComponent as FullScreenIcon } from "../../assets/full.svg";





const CourseCard = ({course}) => {

    const openInNewTab = (url) => {
        window.open(url,"_blank","noreferrer")
    }

 

    return (
        <div className="course-card">
            <div className="course-image">
            </div>
            <div className="course-card-footer">
                <h3>{course.title}</h3>
                <div className="button-container">
                    <Link to={`/course/${course._id}`}>
                        <button className='icon-button'><FullScreenIcon /></button>
                    </Link>
                    <button className='icon-button' onClick={() => openInNewTab(course.externalLink)}><ExternalLinkIcon /></button>
                </div>
            </div>

        </div>
    )
}

export default CourseCard;