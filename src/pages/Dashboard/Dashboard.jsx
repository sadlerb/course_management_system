import CourseCard from "../../components/CourseCard/CourseCard";
import "./Dashboard.scss"

import data from "../../assets/data";
import { useState } from "react";

const Dashboard = () => {

    const [courseList,setCourseList] = useState(data);
    const [filteredList,setFilteredList] = useState(courseList)
    const [filter,setFilter] = useState('');


    const handleChange = (event) => {
        const query = event.target.value;
        setFilter(query)
        var updatedFilter = [...courseList];
        updatedFilter = updatedFilter.filter((item) =>{
            return item.tags.some(str => str.includes(query.toLowerCase())) || item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        })

        setFilteredList(updatedFilter)
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
            <h1>Dashboard</h1>
            <input type="text" placeholder="Search" value={filter} onChange={handleChange} />
            </div>
            
            <div className="course-card-container">
            {filteredList.map((course) => {

                return (
                    <CourseCard course={course} key={course.id} />
                    )
                    
                })}
                </div>
        </div>
    )
}



export default Dashboard;