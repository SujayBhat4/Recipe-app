import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Card from '../components/Card';
import { IoSearchSharp } from "react-icons/io5";

const Search = () => {
  const searchText = useParams();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryParam =   params.get('query');
    if(queryParam){
      setQuery(queryParam);
    }
  }, [])
  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/items/`,{
          params: {q: query}
        });
        setResults(response.data);
      } catch (error) {
        setError(error.message || 'Error fetching data');
      } finally {
        setLoading(false);
      }
    }
    fetchItems();
  },[query])
  console.log(results)
  
  return (
    <div className='px-6 lg:px-12 py-20'>
      <h1 className='text-center text-3xl md:max-w-3xl mx-auto py-10 font-semibold text-secondary sm:text-6xl sm:leading-relaxed'>Search</h1>
      <div className='bg-white p-4 rounded relative flex items-center'>
            <IoSearchSharp className='w-5 h-5 mr-2 text-neutral-300'/>
            <input name='query' type='search' placeholder='Search for a Recipe' className='outline-none w-full placeholder:text-[#1b2629]' 
            id='search' required=""/>
        </div>
        {loading && <div>Loading...</div>}
        {error && <div>Unknown error happens...{error}</div>}
        <ul className='mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
          {
            results && results.map((item) => (
              <Card item={item} key={item._id}>{item.name}</Card>
            ))
          }
        </ul>
    </div>
  )
}

export default Search