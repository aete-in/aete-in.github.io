import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { geocodeLocation } from '../utils/geocoding';
import L from 'leaflet';

// Fix for default marker icon issues in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41],
    popupAnchor: [0, -41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const ResourceMap = ({ persons, onMarkerClick }) => {
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        const fetchCoordinates = async () => {
            const newMarkers = [];
            // Use a Set to avoid processing same location multiple times if we wanted to group them
            // But here we want individual markers. 
            // NOTE: Overlapping markers might be an issue, but let's start simple.

            for (const person of persons) {
                if (person.location) {
                    const coords = await geocodeLocation(person.location);
                    if (coords) {
                        // slightly jitter coords to prevent exact overlap
                        const jitterLat = coords.lat + (Math.random() - 0.5) * 0.005;
                        const jitterLon = coords.lon + (Math.random() - 0.5) * 0.005;

                        newMarkers.push({
                            ...person,
                            lat: jitterLat,
                            lon: jitterLon
                        });
                    }
                }
            }
            setMarkers(newMarkers);
        };

        if (persons.length > 0) {
            fetchCoordinates();
        }
    }, [persons]);

    if (markers.length === 0) return null;

    return (
        <div className="resource-map-container mb-5">
            <h3>Global Resource Network</h3>
            <div className="map-frame">
                <MapContainer center={[20.5937, 78.9629]} zoom={4} scrollWheelZoom={false} style={{ height: '400px', width: '100%' }}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {markers.map((marker, idx) => (
                        <Marker
                            key={idx}
                            position={[marker.lat, marker.lon]}
                            eventHandlers={{
                                click: () => onMarkerClick && onMarkerClick(marker)
                            }}
                        >
                            <Popup>
                                <strong>{marker.name}</strong><br />
                                {marker.designation}<br />
                                {marker.location}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
            <style jsx="true">{`
                .resource-map-container {
                    background: white;
                    padding: 1.5rem;
                    border-radius: 16px;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                }
                .resource-map-container h3 {
                    margin-bottom: 1rem;
                    color: #2d3748;
                }
                .map-frame {
                    border-radius: 12px;
                    overflow: hidden;
                    border: 2px solid #edf2f7;
                    z-index: 0; 
                }
                /* Leaflet z-index fix */
                .leaflet-pane { z-index: 10 !important; }
                .leaflet-top, .leaflet-bottom { z-index: 20 !important; }
            `}</style>
        </div>
    );
};

export default ResourceMap;
