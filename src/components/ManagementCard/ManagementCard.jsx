import "./ManagementCard.scss";
import {ReactComponent as EditIcon} from "../../assets/edit.svg";


const ManagementCard = ({data,openFormWithData,onChange}) =>{
    
    const handleChange = (event) =>{

        onChange(event)
    } 
    return (
        <div className="management-card">
            <input type="checkbox" value={data._id}  onChange={handleChange} />
            <p>{data.title}</p>
            <EditIcon onClick={() => openFormWithData(data)}/>
        </div>
    )
}

export default ManagementCard