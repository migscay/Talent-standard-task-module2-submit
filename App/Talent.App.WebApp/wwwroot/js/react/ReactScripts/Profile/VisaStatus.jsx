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
            visaStatus: "",
            visaExpiryDate: moment()
        }
 
        this.handleChange = this.handleChange.bind(this)
        this.saveVisaStatus = this.saveVisaStatus.bind(this)
    }
      
    componentWillReceiveProps(props) {
        if (props.visaStatus) {
            this.setState({
                visaStatus: props.visaStatus,
                visaExpiryDate: props.visaExpiryDate
            })
        }
    }      

    handleChange(name,value) {

        this.setState({
            [name]: value
        }, this.saveVisaStatus)
        
    }

    saveVisaStatus () {
        let saveVisaStatus = false;
        
        if (this.state.visaStatus == 'Citizen' || this.state.visaStatus == 'Permanent Resident')
        {
            saveVisaStatus = true;
        } else
        {
            if (moment(this.state.visaExpiryDate).isValid())
            {
                saveVisaStatus = true;
            }
            else
            {
                TalentUtil.notification.show("Please enter Visa Expiry Date", "error", null, null)
            }
        }
        //debugger;
        if (saveVisaStatus) {
            let data = {};
            data["visaStatus"] = this.state.visaStatus;
            if (this.state.visaStatus != 'Citizen' && this.state.visaStatus != 'Permanent Resident')
            {
                data["visaExpiryDate"] = this.state.visaExpiryDate;
            }
            else
            {
                data["visaExpiryDate"] = "";        
            }
            this.props.saveProfileData(data)    
        }
    }

    render() {

        const visaStatusDropdownOptions = Object.entries(visaStatus).map((x) => <option key={x[0]} value={x[1]}>{x[1]}</option>);

        return (

            <div className='row'>
                <div className="ui sixteen wide column">
                    <Grid columns='equal' className="header">
                        <Grid.Column>
                            Visa Type
                        </Grid.Column>
                        {this.state.visaStatus && this.state.visaStatus != 'Citizen' && this.state.visaStatus != 'Permanent Resident' ?
                        (
                        <Grid.Column>
                            Visa Expiry Date
                        </Grid.Column>
                        ) : null }
                    </Grid>
                    <Grid columns='equal'>
                        <Grid.Column>
                            <select className="ui right labeled dropdown"
                                placeholder="Select Visa Status"
                                value={this.state.visaStatus}
                                onChange={(event) => this.handleChange(event.target.name,event.target.value)}
                                name="visaStatus">
                                <option value="">Select Visa Status</option>
                                {visaStatusDropdownOptions}
                            </select>
                        </Grid.Column>
                        {this.state.visaStatus && this.state.visaStatus != 'Citizen' && this.state.visaStatus != 'Permanent Resident' ?
                        (
                        <Grid.Column>
                            <DatePicker
                                selected={this.state.visaExpiryDate ? moment(this.state.visaExpiryDate) : null}
                                onChange={(date) => this.handleChange("visaExpiryDate", date)}
                                //minDate={moment()}
                            />
                        </Grid.Column>
                        ) : null }
                    </Grid>    
                </div>
            </div>
        )
    }
}