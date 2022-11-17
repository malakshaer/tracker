import { createSlice } from "@reduxjs/toolkit";

export interface User {
    userProfile?: {
        uid?: string;
        timestamp?: string;
        email?: string;
        name?: string;                
    }
}

const initialState: User = {
  userProfile: null
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, action) {
        console.log('adding user object  ', action.payload)
        return action.payload;
    },
    deleteUser() {
        return initialState;
    },
    updateUserProfile(state, action){
        state.userProfile = action.payload.userProfile
        
        // asyncStorageManager.setItem("userProfile", action.payload.userProfile)
    },
    set: (state, action) => action.payload
  },
});

export const { addUser, deleteUser, updateUserProfile, set } = userSlice.actions
export default userSlice.reducer
