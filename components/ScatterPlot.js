import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import TooltipLite from 'react-tooltip-lite';

const ScatterPlot = ({ data }) => {
    const svgRef = useRef();
    const tooltipRef = useRef();

    useEffect(() => {
        const margin = { top: 30, right: 20, bottom: 90, left: 90 };
        const width = 1000 - margin.left - margin.right;
        const height = 700 - margin.top - margin.bottom;

        const svg = d3.select(svgRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        const xScale = d3.scaleLinear()
            .domain([150000, d3.max(data, d => parseInt(d.properties.price))])
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => parseInt(d.properties.sqft))])
            .range([height, 100]);

        const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

        svg.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale));

        svg.append('g')
            .call(d3.axisLeft(yScale));

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
            .on('mouseover', (d) => {
                tooltipRef.current.textContent = `${d.properties?.street}, ${d.properties?.city} ~ $${d.properties?.price}`
            })
            .on('click' , (d) => {
                navigator.clipboard.writeText(`${d.properties?.street}, ${d.properties?.city} ~ $${d.properties?.price}`)
            })
        // Add x-axis label
        svg.append('text')
            .attr('class', 'axis-label')
            .attr('x', width / 2)
            .attr('y', height + margin.top + 40)
            .style('text-anchor', 'middle')
            .style('fill', 'white')
            .text('Price');

        // Add y-axis label
        svg.append('text')
            .attr('class', 'axis-label')
            .attr('x', -height / 2)
            .attr('y', -margin.left + 20)
            .attr('transform', 'rotate(-90)')
            .style('text-anchor', 'middle')
            .style('fill', 'white')
            .text('Sqft');

        // Add chart title
        svg.append('text')
            .attr('class', 'chart-title')
            .attr('x', width / 2)
            .attr('y', margin.top / 2)
            .style('text-anchor', 'middle')
            .style('fill', 'white')
            .text('You can click on point to copy address)')
    }, [data]);



    return (
        <div className='grid place-items-center gap-2 text-zinc-100'>
            <svg ref={svgRef}></svg>
            <TooltipLite content="" direction='right' useDefaultStyles>
                <div className='ml-20' ref={tooltipRef}>Scroll over points to get info</div>
            </TooltipLite>

        </div>
    );
};

export default ScatterPlot;
