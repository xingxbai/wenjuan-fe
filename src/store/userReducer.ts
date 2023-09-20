import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserStateType = {
  username: string;
  nickname: string;
};

const INIT_STATE: UserStateType = { username: '', nickname: '' };

export const userSlice = createSlice({
  name: 'user',
  initialState: INIT_STATE,
  reducers: {
    loginReducer: (
      state: UserStateType,
      action: PayloadAction<UserStateType>,
    ): UserStateType => {
      console.log('rd ~ file: userReducer.ts:18 ~ state:', state, action);
      return action.payload;
    },
    logoutReducer: () => INIT_STATE,
  },
});
console.log('rd ~ file: userReducer.ts:21 ~ userSlice:', userSlice);

export const { loginReducer, logoutReducer } = userSlice.actions;

export default userSlice.reducer;
