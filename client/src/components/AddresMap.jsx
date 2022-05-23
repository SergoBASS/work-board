import React, { useState } from 'react';
import Geocode from "react-geocode";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import '../css/advertisementPage.css'

const AddresMap = ({ addres }) => {

    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    function Map() {
        Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY);
        Geocode.setLanguage("RU");
        Geocode.setRegion("RS");
        Geocode.setLocationType("ROOFTOP");
        Geocode.enableDebug();

        Geocode.fromAddress(addres).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setLat(lat);
                setLng(lng);
            },
            (error) => {
                console.error(error);
            }
        );
        return (
            <GoogleMap
                defaultZoom={17}
                defaultCenter={{ lat: lat, lng: lng }}
            >
                <Marker position={{ lat: lat, lng: lng }} />
            </GoogleMap>
        );
    }
    const WrappedMap = withScriptjs(withGoogleMap(Map))

    return (
        <WrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
            loadingElement={<div style={{ height: `100%`}} />}
            containerElement={<div className='advertisement-page-map' />}
            mapElement={<div style={{ height: `100%` }} />}
        />
    );
};

export default AddresMap;