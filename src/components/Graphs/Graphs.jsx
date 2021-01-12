import React from 'react';
import OverviewGraph from '../Overview/OverviewGraph';
import './Graphs.css';


const Graphs = ({history, data}) => {
    
    return(
        <div className='graphs'>
            <OverviewGraph history={history} data={data} size={4}/>
        </div>
    );
}

export default Graphs;