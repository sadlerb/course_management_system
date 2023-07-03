import "./ManagementCard.scss";
import {ReactComponent as EditIcon} from "../../assets/edit.svg";


const ManagementCard = ({course,openFormWithData,onChange}) =>{
    
    const handleChange = (event) =>{

        onChange(event)
    } 
    return (
        <div className="management-card">
            <input type="checkbox" value={course._id}  onChange={handleChange} />
            <p>{course.title}</p>
            <EditIcon onClick={() => openFormWithData(course)}/>
        </div>
    )
}

export default ManagementCard