import React, { useState, useEffect } from "react";
import axios from "axios";


function App() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getQuotes();
  }, []);

  const getQuotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://animechan.xyz/api/random");
      setQuotes([response.data]);
    } catch (err) {
      console.error("Error fetching quotes:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    if (!loading) {
      getQuotes();
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Anime Quotes</h1>
      <ul>
        {quotes.map((quote, index) => (
          <li key={index} className="mb-4">
            <p className="text-xl font-semibold">Anime name: {quote.anime}</p>
            <p className="text-lg">Quote: {quote.quote}</p>
            <p className="italic">Character: {quote.character}</p>
          </li>
        ))}
      </ul>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? "Loading..." : "New Quotation"}
      </button>
    </div>
  );
}

export default App;
