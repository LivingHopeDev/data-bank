import { MapContainer, TileLayer, Polygon, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const FarmCard = ({ farm }) => {
    return (
        <>
            {
                farm.data.map((data) => {
                    const center = [
                        data.points.reduce((acc, point) => acc + point.latitude, 0) / data.points.length,
                        data.points.reduce((acc, point) => acc + point.longitude, 0) / data.points.length,
                    ];

                    const polygonPoints = data.points.map((point) => [point.latitude, point.longitude]);

                    return (
                        <div className="bg-white p-6 rounded-lg shadow-lg mb-10" key={data.farmId}>
                            <div className="flex flex-col md:flex-row gap-4">
                                {/* <img src={data.imageUrl} alt={data.name} className="w-full md:w-1/3 rounded-lg" /> */}
                                <div className="flex-grow">
                                    <h2 className="text-2xl font-bold text-[#800080]">{data.name}</h2>
                                    <p className="text-lg mb-2"><strong>Farmer:</strong> {data.farmerName}</p>
                                    <p className="text-lg mb-2"><strong>Crop:</strong> {data.crop}</p>
                                    <p className="text-lg mb-2"><strong>Location:</strong> {data.city}, {data.state}, {data.country}</p>
                                    <p className="text-lg mb-2"><strong>Harvest Date:</strong> {data.harvest}</p>
                                    <p className="text-lg mb-2"><strong>Sow Date:</strong> {data.sow}</p>
                                    <p className="text-lg mb-2"><strong>Herbicide Date:</strong> {data.herbicide}</p>
                                    <p className="text-lg mb-2"><strong>Fertilizer Date:</strong> {data.fertilizerDate}</p>
                                    <p className="text-lg mb-2"><strong>Size:</strong> {data.size} acres</p>
                                    <p className="text-lg mb-2"><strong>Status:</strong> {data.status ? 'Active' : 'Inactive'}</p>
                                </div>
                                <div className="w-1/2 mt-4">
                                    <h3 className="text-xl font-bold text-[#800080] mb-6">Farm Coordinates</h3>
                                    <MapContainer center={center} zoom={15} className="h-64 w-full rounded-lg">
                                        {/* <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        /> */}
                                        <Polygon positions={polygonPoints} color="#800080">
                                            <Popup>{data.name}</Popup>
                                        </Polygon>
                                        {data.points.map((point, index) => (
                                            <Marker key={index} position={[point.latitude, point.longitude]}>
                                                <Popup>
                                                    Latitude: {point.latitude}, Longitude: {point.longitude}
                                                </Popup>
                                            </Marker>
                                        ))}
                                    </MapContainer>
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </>
    );
};

export default FarmCard;
