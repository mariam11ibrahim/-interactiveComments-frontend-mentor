import styles from "./CommentHeader.module.css";
import UserImage from "../../UI/UserImage/UserImage";

import TimeAgo from "timeago-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const CommentHeader = ({ user, createdAt}) => {
    const { username } = useSelector(state => state.comments.currentUser);
    const [timeago, setTimeAgo] = useState("Just now");

    useEffect(
        () => {
            const timeout = setTimeout(() => {
                setTimeAgo(<TimeAgo
                    datetime={createdAt}
                    locale={navigator.language}
                    className={styles["time"]}
                    live
                />
                ); 
            }, 60000);

            return ()=>clearTimeout(timeout)
        }, [])


    return (
        <header>
            <UserImage image={user.image.png} username={user.username} />

            <span className={styles["user-name"]}>{user.username}</span>
            {
                username.trim() === user.username.trim() &&
                <span className={styles["badge"]}>you</span>
            }
            <span className={styles["time"]}>
                {typeof createdAt == "string" ? createdAt : timeago}
            </span>
       
        </header>
    )
}
export default CommentHeader;