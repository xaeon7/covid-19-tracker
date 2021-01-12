import React from 'react';
import {  CircularProgress } from '@material-ui/core';
import { Line } from 'react-chartjs-2';


function OverviewGraph( {history, data, limit, size} ) {
    if (!history && data.cases){
        return (
            <div className='overview-graph'>
                This Country doesn't have any historical.
            </div>  
            );
        
    }else if(!history.length) {
        return(
            <div className='overview-graph'>
                <CircularProgress color="secondary"/>
            </div>
        )
    }else{
            return(
                <div className='overview-graph'>
                   <Line 
                   options={
                        {
                            scales:{
                                xAxes:[{
                                    ticks: {
                                        autoSkip: true,
                                        maxTicksLimit: limit}
                                }],
                                yAxes:[{
                                    ticks: {
                                        autoSkip: true,
                                        maxTicksLimit: limit}
                                }]

                            }
                        }
                   }
                   data={{
                    labels : history.map(( data ) => data.date), 
                    datasets : [{
                        data : history.map(( data ) => data.deaths), 
                        label : 'Deaths',
                        borderColor : 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.4)',
                        pointHoverRadius: 7,
                        pointHoverBackgroundColor: 'rgba(75,192,192,0.4)',
                        pointHoverBorderColor: 'rgba(75,192,192)',
                        pointHoverBorderWidth: 2,
                        pointRadius: size,
                        pointBorderWidth: 0.1,
                        fill : true, 
                    
                }, {
                    data : history.map(( data ) => data.recovered), 
                    label : 'Recovered',
                    borderColor : 'green',
                    backgroundColor: 'rgba(0, 255, 0, 0.4)',
                    pointHoverRadius: 7,
                    pointHoverBackgroundColor: 'rgba(75,192,192,0.4)',
                    pointHoverBorderColor: 'rgba(75,192,192)',
                    pointHoverBorderWidth: 2,
                    pointRadius: size,
                    pointBorderWidth: 0.1,
                    fill : true, 
                    
                }, {
                    data : history.map(( data ) => data.cases), 
                    label : 'Cases',
                    borderColor : '#FFF542',
                    backgroundColor: 'rgba(255, 255, 0, 0.4)',
                    pointHoverRadius: 7,
                    pointHoverBackgroundColor: 'rgba(75,192,192,0.4)',
                    pointHoverBorderColor: 'rgba(75,192,192)',
                    pointHoverBorderWidth: 2,
                    pointRadius: size,
                    pointBorderWidth: 0.1,
                    fill : true, 
                    
                }],
            }}
        />
                </div>
        
            )
    }
}

export default OverviewGraph;
