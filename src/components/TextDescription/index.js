/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Col, FormGroup, ControlLabel, FormControl, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Button from '../CustomButton';

const TextDescription = ({
  header, subject, message, id, name,
}) => {
  const [alertMsg, setalertMsg] = useState('');
  const [NewMessage, setNewMessage] = useState(message);
  const [NewSubject, setNewSubject] = useState(subject);
  const dispatch = useDispatch();

  const EditData = () => {
    const payload = {
      id,
      name,
      subject: NewSubject,
      message: NewMessage,
    };

    dispatch({ type: 'EMAILTEMPLATES_EDIT_REQUEST', PayLoad: payload });
  };

  return (
    <div key={id} style={{ marginBottom: '40px' }}>
      <Row>
        <Col md={12}>
          <h5>{header}</h5>
        </Col>
      </Row>
      <Row>
        <Col md={8} className="mb10">
          <Form horizontal>
            <FormGroup>
              <Col md={2}>
                <ControlLabel className="col-md-1">Subject</ControlLabel>
              </Col>
              <Col md={10}>
                <FormControl
                  defaultValue={subject}
                  type="text"
                  onChange={(e) => {
                    setNewSubject(e.target.value);
                  }}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col md={2}><ControlLabel className="col-md-1">Message</ControlLabel></Col>
              <Col md={10}>
                <FormControl
                  rows="3"
                  componentClass="textarea"
                  bsClass="form-control"
                  defaultValue={message}
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                  }}
                />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col md={10} mdOffset={2}>
                <p style={{ textAlign: 'center', fontStyle: 'italic', color: 'green' }}>{alertMsg}</p>
                <Button
                  className="btn-fill"
                  onClick={() => {
                    setalertMsg('Email template updated succesfully');
                    EditData();
                  }}
                >
                  Update
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default TextDescription;
