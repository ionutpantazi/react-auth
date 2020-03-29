import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
} from "@react-firebase/auth";
import { config } from "./config";
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';



class App extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    try {
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password)
      .catch(error => {   
        alert('user sau parola incorecta')
        console.log('eroare de autentificare: '+error.message)
     })
    }catch(error){}    
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
    return (
        <FirebaseAuthProvider {...config} firebase={firebase}>
          <FirebaseAuthConsumer>
            {({ isSignedIn }) => {
              if (isSignedIn === false) {
                return (
                  <div>
                  <br />
                  <Row justify="space-around" align="middle">
                     <Col xs={{ span: 16 }} lg={{ span: 6 }}>
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
                            <Button type="submit" type="primary" htmlType="submit">
                              Log in
                            </Button>
                            <Button type="primary" style={{ float: 'right' }} onClick={() => { firebase.auth().signInAnonymously() }}>
                              Log in anonymously
                            </Button>
                          </Form.Item>
                      </Form>
                      <div style={{color:'blue'}}>*valori de test:<br />- username: admin@admin.com;<br />- password: 123456</div>
                    </Col>
                  </Row>
                  </div>
                )
              }
            }}
          </FirebaseAuthConsumer> 
          <IfFirebaseAuthed>
            {({ isSignedIn, user, providerId }) => {
              return (
                <div>
                  <b>Bine ai venit {user.email}</b><br />
                  <Button type='primary' onClick={() => { firebase.auth().signOut() }}>Sign out</Button>
                  <pre style={{ overflow: "auto" }}>
                    {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
                  </pre>
                </div>
              );
            }}
          </IfFirebaseAuthed>
      </FirebaseAuthProvider>
    );
  };
};

export default App