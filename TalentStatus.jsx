import React from 'react'
import { Form, Checkbox } from 'semantic-ui-react';
import { SingleInput } from '../Form/SingleInput.jsx';
import { Grid , Icon, Input,Table} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';


export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props);

        //MOS24072021 added for advanced tasks module 1
        const jobSeekingStatus = {
            status: "",
            availableDate: ""
        };

        this.state = {
            showEditSection: false,
            jobSeekingStatus: jobSeekingStatus
        }

        this.saveJobSeekingStatus = this.saveJobSeekingStatus.bind(this); 
        this.openEdit = this.openEdit.bind(this); 
        this.closeEdit = this.closeEdit.bind(this); 
        this.handleChange = this.handleChange.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this.renderDisplay = this.renderDisplay.bind(this);
    }

    componentDidUpdate() {
        console.log("componentDidUpdate",this.props.jobSeekingStatus);
        this.jobSeekingStatus = this.props.jobSeekingStatus ?
        Object.assign({}, this.props.jobSeekingStatus)
        : {
            status: "",
            availableDate: ""
          }        
    }

    openEdit() {
        this.setState({
            showEditSection: true,
            jobSeekingStatus: this.props.jobSeekingStatus
        })    
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })    
    }

    saveJobSeekingStatus() {
        //debugger;
        const data = Object.assign({}, this.state.jobSeekingStatus);
        data["availableDate"] = moment();
        this.setState({
            jobSeekingStatus: data
        })

        console.log("saveJobSeekingStatus",this.state.jobSeekingStatus)
        // const data = Object.assign({}, this.state.jobSeekingStatus)
        this.props.saveProfileData("jobSeekingStatus",this.state.jobSeekingStatus);
        this.closeEdit();
    }

    handleChange (e, { name,value }) { 
        const data = Object.assign({}, this.state.jobSeekingStatus);
        data[name] = value;
        this.setState({
            jobSeekingStatus: data
        })
    }
    
    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit()
    {
        const { status,availableDate } = this.state.jobSeekingStatus;

        return(
        
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.Cell width="1">
                            Current Status
                        </Table.Cell>
                        {/* <Table.Cell width="8">
                            Availability
                        </Table.Cell> */}
                        <Table.Cell width="1">
                        </Table.Cell>
                        {/* <Table.Cell width="1">
                        </Table.Cell> */}
                    </Table.Row>
                </Table.Header>                    
                <Table.Body>
                    <Table.Row>
                        <Table.Cell width="1">
                            <Checkbox
                                radio
                                label='Actively looking for a job'
                                name='status'
                                value='Actively looking for a job'
                                checked={status === 'Actively looking for a job'}
                                onChange={this.handleChange}
                            />
                            <Checkbox
                                radio
                                label='Not looking for a job at the moment'
                                name='status'
                                value='Not looking for a job at the moment'
                                checked={status === 'Not looking for a job at the moment'}
                                onChange={this.handleChange}
                            />
                            <Checkbox
                                radio
                                label='Currently employed but open to offers'
                                name='status'
                                value='Currently employed but open to offers'
                                checked={status === 'Currently employed but open to offers'}
                                onChange={this.handleChange}
                            />
                            <Checkbox
                                radio
                                label='Will be available on later date'
                                name='status'
                                value='Will be available on later date'
                                checked={status === 'Will be available on later date'}
                                onChange={this.handleChange}
                            />
                        </Table.Cell>
                        {/* <Table.Cell width="12">
                            <Checkbox
                                radio
                                label='1 week'
                                name='availableDate'
                                value='1 week'
                                checked={availableDate === '1 week'}
                                onChange={this.handleChange}
                            />
                            <Checkbox
                                radio
                                label='2 weeks'
                                name='availableDate'
                                value='2 weeks'
                                checked={availableDate === '2 weeks'}
                                onChange={this.handleChange}
                            />
                        </Table.Cell> */}
                        <Table.Cell width="1">
                            <button type="button"  className="ui teal button" onClick={this.saveJobSeekingStatus}>Save</button>
                            <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                        </Table.Cell>
                        {/* <Table.Cell width="1">
                            <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                        </Table.Cell> */}
                    </Table.Row>
                </Table.Body>
            </Table>
        )
    }

    renderDisplay()
    {
        const { status,availableDate } = this.props.jobSeekingStatus ? 
        this.props.jobSeekingStatus : this.jobSeekingStatus;

        return(
        <div className='row'>
            <div className="ui sixteen wide column">
                <Grid columns='equal' className="header">
                    <Grid.Column>
                        Current Status:
                    </Grid.Column>
                    {/* <Grid.Column>
                        Availability:
                    </Grid.Column> */}
                </Grid>
                <Grid columns='equal'>
                    <Grid.Column>
                        {status} 
                    </Grid.Column>
                    {/* <Grid.Column>
                        {availableDate} 
                    </Grid.Column> */}
                </Grid>    
                <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
            </div>
        </div>
        )
    }
}