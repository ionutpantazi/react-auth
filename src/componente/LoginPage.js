import React from 'react';
import firebase from "firebase/app";

import { Form, Input, Button, Row, Col, Tabs, Card , Tooltip } from 'antd';
import { UserOutlined, LockOutlined , createFromIconfontCN } from '@ant-design/icons';
import 'antd/dist/antd.css';

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        if (errorCode === 'auth/invalid-email') {
          alert('e-mail invalid');
        }
        if (errorCode === 'auth/user-disabled') {
          alert('user dezactivat');
        }
        if (errorCode === 'auth/user-not-found') {
          alert('user gresit');
        }
        if (errorCode === 'auth/wrong-password') {
          alert('parola gresita');
        }
        console.log(error);
      });
  };

  handleUserChange(evt) {
    this.setState({
      username: evt.target.value,
    });
  };

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value,
    });
  }

  render() {
    const { TabPane } = Tabs;
    function callback(key) {
      console.log(key);
    }
    const IconFont = createFromIconfontCN({
      scriptUrl: '//at.alicdn.com/t/font_1697557_zfgfi4er1xk.js',
    });
    return (
      <div style={{ marginTop: '20px' }}>
        <Row justify="space-around" align="middle">
          <Col xs={{ span: 16 }} lg={{ span: 6 }}>
            <Card>
              <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Login" key="1">
                  <span>Log in using username and password:</span><br /><br />
                  <Form onFinish={this.handleSubmit}>
                    <Form.Item
                      name="username"
                      rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                      <Input
                        allowClear
                        prefix={<UserOutlined />}
                        placeholder="Username"
                        value={this.state.username}
                        onChange={this.handleUserChange}
                      />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                      <Input
                        allowClear
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handlePassChange}
                      />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit" size="small">
                        Log in
                      </Button>
                    </Form.Item>
                  </Form>
                  <span>Alternatively you can choose to use existing login sistems:</span><br /><br />
                  <Row justify="space-around" align="middle">
                    <Col>
                      <Tooltip title="Facebook login">
                        <Button type="link" onClick={() => {
                          firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider());
                        }}>
                          <IconFont type="icon-facebook_login" style={{ fontSize: '25px' }} />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Google login" onClick={() => {
                          firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
                        }}>
                        <Button type="link">
                          <IconFont type="icon-Googleiconlogo" style={{ fontSize: '23px' }} />
                        </Button>
                      </Tooltip>
                      <Tooltip title="Anonymous login">
                        <Button type="link" onClick={() => { firebase.auth().signInAnonymously() }}>
                          <IconFont type="icon-anonymous" style={{ fontSize: '25px' }} />
                        </Button>
                      </Tooltip>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tab="Register" key="2">
                  Content under development
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default LoginPage