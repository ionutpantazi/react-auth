import React from 'react';
import Register from "./Register";
import Login from "./Login";

import { Row, Col, Tabs, Card } from 'antd';

class LoginPage extends React.Component {

  render() {
    const { TabPane } = Tabs;
    function callback(key) {
    }
    return (
      <div style={{ marginTop: '20px' }}>
        <Row justify="space-around" align="middle">
          <Col xs={{ span: 16 }} lg={{ span: 6 }}>
            <Card bodyStyle={{maxWidth:'300px'}}>
              <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Login" key="1">
                  <Login />
                </TabPane>
                <TabPane tab="Register" key="2">
                    <Register />
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