
import CourseCard from "../../components/CourseCard/CourseCard";
import "./Dashboard.scss"
import Spinner from "../../components/Spinner/Spinner";
import { useEffect, useState } from "react";

const Dashboard = () => {


    const [courseList, setCourseList] = useState([]);
    const [filteredList, setFilteredList] = useState(courseList)
    const [filter, setFilter] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getCourses = async () => {
            const response = await fetch("http://localhost:5050/course");
            if (!response.ok) {
                console.log(response.statusText);
                setIsLoading(false);
                return
            }
            const data = await response.json();
            setCourseList(data);
            setFilteredList(courseList);
            setIsLoading(false);

        }
        getCourses();
  

    },
        [courseList.length]);




    const handleChange = (event) => {
        const query = event.target.value;
        setFilter(query)
        var updatedFilter = [...courseList];
        updatedFilter = updatedFilter.filter((item) => {
            return item.tags.some(str => str.includes(query.toLowerCase())) || item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        })

        setFilteredList(updatedFilter)
    }

    return (
        <>
            {isLoading ? (<Spinner />) : (
                <div className="dashboard-container">
                    <div className="dashboard-header">
                        <h1>Dashboard</h1>
                        <input type="text" placeholder="Search" value={filter} onChange={handleChange} />
                    </div>

                    <div className="course-card-container">
                        {filteredList.map((course) => {

                            return (
                                <CourseCard course={course} key={`"${course._id}"`} />
                            )

                        })}
                    </div>
                </div>
            )}
        </>
    )
}



export default Dashboard;