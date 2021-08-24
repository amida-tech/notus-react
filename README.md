# saraswati-dashboard
The purpose of this API is to ingest HEDIS data from pyspark, save it, and then use it to populate the [Sarawati Dashboard](https://github.com/amida-tech/saraswati-dashboard).

## Set up
1. Run `cp .env.example .env`
2. Stand up the dashboard 
  - If you are on a linux based terminal 
    - Simply run `yarn run install:clean`
  - If not 
    - Run in terminal `yarn`
    - Run in terminal `yarn run build:tailwind` (each time you add a new class, a class that does not exist in `src/assets/styles/tailwind.css`, you will need to run this command)
    - Run in terminal `yarn start`
3. Navigate to https://localhost:3000.


## Notus React Documentation
The library we forked from is called Notus React - the documentation for the Notus React is hosted at Creative Tim's <a href="https://www.creative-tim.com/learning-lab/tailwind/react/overview/notus?ref=nr-readme" target="_blank">website</a>.


## Pending Changes [August 23, 2021]

A line graph has been added to reflect the results from the time series prediction models. This still needs work: there is a Min/Max slider at the bottom the graph. The purpose of these sliders is to allow the user to navigate to the desired portions of the plot. The sliders are not working as desired--although the original data is being filtered, the changes are only reflected in the console and not on the actual line graph.



