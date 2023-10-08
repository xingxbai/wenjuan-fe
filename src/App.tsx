import React from 'react';
import { RouterProvider } from 'react-router-dom';
import routerConfig from './router/index';
import './App.css';
import 'antd/dist/reset.css';

function App() {
  return <RouterProvider router={routerConfig}></RouterProvider>;
}

export default App;
