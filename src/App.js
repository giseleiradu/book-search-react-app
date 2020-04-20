import React, {useState} from 'react';
import axios from 'axios';

import { bookAuthors } from './utils/index';
import './App.css';


const App = () =>{
    const [searchTerm, setSearchTerm] = useState('');
    const onInputChange = (e) =>{
        setSearchTerm(e.target.value);
    }
    let API_URL = `https://www.googleapis.com/books/v1/volumes`;
    
    const [books, setBooks] = useState({ items: []});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchBooks = async() => {
        // set loading Before API operation starts
        setLoading(true);
        setError(false);
        try {
        // Ajax call to API using Axios
          const result = await axios.get(`${API_URL}?q=${searchTerm}`);
          console.log(result.data);
          setBooks(result.data);
        }
        catch(error) {
          setError(true);
        }
        // After API operation end
        setLoading(false);
    }

    const onSubmitHandler =(e)=>{
        //Prevent browser refreshing after form submission
        e.preventDefault();
        //call fetch book async function
        fetchBooks();
    }

    return (
        <section>
            <form onSubmit ={onSubmitHandler}  className='form'>
                <label>
                    <span>
                        <b>Book Search</b>
                    </span>
                    <input 
                        type="search" 
                        placeholder = 'Your search query...'
                        value={searchTerm}
                        onChange={onInputChange}
                        required
                    />
                    <button type="submit">Search</button>
                </label>
                {
                    error && <div style={{color: `red`}}>some error occurred, while fetching api</div>
                }
            </form>
            {
                loading && <div style={{color: `green`}}>fetching books for "<strong>{searchTerm}</strong>"</div>
            }
            <div class="flex-container">
                {
                    books.items.map((book, index)=>{
                        return(
                            <div key={index}>
                                <div>
                                    <img
                                        alt={`${book.volumeInfo.title} book`}
                                        src={`http://books.google.com/books/content?id=${
                                            book.id
                                        }&printsec=frontcover&img=1&zoom=1&source=gbs_api`}
                                        />
                                    <div>
                                        <h3>{book.volumeInfo.title}</h3>
                                        <p>{bookAuthors(book.volumeInfo.authors)}</p>
                                        <p>{ book.volumeInfo.publisher}</p>
                                        <p>{book.volumeInfo.publishedDate}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </section>
    );
};
export default App;