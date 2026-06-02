import Weather from "./Weather"

const Country = ({countryData}) => {
    const countryCapital = countryData.capital[0]
    return ( 
        <div>
            <h1>{countryData.name.common}</h1>
            <p>Capital: {countryCapital}</p>
            <p>Area: {countryData.area}</p>
            <h1>Languages</h1>
            <ul>
                {Object.values(countryData.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={countryData.flags.png} />
            <Weather city={countryCapital}/>
        </div>
    )
}
export default Country