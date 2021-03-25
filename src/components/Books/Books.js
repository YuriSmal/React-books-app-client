import React, { useState } from 'react';
import {useMutation, useLazyQuery} from '@apollo/client';
import DeleteBook from "./DeleteBook";
import AddBook from "./AddBook";
import SearchAuthor from "./Search";
import {GET_BOOKS, DELETE_BOOK, ADD_BOOK} from '../../typeDefs/typeDefs';

const Books = (props) => {
    const [flag, setFlag] = useState(false);
    const [searchValue, setSearch] = useState('');

    const storeSearchValue = (e) => {
        const keyword = e.target.value.trim();
        setSearch(keyword);
    }

    const [ searchAuthor ] = useLazyQuery(GET_BOOKS, {
        fetchPolicy: 'cache-and-network',
        onCompleted() {
            setFlag(!flag);
        }
    });

    const [ deleteBook ] = useMutation(DELETE_BOOK);
    const [addBook] = useMutation(ADD_BOOK);

    const {booksData, fetchMore} = props;
    const [isLoadingMore, setIsLoadingMore] = useState(false);

        return (
                <div className="container d-flex flex-column align-items-center mt-4 mb-4">

                    <div>
                        <SearchAuthor
                            searchValue={searchValue}
                            storeSearchValue={storeSearchValue}
                            searchAuthor={searchAuthor}
                            setSearch={setSearch}
                        />
                        <div className='w-100 d-flex flex-row justify-content-between mt-3'>

                            <div>
                                <AddBook
                                    isLoadingMore={isLoadingMore}
                                    setIsLoadingMore={setIsLoadingMore}
                                    addBook={addBook}
                                    flag={flag}
                                    setFlag={setFlag}/>
                            </div>

                            <button onClick={e => {
                                e.preventDefault();
                                props.updateToken(null);
                                localStorage.removeItem('token');
                            }} type="submit" className="btn btn-primary">Log Out</button>
                        </div>
                        <table className="table-primary table-bordered table-hover mt-3">
                            <thead>
                            <tr>
                                <th scope="col" className="p-3">Title</th>
                                <th scope="col" className="p-3">Author</th>
                                <th scope="col" className="p-3">Pages</th>
                            </tr>
                            </thead>
                            <tbody>

                            {booksData && booksData.books && booksData.books.books && booksData.books.books.map((book, index) => {
                                let key = `${book.id}_${index}`;
                                return (
                                    <tr key={key} className="table-primary">
                                        <td className="table-primary p-2">{book.title}</td>
                                        <td className="table-primary p-2">{book.author}</td>
                                        <td className="table-primary p-2">{book.pages}</td>
                                        <td className="table-primary p-2">
                                            <DeleteBook
                                                book={book}
                                                deleteBook={deleteBook}
                                                flag={flag}
                                                setFlag={setFlag}/>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                        {
                            booksData.books.hasMore &&
                            (
                                <button  type="button" className="btn btn-primary mt-3"
                                    onClick={async () => {

                                        if (booksData.books.hasMore) {
                                            setIsLoadingMore(true);
                                            const variables = { after: booksData.books.cursor};
                                            if (booksData.books.filter && booksData.books.filter.author) variables.author = booksData.books.filter.author;
                                            await fetchMore({
                                                variables,
                                               /* errorPolicy: "all"*/
                                            });
                                        }
                                        setIsLoadingMore(false);
                                    }}
                                >
                                    Load More
                                </button>
                            )
                        }
                    </div>
                </div>
        )
};

export default Books;