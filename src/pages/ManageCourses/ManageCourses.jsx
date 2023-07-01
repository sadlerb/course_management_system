import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";
import { ReactComponent as AddIcon } from "../../assets/add.svg";
import ManagementCard from "../../components/ManagementCard/ManagementCard";
import CourseForm from "../../components/CourseForm/CourseForm";

import "./MangeCourses.scss";
import { useState } from "react";



const ManageCourses = () => {
    const [isCourseFormOpen,setIsCourseFormOpen] = useState(false);

    const submitDelete = (event) =>{
        event.preventDefault();
    }

    return (
        <div className="management-container">
            <div className="header">
                <h1>Manage Courses</h1>
            </div>
            {isCourseFormOpen && <CourseForm closeForm = {setIsCourseFormOpen} />}
                <div className="courses-container">
                <button className='icon-button' onClick={submitDelete}><DeleteIcon /></button>
                    <button className='icon-button' onClick={() => setIsCourseFormOpen(true)}><AddIcon /></button>
                    <div className="manage-card-container">
                        
                    </div>
                </div>

        </div>
    )
}

export default ManageCourses;