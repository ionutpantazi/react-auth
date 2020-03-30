import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
} from "@react-firebase/auth";
import { 
  FirebaseDatabaseProvider,
  FirebaseDatabaseNode,
  FirebaseDatabaseMutation
} from "@react-firebase/database";
import { config } from "./config";
import { Form, Input, Button, Row, Col , Comment } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import moment from 'moment';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      value: ''
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

  onChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  render() {
    this.formRef = React.createRef();
    const { TextArea } = Input;
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
                            <Button type="primary" htmlType="submit">
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
                  <FirebaseDatabaseProvider firebase={firebase} {...config}>
                    <div>
                      <Row>
                        <Col span={8}>
                          <b>Bine ai venit {user.email}</b><br />
                        </Col>
                        <Col span={8} offset={8}>
                          <Button style={{ float: 'right' }} type='primary' onClick={() => { firebase.auth().signOut() }}>Sign out</Button>
                        </Col>
                      </Row>
                      <FirebaseDatabaseNode path="mesaje/">
                        {data => {
                          const { value } = data;
                          if (value === null || typeof value === "undefined") return null;
                          const values = Object.values(value);
                          return values.map((val) => (
                            <Comment
                              avatar={<div style={{fontSize:20}}><UserOutlined /></div>}
                              author={<b>{val.nume}</b>}
                              content={<i>{val.mesaj}</i>}
                              datetime={<span>{moment([val.data], "YYYYMMDD").fromNow()}</span>}
                            />
                          ));
                        }}
                      </FirebaseDatabaseNode>
                    </div>
                    <div>
                      <FirebaseDatabaseMutation type="push" path="mesaje/">
                        {({ runMutation }) => {
                          return (
                            <div>
                              <Form onFinish={this.onFinish}>
                                <Form.Item
                                  placeholder="mesaj"
                                  onChange={this.onChange}
                                >
                                  <TextArea rows={4}/>
                                </Form.Item>
                                <Form.Item>
                                  <Button 
                                    type="primary"
                                    htmlType="submit"
                                    onClick={async () => {
                                    await runMutation({ nume: user.email, mesaj: this.state.value, data:moment(new Date()).format("YYYYMMDD")});
                                  }}>Trimite</Button>
                                </Form.Item>
                              </Form>
                            </div>
                          )
                        }}
                      </FirebaseDatabaseMutation>
                    </div>
                  </FirebaseDatabaseProvider>
                </div>
              );
            }}
          </IfFirebaseAuthed>
      </FirebaseAuthProvider>
    );
  };
};

export default App