import CourseCard from "../../components/CourseCard/CourseCard";
import "./Dashboard.scss"

import data from "../../assets/data";

const Dashboard = () => {



    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
            <h1>Dashboard</h1>
            <input type="text" placeholder="Search" />
            </div>
            
            <div className="course-card-container">
            {data.map((course) => {

                return (
                    <CourseCard course={course} key={course.id} />
                    )
                    
                })}
                </div>
        </div>
    )
}



export default Dashboard;