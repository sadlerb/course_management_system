
import CourseCard from "../../components/CourseCard/CourseCard";
import "./Dashboard.scss"
import Spinner from "../../components/Spinner/Spinner";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";

const Dashboard = () => {

    const {currentUser} = useContext(UserContext);
    const [courseList, setCourseList] = useState([]);
    const [filteredList, setFilteredList] = useState(courseList)
    const [filter, setFilter] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getCourses = async () => {
            const response = await fetch(`http://localhost:5050/courses/department/${currentUser.department}/role/${currentUser.role}`);
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
        

    },[courseList.length]);




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
                        <input type="search" placeholder="Search" value={filter} onChange={handleChange} />
                    </div>

                    <div className="course-card-container">
                        {filteredList.length>0?(filteredList.map((course) => {

                            return (
                                <CourseCard course={course} key={`"${course._id}"`} />
                            )

                        })):(<p>There are no courses avaliable </p>)}
                    </div>
                </div>
            )}
        </>
    )
}



export default Dashboard;