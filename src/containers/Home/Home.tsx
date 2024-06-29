import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosApi from '../../axiosApi';

interface Quote {
  id: string;
  category: string;
  author: string;
  text: string;
}

const Home: React.FC = () => {
  const { category } = useParams();
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        let url = '/block.json';
        if (category && category !== 'all') {
          url += `?orderBy="category"&equalTo="${category}"`;
        }
        const response = await axiosApi.get(url);
        if (response.data) {
          const fetchedQuotes: Quote[] = Object.keys(response.data).map(key => ({
            id: key,
            ...response.data[key],
          }));
          setQuotes(fetchedQuotes);
        }
      } catch (error) {
        console.error('Error fetching quotes:', error);
      }
    };
    fetchQuotes();
  }, [category]);

  const handleDelete = async (id: string) => {
    try {
      await axiosApi.delete(`/block/${id}.json`);
      const updatedQuotes = quotes.filter(quote => quote.id !== id);
      setQuotes(updatedQuotes);
      console.log('Quote deleted successfully!');
    } catch (error) {
      console.error('Error deleting quote:', error);
    }
  };

  return (
    <div className="container w-50 d-flex justify-content-between">
      <header className="pt-4">
        <ul>
          <li><Link to="/quotes/all">All</Link></li>
          <li><Link to="/quotes/star-wars">Star Wars</Link></li>
          <li><Link to="/quotes/famous-people">Famous People</Link></li>
          <li><Link to="/quotes/saying">Saying</Link></li>
          <li><Link to="/quotes/humour">Humour</Link></li>
          <li><Link to="/quotes/motivational">Motivation</Link></li>
        </ul>
      </header>
      <div className="pt-3 w-50">
        <ul className="list-group">
          {quotes.map(quote => (
            <li key={quote.id} className="list-group-item">
              <p>{quote.text}</p>
              <p>Author: {quote.author}</p>
              <p>Category: {quote.category}</p>
              <div className="actions">
                <Link to={`/quotes/${quote.id}/edit`}>Edit</Link>
                <button type="button" className="btn-close text-end" aria-label="Close"
                        onClick={() => handleDelete(quote.id)}></button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
