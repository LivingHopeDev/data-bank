import { useState, useEffect } from 'react';
import axios from 'axios';
import FarmCard from './components/FarmCard';

const App = () => {
  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('city');
  const [allFarmData, setAllFarmData] = useState<any[]>([]); // Store all fetched data
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); // Number of items per page
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    handleSearch();
  }, [search, searchType]);

  useEffect(() => {
    // Recalculate pagination whenever the page changes or data updates
    setCurrentPage(1); // Reset to the first page on search change
  }, [allFarmData]);

  const handleSearch = async () => {
    setLoading(true);
    setError('');
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
          case 'name':
          response = await axios.get(`https://kitovu-fetch.vercel.app/fetch_by_name/${search}`);
          break;
          case 'crop':
          response = await axios.get(`https://kitovu-fetch.vercel.app/fetch_by_crop/${search}`);
          break;
          case 'gender':
          response = await axios.get(`https://kitovu-fetch.vercel.app/fetch_by_gender/${search}`);
          break;
          case 'crop':
          response = await axios.get(`https://kitovu-fetch.vercel.app/fetch_by_crop/${search}`);
          break;
          case 'crop':
          response = await axios.get(`https://kitovu-fetch.vercel.app/fetch_by_crop/${search}`);
          break;
        default:
          break;
      }

      if (response?.data) {
        setAllFarmData(response.data.data || []); // Store all data
      }
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const totalItems = allFarmData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Get the data for the current page
  const currentData = allFarmData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
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
            <img src="src/images/images.png" width={30} height={20} alt="" />
            <div className='mt-2 font-bold'> Farm data</div>
            <select
              className="border p-2 rounded"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="city">City</option>
              <option value="state">State</option>
              <option value="country">Country</option>
              <option value="crop">Crop</option>
              <option value="name">Name</option>
              <option value="gender">Gender</option>
              <option value="farmSize_lessThan">Farm size less than </option>
              <option value="farmSize_greaterThan">Farm size less than </option>
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
        {currentData.length > 0 && !error && (
          <div>
            <FarmCard farm={currentData} />
          </div>
        )}
        <div className="pagination flex justify-center items-center mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="p-2 m-1 bg-[#800080] text-white rounded"
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="p-2 m-1 bg-[#800080] text-white rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
