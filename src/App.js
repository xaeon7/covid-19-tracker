import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { CountryPicker, Nav, Graphs, Overview, OverviewGlobal, Map, OverviewGraph} from './components';
import './App.css';
import "leaflet/dist/leaflet.css";
import ErrorBoundry from './components/ErrorBoundry';

import { fetchData, fetchDailyData } from './api';


class App extends React.Component{
    

    state = {
        data : {},
        country : '',
        globalData :{},
        history : {}
    }



    async componentDidMount() {
        const data = await fetchData("");
        const globalData = await fetchData("");
        const histo = await fetchDailyData("");
        this.setState({ data : data, globalData : globalData});
        this.setState({ history : histo});

    }


    handleCountryChange = async (country) => {
        this.setState({ data : '', history:''});
        const fetchedData = await fetchData(country);
        const fetchedDaily = await fetchDailyData(country);
        this.setState({ data : fetchedData});
        this.setState({ history : fetchedDaily});
    }


    render() {
        const { data, globalData, history} = this.state;
        return (
            
            <Router>
                <div className="container">
                        <ErrorBoundry>
                                <Map data={data}/>
                        </ErrorBoundry>
                        <Nav/>
                        <ErrorBoundry>
                            <main>
                                <CountryPicker handleCountryChange= {this.handleCountryChange}/>
                                <Switch>
                                    <Route path='/' exact>
                                        <div className='overview-page'>
                                            <Overview data={data}/>
                                            <div className='overview-additional'>
                                                <OverviewGlobal globalData ={globalData}/>
                                                <OverviewGraph history={history} data={data} limit={6} size={1}/>
                                            </div>
                                        </div>
                                    </Route>
                                    <Route path='/graphs'>
                                        <Graphs history={history} data={data}/>
                                    </Route>
                                </Switch>
                            </main>
                        </ErrorBoundry>
                    </div>
            </Router>
        )
    }
}

export default App;