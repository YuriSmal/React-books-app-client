import React from 'react';
import Login from "./components/Login/Login";
import BooksProvider from "./components/BooksProvider";
import {ApolloClient, ApolloProvider} from "@apollo/client";
import {cache} from "./cache";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            token: localStorage.getItem('token'),
            flag: false
        }

        this.updateToken = this.updateToken.bind(this);
        this.updateFlag = this.updateFlag.bind(this);
    }

    updateToken(newToken) {
        this.setState({token: newToken})
    }

    updateFlag() {
        this.setState({flag: !this.state.flag});
        console.log(this.state.flag);
    }

    render() {

        const client = new ApolloClient({
            uri: 'http://localhost:8000/graphql',
            cache,
            headers: {
                authorization: "Bearer " + this.state.token
            },
        })

        return(
            <ApolloProvider client={client}>
                <div>
                        {!this.state.token
                            ?
                            <Login updateToken={this.updateToken} />
                            :
                            <BooksProvider token={this.state.token} updateFlag={this.updateFlag} updateToken={this.updateToken}/>
                        }
                </div>
            </ApolloProvider>
        )
    }
};

export  default App;
