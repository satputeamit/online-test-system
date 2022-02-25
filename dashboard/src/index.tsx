import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloClient, InMemoryCache ,ApolloProvider, createHttpLink} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';


//add env here
let gateway_url =""
if(process.env.REACT_APP_GATEWAY_SERVICE_URL){
  // gateway_url = `http://${process.env.REACT_APP_GATEWAY_SERVICE_URL}:${process.env.REACT_APP_GATEWAY_SERVICE_PORT}/graphql`
  gateway_url = `/graphql`

}
else{
  gateway_url = "http://localhost:4000/graphql"
}
console.log("Gateway api--:",gateway_url)
console.log("GTAPI:",`http://${process.env.REACT_APP_GATEWAY_SERVICE_URL}/graphql`)
const httpLink = createHttpLink({
  uri: gateway_url 
});

console.log("createHttpLink:",httpLink)
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('accessToken');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,      
      authorization: token ? `Bearer ${token}` : "",
    }
  }  
});
console.log("authlink:",authLink)
const client = new ApolloClient({
  // uri: "http://localhost:4000/graphql",
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  
});

console.log("client:",client)


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
