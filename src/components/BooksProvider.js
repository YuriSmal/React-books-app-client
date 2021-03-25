import React from 'react';
import {useQuery} from "@apollo/client";
import {GET_BOOKS} from "../typeDefs/typeDefs";
import Books from "./Books/Books";
import Login from "./Login/Login";

function BooksProvider(props) {
    function isNotLoggedIn() {
        props.updateToken(null);
        localStorage.removeItem('token');
        return <Login/>
    }
    const { data, loading, error, fetchMore } = useQuery(GET_BOOKS);

    if (loading) return <p>Loading..</p>
    if (error) return isNotLoggedIn();
    if (!data) return <p>Not found</p>

    return(
        <Books updateToken={props.updateToken} booksData={data} fetchMore={fetchMore}/>
    )
}

export default BooksProvider;