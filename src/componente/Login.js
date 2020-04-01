import React, { useState, useEffect } from 'react';
import firebase from "firebase/app";

import { Form, Input, Button, Tooltip , Row, Col } from 'antd';
import { UserOutlined, LockOutlined, createFromIconfontCN } from '@ant-design/icons';
import 'antd/dist/antd.css';

const Register = () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState(); // To disable submit button at the beginning.

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = values => {
    console.log('Finish:', values);
  };

  const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1697557_zfgfi4er1xk.js',
  });

  return (
    <Form form={form} onFinish={onFinish}>
      <span>Log in using username and password:</span><br /><br />
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            onClick={async () => {
              const values = await form.validateFields();
              firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
              firebase.auth().signInWithEmailAndPassword(values.username, values.password)
                .catch(function (error) {
                  // Handle Errors here.
                  var errorCode = error.code;
                  if (errorCode === 'auth/invalid-email') {
                    alert('Email address is not valid');
                  }
                  if (errorCode === 'auth/user-disabled') {
                    alert('The user corresponding to the given email has been disabled');
                  }
                  if (errorCode === 'auth/user-not-found') {
                    alert('There is no user corresponding to the given email');
                  }
                  if (errorCode === 'auth/wrong-password') {
                    alert('The password is invalid for the given email, or the account corresponding to the email does not have a password set');
                  }
                  console.log(error);
                });
            }}
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Log in
          </Button>
        )}
      </Form.Item>
      <span>Alternatively you can choose to use existing login sistems:</span><br /><br />
      <Row justify="space-around" align="middle">
        <Col>
          <Tooltip title="Facebook login">
            <Button className="hover" type="link" onClick={() => {
              firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider());
            }}>
              <IconFont type="icon-facebook_login" style={{ fontSize: '25px' }} />
            </Button>
          </Tooltip>
          <Tooltip title="Google login" onClick={() => {
            firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
          }}>
            <Button className="hover" type="link">
              <IconFont type="icon-Googleiconlogo" style={{ fontSize: '23px' }} />
            </Button>
          </Tooltip>
          <Tooltip title="Guest login">
            <Button className="hover" type="link" onClick={() => { firebase.auth().signInAnonymously() }}>
              <IconFont type="icon-anonymous" style={{ fontSize: '25px' }} />
            </Button>
          </Tooltip>
        </Col>
      </Row>
    </Form>
  );
};

export default Register