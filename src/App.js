import React, {useState} from 'react';
import axios from 'axios';

import { bookAuthors, Modal } from './utils/index';
import './App.css';


const App = () =>{


    const [searchTerm, setSearchTerm] = useState('');
    const onInputChange = (e) =>{
        setSearchTerm(e.target.value);
    }
    let API_URL = `https://www.googleapis.com/books/v1/volumes`;
    
    const [books, setBooks] = useState({ items: []});
    const [currentBook, setCurrentBook] =useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState(false);

    const fetchBooks = async() => {
        // set loading Before API operation starts
        setLoading(true);
        setError(false);
        try {
        // Ajax call to API using Axios
          const result = await axios.get(`${API_URL}?q=${searchTerm}`);
          setBooks(result.data);
        }
        catch(error) {
          setError(true);
        }
        // After API operation end
        setLoading(false);
    }

    const openModalHandler = () =>{
        setModal(true);
    }

    const closeModalHandler =() =>{
        setModal(false);
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
            <div className="flex-container back-drop">
                {
                    books.items.map((book, index)=>{
                        return(
                            <div key={index}>
                                { modal ? <div onClick={ closeModalHandler} >
                                            </div>
                                        : 
                                            null 
                                }
                                <div 
                                    className="open-modal-btn"
                                    onClick={() =>{
                                        setCurrentBook(book);
                                        openModalHandler();
                                    }}>
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
            <Modal
                className="modal"
                show={modal}
                close={closeModalHandler}
                header = {<h3>More Book Information</h3>}
                >
                <img
                    alt={`${currentBook.volumeInfo? currentBook.volumeInfo.title:''} book`}
                    src={currentBook.volumeInfo? currentBook.volumeInfo.thumbnail:''}
                    />
                    <h3>{currentBook.volumeInfo ? currentBook.volumeInfo.title : ''}</h3>
                    <h4>{currentBook.volumeInfo ? currentBook.volumeInfo.authors : ''}</h4>
                    <p>{currentBook.volumeInfo ? currentBook.volumeInfo.publisher : ''}</p>
                    <p>{currentBook.volumeInfo ? currentBook.volumeInfo.publishedDate : ''}</p>

             </Modal>
        </section>
    );
};
export default App;