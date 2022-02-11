import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import data from "../data.json";

const commentSlice = createSlice({
    name: "comments",
    initialState: data,
    reducers: {
        addComment(state, action) {
            const id = `${state.currentUser.username}${new Date().getTime()}`;
            state.comments.push({
                id,
                content: action.payload.content,
                createdAt: new Date(),
                user: state.currentUser,
                score: 0,
                replies: [],
            })
        },
        addReply(state, action) {
            const id = `${state.currentUser.username}${new Date().getTime()}`;

            const comment = state.comments.
                find(comment => comment.id === action.payload.commentId);

            if (!comment) return;

            comment.replies.push({
                content: action.payload.content,
                createdAt: new Date(),
                id,
                score: 0,
                user: state.currentUser,
                replyingTo: action.payload.replyingTo

            })
        },
        deleteComment(state, action) {
            
            state.comments = state.comments.
                filter(comment => comment.id !== action.payload.commentId);
        },

        deleteReply(state, action) {

            const commentIndex = state.comments.
                findIndex(comment => comment.id === action.payload.commentId);

            if (commentIndex != 0 && !commentIndex) return;

            state.comments[commentIndex].replies =
                state.comments[commentIndex].replies.
                    filter(reply => reply.id !== action.payload.replyId)
        }

        ,
        editComment(state, action) {
            const commentIndex = state.comments.
                findIndex(comment => comment.id === action.payload.commentId);
            if (commentIndex != 0 && !commentIndex) return;
            state.comments[commentIndex].content = action.payload.content;

        },
        editReply(state, action) {
            const commentIndex = state.comments.
                findIndex(comment => comment.id == action.payload.commentId);

            if (commentIndex != 0 && !commentIndex) return;


            const replyIndex =
                state.comments[commentIndex].replies.
                    findIndex(reply => reply.id == action.payload.replyId);


            if (replyIndex != 0 && !replyIndex) return;

            state.comments[commentIndex]
                .replies[replyIndex].content = action.payload.content;

        },
        reOrderCommet(state, action) {
            if (action.payload.score < 0) return;

            const commentIndex = state.comments.
                findIndex(comment => comment.id == action.payload.commentId);
            //EDIT SCORE
            state.comments[commentIndex].score = action.payload.score;

            if (commentIndex==undefined) return;

            let currentComment = state.comments[commentIndex];
            let prevComment = state.comments[commentIndex - 1];
            let nextComment = state.comments[commentIndex + 1];
         
            //SWAP UP 
            if (prevComment && currentComment.score > prevComment.score) {
                state.comments[commentIndex] = prevComment;
                state.comments[commentIndex - 1] = currentComment;
            }
            //SWAP DOWN
            else if (nextComment && currentComment.score < nextComment.score) {
                state.comments[commentIndex] = nextComment;
                state.comments[commentIndex + 1] = currentComment;
            }

        },
        editReplyScore(state, action) {
            if (action.payload.score < 0) return;
            const commentIndex = state.comments.
                findIndex(comment => comment.id == action.payload.commentId);
            if (commentIndex != 0 && !commentIndex) return;

            const replyIndex =
                state.comments[commentIndex].replies.
                    findIndex(reply => reply.id == action.payload.replyId);

            if (replyIndex != 0 && !replyIndex) return;

            state.comments[commentIndex]
                .replies[replyIndex].score = action.payload.score;


        }

    }

})
const store = configureStore({
    reducer: { comments: commentSlice.reducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

export default store;
export const commentActions = commentSlice.actions;