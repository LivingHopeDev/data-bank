import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const FarmCard = ({ farm }) => {
    if (!farm || !Array.isArray(farm.data)) {
        return <p>No data available.</p>; // Handle case when `farm` or `farm.data` is not defined
    }

    return (
        <>
            {farm.data.length === 0 && <p>No farms found.</p>} {/* Handle case when the data array is empty */}
            {farm.data.map((data) => {
                // Placeholder center for the map since no coordinates are provided
                const center = [0, 0]; // Default coordinates

                return (
                    <div className="bg-white p-6 rounded-lg shadow-inner-lg mb-10" key={data.farmId}>
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Placeholder image or comment out if not used */}
                            {/* <img src={data.imageUrl} alt={data.name} className="w-full md:w-1/3 rounded-lg" /> */}
                            <div className="flex-grow">
                                <h2 className="text-2xl font-bold text-[#800080]">{data.name || 'Farm Name'}</h2>
                                <p className="text-lg mb-2"><strong>Farmer:</strong> {data.farmerName || 'Unknown'}</p>
                                <p className="text-lg mb-2"><strong>Crop:</strong> {data.crop || 'Unknown'}</p>
                                <p className="text-lg mb-2"><strong>Location:</strong> {data.city || 'Unknown'}, {data.state || 'Unknown'}, {data.country || 'Unknown'}</p>
                                <p className="text-lg mb-2"><strong>Harvest Date:</strong> {data.harvest || 'Unknown'}</p>
                                <p className="text-lg mb-2"><strong>Sow Date:</strong> {data.sow || 'Unknown'}</p>
                                <p className="text-lg mb-2"><strong>Herbicide Date:</strong> {data.herbicide || 'Unknown'}</p>
                                <p className="text-lg mb-2"><strong>Fertilizer Date:</strong> {data.fertilizerDate || 'Unknown'}</p>
                                <p className="text-lg mb-2"><strong>Size:</strong> {data.size || 'Unknown'} acres</p>
                                <p className="text-lg mb-2"><strong>Status:</strong> {data.status ? 'Active' : 'Inactive'}</p>
                            </div>
                            <div className="w-1/2 mt-4">
                                <h3 className="text-xl font-bold text-[#800080] mb-6">Farm Coordinates</h3>
                                <MapContainer center={center} zoom={15} className="h-64 w-full rounded-lg">
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    <Marker position={center}>
                                        <Popup>
                                            Latitude: {center[0]}, Longitude: {center[1]}
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default FarmCard;
