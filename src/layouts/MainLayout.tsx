import React from 'react';
import { Outlet } from 'react-router-dom';
import { useKeyPress } from 'ahooks';
import { Layout, Spin } from 'antd';
import useLoadUserData from '../hooks/useLoadUserData';
import useNavPage from '../hooks/useNavPage';
const { Header, Footer, Content } = Layout;
const MainLayout = () => {
  const { waitingUserData } = useLoadUserData();
  useNavPage(waitingUserData);

  return (
    <Layout>
      <Header>Header</Header>
      <Content>{waitingUserData ? <Spin></Spin> : <Outlet></Outlet>}</Content>
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default MainLayout;
