/*eslint-disable*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'react-bootstrap';
import TextDescription from '../../components/TextDescription';
import { getEmailTemplatesRequest } from '../../actionCreators/EmailTemplates';


class Emailtemplates extends Component {

    componentDidMount() {
        this.props.getEmailTemplatesRequest()
    }

    render() {
        const { emailTemplates } = this.props.emailTemplates;
        return (
            <div>
                {emailTemplates && emailTemplates.map((val) => <Grid fluid>
                    <TextDescription key={val.id} header={val.name} subject={val.subject} message={val.message} id={val.id} name={val.name} />
                </Grid>)}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    emailTemplates: state.emailTemplatesState,
});

const mapDispatchToProps = (dispatch) => ({
    getEmailTemplatesRequest: () => dispatch(getEmailTemplatesRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Emailtemplates);
