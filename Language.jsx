/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import { Icon, Dropdown, Input, Table } from 'semantic-ui-react';

export default class Language extends React.Component {
    constructor(props) {
        super(props);
       
        // MOS21072921 added for standard task module 1
        this.state = {
            showEditSection: false,
            newLanguage: {
                Id: "",
                Language: "",
                LanguageLevel: ""
            },
            newLanguageValid: false,
            createOrUpdate: "",
            levelDropdownOptions:
            [
                {
                    text: "Basic",
                    value: "Basic",
                    key: "Basic"    
                },
                {
                    text: "Conversational",
                    value: "Conversational",
                    key: "Conversational"    
                },
                {
                    text: "Fluent",
                    value: "Fluent",
                    key: "Fluent"    
                },
                {
                    text: "Native/Bilingual",
                    value: "Native/Bilingual",
                    key: "Native/Bilingual"    
                }
            ]
        }

        this.openAdd = this.openAdd.bind(this)
        this.closeAdd = this.closeAdd.bind(this)
        this.renderAdd = this.renderAdd.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        this.editLanguage = this.editLanguage.bind(this)
        this.deleteLanguage = this.deleteLanguage.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveLanguage = this.saveLanguage.bind(this)
    }

    editLanguage(language) {
        //alert("editLanguage")
        this.setState({
            showEditSection: true,
            newLanguage: {
                Id: language.id,
                Language: language.name,
                LanguageLevel: language.level
            }, 
            newLanguageValid: false,
            createOrUpdate: "Update"
        })
        //alert("showEditSection",this.state.showEditSection)
    }

    deleteLanguage(languageId) {
        //alert(languageId)
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'https://talent-profile.azurewebsites.net/profile/profile/DeleteLanguage',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(languageId),
            success: function (res) {
                console.log(res)
                if (res.success == true) {
                    TalentUtil.notification.show("Language deleted sucessfully", "success", null, null)
                    this.props.loadData()
                } else {
                    TalentUtil.notification.show("Language was not deleted", "error", null, null)
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
        //const details = Object.assign({}, this.props.details)
        //alert("openAdd")
        this.setState({
            showEditSection: true,
            newLanguage: {
                id: "",
                Language: "",
                LanguageLevel: ""
            }, 
            newLanguageValid: false,
            createOrUpdate: "Create"
        })
    }

    saveLanguage() {
        console.log("saveLanguage",this.state.newLanguage);
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'https://talent-profile.azurewebsites.net/profile/profile/createUpdateLanguage',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(this.state.newLanguage),
            success: function (res) {
                console.log(res)
                if (res.success == true) {
                    if (this.state.createOrUpdate === "Create")
                    {
                        TalentUtil.notification.show("Language added sucessfully", "success", null, null)
                    }                    
                    else
                    {
                        TalentUtil.notification.show("Language updated sucessfully", "success", null, null)
                    }                    
                    this.props.loadData()
                } else {
                    TalentUtil.notification.show("Language did not add successfully", "error", null, null)
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
        //debugger;
        const data = Object.assign({}, this.state.newLanguage);
        data[field] = value

        this.setState({
            newLanguage: data
        })
        if (this.state.newLanguage.Language != "" && this.state.newLanguage.LanguageLevel != "")
        {
            this.setState({
                newLanguageValid: true
            })
        } else {
            this.setState({
                newLanguageValid: false
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
            <div className="ui sixteen wide column">
                <Table celled>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell width="8">
                                <Input
                                    autoFocus={true}
                                    type="text"
                                    name="languageName"
                                    value={this.state.newLanguage.Language}
                                    onChange={(event, { value }) => this.handleChange("Language", value)} />
                            </Table.Cell>
                            <Table.Cell width="12">
                                <Dropdown
                                    placeholder='Select Level'
                                    defaultValue={this.state.newLanguage.LanguageLevel}
                                    fluid
                                    selection
                                    options={this.state.levelDropdownOptions}
                                    onChange={(event, { value }) => this.handleChange("LanguageLevel", value)}
                                /> 
                            </Table.Cell>
                            <Table.Cell width="10">
                                { this.state.newLanguage.Language != "" && this.state.newLanguage.LanguageLevel != "" ?    
                                (<button type="button"  className="ui teal button" onClick={this.saveLanguage}>Save</button>) : 
                                (<button type="button"  className="ui teal button disabled" onClick={this.saveLanguage}>Save</button>)
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
                            <Table.HeaderCell>Language</Table.HeaderCell>
                            <Table.HeaderCell>Level</Table.HeaderCell>
                            <Table.HeaderCell><button type="button" className="ui right floated teal button disabled" onClick={this.openAdd}><Icon name="plus square outline"></Icon>Add New</button></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.props.languageData.map((language) => (                
                        <Table.Row key={language.id}>
                            <Table.Cell>{language.name}</Table.Cell>
                            <Table.Cell>{language.level}</Table.Cell>
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
                            <Table.HeaderCell>Language</Table.HeaderCell>
                            <Table.HeaderCell>Level</Table.HeaderCell>
                            <Table.HeaderCell><button type="button" className="ui right floated teal button" onClick={this.openAdd}><Icon name="plus square outline"></Icon>Add New</button></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.props.languageData.map((language) => (                
                        <Table.Row key={language.id}>
                            <Table.Cell>{language.name}</Table.Cell>
                            <Table.Cell>{language.level}</Table.Cell>
                            <Table.Cell><i className="ui edit icon" onClick={()=>this.editLanguage(language)}></i><i className="delete icon" onClick={()=>this.deleteLanguage(language.id)}></i></Table.Cell>
                        </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
            </div>
        )
    }
}