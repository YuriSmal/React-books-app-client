import  { InMemoryCache, makeVar } from '@apollo/client';

export const isLoggedInVar = makeVar(!!localStorage.getItem('token'));

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                isLoggedIn: {
                    read() {
                        return isLoggedInVar()
                    }
                },
                token: {
                    read() {
                        return localStorage.getItem('token')
                    }
                },
                books: {
                    keyArgs: false,
                    merge(existing, incoming) {
                        let books = [];
                        function isFilterUpdated(existing, incoming) {
                            if (!existing) return false;
                            if (!existing.filter && !incoming.filter) return false;
                            if (!existing.filter || !incoming.filter) return true;
                            return existing.filter.author !== incoming.filter.author;
                        }

                        if (!existing) return {...incoming}

                        if (!isFilterUpdated(existing, incoming)) {
                                books = books.concat(existing.books);
                            if (incoming.books) {
                                const newBooks = incoming.books.filter(book => {
                                    const containedBook = books.find(item => item.__ref === book.__ref);
                                    return !containedBook
                                })
                                books = books.concat(newBooks);
                            }
                            return {
                                ...incoming,
                                books
                            }
                        } else if (isFilterUpdated(existing, incoming)){
                            return {...incoming}
                        }
                    }
                }

            }
        }
    }
})