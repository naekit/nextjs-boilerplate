import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Scatterplot = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 20, right: 20, bottom: 70, left: 70 };
    const width = 900 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => parseInt(d.properties.price))])
      .range([0, width]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.extent(data, d => parseInt(d.properties.sqft))])
      .range([height, 0]);

    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    svg.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale))
      .append('text')
      .attr('x', width / 2)
      .attr('y', 50)
      .attr('fill', '#000')
      .style('text-anchor', 'middle')
      .text('Price');

    svg.append('g')
      .call(d3.axisLeft(yScale))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -50)
      .attr('fill', '#000')
      .style('text-anchor', 'middle')
      .text('Square Feet');

    const tooltip = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('visibility', 'hidden')
      .text('');

    svg.selectAll('.point')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'point')
      .attr('cx', d => xScale(parseInt(d.properties.price)))
      .attr('cy', d => yScale(parseInt(d.properties.sqft)))
      .attr('r', 4)
      .style('fill', d => colorScale(d.properties.city))
      .style('opacity', 0.7)
      .on('mouseover', (event, d) => {
        tooltip.text(`${d.properties?.street ?? ""}, ${d.properties?.city ?? ""} - ${d.properties?.price ?? ""} USD, ${d.properties?.sqft ?? ""} sqft`)
          .style('visibility', 'visible');
      })
      .on('mousemove', (event) => {
        tooltip.style('top', (event.pageY - 10) + 'px')
          .style('left', (event.pageX + 10) + 'px');
      })
      .on('mouseout', () => {
        tooltip.style('visibility', 'hidden');
      });
  }, [data]);

  return (
    <div className='grid place-items-center gap-2 text-zinc-100'>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Scatterplot;
