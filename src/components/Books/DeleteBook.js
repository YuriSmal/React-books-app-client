import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

function DeleteBook(props) {

    return (
        <button onClick={() => props.deleteBook({
            variables: {id: parseInt(props.book.id, 10)},
            update: (cache) => {
                cache.modify({
                    fields: {
                        books: (existingBooks, { readField }) => {
                            const filteredBooks =  existingBooks.books.filter(bookRef => {
                                const bookId = parseInt(readField('id', bookRef));
                               return bookId !== parseInt(props.book.id);
                            })
                            return {books: filteredBooks, hasMore: existingBooks.hasMore, cursor: existingBooks.cursor, filter: existingBooks.filter};
                        }
                    }
                })
            }
        })
            .then(() => {
                    props.setFlag(!props.flag);
                }
            )} type="submit" className="btn btn-danger btn-sm"><FontAwesomeIcon icon={faTrashAlt}/></button>
    )
}

export default DeleteBook;