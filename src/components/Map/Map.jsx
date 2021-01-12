import React, {useState, useEffect}  from 'react';
import { MapContainer as LeafletMap, TileLayer, ZoomControl, Marker, Circle, Popup } from "react-leaflet";
import "./Map.css";
import { renderToStaticMarkup } from 'react-dom/server';
import {CircularProgress, easing } from '@material-ui/core';
import numeral from "numeral";
import { fetchCountries } from '../../api';

import {divIcon} from 'leaflet';

const Map = ({ data}) => {

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchedCountries = async () => {
            setCountries(await fetchCountries());
        }
    
        fetchedCountries();
    }, [setCountries]);
        
    if(!data.cases){  
        return(

            <div className="loading">
                <CircularProgress color="secondary" xs={12} md={3} justify="center"/>
            </div>

        );     
    } else {
        return(
            <div className="map">
                <LeafletMap center={data.mapCenter} zoom={data.mapZoom} zoomControl={false} minZoom={2}>
                    <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <ZoomControl  className='zoom-control' position="bottomright" zoomAnimation={easing}/>
                    {data.country?
                        <Marker 
                            position={[data.mapCenter.lat, data.mapCenter.lng]} 
                            icon= {
                                divIcon({
                                    html: renderToStaticMarkup(<svg style={{width: `${100/data.mapZoom}px`,
                                        marginTop: '-4rem',
                                        color: "#006dac",}} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="map-marker-alt" className="svg-inline--fa fa-map-marker-alt fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path></svg>),
                                })
                            }>
                        </Marker> : ''
                    }
                    {countries.map( (country, i) => 
                        <Circle key={i}
                        center={[country.lat, country.lng]}
                        color={"#db5567"}
                        fillColor={"#db5567"}
                        fillOpacity={0.4+ (Math.sqrt(country.cases) / 20000)}
                        weight={0.8}
                        radius={Math.sqrt(country.cases) * (7000/(data.mapZoom*6))}
                        >
                        <Popup>
                            <div className="info-container">
                                <div className="info-name">
                                    {country.country}
                                    <img
                                        alt= {country.alpha}
                                        className="info-flag"
                                        src={country.flag}
                                    />
                                    
                                </div>
                                <div className="info-data">
                                    <span className="info-type">
                                        <div className='buble buble-infected'></div>
                                        Cases
                                    </span>
                                     {numeral(country.cases).format("0,0")}
                                </div>
                                <div className="info-data">
                                    <span className="info-type">
                                    <div className='buble buble-recovered'></div>
                                        Recovered
                                    </span> {numeral(country.recovered).format("0,0")}
                                </div>
                                <div className="info-data">
                                <span className="info-type">
                                <div className='buble buble-deaths'></div>
                                Deaths
                                    </span>
                                     {numeral(country.deaths).format("0,0")}
                                </div>
                            </div>
                        </Popup>
                    </Circle>
                        
                    )}
                    
                </LeafletMap>
            </div>
        );
    }
}

export default Map;