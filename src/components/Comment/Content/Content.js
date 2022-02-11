import styles from "./Content.module.css";
const Content = ({ content, replyingTo }) => {

    return (<p className={`${styles["comment-content"]} ${replyingTo && styles["reply-content"]}`}>
        {replyingTo && <b>@{replyingTo} </b>}
        {content}
    </p>)
}
export default Content;