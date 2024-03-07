import React from 'react'
import styles from '../styles/styles.module.css'

const Header = () => {
    return (
        <div className={styles.header}>
            <h1 className={styles.header_text} style={{color: 'white'}}>Spotifire 🔥</h1>
        </div>
    )
}

export default Header