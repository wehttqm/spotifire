import Layout from '../Components/layout';
import React, { Component } from 'react';
import SearchBar from '../Components/SearchBar'

class Home extends Component {
    state = {
        text: ''
    }
    render() {
        return (
            <Layout>
                <SearchBar
                    onTermChange={(e, {value}) => {this.setState({text: value})}}
                    onTermSubmit={() => {console.log(this.state.text)}}
                />
                <div>Text: {this.state.text}</div>
            </Layout>
        )
    }
}

export default Home