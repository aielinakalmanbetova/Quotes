import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Quote from '../../components/Quote/Quote';

interface Quote {
  id: string;
  author: string;
  text: string;
  category: string;
}
const Home: React.FC = () => {
  const { id } = useParams();
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        let url = '/block.json';
        if (id && id !== 'all') {
          url += `?orderBy="category"&equalTo="${id}"`;
        }
        const response = await axios.get(url);
        if (response.data) {
          const fetchQuotes: Quote[] = Object.keys(response.data).map(key => ({
            id: key,
            ...response.data[key],
          }));
          setQuotes(fetchQuotes);
        }
      } catch (error) {
        console.error('Error', error)
      }
    };
    fetchQuotes()
  }, [id]);

  return (
    <>
      <div className="container d-flex w-50">
        <ul>
          <li><Link to="/">All</Link></li>
          <li><Link to="/">Star Wars</Link></li>
          <li><Link to="/">Famous People</Link></li>
          <li><Link to="/">Saying</Link></li>
          <li><Link to="/">Humour</Link></li>
          <li><Link to="/">Motivation</Link></li>
        </ul>
        <div className="col-md-4">
          <p>All</p>
          <Quote quotes={quotes} />
          <h3>Популярные цитаты</h3>
        </div>
      </div>
      <div className="container">
      <div className="row">

        </div>
      </div>
    </>

  );
};

export default Home;