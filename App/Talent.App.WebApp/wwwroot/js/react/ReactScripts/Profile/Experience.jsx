/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import { Grid , Icon, Input,Table} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';


export default class Experience extends React.Component {
    constructor(props) {
        super(props);
       
//MOS24072021 added for standard tasks module 1
        this.state = {
            showEditSection: false,
            newExperience: {
                id: "",
                company: "",
                position: "",
                responsibilities: "",
                start: "",
                end: ""
            },
            createOrUpdate: ""
        }

        this.openAdd = this.openAdd.bind(this)
        this.closeAdd = this.closeAdd.bind(this)
        this.renderAdd = this.renderAdd.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.editExperience = this.editExperience.bind(this)
        this.deleteExperience = this.deleteExperience.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveExperience = this.saveExperience.bind(this)
    }

    editExperience(experience) {
        this.setState({
            showEditSection: true,
            newExperience: {
                id: experience.id,
                company: experience.company,
                position: experience.position,
                responsibilities: experience.responsibilities,
                start: experience.start,
                end: experience.end
            },
            createOrUpdate: "Update"
        })
    }

    deleteExperience(experienceId) {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'https://talent-profile.azurewebsites.net/profile/profile/DeleteExperience',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(experienceId),
            success: function (res) {
                console.log(res)
                if (res.success == true) {
                    TalentUtil.notification.show("Experience sucessfully deleted", "success", null, null)
                    this.props.loadData()
                } else {
                    TalentUtil.notification.show("Experience was not deleted", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
    }

    openAdd() {
        this.setState({
            showEditSection: true,
            newExperience: {
                id: "",
                company: "",
                position: "",
                responsibilities: "",
                start: "",
                end: moment()
            },
            createOrUpdate: "Create"
        })
    }

    saveExperience() {
        if (this.state.newExperience.start == "") {
            TalentUtil.notification.show("Must select Start Date", "error", null, null);
            return;
        }
        if (moment(this.state.newExperience.end) <= moment(this.state.newExperience.start)) {
            TalentUtil.notification.show("End Date cannot be before Start Date", "error", null, null);
            return;
        }
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'https://talent-profile.azurewebsites.net/profile/profile/createUpdateExperience',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.newExperience),
            success: function (res) {
                console.log(res)
                if (res.success == true) {
                    if (this.state.createOrUpdate === "Create")
                    {
                        TalentUtil.notification.show("Experience added sucessfully", "success", null, null)
                    }                    
                    else
                    {
                        TalentUtil.notification.show("Experience updated sucessfully", "success", null, null)
                    }                    
                    this.props.loadData()
                } else {
                    TalentUtil.notification.show("Experience did not add successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
        this.closeAdd()
    }

    closeAdd() {
        this.setState({
            showEditSection: false
        })
    }   

    handleChange (field, value) {
        const data = Object.assign({}, this.state.newExperience);
        data[field] = value

        this.setState({
            newExperience: data
        })
      }

    render()
    {   
        return (
            this.state.showEditSection ? this.renderAdd() : this.renderDisplay()
        )
    }
    renderAdd() {
        return(
            <div className='row'>
                <div className="ui sixteen wide column">
                    <Grid columns='equal' className="header">
                        <Grid.Column>
                            Company:
                        </Grid.Column>
                        <Grid.Column>
                            Position:
                        </Grid.Column>
                    </Grid>
                    <Grid columns='equal'>
                        <Grid.Column>
                            <Input
                                autoFocus={true}
                                type="text"
                                name="company"
                                value={this.state.newExperience.company}
                                onChange={(event, { value }) => this.handleChange("company", value)} />
                        </Grid.Column>
                        <Grid.Column>
                            <Input
                                type="text"
                                name="position"
                                value={this.state.newExperience.position}
                                onChange={(event, { value }) => this.handleChange("position", value)} />
                        </Grid.Column>
                    </Grid>    
                    <Grid columns='equal' className="header">
                        <Grid.Column>
                            Start Date:
                        </Grid.Column>
                        <Grid.Column>
                            End Date:
                        </Grid.Column>
                    </Grid>
                    <Grid columns='equal'>
                        <Grid.Column>
                            <DatePicker
                                selected={this.state.newExperience.start ? moment(this.state.newExperience.start) : moment()}
                                    onChange={(date) => this.handleChange("start", date)}
                            />
                        </Grid.Column>
                        <Grid.Column>
                            <DatePicker
                                placeholderText="job is current"
                                selected={this.state.newExperience.end ? moment(this.state.newExperience.end) : null}
                                onChange={(date) => this.handleChange("end", date)}
                                minDate={moment(this.state.newExperience.start)}
                            />
                        </Grid.Column>
                    </Grid>    
                    <Grid columns='equal' className="header">
                        <Grid.Column>
                            Responsibilities:
                        </Grid.Column>
                    </Grid>
                    <Grid columns='equal'>
                        <Grid.Column>
                            <Input
                                type="text"
                                name="responsibilities"
                                value={this.state.newExperience.responsibilities}
                                onChange={(event, { value }) => this.handleChange("responsibilities", value)} />
                        </Grid.Column>
                    </Grid>    
                    <Grid columns='equal'>
                        <Grid.Column>
                        { this.state.newExperience.company != "" && this.state.newExperience.position != "" ?    
                            (<button type="button"  className="ui teal button" onClick={this.saveExperience}>Save</button>) : 
                            (<button type="button"  className="ui teal button disabled" onClick={this.saveExperience}>Save</button>)
                        }
                            
                        <button type="button" className="ui button" onClick={this.closeAdd}>Cancel</button>  
                        </Grid.Column>
                    </Grid>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Company</Table.HeaderCell>
                                <Table.HeaderCell>Position</Table.HeaderCell>
                                <Table.HeaderCell>Responsibilities</Table.HeaderCell>
                                <Table.HeaderCell>Start</Table.HeaderCell>
                                <Table.HeaderCell>End</Table.HeaderCell>
                                <Table.HeaderCell><button type="button" className="ui right floated teal button disabled" onClick={this.openAdd}><Icon name="plus square outline"></Icon>Add New</button></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {this.props.experienceData.map((experience) => (                
                            <Table.Row key={experience.id}>
                                <Table.Cell>{experience.company}</Table.Cell>
                                <Table.Cell>{experience.position}</Table.Cell>
                                <Table.Cell>{experience.responsibilities}</Table.Cell>
                                <Table.Cell>{moment(experience.start).format('Do MMM. YYYY')}</Table.Cell>
                                <Table.Cell>{moment(experience.end).format('Do MMM. YYYY')}</Table.Cell>
                                <Table.Cell><i className="ui edit icon disabled"></i><i className="ui delete icon disabled"></i></Table.Cell>
                            </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        )   
    }
    renderDisplay()
    {   console.log("renderDisplay",this.props.languageData)
        return(
            <div className='row'>
            <div className="ui sixteen wide column">
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Company</Table.HeaderCell>
                            <Table.HeaderCell>Position</Table.HeaderCell>
                            <Table.HeaderCell>Responsibilities</Table.HeaderCell>
                            <Table.HeaderCell>Start</Table.HeaderCell>
                            <Table.HeaderCell>End</Table.HeaderCell>
                            <Table.HeaderCell><button type="button" className="ui right floated teal button" onClick={this.openAdd}><Icon name="plus square outline"></Icon>Add New</button></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.props.experienceData.map((experience) => (                
                        <Table.Row key={experience.id}>
                            <Table.Cell>{experience.company}</Table.Cell>
                            <Table.Cell>{experience.position}</Table.Cell>
                            <Table.Cell>{experience.responsibilities}</Table.Cell>
                            <Table.Cell>{moment(experience.start).format('Do MMM. YYYY')}</Table.Cell>
                            <Table.Cell>{moment(experience.end).format('Do MMM. YYYY')}</Table.Cell>
                            <Table.Cell><i className="ui edit icon" onClick={()=>this.editExperience(experience)}></i><i className="delete icon" onClick={()=>this.deleteExperience(experience.id)}></i></Table.Cell>
                        </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
            </div>
        )
    }
}