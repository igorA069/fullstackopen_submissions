import { useEffect } from "react"

import Country from "./Country"

const Countries = ({query, countriesData}) => {
    const filteredCountries = countriesData.filter(countryData => countryData.name.common.toLowerCase().includes(query.toLowerCase()))
    const foundCount = filteredCountries.length
    if (foundCount >= 10) {
        return <div>Too many matches, specify another filter</div>
    }
    else if (foundCount > 1) {
        return (
            filteredCountries.map(countryData => <p key={countryData.name.common}>{countryData.name.common}</p>)
        )
    }
    else if (foundCount == 1) {
        return <Country countryData={filteredCountries[0]}/>
    }
}
export default Countries 