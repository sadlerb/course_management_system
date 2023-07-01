import "./CourseForm.scss";

import Button from "../Button/Button"
import { useState } from "react";


const CourseForm = ({ closeForm }) => {
    const initalInputs = {
        "title":"",
        "link":"",
        tags:[]
    }
    const [formInput, setFormInput] = useState(initalInputs);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value; 
        setFormInput(values => ({ ...values, [name]: value }));
        console.log(formInput);


    }


    return (
        <div className="form-container">
            <div className="background-container">
                <form action="">
                    <label>Course Title</label>
                    <input type="text" name="title" onChange={handleChange} />

                    <label>Link to Course</label>
                    <input type="url" name="externalLink" onChange={handleChange} placeholder="www.google.com"/>

                    <label>Tags</label>
                    <input type="text" name="tags" onChange={handleChange} placeholder="tag1;tag2;tag3"/>
                    

                    <div className="button-area">
                        <Button type={"cancel"} onClickHandeler={() => closeForm(false)} text={"Close"}></Button>
                        <input type="submit" value="Submit" text={"Submit"} className="submit" />


                    </div>
                </form>
            </div>
        </div>

    )
}

export default CourseForm;