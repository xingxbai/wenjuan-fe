import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Checkbox, Space, Button } from 'antd';
import { useRequest } from 'ahooks';
import { REGISTER_PATHNAME } from '../router/index';
import { loginService } from '../services/user';
import { setToken } from '../utils/user-token';

const USERNAME_KEY = 'USERNAME';
const PASSWORD_KEY = 'PASSWORD';

function rememberUser(username: string, password: string) {
  localStorage.setItem(USERNAME_KEY, username);
  localStorage.setItem(PASSWORD_KEY, password);
}

function deleteUserFromStorage() {
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(PASSWORD_KEY);
}

function getUserInfoFromStorage() {
  return {
    username: localStorage.getItem(USERNAME_KEY),
    password: localStorage.getItem(PASSWORD_KEY),
  };
}
const Login: React.FC = () => {
  const [form] = Form.useForm();

  useEffect(() => {
    const { username, password } = getUserInfoFromStorage();
    form.setFieldsValue({ username, password });
  }, []);

  const { loading, run } = useRequest(
    async (username, password) => {
      return await loginService(username, password);
    },
    {
      manual: true,
      onSuccess: (result) => {
        const { token } = result;
        setToken(token);
      },
    },
  );

  const onFinish = (values: { username: string, password: string, remember: boolean}) => {
    const { username, password, remember } = values || {};
    run(username, password);

    if (remember) {
      rememberUser(username, password);
    } else {
      deleteUserFromStorage();
    }
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
    >
      <Form.Item
        name="username"
        label="账号"
        rules={[
          { required: true, message: '请输入用户名' },
          { type: 'string', min: 5, max: 20, message: '字符长度在 5-20 之间' },
          { pattern: /^\w+$/, message: '只能是字母数字下划线' },
        ]}
      >
        <Input placeholder="请输入账号"></Input>
      </Form.Item>
      <Form.Item name="password" label="密码" rules={[{ required: true }]}>
        <Input.Password placeholder="请输入密码"></Input.Password>
      </Form.Item>
      <Form.Item
        name="remember"
        label=""
        wrapperCol={{ offset: 6, span: 16 }}
        valuePropName="checked"
      >
        <Checkbox>记住我</Checkbox>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Space>
          <Button type="primary" htmlType="submit" loading={loading}>
            登录
          </Button>
          <Link to={REGISTER_PATHNAME}>注册新用户</Link>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default Login;
