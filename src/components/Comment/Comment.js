import React, { useImperativeHandle, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { commentActions } from "../../store";

import styles from "./Comment.module.css";
import Card from "../UI/Card/Card";
import Content from "./Content/Content";
import CommentHeader from "./CommentHeader/CommentHeader";
import LeftButton from "./LeftButton/LeftButton";
import RightButton from "./RightButton/RightButton";
import AddComment from "../AddComment/AddComment";


const Comment = React.forwardRef((
    { content, createdAt, score, user, replyingTo, commentId, replyId, onToggleModal }, ref) => {

    const { username } = useSelector(state => state.comments.currentUser)
    const isActiveUser = username.trim() === user.username.trim() ? true : false;
    const [hideReplyForm, setHideReplyForm] = useState(true);
    const [hidenEditForm, setEditForm] = useState(false);
    const dispatch = useDispatch();
    //TOGGLE FORM FLAG
    const toggleAddReplyHandler = () => {
        setHideReplyForm(toggle => !toggle)
    }

    //DELETE COMMENT 
    const deleteHandler = () => {
        if (replyId) dispatch(commentActions.deleteReply({ commentId, replyId }))
        else dispatch(commentActions.deleteComment({ commentId }));
    }

    const editHandler = () => {
        setEditForm(toggle => !toggle)
    }

    const dispatchAddReply = (content) => {
        dispatch(commentActions.addReply({ content, commentId, replyingTo: user.username }));
        toggleAddReplyHandler()
    }
    const dispatchEdit = (content) => {

        if (!replyId)
            dispatch(commentActions.editComment({ content, commentId }))
        else
            dispatch(commentActions.editReply({ content, commentId, replyId }))

        editHandler()
    }
    useImperativeHandle(ref, () => {
        return { deleteHandler }
    })
    return (
        <React.Fragment>

            <Card >
                <div className={`${styles['comment']}`}>


                    <div className={styles["comment-body"]}>

                        <CommentHeader
                            user={user}
                            createdAt={createdAt} />

                        {!hidenEditForm &&
                            <Content
                                content={content}
                                replyingTo={replyingTo} />}

                        {hidenEditForm &&
                            <AddComment
                                contentToEdit={content}
                                replyingTo={replyingTo}
                                commentId={commentId}
                                replyingId={replyId}
                                onToggleEdit={editHandler}
                                buttonName="UPDATE"
                                submitActionHandler={dispatchEdit}
                            />}
                    </div>
                    <div className={styles["actions"]}>
                        <LeftButton
                            score={score}
                            commentId={commentId}
                            replyId={replyId} />

                        <RightButton
                            isActiveUser={isActiveUser}
                            onToggleAddReply={toggleAddReplyHandler}
                            onDelete={deleteHandler}
                            onToggleEdit={editHandler}
                            onToggleModal={onToggleModal} />
                    </div>
                </div>

            </Card>
            {
                !hideReplyForm &&
                <AddComment
                    replyingTo={user.username}
                    commentId={commentId}
                    onToggleAddReply={toggleAddReplyHandler}
                    buttonName="REPLY"
                    submitActionHandler={dispatchAddReply}

                />
            }
        </React.Fragment>

    )
})
export default Comment;

