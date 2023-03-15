import React, { useEffect, useMemo, useState } from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa';
import data from "../data/geocollection.json";

function Table() {
    const [pageNumber, setPageNumber] = useState(0);
    const [selectedCity, setSelectedCity] = useState("Filter by All, or click on table header to sort");
    const dataPerPage = 20; // number of rows to display per page

    // Memoize the data and columns so that they are only recalculated when necessary
    const memoizedData = useMemo(() => data.features, []);
    const columns = useMemo(
        () => [
            {
                Header: "Price",
                accessor: "properties.price",
                Cell: ({ cell }) => `$${cell.value.toLocaleString()}`
            },
            {
                Header: "Sqft",
                accessor: "properties.sqft",
            },
            {
                Header: "Price/Sqft",
                accessor: "properties.price_sqft",
            },
            {
                Header: "Bed",
                accessor: "properties.bed",
            },
            {
                Header: "Bath",
                accessor: "properties.bath",
            },
            {
                Header: "N-City",
                accessor: "properties.n_citi",
            },
            {
                Header: "City",
                accessor: "properties.city",
            },
        ],
        []
    );

    const uniqueCities = useMemo(() => {
        const cities = new Set()
        data.features.forEach((feature) => {
            cities.add(feature.properties.city)
        })
        return ["Filter by All, or click on table header to sort", ...cities]
    }, [])



    // Use react-table's useTable and usePagination hooks to handle pagination
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        nextPage,
        previousPage,
        pageOptions,
        pageCount,
        gotoPage,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data: useMemo(() => {
                let filteredData = memoizedData;
                if (!selectedCity.includes("All")) {
                    filteredData = filteredData.filter(
                        (item) => item.properties.city === selectedCity
                    );
                }
                return filteredData;
            }, [memoizedData, selectedCity]),
            initialState: { pageIndex: pageNumber, pageSize: dataPerPage },
        },
        useSortBy,
        usePagination,
    );

    useEffect(() => {
        setPageNumber(pageIndex);
    }, [pageIndex])

    return (
        <div className='grid place-items-center gap-2 text-slate-300'>
            <select
                value={selectedCity}
                onChange={(e) => {
                    setSelectedCity(e.target.value);
                    setPageNumber(0); // reset page number when filter changes
                }}
                className="w-10/12 mt-8 p-2 rounded-md border border-gray-400 bg-slate-500 text-slate-100 font-normal tracking-widest"
            >
                {uniqueCities.map((city) => (
                    <option key={city} value={city}>
                        {city}
                    </option>
                ))}
            </select>
            <table className="w-10/12 border-collapse border-gray-400" {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                    className={
                                        `hover:cursor-pointer hover:text-zinc-300 bg-slate-900 hover:bg-zinc-500 border-x-2 border-slate-500 ${column.isSorted
                                            ? column.isSortedDesc
                                                ? 'desc'
                                                : 'asc'
                                            : ''}`
                                    }
                                    style={{ padding: '0.5rem' }}
                                >
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted ? (column.isSortedDesc ? <FaSortDown className="inline pl-2" /> : <FaSortUp className="inline pl-2" />) : <FaSort className="inline pl-2" />}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr className="text-blue-100" {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td {...cell.getCellProps()} className='border border-slate-500 p-px text-center'>
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className='mt-4'>
                <button
                    className='px-4 py-2 bg-zinc-600 text-white rounded disabled:opacity-50 hover:bg-zinc-500'
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                >
                    Previous
                </button>{" "}
                
                <span className='mx-2 border-l-2 pl-4'>
                    Page{" "}
                    <strong className="text-white">
                        {pageNumber + 1} of {pageOptions.length}
                    </strong>
                </span>
                <span className='mx-2 border-l-2 pl-4'>
                    Go to page:{" "}
                    <input
                        className='px-2 py-1 border rounded bg-zinc-700'
                        type="number"
                        defaultValue={pageNumber + 1}
                        onChange={(e) => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            gotoPage(page);
                            setPageNumber(page);
                        }}
                        style={{ width: "50px" }}
                    />
                </span>{" "}
                <button
                    className='px-4 py-2 bg-zinc-600 text-white rounded disabled:opacity-50 hover:bg-zinc-500'
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                >
                    Next
                </button>
            </div>
        </div>

    );
}

export default Table;
