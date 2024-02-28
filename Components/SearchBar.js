import React from 'react';
import { Form, TextArea, Button, FormGroup, FormButton } from 'semantic-ui-react';
import styles from '../styles/styles.module.css'

const SearchBar = ({onTermChange, onTermSubmit}) => {
    return (
        <div className={styles.search}>
            <div className={styles.searchbox}>
                <Form onSubmit={onTermSubmit}>
                    <FormGroup>
                        <TextArea 
                            placeholder='Describe what music you would like'
                            onChange={onTermChange}
                            style={{fontSize: '15px', borderWidth: 3}}
                        />
                        <FormButton content='submit' style={{backgroundColor: 'lightGreen', margin: 'auto', height: '100%'}}></FormButton>
                    </FormGroup>
                </Form>
            </div>
        </div>
    )
}

export default SearchBar