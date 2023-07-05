import { ReactComponent as DeleteIcon } from "../../assets/delete.svg";
import { ReactComponent as AddIcon } from "../../assets/add.svg";

import ManagementCard from "../../components/ManagementCard/ManagementCard";
import CourseForm from "../../components/CourseForm/CourseForm";
import Spinner from "../../components/Spinner/Spinner";

import "./MangeCourses.scss";
import { useEffect, useState } from "react";



const ManageCourses = () => {
    const [selectedData, setSelectedData] = useState({})
    const [departmentData, setDepartmentData] = useState({})
    const [isCourseFormOpen, setIsCourseFormOpen] = useState(false);
    const [courseList, setCourseList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [checked, setChecked] = useState([]);
    const [selectedOption, setSelectedOption] = useState("courses")

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value)
    };


    const handleCheckboxChange = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }

        setChecked(updatedList);
    }

    const getData = async () => {
        setIsLoading(true)
        const courses = await fetch("http://localhost:5050/courses");
        if (!courses.ok) {
            console.log(courses.statusText);
            setIsLoading(false);
            return
        }
        const courseData = await courses.json();
        setCourseList(courseData);

        const departments = await fetch("http://localhost:5050/departments");
        if (!departments.ok) {
            console.log(departments.statusText);
            setIsLoading(false);
            return
        }
        const departmentsData = await departments.json();
        setDepartmentData(departmentsData)

        setIsLoading(false);

    }
    useEffect(() => {
        getData();

    }, []);

    const openFormWithData = (data) => {
        setSelectedData(data)
        setIsCourseFormOpen(true)
    }
    const closeForm = () => {
        setIsCourseFormOpen(false)
        setSelectedData({})
    }

    const submitDelete = async (event) => {
        event.preventDefault();
        const deleteCourses = async () => {

            await fetch("http://localhost:5050/courses", {
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

        const deleteDepartments = async () => {
            await fetch("http://localhost:5050/departments", {
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

        if (selectedOption === 'courses') {
            await deleteCourses();
        } else if (selectedOption === 'departments'){
            await deleteDepartments();
        }
        await getData();
    }

    return (
        <div className="management-container">
            <div className="header">
                <h1>Manage Courses</h1>
            </div>
            {isCourseFormOpen && <CourseForm closeForm={closeForm} data={selectedData} getData={getData} mode={selectedOption} departmentData={departmentData}/>}
            <div className="courses-container">
                <div className="header">
                    <div className="radio-buttons">
                        <input type="radio" value="courses" checked={selectedOption === "courses"} onChange={handleRadioChange} />
                        <label >Courses</label>
                        <input type="radio" value="departments" checked={selectedOption === "departments"} onChange={handleRadioChange} />
                        <label >Departments</label>
                    </div>
                    <div className="button-container">
                        <button className='icon-button' onClick={submitDelete} disabled={checked.length === 0}><DeleteIcon /></button>
                        <button className='icon-button' onClick={() => setIsCourseFormOpen(true)}><AddIcon /></button>
                    </div>

                </div>
                {isLoading ? (<Spinner />) : (
                    <div className="manage-card-container">
                        {selectedOption === 'courses' ? (courseList.map((data, index) => {
                            return (
                                <ManagementCard data={data} openFormWithData={openFormWithData} key={index} onChange={handleCheckboxChange} />
                            )
                        })) : (departmentData.map((data, index) => {
                            return (

                                <ManagementCard data={(data)} onChange={handleCheckboxChange} key={index} openFormWithData={openFormWithData} />
                            )
                        }))}
                    </div>)}

            </div>

        </div>
    )
}

export default ManageCourses;