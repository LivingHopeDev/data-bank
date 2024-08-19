import { useState, useEffect } from 'react';
import axios from 'axios';
import FarmCard from './components/FarmCard';

const App = () => {
  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('city');
  const [farmData, setFarmData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  console.log(search)

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      let response;
      switch (searchType) {
        case 'city':
          response = await axios.get(`https://kitovu-fetch.vercel.app/fetch_by_city/${search}`);
          break;
        case 'state':
          response = await axios.get(`https://kitovu-fetch.vercel.app/fetch_by_state/${search}`);
          break;
        case 'country':
          response = await axios.get(`https://kitovu-fetch.vercel.app/fetch_by_country/${search}`);
          break;
        case 'crop':
          response = await axios.get(`https://kitovu-fetch.vercel.app/fetch_by_crop/${search}`);
          break;
        default:
          break;
      }
      setFarmData(response?.data);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#efbbff] p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#800080]">Farm Data Dashboard</h1>
      </header>
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <div className="flex gap-2">
          <img src="src\images\images.png" width={30} height={20} alt="" /> 
            <div className='mt-2 font-bold' > Farm data</div>
            <select
              className="border p-2 rounded"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="city">City</option>
              <option value="state">State</option>
              <option value="country">Country</option>
              <option value="crop">Crop</option>
            </select>
            <select
              className="border p-2 rounded"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="farmers">Farmers</option>
              <option value="Gender">Gender</option>
              <option value="Acres">Acres</option>
            </select>
            <input
              type="text"
              className="flex-grow border p-2 rounded"
              placeholder={`Search by ${searchType}`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="bg-[#800080] text-white p-2 rounded"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {farmData && !error && (
          <div>
            <FarmCard farm={farmData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
