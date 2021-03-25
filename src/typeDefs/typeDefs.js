import {gql} from "@apollo/client";

export const GET_BOOKS = gql`
    query books ($after: String, $author: String) {
        books(after: $after, author: $author) {
            cursor
            hasMore
            filter {
                author
            }
            books {
                title
                author
                id
                pages
            }
        } 
    }
`;

export const DELETE_BOOK = gql`
    mutation deleteBook ($id: Int) {
        deleteBook(id: $id) {
            title
        }
    }
`;

export const ADD_BOOK = gql`
    mutation addBook ($title: String!, $author: String!, $pages: Int!) {
        addBook(title: $title, author: $author, pages: $pages) {
            title
            author
            id
            pages
        }
    }
`

export const LOGIN_MUTATION = gql`
    mutation Login($name: String!, $password: String!) {
        login(name: $name, password: $password) {
            accessToken
        } 
    }
`;