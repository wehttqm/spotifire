import React, { Component } from 'react';
import { Form, TextArea, FormGroup, FormButton } from 'semantic-ui-react';
import styles from '../styles/styles.module.css'

class SearchBar extends Component {
    state = {
        loading: false
    }
    onSubmit = async () => {
        this.setState({loading: true})
        await this.props.onTermSubmit()
        this.setState({loading: false})
    }
    render() {
        return (
            <div className={styles.search}>
                <div className={styles.searchbox}>
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <TextArea 
                                placeholder='Describe what music you would like'
                                onChange={this.props.onTermChange}
                                style={{fontSize: '15px', borderWidth: 3, borderColor: 'white', backgroundColor: '#272f3b', color: 'white'}}
                            />
                            <FormButton loading={this.state.loading} content='submit' style={{backgroundColor: 'lightGreen', margin: 'auto', height: '100%'}}></FormButton>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        )
    }
}

export default SearchBar