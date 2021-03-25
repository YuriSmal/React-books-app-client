import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUndoAlt } from '@fortawesome/free-solid-svg-icons'

function SearchAuthor(props) {

    const handleSearch = (e) => {
        e.preventDefault();

        if (props.searchValue.length > 1) {
            return props.searchAuthor({
                variables:  {author: props.searchValue},
            })
        }
    }

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input onChange={props.storeSearchValue} value={props.searchValue} type="text" placeholder="Search by author.."/>
                <button type="submit" className="btn btn-sm"><FontAwesomeIcon icon={faSearch}/></button>
                <button onClick={() => {
                    props.setSearch('');
                    props.searchAuthor();
                }} type="button" className="btn btn-sm"><FontAwesomeIcon icon={faUndoAlt}/></button>
            </form>
        </div>
    )
}

export default SearchAuthor