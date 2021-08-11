import React from 'react';
import ReactPlayer from 'react-player';
import { Card, Icon, Grid, Item } from 'semantic-ui-react';


export default class TalentCardDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showVideo: true
        } 
        
        this.openLinkedIn = this.openLinkedIn.bind(this)
        this.openGithub = this.openGithub.bind(this)

    }

    openLinkedIn () { 
        if (this.props.talent.linkedin) {
            window.open(`${talent.linkedin}`);
        }
        else
        {
            window.open('https://www.linkedin.com/');
        }
    }

    openGithub () { 
        if (this.props.talent.github) {
            window.open(`${talent.github}`);
        }
        else
        {
            window.open('https://www.github.com/');
        }
    }


    render() {

        const {talent} = this.props;

        return (

            <Card fluid >
                <Card.Content>
                    <Icon className='right floated' name='star' size='large'></Icon>
                    <Card.Header>{talent.name}</Card.Header>
                </Card.Content>
                {this.state.showVideo ? (
                    <Card.Content>
                        <ReactPlayer
                            width='475px'
                            url='https://youtube.com/watch?v=w7ejDZ8SWv8&t=12s'
                        />
                    </Card.Content>
                ) : ( 
                <Card.Content>
                    <Item.Group> {/* removing the Group brings the description below the image */}
                        <Item>
                            <Item.Image size='small' src={'../../../../images/camera.png'} />
                            <Item.Content>
                                <Item.Header as='a'>Talent snapshot</Item.Header>
                                <br/><br/>
                                <Item.Header as='a'>Current Employer</Item.Header>
                                    <br/><span>{talent.currentEmployment}</span><br/><br/>                       
                                <Item.Header as='a'>Visa Status</Item.Header>
                                    <br/><span>{talent.visa ? talent.visa : "Unknown"}</span><br/><br/>
                                <Item.Header as='a'>Position</Item.Header>
                                    <br/><span>{talent.level}</span><br/><br/>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Card.Content>
                )}
                <Card.Content extra>
                    <Grid columns={4}>
                        <Grid.Row>
                            <Grid.Column>
                                {this.state.showVideo ? 
                                (<Icon name='user' size='large' onClick={() => this.setState({"showVideo": false})} />)
                                :                                
                                (<Icon name='video' size='large' onClick={() => this.setState({"showVideo": true})} />)
                                }        
                            </Grid.Column>
                            <Grid.Column>
                                <Icon size='large' name='file pdf outline' />
                            </Grid.Column>
                            <Grid.Column>                        
                                <Icon name='linkedin' size='large' onClick={this.openLinkedIn}></Icon>
                            </Grid.Column>
                            <Grid.Column>
                                <Icon size='large' name='github' onClick={this.openGithub} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Card.Content>    
            </Card>
        )

    }
}