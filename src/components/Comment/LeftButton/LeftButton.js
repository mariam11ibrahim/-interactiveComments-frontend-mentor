import { useDispatch } from "react-redux";
import { commentActions } from "../../../store";


import styles from "./LeftButton.module.css"
const LeftButton = ({ score, commentId, replyId }) => {
    const dispatch = useDispatch();
    const increaseandReOrder = () => {
        if (replyId)
            dispatch(commentActions.editReplyScore({ score: score + 1, commentId, replyId }));
        else
            dispatch(commentActions.reOrderCommet({ score: score + 1, commentId }))
    }
    const decreaseandReOrder = () => {
        if (replyId)
            dispatch(commentActions.editReplyScore({ score: score - 1, commentId, replyId }));
        else
            dispatch(commentActions.reOrderCommet({ score: score - 1, commentId }))
    }
    return (
        <div className={styles["left-button"]}>
            <button className={styles["counter-button"]}
                onClick={increaseandReOrder} value="increase score">
        
                <i
                    className={`${styles["icon"]}
                    ${styles["icon-plus"]}`}

                ></i>
            </button>
            <span>
                {score}
            </span>
            <button className={styles["counter-button"]}
                onClick={decreaseandReOrder} value="decrease score">
            
                    <i
                    className={`${styles["icon"]}
                    ${styles["icon-minus"]}`}

                ></i>

            </button>
        </div>
    )
}
export default LeftButton;