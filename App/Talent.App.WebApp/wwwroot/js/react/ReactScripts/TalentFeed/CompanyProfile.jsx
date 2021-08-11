import React from 'react';
import { BodyWrapper, loaderData } from '../Layout/BodyWrapper.jsx';
import { Card, Icon, Image, Grid, Button, Item, Header, ItemContent} from 'semantic-ui-react';

export default class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            firstName: "",
            lastName: "",
            location: {
                city: "",
                country: ""
            },
            name: "",
            phone: ""
        };
    }

    componentWillReceiveProps(props) {
        this.setState(
            props.employerData 
        )
    }

    render() {      
        
        return (
            <Card fluid >
            <Card.Content textAlign='center'>
                <Item>
                    <Item.Image size='small' src={'../../../../images/images.jpg'} />
                    <Item.Content>
                        <span><Icon name='point' />{ `${this.state.location.city},${this.state.location.country}`}</span>
                        <br/><br/>
                        <Card.Description>
                        We currently do not have specific skills that we desire.
                        </Card.Description>
                        <br/><br/>
                        <Card.Content extra textAlign='left'>
                        <a>    
                        <Icon name='phone' />: {this.state.phone}
                        </a>
                        </Card.Content>
                        <Card.Content extra textAlign='left'>
                        <a>    
                        <Icon name='mail' />: {this.state.email}
                        </a>
                        </Card.Content>
                    </Item.Content> 
                </Item>
            </Card.Content> 
        </Card>
        ) 
    }
}   