import React from "react";
import firebase from "firebase/app";
import { 
  FirebaseDatabaseProvider,
  FirebaseDatabaseNode,
} from "@react-firebase/database";
import { config } from "../config";

import { Button, Row, Col, Comment } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import moment from 'moment';

class Anonymous extends React.Component {
  render() {
    const IconFont = createFromIconfontCN({
      scriptUrl: '//at.alicdn.com/t/font_1697557_jkfmpzlqesp.js',
    });
    return (
      <div style={{margin:'20px'}}>
        <FirebaseDatabaseProvider firebase={firebase} {...config}>
          <div>
            <Row justify="space-around" align="middle">
              <Col span={12} >
                <b>Welcome guest</b><br />
                <span style={{ color:'red'}}>Guest users are not allowed to send messages</span>
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
                    avatar={<IconFont type="icon-avatar_user" style={{ fontSize: '30px' }} />}
                    author={<b>{val.nume}</b>}
                    content={<i>{val.mesaj}</i>}
                    datetime={<span>{moment([val.data], "LLLL").fromNow()}</span>}
                  />
                ));
              }}
            </FirebaseDatabaseNode>
          </div>
        </FirebaseDatabaseProvider>
      </div>
    )
  }
}

export default Anonymous