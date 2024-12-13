// I will write down two solution way, both use React Hook 
// Solution One => use by 'useEffect' & 'setTimeout' & 'clearTimeout' & 'useState' 
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
// Soultion Two=>use by 'useRef' 
import { useRef } from 'react';

// Define a functional component named App2
export const App2 = () => {
     // Use useRef to store the debounce timer reference
     const debounceTime = useRef(null);
     // Handle input change event
     const handleOnChange = (event) => {
        let Value = event.target.value; // Get the value from the input field
        // Clear the existing debounce timer if it exists
        if (debounceTime.current) {
           clearTimeout(debounceTime.current);
        }
        // Set a new debounce timer
        debounceTime.current = setTimeout(async () => {
          try {
            // Make an asynchronous API call using the input value
            const response = await fetch(`https://jsonplaceholder.typicode.com/${Value}`);
            // Check if the response is successful
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            // Parse the response data as JSON
            const data = await response.json();
            return data;
          } catch (error) {
            // Handle any errors that occur during the fetch operation
            console.error('Error:', error);
            setResult([]); // Reset the result to an empty array in case of an error
          }
        }, 500); // Delay the API call by 500 milliseconds
     };
     return (
         <div>
              {/* Render a search input field with an onChange handler */}
              <input 
                  type="search" 
                  name="p" 
                  onChange={handleOnChange} 
                  placeholder='Please type something...' 
              />
         </div>
     );
};
