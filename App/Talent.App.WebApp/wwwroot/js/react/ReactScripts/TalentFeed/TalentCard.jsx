import React, {useState,useEffect} from 'react';
import TalentCardDetail from './TalentCardDetail.jsx';

const TalentCard = (Props) => {

    const {talentList} = Props;

    console.log("card talentList",talentList);

    const [talents,setTalents] = useState([]);

    useEffect(() => {
        if (!talentList) {debugger;}
        setTalents(talents.concat(talentList))
    },[talentList]);
    
    console.log("render",talents.length);

    return (
        <React.Fragment>
            { talents.length > 0 ?
              talents.map((talent) => (
            <TalentCardDetail talent={talent} key={talent.id}/>         
            )) : <p>There are no talents found for your recruitment company</p>}
        </React.Fragment>
    )
}    

export default TalentCard