import React, { useEffect, useState } from 'react';
import axiosApi from '../../axiosApi';
import { Link, useParams } from 'react-router-dom';

interface Quote {
  id: string;
  category: string;
  author: string;
  text: string;
}

interface Props {
  category?: string;
}

const Quote: React.FC<Props> = ({ category }) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        let url = '/quotes.json';
        if (id && id !== 'all') {
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
  }, [ id ]);

  return (
    <ul className='border border-dark'>
      {quotes.map(quote => (
        <li key={quote.id}>
          <p>{quote.text}</p>
          <p>Автор: {quote.author}</p>
          <div className='actions'>
            <Link to={`/quotes/${quote.id}/edit`}>Edite</Link>
            <button type='submit' className='btn-close' aria-label='Close'></button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Quote;