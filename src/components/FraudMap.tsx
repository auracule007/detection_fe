// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { getFlaggedTransactions } from '../services/api';
// import { FlaggedTransaction } from '../types';

// // Configure the default icon
// const DefaultIcon = L.icon({
//     iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
//     iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
//     shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41]
// });

// L.Marker.prototype.options.icon = DefaultIcon;

// // Mock geocoding function
// const mockGeocode = (location: string): [number, number] => {
//     const locations: Record<string, [number, number]> = {
//         'New York': [40.7128, -74.006],
//         'Chicago': [41.8781, -87.6298],
//         'Los Angeles': [34.0522, -118.2437],
//         'Seattle': [47.6062, -122.3321],
//         'London': [51.5074, -0.1278],
//         'Tokyo': [35.6762, 139.6503],
//         'Nigeria': [9.0820, 8.6753]
//     };
    
//     return locations[location] || [0, 0];
// };

// const FraudMap: React.FC = () => {
//     const [transactions, setTransactions] = useState<FlaggedTransaction[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchTransactions = async () => {
//             try {
//                 setLoading(true);
//                 const data = await getFlaggedTransactions();
//                 setTransactions(data);
//                 setError(null);
//             } catch (err) {
//                 console.error('Error fetching transactions:', err);
//                 setError('Failed to load transaction data');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchTransactions();
//     }, []);

//     const mapContainerStyle = {
//         height: '100%',
//         width: '100%',
//         minHeight: '384px'
//     };

//     return (
//         <div className="bg-white rounded-lg shadow p-6">
//             <h2 className="text-xl font-bold mb-4">Fraud Locations</h2>
            
//             {error && (
//                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//                     {error}
//                 </div>
//             )}
            
//             {loading ? (
//                 <div className="flex justify-center items-center h-96">
//                     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//                 </div>
//             ) : (
//                 <div className="h-96 w-full rounded-md overflow-hidden">
//                     <MapContainer 
//                         center={[20, 0]} 
//                         zoom={2} 
//                         style={mapContainerStyle}
//                     >
//                         <TileLayer
//                             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                         />
//                         {transactions.map((tx) => {
//                             const [lat, lng] = mockGeocode(tx.location);
//                             return (
//                                 <Marker key={tx.id} position={[lat, lng]}>
//                                     <Popup>
//                                         <div className="text-sm space-y-1">
//                                             <p><strong>Transaction ID:</strong> {tx.transaction_id}</p>
//                                             <p><strong>User ID:</strong> {tx.user_id}</p>
//                                             <p><strong>Amount:</strong> ${tx.amount.toFixed(2)}</p>
//                                             <p><strong>Fraud Type:</strong> {tx.fraud_type}</p>
//                                             <p><strong>Location:</strong> {tx.location}</p>
//                                             <p><strong>Time:</strong> {new Date(tx.timestamp).toLocaleString()}</p>
//                                         </div>
//                                     </Popup>
//                                 </Marker>
//                             );
//                         })}
//                     </MapContainer>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default FraudMap;


import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getFlaggedTransactions } from '../services/api';
import { FlaggedTransaction } from '../types';

const DefaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const mockGeocode = (location: string): [number, number] => {
    const locations: Record<string, [number, number]> = {
        'New York': [40.7128, -74.006],
        'Chicago': [41.8781, -87.6298],
        'Los Angeles': [34.0522, -118.2437],
        'Seattle': [47.6062, -122.3321],
        'London': [51.5074, -0.1278],
        'Tokyo': [35.6762, 139.6503],
        'Nigeria': [9.0820, 8.6753]
    };
    
    return locations[location] || [0, 0];
};

const FraudMap: React.FC = () => {
    const [transactions, setTransactions] = useState<FlaggedTransaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                setLoading(true);
                const data = await getFlaggedTransactions();
                setTransactions(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching transactions:', err);
                setError('Failed to load transaction data');
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div className="bg-white rounded-lg shadow p-6 h-full">
            <h2 className="text-xl font-bold mb-4">Fraud Locations</h2>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <div className="h-64 w-full rounded-md overflow-hidden">
                    <MapContainer 
                        center={[20, 0]} 
                        zoom={2} 
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {transactions.map((tx) => {
                            const [lat, lng] = mockGeocode(tx.location);
                            return (
                                <Marker key={tx.id} position={[lat, lng]}>
                                    <Popup>
                                        <div className="text-sm space-y-1">
                                            <p><strong>Transaction ID:</strong> {tx.transaction_id}</p>
                                            <p><strong>User ID:</strong> {tx.user_id}</p>
                                            <p><strong>Amount:</strong> ${tx.amount.toFixed(2)}</p>
                                            <p><strong>Fraud Type:</strong> {tx.fraud_type}</p>
                                            <p><strong>Location:</strong> {tx.location}</p>
                                            <p><strong>Time:</strong> {new Date(tx.timestamp).toLocaleString()}</p>
                                        </div>
                                    </Popup>
                                </Marker>
                            );
                        })}
                    </MapContainer>
                </div>
            )}
        </div>
    );
};

export default FraudMap;