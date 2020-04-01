import React from "react";
import {
  FirebaseDatabaseMutation
} from "@react-firebase/database";
import { Form, Button, Input } from 'antd';
import moment from 'moment';

const Mesaj = (nume) => {
  const [form] = Form.useForm();
  const { TextArea } = Input;

  return (
    <FirebaseDatabaseMutation type="push" path="mesaje/">
      {({ runMutation }) => {
        return (
          <Form form={form}>
            <Form.Item
              name="mesaj"
            >
              <TextArea autoSize={{ minRows: 1 }} />
            </Form.Item>
            <Form.Item shouldUpdate>
              {() => (
                <Button
                  disabled={
                    !form.isFieldsTouched(false) ||
                    form.getFieldsError().filter(({ errors }) => errors.length).length
                  }
                  type="primary"
                  htmlType="submit"
                  onClick={async () => {
                    const values = await form.validateFields();
                    await runMutation({ nume: nume.user, mesaj: values.mesaj, data: moment(new Date()).format("LLLL") })
                    form.resetFields();
                  }}
                >
                  Send
                </Button>
              )}
            </Form.Item>
          </Form>
        )
      }}
    </FirebaseDatabaseMutation>
  );
};

export default Mesaj