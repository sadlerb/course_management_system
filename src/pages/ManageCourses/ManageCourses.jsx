import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";
import { ReactComponent as AddIcon } from "../../assets/add.svg";

import ManagementCard from "../../components/ManagementCard/ManagementCard";
import CourseForm from "../../components/CourseForm/CourseForm";
import Spinner from "../../components/Spinner/Spinner";

import "./MangeCourses.scss";
import { useEffect, useState } from "react";



const ManageCourses = () => {
    const [courseData, setCourseData] = useState({})
    const [isCourseFormOpen, setIsCourseFormOpen] = useState(false);
    const [courseList, setCourseList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [checked, setChecked] = useState([])

    const handleCheckboxChange = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }

        setChecked(updatedList);
    }

    const getCourses = async () => {
        setIsLoading(true)
        const response = await fetch("http://localhost:5050/course");
        if (!response.ok) {
            console.log(response.statusText);
            setIsLoading(false);
            return
        }
        const data = await response.json();
        setCourseList(data);
        setIsLoading(false);

    }
    useEffect(() => {
        getCourses();

    }, []);

    const openFormWithData = (course) => {
        setCourseData(course)
        setIsCourseFormOpen(true)
    }
    const closeForm = () => {
        setIsCourseFormOpen(false)
        setCourseData({})
    }

    const submitDelete = async (event) => {
        event.preventDefault();
        const deleteCourses = async () => {

            await fetch("http://localhost:5050/course", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify([...checked])

            }).catch(error => {
                console.log(error)
                return;
            })
        }
        await deleteCourses();
        await getCourses();
    }

    return ( 
        <div className="management-container">
            <div className="header">
                <h1>Manage Courses</h1>
            </div>
            {isCourseFormOpen && <CourseForm closeForm={closeForm} course={courseData} getCourses={getCourses} />}
            <div className="courses-container">
                <div className="button-container">
                    <button className='icon-button' onClick={submitDelete} disabled={checked.length === 0}><DeleteIcon /></button>
                    <button className='icon-button' onClick={() => setIsCourseFormOpen(true)}><AddIcon /></button>

                </div>
                {isLoading ? (<Spinner />) : (
                    <div className="manage-card-container">
                        {courseList.map((course, index) => {
                            return (
                                <ManagementCard course={course} openFormWithData={openFormWithData} key={index} onChange={handleCheckboxChange} />
                            )
                        })}
                    </div>)}

            </div>

        </div>
    )
}

export default ManageCourses;