import React from "react";
import styles from "./RightButton.module.css";

const RightButton = ({ onToggleAddReply, isActiveUser, onToggleEdit, onToggleModal }) => {

    const replyClickHandler = () => {
        onToggleAddReply()
    }
    const deleteClickHandler = () => {

        onToggleModal()
    }
    const editClickHandler = () => {
        onToggleEdit()
    }

    if (!isActiveUser)
        return (
            <React.Fragment>
                <button
                    className={`${styles["right-button"]} ${styles["reply-button"]}`}
                    onClick={replyClickHandler}>
                    <i className={`${styles["icon"]} ${styles["icon-reply"]}`}></i>

                    <span>Reply</span>

                </button>
            </React.Fragment>
        )
    return (
        <div className={styles["right-button"]}>

            <button
                className={
                    styles["edit-button"]}
                onClick={editClickHandler}>
                <i className={`${styles["icon"]} ${styles["icon-edit"]}`}></i>
                <span >Edit</span>
            </button>
            <button
                className={styles["delete-button"]}
                onClick={deleteClickHandler}>
                <i className={`${styles["icon"]} ${styles["icon-delete"]}`}></i>

                <span>Delete</span>
            </button>

        </div>
    )
}
export default RightButton;