import './CourseCard.scss';
import { ReactComponent as ExternalLinkIcon } from "../../assets/external_link.svg";
import { ReactComponent as FullScreenIcon } from "../../assets/full.svg";
import { ReactComponent as CheckBoxIcon } from "../../assets/checkbox.svg";



const CourseCard = () => {

    return (
        <div className="course-card-container">
            <div className="course-image">
            </div>
            <div className="course-card-footer">
                <h3>Course Title</h3>
                <div className="button-container">
                    <button className='icon-button'><FullScreenIcon /></button>
                    <button className='icon-button'><CheckBoxIcon /></button>
                    <button className='icon-button'><ExternalLinkIcon /></button>
                </div>
            </div>

        </div>
    )
}

export default CourseCard;