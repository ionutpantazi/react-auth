import React from "react";
import firebase from "firebase/app";
import LoginPage from  "./componente/LoginPage";
import Anonymous from  "./componente/Anonymous";
import "firebase/auth";
import "firebase/database";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthedAnd
} from "@react-firebase/auth";
import { 
  FirebaseDatabaseProvider,
  FirebaseDatabaseNode,
  FirebaseDatabaseMutation
} from "@react-firebase/database";
import { config } from "./config";

import { Form, Input, Button, Row, Col , Comment } from 'antd';
import 'antd/dist/antd.css';
import { createFromIconfontCN } from '@ant-design/icons';
import moment from 'moment';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      value: ''
    };
  }

  onChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  render() {
    this.formRef = React.createRef();
    const { TextArea } = Input;
    const IconFont = createFromIconfontCN({
      scriptUrl: '//at.alicdn.com/t/font_1697557_jkfmpzlqesp.js',
    });
    return (
        <FirebaseAuthProvider {...config} firebase={firebase}>
          <FirebaseAuthConsumer>
          {({ isSignedIn }) => {
              if (isSignedIn === false) {
                return (
                  <LoginPage />
                )
              }
            }}
          </FirebaseAuthConsumer> 
          <IfFirebaseAuthedAnd
            filter={({ providerId }) => {
              return (
                providerId !== "anonymous"
              );
            }}
          >
            {({ isSignedIn, user, providerId }) => {
              return (
                <div style={{margin:'20px'}}>
                  <FirebaseDatabaseProvider firebase={firebase} {...config}>
                    <div>
                      <Row justify="space-around" align="middle">
                        <Col span={12} >
                          <b>Bine ai venit {user.email}</b><br />
                        </Col>
                        <Col span={12}>
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
                              avatar={<IconFont type="icon-avatar_user" style={{ fontSize: '30px' }}/>}
                              author={<b>{val.nume}</b>}
                              content={<i>{val.mesaj}</i>}
                              datetime={<span>{moment([val.data], "LLLL").fromNow()}</span>}
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
                                  <TextArea allowClear autoSize />
                                </Form.Item>
                                <Form.Item>
                                  <Button 
                                    type="primary"
                                    htmlType="submit"
                                    onClick={async () => {
                                    await runMutation({ nume: user.email, mesaj: this.state.value, data:moment(new Date()).format("LLLL")});
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
          </IfFirebaseAuthedAnd>
        <IfFirebaseAuthedAnd
          filter={({ providerId }) => {
            return (
              providerId == "anonymous"
            );
          }}
        >
          {() => {
            return (
              <Anonymous />
            );
          }}
        </IfFirebaseAuthedAnd>
      </FirebaseAuthProvider>
    );
  };
};

export default App