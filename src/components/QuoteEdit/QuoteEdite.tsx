import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosApi from '../../axiosApi';
import Quote from '../Quote/Quote';

interface Params {
  id: string;
}

const QuoteEdite: React.FC = () => {
  const { id } = useParams<Params>();
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');


  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axiosApi.get(`/block/${id}.json`);
        if (response.data) {
          const fetchedQuote: Quote = {
            id,
            ...response.data,
          };
          setAuthor(fetchedQuote.author);
          setText(fetchedQuote.text);
          setCategory(fetchedQuote.category);
        }
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    };
    fetchQuote();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const updatedQuote = { author, text, category };
      await axiosApi.put(`/block/${id}.json`, updatedQuote);
      console.log('Quote updated successfully!');
    } catch (error) {
      console.error('Error updating quote:', error);
    }
  };

  return (
    <div className='container'>
      <h2>Edit Quote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='author' className='form-label'>Author</label>
          <input
            type='text'
            className='form-control'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='text' className='form-label'>Quote Text</label>
          <textarea
            className='form-control'
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>Update Quote</button>
      </form>
    </div>
  );
};

export default QuoteEdite;