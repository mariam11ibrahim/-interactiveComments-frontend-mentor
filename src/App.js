import './App.css';
import { useState } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commentActions } from './store';
import AddComment from './components/AddComment/AddComment';
import Comment from './components/Comment/Comment';
import Modal from './components/UI/Modal/Modal';



function App() {

  const comments = useSelector(state => state.comments.comments);
  const dispatch = useDispatch();
  const commentRef = useRef();
  const [isModalHidden, setIsModalHidden] = useState(false);

  const dispatchAddComment = (content) => {
    dispatch(commentActions.addComment({ content }))
  }


  const renderReplies = (comments, commentId) => {
    return comments.map(comment => {
      return (<Comment
        ref={commentRef}
        content={comment.content}
        createdAt={comment.createdAt}
        user={comment.user}
        score={comment.score}
        replyingTo={comment.replyingTo}
        key={comment.id}
        replyId={comment.id}
        commentId={commentId}
        onToggleModal={toggleModalHandler}
      />)
    })

  }
  const deleteHandler = () => {
    commentRef.current.deleteHandler()
  }
  const toggleModalHandler = () => {
    setIsModalHidden(toggle => !toggle);
  }

  return (
    <div className="App">
      {isModalHidden && <Modal onToggleHandler={toggleModalHandler} onDelete={deleteHandler} />}
      {
        comments.map(comment => {
          return (
            <section className='comment-section' key={comment.id}>
              <Comment
                ref={commentRef}
                content={comment.content}
                createdAt={comment.createdAt}
                user={comment.user}
                score={comment.score}
                commentId={comment.id}
                onToggleModal={toggleModalHandler}
              />
              <div className='reply-section' key={`reply${comment.id}`}>
                {renderReplies(comment.replies, comment.id)}
              </div>
            </section>

          )
        })
      }

      <section className='add-comment-section'>
        <AddComment
          buttonName="SEND"
          submitActionHandler={dispatchAddComment}
          placeHolder="Add comment..."

        /></section>


    </div>
  );
}

export default App;
