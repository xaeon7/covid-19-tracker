import axios from 'axios';

const url = "https://disease.sh/v3/covid-19"

// For global api
export const fetchData = async (country) => {

    let changeableUrl = url;

    if (country) {
        changeableUrl = `${url}/countries/${country}`;
        try {
            const { data: { cases, todayCases, recovered, todayRecovered, deaths, todayDeaths, updated, country,countryInfo } } = await axios.get(changeableUrl)
            const mapCenter = {lat: countryInfo.lat, lng : countryInfo.long };
            const mapZoom = 5;
            const flag = countryInfo.flag;
            return { cases, todayCases, recovered, todayRecovered, deaths, todayDeaths, updated, country, mapCenter, mapZoom, flag};
        } catch (error) {
        }
    } else {
        changeableUrl = `${url}/all/`
        try {
            const { data: { cases, todayCases, recovered, todayRecovered, deaths, todayDeaths, updated, affectedCountries } } = await axios.get(changeableUrl)
            const mapCenter = {lat: 34.80746, lng: -40.4796 };
            const mapZoom = 3;
            return { cases, todayCases, recovered, todayRecovered, deaths, todayDeaths, updated, affectedCountries, mapCenter, mapZoom};
        } catch (error) {
        }
    }
}



export const fetchDailyData = async (country) => {
    if (country) {
        try {
            const { data } = await axios.get(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=120`);
            const dailyCases = Object.values(data.timeline.cases);
            const dates = Object.keys(data.timeline.cases);
            const dailyRecovered = Object.values(data.timeline.recovered);
            const dailyDeaths = Object.values(data.timeline.deaths);
            
            const modifyData = dates.map((date, i) => ({
                cases : dailyCases[i],
                recovered : dailyRecovered[i],
                deaths:dailyDeaths[i],
                date : date,
            }));
            return modifyData;
        } catch (error) {
            return undefined;
        }
    } else {
        try {
            const { data } = await axios.get(`https://disease.sh/v3/covid-19/historical/all?lastdays=120`);
            const dailyCases = Object.values(data.cases);
            const dates = Object.keys(data.cases);
            const dailyRecovered = Object.values(data.recovered);
            const dailyDeaths = Object.values(data.deaths);

            const modifyData = dates.map((date, i) => ({
                cases : dailyCases[i],
                recovered : dailyRecovered[i],
                deaths:dailyDeaths[i],
                date : date,
            }));
            return modifyData;
        } catch (error) {
        }
    }
}

export const fetchCountries = async () => {
    try {
        const { data } = await axios.get(`${url}/countries`);

        const countriesName = data.map((country) => ({
            country: country.country,
            alpha: country.countryInfo.iso2,
            flag: country.countryInfo.flag,
            cases : country.cases,
            recovered : country.recovered,
            deaths:country.deaths,
            lat : country.countryInfo.lat,
            lng : country.countryInfo.long,

        }))
        return countriesName;

    } catch (error) {

    }
}