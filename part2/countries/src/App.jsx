import { useState, useEffect } from 'react'

import Countries from './components/Countries'

import countriesService from './services/countries'

function App() {
  const [query, setQuery] = useState('')
  const [countriesData, setCountriesData] = useState([])

  useEffect(() => { countriesService.getAll().then(newCountriesData => setCountriesData(newCountriesData)) }, [])   

  const onChangeQuery = (event) => setQuery(event.target.value)

  return (
    <>
      Find countries <input value={query} onChange={onChangeQuery}></input>
      <Countries query={query} countriesData={countriesData}/>
    </>
  )
}

export default App
