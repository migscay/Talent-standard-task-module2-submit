/* Self introduction section */
import React, { Component } from 'react';
import Cookies from 'js-cookie'

export default class SelfIntroduction extends React.Component {
    constructor(props) {
        super(props);
    
        // MOS28072921 added for standard task module 1
        this.state = {
            showEditSection: false,
            newSummary: "",
            newDescription: ""
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveSelfIntro = this.saveSelfIntro.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)

    }
          
    openEdit() {
        this.setState({
            showEditSection: true,
            newSummary: this.props.summary,
            newDescription: this.props.description
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        if (event.target.name === 'summary') {
            const data = Object.assign({}, this.state.newSummary)
            data[event.target.name] = event.target.value
            this.setState({
                newSummary: event.target.value
            })
        } else
        if (event.target.name === 'description') {
            const data = Object.assign({}, this.state.newDescription)
            data[event.target.name] = event.target.value
            this.setState({
                newDescription: event.target.value
            })
        } 
    }

    saveSelfIntro() {
        console.log('saveSelfIntro',this.state.newSummary,this.state.newDescription)
        let data = {};
        data["summary"] = this.state.newSummary;
        data["description"] = this.state.newDescription;
        this.props.saveProfileData(data)
        this.closeEdit()
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {
     
        return (

            <div className='ui sixteen wide column'>
                <input
                    type="text"
                    autoFocus={true}
                    name="summary"
                    value={this.state.newSummary}
                    placeholder="Please provide a short summary about yourself"
                    maxLength={150}
                    onChange={this.handleChange}
                />
                <br/>
                <textarea
                    type="textarea"
                    name="description"
                    value={this.state.newDescription}
                    placeholder="Please tell us about any hobbies, additional expertise, or anything else you'd like to add. "
                    minLength={150}
                    maxLength={600}
                    rows={5}
                    onChange={this.handleChange}
                />
                <br/>
                <button type="button" className="ui right floated teal button" onClick={this.saveSelfIntro}>Save</button>
                <button type="button" className="ui right floated button" onClick={this.closeEdit}>Cancel</button>
            </div>

        )
    }

    renderDisplay() {

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <p>Summary: {this.props.summary}</p>
                    <p>Description: {this.props.description}</p>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }
}



