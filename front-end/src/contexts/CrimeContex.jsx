import { createContext, useState, useEffect , useRef } from 'react';

const CrimeContext = createContext();
const DEFAULT_FILTER = {
  crime_type: "HURTO_PERSONAS",
  filter_type: "department",
  
};


const CrimeProvider = ({ children }) => {
  const [crimeData, setCrimeData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(DEFAULT_FILTER);
  const abortControllerRef  = useRef(null);



  const fetchCrimeData = async (filters = DEFAULT_FILTER) => {
      if(abortControllerRef.current){
        abortControllerRef.current.abort()
      }

      const Controller = new AbortController();
      abortControllerRef.current = Controller;

    setLoading(true);
    setError(null);
    try {
      
      const response = await fetch(`https://buddhi-group-be.onrender.com/crime_type_stats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters),
        signal: Controller.signal
      });
      if (!response.ok) {
        throw new Error('Failed to fetch crime data');
      }
      const data = await response.json();
      setCrimeData(data);
      console.log("Fetched data:", data);
    } catch (error) {
        if (error.name === "AbortError") {
        console.log("Previous request aborted ✅");
        return; // don’t treat abort as real error
      }
      setError(error.message);
      console.error("❌ Fetch error:", error);

    } finally {
      setLoading(false);
    }
  };

  // Log crimeData whenever it changes
  useEffect(() => {
    if (crimeData) {
      console.log("CrimeData updated:", crimeData);
    }
  }, [crimeData]);

  // Initial fetch on mount with fixed filters
  useEffect(() => {
    fetchCrimeData(selectedFilter);
     return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [selectedFilter]);

  return (
    <CrimeContext.Provider
      value={{crimeData, loading, error, selectedFilter, setSelectedFilter }}
    >
      {children}
    </CrimeContext.Provider>
  );
};

export { CrimeContext, CrimeProvider };
