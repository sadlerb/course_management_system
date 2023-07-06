import "./CourseForm.scss";

import Button from "../Button/Button"
import { useState } from "react";

import { ReactComponent as AddCircle } from "../../assets/add_circle.svg";
import { ReactComponent as Close } from "../../assets/close.svg";


const CourseForm = ({ closeForm, data, getData, mode, departmentData }) => {
    const isUpdateMode = ((Object.keys(data).length === 0) ? false : true)
    const initalInputs = {
        "title": data.title || "",
        "externalLink": data.externalLink || "",
        "tags": data.tags || [],
        "current_tag": "",
        "department": data.department || ""
    }
    const [formInput, setFormInput] = useState(initalInputs);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormInput(values => ({ ...values, [name]: value }));


    }
    const removeTag = (index) => {
        const newFormInputs = { ...formInput };
        formInput.tags.splice(index, 1);
        setFormInput(newFormInputs);
    }

    const addTag = (event) => {
        event.preventDefault()
        if (formInput.current_tag === "") {
            alert("please enter a tag value")
            return;
        }
        const newForm = { ...formInput }
        newForm.tags.push(formInput.current_tag);
        newForm.current_tag = "";
        setFormInput(newForm);
    }

    const submitCourseForm = async (event) => {
        event.preventDefault();

        const addData = async () => {
            await fetch(`https://course-management-6osz.onrender.com/${mode}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(formInput)

            }).catch(error => {
                console.log(error)
                return;
            })

            setFormInput(initalInputs);

        }
        const editData = async () => {
            await fetch(`https://course-management-6osz.onrender.com/${mode}/${data._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({ ...data, ...formInput })

            }).catch(error => {
                console.log(error)
                return;
            })

        }
        if (isUpdateMode) {
            await editData();

        } else {

            await addData();

        }
        await getData()
        closeForm(true)
    }


    return (
        <div className="form-container">
            <div className="background-container">
                <form onSubmit={submitCourseForm}>
                    {mode === 'courses' ? (<>
                        <label>Course Title</label>
                        <input type="text" name="title" onChange={handleChange} placeholder="learn javascript" value={formInput.title} />

                        <label>Link to Course</label>
                        <input type="url" name="externalLink" onChange={handleChange} placeholder="www.google.com" value={formInput.externalLink} />

                        <label>Tags</label>
                        <div className="tags-section">
                            <div className="tag-container">
                                {formInput.tags.map((tag, index) => {
                                    return (
                                        <div className="tag" key={index}>{tag}
                                            <Close onClick={() => removeTag(index)} />
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="tag-input">
                                <input type="text" name="current_tag" onChange={handleChange} placeholder="javascript" value={formInput.current_tag} />
                                <AddCircle onClick={addTag} />
                            </div>
                        </div>
                        <label>Department</label>
                        <select name="department" onChange={handleChange} defaultValue={initalInputs.department}>
                            {departmentData.map(({ title, _id }) => {
                                return (
                                    <option value={title}>{title}</option>
                                )
                            })}
                        </select>
                    </>
                    ) : (
                        <>
                            <label>Title</label>
                            <input type="text" name="title" value={formInput.title} onChange={handleChange} />
                        </>
                    )}

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