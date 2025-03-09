import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

// ✅ Ensures Leaflet resizes properly
const MapUpdater = () => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize(); // Fix map rendering
    }, 500);
  }, [map]);
  return null;
};

const MapBox = () => {
  const [locations, setLocations] = useState([]);
  const [mapCenter, setMapCenter] = useState([19.076, 72.8777]); // Default: Mumbai

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const locationsRef = collection(db, "locations");
        const snapshot = await getDocs(locationsRef);
        const loadedLocations = snapshot.docs.map((doc) => doc.data());

        if (loadedLocations.length === 0) {
          setLocations([{ name: "Mumbai", latitude: 19.076, longitude: 72.8777 }]);
        } else {
          setLocations(loadedLocations);
          setMapCenter([loadedLocations[0].latitude, loadedLocations[0].longitude]);
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      <MapContainer
        center={mapCenter}
        zoom={10}
        className="map-container"
        style={{ height: "100%", width: "100%", zIndex: 5 }}
      >
        <MapUpdater /> {/* Fix map resizing */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {locations.map((loc, index) => (
          <Marker
            key={index}
            position={[loc.latitude, loc.longitude]}
            icon={new L.Icon({ iconUrl: markerIconPng, shadowUrl: markerShadowPng })}
          >
            <Popup>{loc.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapBox;
