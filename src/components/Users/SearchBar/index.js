import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './SearchBar.module.scss';

const SeachBar = ({
    handleChange,
    value,
    disabled
}) => {
    const [focus, setFocus] = useState(false);

    return (  
        <div className={styles['search-container']}>
            <label 
                htmlFor="search-input-text"
                className={[
                        styles["control-label"], 
                        focus ? styles["label-focus"] : styles["label-not-focus"]
                ].join(' ')} 
            >
                Search a user 
            </label> 
            <input 
                type="text" 
                id="search-input-text" 
                name="search-input-text" 
                value={value} 
                onChange={handleChange} 
                disabled={disabled}
                onFocus={() => setFocus(true)}
                onBlur={() => {
                    if (!(value.length > 0)) {
                        setFocus(false);
                    }
                }}
                autoComplete="off"
            />
        </div>
    );
}

SeachBar.defaultProps = {
    handleChange: () => {},
    value: '',
    disabled: false,
}

SeachBar.propTypes = {
    handleChange: PropTypes.func,
    value: PropTypes.string,
    disabled: PropTypes.bool, 
}
 
export default SeachBar;