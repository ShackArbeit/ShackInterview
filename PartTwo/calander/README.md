# The following are a brief explanation of the PartTwo folder
## PartTwo mainly has three jsx files, namely App.jsx, calendar.jsx, and helper.jsx
## Mainly use "daysjs" & "PropTypes" plug-in and React Hook to dynamically display date changes and status control

## How to watch Demo ?
### For local terminal, cd calander folder => type "npm run dev"
### Or just copy paste this link in your browser **https://shackarbeit.github.io/InterviewCalendar/** 

## For helper.jsx
### Define various functions to dynamically define the number of days to be displayed in each month and the day of the week that each date corresponds to.

## For calendar.jsx
### Instantiate the function defined in helper.jsx and use React Hook to allow users to dynamically change date presentation and change state by clicking on it

## For App.jsx
### It is the main container, wrapping calendar.jsx. Its main function is to transmit props and css styles.

## For Unit Test
### First go into calendar folder and then enter **npx vitest** and you will see the test results in the terminal.
### I have taken a screenshot of the test results and placed them in the root directory of the calander folder


