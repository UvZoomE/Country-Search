import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Display from './components/Display'

function App() {
  const [wholeData, setWholeData] = useState('')
  const [specificData, setSpecificData] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
  .then(res => res.data)
  .then(res => setWholeData(res))
  }, [])

  return (
    <div>
      <p>find countries</p><input value={specificData} onChange={(e) => setSpecificData(e.target.value)}/>
      <Display wholeData={wholeData} specificData={specificData}/>
    </div>
  )
}

export default App;
