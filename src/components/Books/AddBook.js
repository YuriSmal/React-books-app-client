import React, { useState } from 'react';

function AddBook(props) {

    const [titleInput, handleTitleInput] = useState('');
    const [authorInput, handleAuthorInput] = useState('');
    const [pagesInput, handlePagesInput] = useState('');

    const [ titleErr,  setTitleErr] = useState({});
    const [ authorErr,  setAuthorErr] = useState({});
    const [ pagesErr,  setPagesErr] = useState({});

    const handleBookCreation = (e) => {
        e.preventDefault();

        const isValid = validateForm();
        if (isValid) {
            props.addBook({
                variables: {title: titleInput, author: authorInput, pages: parseInt(pagesInput)},
                update: (cache) => {
                    cache.modify({
                        fields: {
                            books: (existingBooks) => {
                                return {...existingBooks, hasMore: true, filter: existingBooks.filter};
                            }
                        }
                    })
                }
            })
                .then(() => {
                    props.setIsLoadingMore(true);
                });
        }
    }

    const validateForm = () => {
        const titleErr = {};
        const authorErr = {};
        const pagesErr = {};
        let isValid = true;

        if (titleInput.trim().length < 2) {
            titleErr.titleTooShort = 'Title is too short';
            isValid = false;
        }

        if (authorInput.trim().length < 4) {
            authorErr.authorTooShort = 'Author name is too short';
            isValid = false;
        }

        if (pagesInput.trim().length < 2) {
            pagesErr.pagesTooShort = 'The book must be 10 pages or more'
        }

        setTitleErr(titleErr);
        setAuthorErr(authorErr);
        setPagesErr(pagesErr);

        return isValid;
    }

    return(
        <div>
            <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Add new book
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">

                    <form onSubmit={handleBookCreation} method='/POST'>
                    <div className="modal-content">
                        <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="book-title" className="col-form-label">Title:</label>
                                    <input onBlur={validateForm} onChange={e => handleTitleInput(e.target.value)} type="text" className="form-control" id="book-title"/>
                                </div>
                                {Object.keys(titleErr).map(key => {
                                    return <div style={{color: "red"}} key={key} >{titleErr[key]}</div>
                                })}
                                <div className="mb-3">
                                    <label htmlFor="book-author" className="col-form-label">Author:</label>
                                    <input onBlur={validateForm} onChange={e => handleAuthorInput(e.target.value)} type="text" className="form-control" id="book-author"/>
                                </div>
                                {Object.keys(authorErr).map(key => {
                                    return <div style={{color: "red"}} key={key} >{authorErr[key]}</div>
                                })}
                                <div className="mb-3">
                                    <label htmlFor="book-pages" className="col-form-label">Pages:</label>
                                    <input onBlur={validateForm} onChange={e => handlePagesInput(e.target.value)} type="number" className="form-control" id="book-pages"/>
                                </div>
                                {Object.keys(pagesErr).map(key => {
                                    return <div style={{color: "red"}} key={key} >{pagesErr[key]}</div>
                                })}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-success">Add book</button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddBook