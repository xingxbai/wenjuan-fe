import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useGetUserInfo from './useGetUserInfo';
import {
  isLoginOrRegister,
  isNoNeedUserInfo,
  LOGIN_PATHNAME,
  MANAGE_INDEX_PATHNAME,
} from '../router/index';
function useNavPage(waitingUserData: boolean) {
  const { pathname } = useLocation();
  const { username } = useGetUserInfo();
  const nav = useNavigate();

  useEffect(() => {
    console.log(
      'rd ~ file: useNavPage.ts:29 ~ useNavPage ~ waitingUserData, username, pathname:',
      waitingUserData,
      username,
      pathname,
    );

    if (username) {
      if (isLoginOrRegister(pathname)) {
        nav(MANAGE_INDEX_PATHNAME);
      }
      return;
    }

    if (isNoNeedUserInfo(pathname)) {
      return;
    } else {
      nav(LOGIN_PATHNAME);
    }
  }, [waitingUserData, username, pathname]);
}

export default useNavPage;
