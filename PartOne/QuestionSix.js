// I will write down two solution way, both use React Hook 
/**  Solution One => use by 'useEffect' & 'setTimeout' & 'clearTimeout' & 'useState' 
 * 
 * 
 */

import React, { useState, useEffect } from 'react';

export const App = () => {
  // Stores the value from user input
  const [value, setValue] = useState("");
  // Stores the result data after debounce
  const [result, setResult] = useState([]);

  const handleOnChange = async (event) => {
    setValue(event.target.value);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/${event.target.value}`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      setResult([]); // Reset the result to an empty array in case of an error
    }
  };

  // useEffect hook with a setTimeout method: it triggers a re-render of the result only when "value" changes, with a debounce delay of 500 ms
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (value) {
        console.log(`I can use "${value}" now!`);
      }
    }, 500);
    return () => clearTimeout(timeoutId); // Clear the timeout on component unmount
  }, [value]);

  return (
    <>
      <input onChange={handleOnChange} value={value} name='p'/>
      <ul>
        {result.map((item, index) => (
          <li key={index}>{JSON.stringify(item)}</li>
        ))}
      </ul>
    </>
  );
};