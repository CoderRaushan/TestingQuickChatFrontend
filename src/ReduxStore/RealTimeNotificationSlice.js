import { createSlice } from "@reduxjs/toolkit";

const RealTimeNotificationSlice = createSlice({
    name: "Notification",
    initialState: {
        likeNotification: [],
        followNotification: [],
        unseenCount: 0,
    },
    reducers: {
        setLikeNotification: (state, action) => {
            if (action.payload.type === "like") {
                state.likeNotification.push(action.payload);
                state.unseenCount += 1;
            } else if (action.payload.type === "dislike") {
                state.likeNotification = state.likeNotification.filter(
                    (item) => item.userId !== action.payload.userId
                );
            } else if (action.payload.type === "follow") {
                
                state.followNotification.push(action.payload);
            }
            else if (action.payload.type === "unfollow") {
                
                state.followNotification = state.followNotification.filter(
                    (item) => item.userId !== action.payload.userId
                );
            }
        },
        markNotificationsAsSeen: (state) => {
            state.unseenCount = 0;
        },
    },
});

export const { setLikeNotification, markNotificationsAsSeen } =
    RealTimeNotificationSlice.actions;
export default RealTimeNotificationSlice.reducer;
