import { useState } from 'react';
import axios from 'axios';
import FarmCard from './components/FarmCard';

const App = () => {
  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('city');
  const [farmData, setFarmData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 2; // Number of items per page

  const handleSearch = async (page = 1) => {
    setLoading(true);
    setError('');
    try {
      const offset = (page - 1) * itemsPerPage;
      let response;
      switch (searchType) {
        case 'city':
          response = await axios.get(`https://kitovu-fetch.vercel.app/fetch_by_city/${search}`, {
            params: { offset, limit: itemsPerPage },
          });
          break;
        case 'state':
          response = await axios.get(`https://kitovu-fetch.vercel.app/fetch_by_state/${search}`, {
            params: { offset, limit: itemsPerPage },
          });
          break;
        case 'country':
          response = await axios.get(`https://kitovu-fetch.vercel.app/fetch_by_country/${search}`, {
            params: { offset, limit: itemsPerPage },
          });
          break;
        case 'crop':
          response = await axios.get(`https://kitovu-fetch.vercel.app/fetch_by_crop/${search}`, {
            params: { offset, limit: itemsPerPage },
          });
          break;
        case 'name':
          response = await axios.get(`https://kitovu-fetch.vercel.app/fetch_by_name/${search}`, {
            params: { offset, limit: itemsPerPage },
          });
          break;
        case 'gender':
          response = await axios.get(`https://kitovu-fetch.vercel.app/fetch_by_gender/${search}`, {
            params: { offset, limit: itemsPerPage },
          });
          break;
        case 'smaller_size':
          response = await axios.get(`https://kitovu-fetch.vercel.app/fetch_by_smaller_than_size/${search}`, {
            params: { offset, limit: itemsPerPage },
          });
          break;
        case 'greater_size':
          response = await axios.get(`https://kitovu-fetch.vercel.app/fetch_by_greater_than_size/${search}`, {
            params: { offset, limit: itemsPerPage },
          });
          break;
        default:
          throw new Error('Invalid search type');
      }
      
      if (response.data.error) {
        throw new Error(response.data.message);
      }
      
      setFarmData(response.data);
      
      // Calculate total pages based on response data
      const totalItems = response.data.totalItems || response.data.data.length; // Adjust according to the API response
      setTotalPages(Math.ceil(totalItems / itemsPerPage));
      
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => {
        const newPage = prevPage + 1;
        handleSearch(newPage);
        return newPage;
      });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => {
        const newPage = prevPage - 1;
        handleSearch(newPage);
        return newPage;
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#efbbff] p-6 overflow-auto">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#800080]">Farm Data Dashboard</h1>
      </header>
      <div className="max-w-4xl mx-auto bg-white-100 px-2 py-1 pt-3 border-t-8 border-[#800080] rounded border-b-8">
        <div className="mb-4">
          <div className="flex gap-2">
            <img src="src/images/images.png" width={30} height={20} alt="Farm" />
            <div className='mt-2 font-bold'>Farm data</div>
            <select
              className="border p-2 rounded"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="city">City</option>
              <option value="state">State</option>
              <option value="country">Country</option>
              <option value="crop">Crop</option>
              <option value="name">Farmers name</option>
              <option value="gender">Gender</option>
              <option value="smaller_size">Acres: Smaller Size</option>
              <option value="greater_size">Acres: Greater Size</option>
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
              onClick={() => handleSearch(currentPage)}
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
        <div className="flex justify-between mt-4">
          <button
            className="bg-[#800080] text-white p-2 rounded"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            className="bg-[#800080] text-white p-2 rounded"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
