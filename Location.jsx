import React from 'react'
import Cookies from 'js-cookie'
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { countries,nationalities } from '../Employer/common.js';


export class Address extends React.Component {
    constructor(props) {
        super(props)

        // MOS21072921 added for standard task module 1
        const addressData = props.addressData ?
        Object.assign({}, props.addressData)
        : {
            number: "",
            street: "",
            suburb: "",
            country: "",
            city: "",
            postCode: ""
        }

        this.state = {
            showEditSection: false,
            newAddressData: addressData
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveAddress = this.saveAddress.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)

    }
          
    openEdit() {
        const addressData = Object.assign({}, this.props.addressData)
        this.setState({
            showEditSection: true,
            newAddressData: addressData
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.newAddressData)
        data[event.target.name] = event.target.value
        this.setState({
            newAddressData: data
        })
    }

    saveAddress() {
        const data = Object.assign({}, this.state.newAddressData)
        this.props.saveProfileData(this.props.componentId,data)
        this.closeEdit()
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {
        let countriesOptions = [];
        let citiesOptions = [];
        const selectedCountry = this.state.newAddressData.country;
        const selectedCity = this.state.newAddressData.city;
        
        countriesOptions = Object.keys(countries).map((x) => <option key={x} value={x}>{x}</option>);

        if (selectedCountry != "" && selectedCountry != null ) {
           
            var popCities = countries[selectedCountry].map(x => <option key={x} value={x}> {x}</option>);

            citiesOptions = <span><select
                className="ui dropdown"
                placeholder="City"
                value={selectedCity}
                onChange={this.handleChange}
                name="city">
                <option value="0"> Select a town or city</option>
                {popCities}
            </select><br/></span>
        }

        return (
            <div className="ui grid">
                <div className="ui three column row header">
                    <div className="ui column">
                        Number
                    </div>
                    <div className="ui column">
                        Street
                    </div>
                    <div className="ui column">
                        Suburb
                    </div>
                </div>
                <div className="ui three column row">
                    <div className="ui column">
                        <input
                            type="text"
                            autoFocus={true}
                            name="number"
                            value={this.state.newAddressData.number}
                            onChange={this.handleChange} />
                    </div>
                    <div className="ui column">
                        <input
                            type="text"
                            name="street"
                            value={this.state.newAddressData.street}
                            onChange={this.handleChange} />
                    </div>
                    <div className="ui column">
                        <input
                            type="text"
                            name="suburb"
                            value={this.state.newAddressData.suburb}
                            onChange={this.handleChange} />
                    </div>
                </div>
                <div className="ui three column row header">
                    <div className="ui column">
                        Country
                    </div>
                    <div className="ui column">
                        City
                    </div>
                    <div className="ui column">
                        Post Code
                    </div>
                </div>
                <div className="ui three column row">
                    <div className="ui column">
                        <select className="ui right labeled dropdown"
                            placeholder="Country"
                            value={selectedCountry}
                            onChange={this.handleChange}
                            name="country">
                            <option value="">Select a country</option>
                            {countriesOptions}
                        </select>
                    </div>
                    <div className="ui column">
                        {citiesOptions}
                    </div>
                    <div className="ui column">
                        <input
                            type="text"
                            name="postCode"
                            value={this.state.newAddressData.postCode}
                            onChange={this.handleChange} />
                    </div>
                    <button type="button" className="ui teal button" onClick={this.saveAddress}>Save</button>
                    <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                </div>
            </div> 
        )
    }

    renderDisplay() {

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Address: {this.props.addressData.number}, {this.props.addressData.street}, {this.props.addressData.suburb}, {this.props.addressData.postCode}</p>
                        <p>City: {this.props.addressData.city}</p>
                        <p>Country: {this.props.addressData.country}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }

}

export class Nationality extends React.Component {
    constructor(props) {
        super(props)
 
        this.state = {
            showEditSection: false,
            newNationalityData: ""
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveNationality = this.saveNationality.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)

    }
          
    openEdit() {
        this.setState({
            showEditSection: true,
            newNationalityData: this.props.nationalityData
        })
        console.log("renderEdit",this.state.newNationalityData)
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        this.setState({
            newNationalityData: event.target.value
        })
    }

    saveNationality() {
        this.props.saveProfileData(this.props.componentId,this.state.newNationalityData)
        this.closeEdit()
    }

    render() {
        return (
            this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {
        let nationalityOptions = [];
        nationalityOptions = Object.entries(nationalities).map((x) => <option key={x[0]} value={x[1]}>{x[1]}</option>);
 
        return (

            <div className='ui sixteen wide column'>
                <select className="ui right labeled dropdown"
                    placeholder="Nationality"
                    value={this.state.newNationalityData}
                    onChange={this.handleChange}
                    name="nationality">
                    <option value="">Select your Nationality</option>
                    {nationalityOptions}
                </select>
                <button type="button" className="ui teal button" onClick={this.saveNationality}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>
        )
    }

    renderDisplay() {

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Nationality: {this.props.nationalityData}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }
}