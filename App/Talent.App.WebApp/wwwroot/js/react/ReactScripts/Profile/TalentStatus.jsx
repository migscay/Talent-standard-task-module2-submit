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
            availableDate: null
        };

        this.state = {
            jobSeekingStatus: { 
                status: "",
                availableDate: null
            } 
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentWillReceiveProps(props) {
        if (props.jobSeekingStatus) {
            this.setState({
                jobSeekingStatus: props.jobSeekingStatus 
            })
        }
    }      

    handleChange (e, { name,value }) { 
        const data = Object.assign({}, this.state.jobSeekingStatus);
        data[name] = value;
        this.jobSeekingStatus = data;
        this.props.saveProfileData("jobSeekingStatus",this.jobSeekingStatus);
    }
    
    render() {

        const { status,availableDate } = this.state.jobSeekingStatus;

        return(
        
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.Cell width="1">
                            Current Status
                        </Table.Cell>
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
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell width="1">
                            <Checkbox
                                radio
                                label='Not looking for a job at the moment'
                                name='status'
                                value='Not looking for a job at the moment'
                                checked={status === 'Not looking for a job at the moment'}
                                onChange={this.handleChange}
                            />
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell width="1">
                            <Checkbox
                                radio
                                label='Currently employed but open to offers'
                                name='status'
                                value='Currently employed but open to offers'
                                checked={status === 'Currently employed but open to offers'}
                                onChange={this.handleChange}
                            />
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell width="1">
                            <Checkbox
                                radio
                                label='Will be available on later date'
                                name='status'
                                value='Will be available on later date'
                                checked={status === 'Will be available on later date'}
                                onChange={this.handleChange}
                            />
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        )
    }
}