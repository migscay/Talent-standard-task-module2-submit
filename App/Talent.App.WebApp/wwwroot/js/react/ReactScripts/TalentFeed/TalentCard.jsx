import React from 'react';
import TalentCardDetail from './TalentCardDetail.jsx';
import { Card, Icon, Image, Grid, Item, Header } from 'semantic-ui-react';

const TalentCard = (Props) => {

    const {talentList} = Props;

    console.log("card talentList",talentList);

    return (
        <React.Fragment>
            { talentList.length > 0 ?
              talentList.map((talent) => (
            <TalentCardDetail talent={talent} key={talent.id}/>         
            )) : <p>There are no talents found for your recruitment company</p>}
        </React.Fragment>
    )
}    

export default TalentCard