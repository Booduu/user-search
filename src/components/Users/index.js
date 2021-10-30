import React, { useState } from 'react';
import SearchBar from './SearchBar';
import List from './List';
import styles from './Users.module.scss';


const Users = () => {
    const [inputValue, setInputValue] = useState('');
    const [users, setUsers] = useState([]);
    const [error, setError] = useState({
        isResult: true,
        message: 'API rate limit exceeded ! Wait few seconds...',
        state: false,
    });
    const [timerId, setTimerId] = useState(null); 
    const [count, setCount] = useState(60); 
    const [loading, setLoading] = useState(false);
    let intervalId;

    const handleInputChange = (e) => {
        
        const { value } = e.target;

        if (value.length > 1) {
            debounce(() => fetchApi(value), 400);
        }

        if (value.length === 0) {
            setInputValue('');
            setUsers([]);
            setError({
                ...error,
                isResult: true,
            })
        }

        setInputValue(value)
    }

    const startInterval = () => {
        let number = count;
        intervalId = setInterval(() => {
            if (number === 0) {
                clearInterval(intervalId);
                setError({
                    ...error,
                    state: false,
                });
                setCount(60)
            } else {
                number = number - 1;
                setCount(number);
            }
           
        }, 1000);
    }

    const debounce = (cb, delay) => {
        if (timerId) {
            return false;
        }
        setTimerId(setTimeout(() => {
            cb()
            setTimerId(null);
        }, delay));
    }

   const fetchApi = (query) => {
        if (!loading) {
            setLoading(true);
        }

        fetch(`https://api.github.com/search/users?q=${query}`)
            .then(response => response.json())
            .then(data => {
                 // if no data, display "No result"
                if (!!data.items) { 
                    debounce(() => setError({ ...error, isResult: false }), 800);
                }
                // if data.message, display limit rate message
                if (data.message) {
                    setError({
                        ...error,
                        state: true,
                    });
                    setLoading(false);
                    startInterval();
                } else {
                    // else display set state users and display them
                    setUsers([...data.items]);
                    setError({
                        ...error,
                        state: false,
                    });
                    setLoading(false);
                }
            });
   };


     
    return (  
        <div className={styles['users-container']}>
            <div className={styles['container']}>
                <div style={{ display: 'flex', flex: '1 1 0' }}>
                    <SearchBar 
                        value={inputValue} 
                        handleChange={handleInputChange}
                        disabled={error.state}
                    />
                </div>
                <div>
                    <div className={styles['error-container']}>
                        {error.state && <div>{error.message} {count}</div>}
                    </div>
                    <div style={{ opacity: loading ? '0.3' : 'initial' }}>
                        {users.length === 0 && (!error.isResult && !error.state) > 0 ? (
                            <div className={styles['error-container']}>No results</div> 
                        ) : (
                            <List users={users} error={error}/>
                        )}
                    </div>
                </div>
            </div>
            
        </div>
    );
}
 
export default Users;