/*eslint-disable*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from "react-select";
import { Col, FormGroup, ControlLabel, FormControl, Form, Radio, ButtonGroup, ToggleButton, ToggleButtonGroup, Control, Group } from "react-bootstrap";
import Button from '../../components/CustomButton';
import { getEmailSettingsRequest } from '../../actionCreators/EmailSettings';
import { emailSettingsEditRequest } from '../../actionCreators/EmailSettingsEdit'
import emailSettingsEdit from '../../reducers/EmailSettingsEdit';

class EmailSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      variableValue: '',
    }
  }

  // Buttons hiding on initial render
  hideEsButtons = (time) => {
    const esButtonList = document.getElementsByClassName('es-button')
    setTimeout(() => {
      for (let item of esButtonList) {
        item.style.display = 'none'
      }
    }, time)
  }

  // Button hiding while editing
  hideEsButtonsInstant = () => {
    const esButtonList = document.getElementsByClassName('es-button')
    for (let item of esButtonList) {
      item.style.display = 'none'
    }
  }

  componentDidMount() {
    this.props.getEmailSettingsRequest()
    this.hideEsButtons(1000)
  }

  // Check to render radio or not
  radioCheck = (val) => {
    // return val == 'mail.smtp.auth' || val == 'mail.smtp.starttls.enable' ? true : false
    return false
  }

  // onChange Handler
  editHandler = (e) => {
    // e.preventDefault()
    this.hideEsButtonsInstant()
    let esid = e.target.getAttribute("esidinput")
    let button = document.querySelector('[esidbutton="' + esid + '"]');
    button.style.display = 'block'
    this.setState({
      id: esid,
      variableValue: e.target.value
    })
  }

  // Update handler
  updateHandler = (e) => {
    this.props.emailSettingsEditRequest(this.state)
    alert('Env settings updated successfully')
    this.hideEsButtonsInstant()
  }

  // Render function
  render() {
    const { emailSettings } = this.props.emailSettings;
    const options = [
      { value: 'true', label: "Praveen" },
      { value: 'false', label: "False" }
    ]
    return (
      <div>
        <Col md={9}>
          <h5>Environmental Variables</h5>
        </Col>
        <Col md={12}>
          <Form horizontal>

            {emailSettings && emailSettings.map(val => {
              return (<FormGroup key={val.id}>
                <Col md={2}>
                  <ControlLabel className="col-md-1">{val.variableName}</ControlLabel>
                </Col>
                <Col md={5}>
                  {this.radioCheck(val.variableName) ?
                    <div>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        name="simSlotUsed"
                        // value='true'
                        // inputValue='true'
                        esidinput={val.id}
                        onChange={(e) => this.editHandler(e)}
                        defaultValue='true'
                        options={options}
                        isSearchable={false}
                      // isLoading={true}
                      />
                    </div> :
                    <FormControl defaultValue={val.variableValue} type="text" esidinput={val.id} onChange={(e) => this.editHandler(e)} />}
                </Col>
                <Col md={5}>
                  <Button variant="link" className='es-button' esidbutton={val.id} onClick={(e) => this.updateHandler(e)}>
                    Update
                  </Button>
                </Col>
              </FormGroup>
              )
            })}
          </Form>
        </Col>
      </div>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
  emailSettings: state.emailSettingsState,
  emailSettingsEdit: state.emailSettingsEditState
});


const mapDispatchToProps = (dispatch) => ({
  getEmailSettingsRequest: () => dispatch(getEmailSettingsRequest()),
  emailSettingsEditRequest: (payload) => dispatch(emailSettingsEditRequest(payload))
});


export default connect(mapStateToProps, mapDispatchToProps)(EmailSettings);

// export default (Emailsettings);
