import React, {useState, useEffect} from 'react';
import { NativeSelect, FormControl} from '@material-ui/core';
import { fetchCountries } from '../../api';
 
import'./CountryPicker.css';


const CountryPicker = ( { handleCountryChange } ) => {

    const [countries, setCountries] = useState([]);

    
    useEffect(() => {
        const fetchedCountries = async () => {
            setCountries(await fetchCountries());
        }
    
        fetchedCountries();
    }, [setCountries])
    

    return(
        <div className="country">
            <div className="formControle">
                <FormControl className="select-menu">
                    <NativeSelect  defaultValue="" onChange={ (e) => handleCountryChange( e.target.value )}>
                        <option value="">Global</option>
                        {countries.map( (country, i) => <option key={i} value={country.alpha}> {country.country} </option> )}
                    </NativeSelect>
                </FormControl>
            </div>
        </div>
    );
}

export default CountryPicker;