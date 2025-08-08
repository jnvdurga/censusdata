import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { API_BASE_URL, ENDPOINTS } from '../api/endpoints';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const fetchApi = async (endpoint, body) => {
    try {
      const response = await axios.get(`${API_BASE_URL}${endpoint}`, body, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        // Server responded with a status code outside 2xx range
        throw new Error(`Request Failed: ${error.response.status} - ${error.response.data}`);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error('No response received from server');
      } else {
        // Something happened in setting up the request
        throw new Error(`Request setup error: ${error.message}`);
      }
    }
  };

  const fetchCrimeData = (payload) => fetchApi(ENDPOINTS.FETCH_CRIME_DATA, payload);
  const fetchCrimeIncidenceRate = (payload) => fetchApi(ENDPOINTS.CRIME_INCIDENCE_RATE, payload);
  const fetchCrimeByGender = (payload) => fetchApi(ENDPOINTS.CRIME_BY_GENDER, payload);
  const fetchCrimeByAge = (payload) => fetchApi(ENDPOINTS.CRIME_BY_AGE, payload);
  const fetchCrimeByWeapon = (payload) => fetchApi(ENDPOINTS.CRIME_BY_WEAPON, payload);

  return (
    <ApiContext.Provider
      value={{
        fetchCrimeData,
        fetchCrimeIncidenceRate,
        fetchCrimeByGender,
        fetchCrimeByAge,
        fetchCrimeByWeapon
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);