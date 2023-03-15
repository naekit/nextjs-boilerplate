import React, { useState } from "react";

function Modal({ setModal, bed, bath, city, counts, price, pricePerSqft, sqft, address, }) {
    const closeModal = () => {
        setModal((prev) => ({
            ...prev,
            visible: !prev.visible,
            bath: "",
            bed: "",
            city: "",
            counts: "",
            price: "",
            pricePerSqft: "",
            sqft: "",
            address: "",
        }))
    }

    return (
        <div className="flex w-9/12 bg-zinc-700 py-4 justify-between content-between px-6 text-zinc-300 rounded-md border-zinc-100 border-2">
            <div className="flex flex-col justify-center items-center">
                <h3 className="font-bold ">Baths</h3>
                <p>{bath}</p>
            </div>
            <div className="flex flex-col justify-center items-center">
                <h3 className="font-bold ">Beds</h3>
                <p>{bed}</p>
            </div>
            <div className="flex flex-col justify-center items-center">
                <h3 className="font-bold ">City</h3>
                <p>{city}</p>
            </div>
            <div className="flex flex-col justify-center items-center">
                <h3 className="font-bold ">Price</h3>
                <p>${price}</p>
            </div>
            <div className="flex flex-col justify-center items-center">
                <h3 className="font-bold ">Price Per Sqft</h3>
                <p>${pricePerSqft}</p>
            </div>
            <div className="flex flex-col justify-center items-center">
                <h3 className="font-bold ">Sqft</h3>
                <p>{sqft}</p>
            </div>
            <div className="flex flex-col justify-center items-center">
                <h3 className="font-bold ">Address</h3>
                <p>{address}</p>
            </div>
            {
                counts ?
                    <div className="flex flex-col justify-center items-center">
                        <h3 className="font-bold ">Counts</h3>
                        <p>{counts}</p>
                    </div>
                    : null}
            <button className="text-red-400 hover:text-red-600" onClick={closeModal}>Close</button>
        </div>
    )
}

export default Modal;