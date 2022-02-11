import React from "react";
import reactDom from "react-dom";
import Card from "../Card/Card"
import styles from "./Modal.module.css";



const Modalwidnow = ({ onDelete,onToggleHandler }) => {
    const deleteHandle = () => {
        onDelete()
        onToggleHandler()
    }
    const toggleModal=()=>{
        onToggleHandler()
    }
    return (
        <React.Fragment>
            <div className={styles["overlay"]}>

            </div>
            <div className={styles["modal"]}>
                <Card>
                    <h3>Delet comment</h3>
                    <p>Are you sure you want to delete this comment?
                        This will remove the comment and can't be undone.</p>
                    <div className={styles["actions"]}>
                        <button className={styles["button-cancel"]} onClick={toggleModal}> NO, CANCEL</button>
                        <button className={styles["button-delete"]} onClick={deleteHandle}> YES, DELETE</button>
                    </div>
                </Card>
            </div>
        </React.Fragment >

    )
}
const Modal = ({onDelete,onToggleHandler}) => {
    return (<React.Fragment>
        {reactDom.createPortal(<Modalwidnow onDelete={onDelete} onToggleHandler={onToggleHandler} />,
            document.getElementById("modal-root"))}
    </React.Fragment>

    )
}
export default Modal;