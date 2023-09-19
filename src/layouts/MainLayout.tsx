import React from 'react'
import { Outlet } from 'react-router-dom'
import useGetUserInfo from '../hooks/useGetUserInfo'
import { Layout } from 'antd';
const { Header, Footer, Content } = Layout;


const MainLayout = () => {
  const { username, nickname } = useGetUserInfo()
  return (
    <Layout>
      <Header >Header</Header>
      <Content>
        <Outlet></Outlet>
        </Content>
      <Footer >Footer</Footer>
    </Layout>
  )
}

export default MainLayout