import React, { useState, useContext } from 'react';
import { crimeTypes } from '../data/data'
import "../style/Fundamental.scss"
import { CrimeContext ,CrimeProvider} from '../contexts/CrimeContex'
function FundamentalDropdown() {
  const [selectedCrimeType, setSelectedCrimeType] = useState('');
  const [selectedVariable, setSelectedVariable] = useState('');
  const {selectedFilter,setSelectedFilter} = useContext(CrimeContext)


  const FilterSubmit = (e)=>{
    e.preventDefault();
    setSelectedFilter({
      crime_type: selectedCrimeType,
      filter_type: selectedVariable
    })
    console.log("Selected Filter:", selectedFilter);
  }
  return (
    <div className='fd-container'>
        <div className='dropdown-container'>
            <div className="fd-crime-type">
            <label className='fd-label'>Crime-Type</label>
            <select className='fd-select'
            onChange={(e)=>setSelectedCrimeType(e.target.value)}
            value={selectedCrimeType || selectedFilter.crime_type}            >
              {  crimeTypes.map((crime)=>{
                   return (
                    <option key={crime.crimeCode} value={crime.crimeType}
                    
                    >{crime.crimeType}</option>
                   )

                })}
            </select>
        </div>
        <div className='fd-veriable'>
            <label className='fd-veriable'>Veriable</label>
            <select className='fd-select'
            onChange={(e)=>setSelectedVariable(e.target.value)}
            value={selectedVariable }
            >
             
             <option value ='year'>year</option>
             <option value ='month'>month</option>
             <option value ='gender'>Gender</option>
             <option value ='department_code'>department</option>
             <option value ='age_group'>Age-Group</option>
             <option value ='weapons_types'>weapons_types</option>
             
             
              

            </select>

        </div>
       <button onClick={(e)=>FilterSubmit(e)}>Apply Filter</button>
        </div>

        
    </div>
  )
}

export default FundamentalDropdown