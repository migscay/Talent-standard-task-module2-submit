import React from 'react'
import { SingleInput } from '../Form/SingleInput.jsx';
import { Grid , Icon, Input,Table,Dropdown} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {visaStatus} from '../Employer/common.js';

export default class VisaStatus extends React.Component  {
    constructor(props) {
        super(props)
        
       // MOS28072921 added for standard task module 1
        this.state = {
            showEditSection: false,
            visaStatus: "",
            visaExpiryDate: ""
        }
 
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveVisaStatus = this.saveVisaStatus.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)

    }
      
    openEdit() {
        this.setState({
            showEditSection: true,
            visaStatus: this.props.visaStatus ? this.props.visaStatus : "" ,
            visaExpiryDate: this.props.visaExpiryDate ? this.props.visaExpiryDate : ""
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(name,value) {
        this.setState({
            [name]: value
        })
        console.log('handleChange',event,this.state)
    }

    saveVisaStatus() {
        let data = {};
        data["visaStatus"] = this.state.visaStatus;
        data["visaExpiryDate"] = this.state.visaExpiryDate;
        this.props.saveProfileData(data)
        this.closeEdit()
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {

        const visaStatusDropdownOptions = Object.entries(visaStatus).map((x) => <option key={x[0]} value={x[1]}>{x[1]}</option>);
    
        return (

            <div className='ui sixteen wide column'>
                <select className="ui right labeled dropdown"
                        placeholder="Select Visa Status"
                        value={this.state.visaStatus}
                        onChange={(event) => this.handleChange(event.target.name,event.target.value)}
                        name="visaStatus">
                        <option value="">Select Visa Status</option>
                        {visaStatusDropdownOptions}
                    </select>
                <br/>
                {this.state.visaStatus != 'Citizen' && this.state.visaStatus != 'Permanent Resident' ?
                (<DatePicker
                    selected={this.state.visaExpiryDate ? moment(this.state.visaExpiryDate) : moment()}
                    onChange={(date) => this.handleChange("visaExpiryDate", date)}
                    minDate={moment()}
                />)
                : (<React.Fragment/>)            
                }
                <button type="button" className="ui right floated teal button" onClick={this.saveVisaStatus}>Save</button>
                <button type="button" className="ui right floated button" onClick={this.closeEdit}>Cancel</button>
            </div>

        )
    }

    renderDisplay() {
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <Grid columns='equal' className="header">
                        <Grid.Column>
                            Visa Status:
                        </Grid.Column>
                        {this.props.visaStatus != 'Citizen' && this.props.visaStatus != 'Permanent Resident' ?
                        (
                        <Grid.Column>
                            Visa Expiry Date:
                        </Grid.Column>
                        ) : null }
                        </Grid>
                    <Grid columns='equal'>
                        <Grid.Column>
                            {this.props.visaStatus} 
                        </Grid.Column>
                        {this.props.visaStatus != 'Citizen' && this.props.visaStatus != 'Permanent Resident' ?
                        (
                        <Grid.Column>
                            {moment(this.props.visaExpiryDate).format('DD/MM/YYYY')} 
                        </Grid.Column>
                        ) : null }
                    </Grid>    
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }
}