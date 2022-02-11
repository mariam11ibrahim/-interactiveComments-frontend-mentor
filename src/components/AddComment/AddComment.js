import { useRef, useState } from "react";
import { useSelector } from "react-redux";


import styles from "./AddComment.module.css";
import Card from "../UI/Card/Card";
import UserImage from "../UI/UserImage/UserImage";


const AddComment = ({ replyingTo, contentToEdit, buttonName, submitActionHandler, placeHolder="" }) => {

    const textareaRef = useRef();
    const spanTagRef = useRef();
    const [textareaValue, setTextareaValue] = useState(`${contentToEdit}`);

    const [isActive, setIsActive] = useState(false);
    const currentUser = useSelector(state => state.comments.currentUser);


    // HANDLE CUSTOM TEXTAREA EVENTS  
    const clickHandler = () => {
        setIsActive(true);
    }
    const inputHandler = (e) => {
        setTextareaValue(e.target.textContent);
    }
    const blurHandler = () => {
        if (textareaValue.trim().length !== 0) return;
        setIsActive(false)
    }

    //HANDLE SUBMITTING FORM 
    const submitHandler = (e) => {
        e.preventDefault();
        const content = textareaValue.replace(`@${replyingTo}`, "")
        if (textareaValue.trim().length === 0) return;
        submitActionHandler(content);
        // RESET
        setIsActive(false)
        setTextareaValue("")
        textareaRef.current.textContent = ""

    }
    return (<Card>
        <div className={styles.wrapper}>

            {!contentToEdit && <UserImage image={currentUser.image.png} />}
            <form className={styles['form']} onSubmit={submitHandler}>
                {/* CUSTOM TEXTAREA*/}
                <span
                aria-label={ `${buttonName.toLowerCase()} input`}
                    className={`${styles["custom-textarea"]} ${isActive && styles.active}`}
                    onClick={clickHandler}
                    onBlur={blurHandler}
                    ref={textareaRef}
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                    onInput={inputHandler}
                    role="textbox" >

                    {/* PLACE HOLDER */}
                    {!isActive && placeHolder}
                    {/* REPLY TAG */}
                    {replyingTo
                        && <span
                            ref={spanTagRef}
                            contentEditable="false"
                            suppressContentEditableWarning={true}
                            className={styles["reply-tag"]}>
                            @{replyingTo + " "}</span>}


                    {contentToEdit}
                </span>
                <button type="submit" name={buttonName.toLowerCase()}>
                    {buttonName}
                </button>



            </form>
        </div>
    </Card>)
}
export default AddComment;