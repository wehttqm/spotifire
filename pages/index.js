import Layout from '../Components/layout';
import React, { Component } from 'react';
import SearchBar from '../Components/SearchBar'
import SongList from '../Components/SongList'

class Home extends Component {
    state = {
        text: '', 
        song_ids: [
            '3aUp8U4MNWctRXlY5MPysv',
            '7BdBAeVMiVHbszGoN7WsAt',
            '5EWPGh7jbTNO2wakv8LjUI',
        ],
        
    }
    getSongs = () => {
        console.log('no songs to get since THIS ISNT IMPLEMENTED')
    }
    render() {
        return (
            <Layout>
                <SearchBar
                    onTermChange={(e, {value}) => {this.setState({text: value})}}
                    onTermSubmit={async () => {this.getSongs()}}
                />
                <SongList song_ids={this.state.song_ids}/>

            </Layout>
        )
    }
}

export default Home