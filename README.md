# Getting Started

First, install dependencies, then run the development server:

```bash


yarn add


yarn dev

  
```
# Page Structure
## map
This file renders the map component
```bash
map.js = MapFile.js
```
The map component loads clusters of data, and allows one to zoom around the clusters.

Once a certain threshold is hit(1) you are able to click and get info on a node

## table
This file renders the table component
```bash
index.js = Table.js
```
The table component creates a paginated table of all 15000 objects, and is able to sort and filter the table by using the controls.

## priceViz
This file renders the scatter plot component
```bash
priceViz.js = ScatterPlot.js
```
The scatter plot plots square feet of the house against its price

This makes it easy to find outlier, and with a click copy the details to your clipboard

The plot is also heat mapped to the city names
