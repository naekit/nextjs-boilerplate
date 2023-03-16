import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { GeoJSON } from "ol/format";
import { Vector as VectorLayer } from "ol/layer";
import { Cluster, Vector as VectorSource } from "ol/source";
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from "ol/style";
import { defaults as defaultControls, ScaleLine } from "ol/control";
import { Tile as TileLayer } from "ol/layer";
import { Stamen } from "ol/source";
import { boundingExtent } from 'ol/extent.js';
import geojson from "../data/geocollection.json";
import Modal from "./Modal";

const geojsonFile = new GeoJSON({ featureProjection: 'EPSG:3857' }).readFeatures(geojson)

function OpenLayersMap({ geojson }) {
    const mapRef = useRef(null);
    const [popup, setPopup] = useState({ visible: false, bath: "", bed: "", city: "", counts: "", price: "", pricePerSqft: "", sqft: "", address: "", });

    useEffect(() => {
        if (mapRef.current) {

            const vectorSource = new VectorSource({
                features: geojsonFile,
            });

            const clusterSource = new Cluster({
                distance: 20,
                minDistance: 200,
                source: vectorSource,
            })

            const styleCache = {};

            const vectorLayer = new VectorLayer({
                source: clusterSource,
                style: function (feature) {
                    const size = feature.get("features").length;
                    let style = styleCache[size];
                    if (!style) {
                        style = new Style({
                            image: new CircleStyle({
                                radius: 10,
                                stroke: new Stroke({
                                    color: "#fff",
                                }),
                                fill: new Fill({
                                    color: "#3399CC",
                                }),
                            }),
                            text: new Text({
                                text: size.toString(),
                                fill: new Fill({
                                    color: "#fff",
                                }),
                            }),
                        });
                        styleCache[size] = style;
                    }
                    return style;
                }
            });

            const stamenLayer = new TileLayer({
                source: new Stamen({
                    layer: 'toner-lite'
                }),
            });

            const map = new Map({
                target: mapRef.current,
                layers: [stamenLayer, vectorLayer],
                controls: defaultControls().extend([new ScaleLine()]),
                view: new View({
                    center: [-13082522.790141826, 4055541.5467581884], // Coordinates of California in EPSG:3857 projection
                    zoom: 6.5,
                }),
            });

            map.on('click', (e) => {
                vectorLayer.getFeatures(e.pixel).then((clickedFeatures) => {
                    if (clickedFeatures.length) {
                        // Get clustered Coordinates
                        const features = clickedFeatures[0].get('features');
                        if (features.length > 1) {
                            const extent = boundingExtent(
                                features.map((r) => r.getGeometry().getCoordinates())
                            );
                            map.getView().fit(extent, { duration: 1000, padding: [50, 50, 50, 50] });
                        } else {
                            // Get the values of the feature from the GeoJSON file
                            const feature = features[0];
                            const properties = feature.getProperties();
                            setPopup((prev) => ({
                                ...prev,
                                visible: true,
                                bath: properties.bath,
                                bed: properties.bed,
                                city: properties.city,
                                counts: properties.counts_locations,
                                price: properties.price,
                                pricePerSqft: properties.price_sqft,
                                sqft: properties.sqft,
                                address: properties.street,
                            }))
                        }
                    }
                });
            });
        }
    }, [mapRef.current]);

    return (
        <>
            <div className='grid place-items-center gap-10 pt-8'>
            <div className="text-zinc-100 text-4xl">
                        <h1>Welcome to our custom cluster map</h1>
                    </div>
                
                <div style={{ width: "800px", maxHeight: "500px", overflow: "hidden" }}>
                    <div ref={mapRef} style={{ width: "100%", height: "500px" }} />
                </div>
                {popup.visible ?
                    <Modal setModal={setPopup} bath={popup.bath} bed={popup.bed} city={popup.city} counts={popup.counts} price={popup.price} pricePerSqft={popup.pricePerSqft} sqft={popup.sqft} address={popup.address} visible={popup.visible} />
                    :
                    <div className="text-zinc-100 text-4xl py-5">
                    <h1>Zoom and click on element to show info</h1>
                </div>
                }
            </div>
        </>
    )
}

export default OpenLayersMap;
