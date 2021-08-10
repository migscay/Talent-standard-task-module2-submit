/* Skill section */
import React from 'react';
import Cookies from 'js-cookie';
import { Grid , Icon, Dropdown, Input, Table } from 'semantic-ui-react';

export default class Skill extends React.Component {
    constructor(props) {
        super(props);

        //MOS24072021 added for standard tasks module 1
        this.state = {
            showEditSection: false,
            newSkill: {
                Id: "",
                Skill: "",
                ExperienceLevel: ""
            },
            newSkillValid: false,
            createOrUpdate: "",
            levelDropdownOptions:
            [
                {
                    text: "Beginner",
                    value: "Beginner",
                    key: "Beginner"    
                },
                {
                    text: "Intermediate",
                    value: "Intermediate",
                    key: "Intermediate"    
                },
                {
                    text: "Expert",
                    value: "Expert",
                    key: "Expert"    
                }
            ]
        }

        this.openAdd = this.openAdd.bind(this)
        this.closeAdd = this.closeAdd.bind(this)
        this.renderAdd = this.renderAdd.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.editSkill = this.editSkill.bind(this)
        this.deleteSkill = this.deleteSkill.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveSkill = this.saveSkill.bind(this)
    }

    editSkill(skill) {
        this.setState({
            showEditSection: true,
            newSkill: {
                Id: skill.id,
                Skill: skill.name,
                ExperienceLevel: skill.level
            },
            newSkillValid: false,
            createOrUpdate: "Update"
        })
    }

    deleteSkill(skillId) {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'https://talent-profile.azurewebsites.net/profile/profile/DeleteSkill',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(skillId),
            success: function (res) {
                console.log(res)
                if (res.success == true) {
                    TalentUtil.notification.show("Skill sucessfully deleted", "success", null, null)
                    this.props.loadData()
                } else {
                    TalentUtil.notification.show("Skill was not deleted", "error", null, null)
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
            newSkill: {
                Id: "",
                Skill: "",
                ExperienceLevel: ""
            },
            newSkillValid: false,
            createOrUpdate: "Create"
        })
    }

    saveSkill() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'https://talent-profile.azurewebsites.net/profile/profile/createUpdateSkill',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.newSkill),
            success: function (res) {
                console.log(res)
                if (res.success == true) {
                    if (this.state.createOrUpdate === "Create")
                    {
                        TalentUtil.notification.show("Skill added sucessfully", "success", null, null)
                    }                    
                    else
                    {
                        TalentUtil.notification.show("Skill updated sucessfully", "success", null, null)
                    }                    
                    this.props.loadData()
                } else {
                    TalentUtil.notification.show("Skill did not add successfully", "error", null, null)
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
        const data = Object.assign({}, this.state.newSkill);
        data[field] = value

        this.setState({
            newSkill: data
        })
        if (this.state.newSkill.Skill != "" && this.state.newSkill.ExperienceLevel != "")
        {
            this.setState({
                newSkillValid: true
            })
        } else {
            this.setState({
                newSkillValid: false
            })
        }       
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
                <Table celled>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell width="8">
                                <Input
                                    autoFocus={true}
                                    type="text"
                                    name="skillName"
                                    value={this.state.newSkill.Skill}
                                    onChange={(event, { value }) => this.handleChange("Skill", value)} />
                            </Table.Cell>
                            <Table.Cell width="12">
                                <Dropdown
                                    placeholder='Select Level'
                                    defaultValue={this.state.newSkill.ExperienceLevel}
                                    fluid
                                    selection
                                    options={this.state.levelDropdownOptions}
                                    onChange={(event, { value }) => this.handleChange("ExperienceLevel", value)}
                                /> 
                            </Table.Cell>
                            <Table.Cell width="10">
                                { this.state.newSkill.Skill != "" && this.state.newSkill.ExperienceLevel != "" ?    
                                (<button type="button"  className="ui teal button" onClick={this.saveSkill}>Save</button>) : 
                                (<button type="button"  className="ui teal button disabled" onClick={this.saveSkill}>Save</button>)
                                }
                            </Table.Cell>
                            <Table.Cell width="10">
                                <button type="button" className="ui button" onClick={this.closeAdd}>Cancel</button>  
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>

                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Skill</Table.HeaderCell>
                                <Table.HeaderCell>Level</Table.HeaderCell>
                                <Table.HeaderCell><button type="button" className="ui right floated teal button disabled" onClick={this.openAdd}><Icon name="plus square outline"></Icon>Add New</button></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {this.props.skillData.map((skill) => (                
                            <Table.Row key={skill.id}>
                                <Table.Cell>{skill.name}</Table.Cell>
                                <Table.Cell>{skill.level}</Table.Cell>
                                <Table.Cell><i className="ui edit icon disabled"></i><i className="ui delete icon disabled"></i></Table.Cell>
                            </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
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
                            <Table.HeaderCell>Skill</Table.HeaderCell>
                            <Table.HeaderCell>Level</Table.HeaderCell>
                            <Table.HeaderCell><button type="button" className="ui right floated teal button" onClick={this.openAdd}><Icon name="plus square outline"></Icon>Add New</button></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.props.skillData.map((skill) => (                
                        <Table.Row key={skill.id}>
                            <Table.Cell>{skill.name}</Table.Cell>
                            <Table.Cell>{skill.level}</Table.Cell>
                            <Table.Cell><i className="ui edit icon" onClick={()=>this.editSkill(skill)}></i><i className="delete icon" onClick={()=>this.deleteSkill(skill.id)}></i></Table.Cell>
                        </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
            </div>
        )
    }
}