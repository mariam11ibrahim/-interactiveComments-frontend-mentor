import styles from "./UserImage.module.css";
const UserImage = ({ image,username }) => {
  
    return (<div className={styles['image-container']}>
        <img
            className={styles["user-photo"]}
            src={`./assets/avatars/${image}`} 
            alt={`user ${username}`} />
    </div>)
}
export default UserImage;