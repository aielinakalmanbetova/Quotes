import React, { useState } from 'react';
import axiosApi from '../../axiosApi';

const QuoteAdd: React.FC = () => {
  const [author, setAuthor] = useState<string>('');
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const newQuote = { category, author, text };
      await axiosApi.post('/block.json', newQuote);
      console.log('Quote added successfully!');
    } catch (error) {
      console.error('Error adding quote:', error);
    }
  };

  return (
    <div className='container'>
      <h2>Add new Quote</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category:</label>
          <input
            type="text"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
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
          <label htmlFor='text' className='form-control'>Quote Text</label>
          <textarea
            className='form-control'
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          >
          </textarea>
        </div>
        <button type='submit' className='btn btn-primary'>Add Quote</button>
      </form>
    </div>
  );
};

export default QuoteAdd;