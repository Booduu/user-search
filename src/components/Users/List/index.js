import React from 'react';
import PropTypes from 'prop-types';
import { generateKey } from '../../../utils/functions';
import styles from './List.module.scss';

const List = ({ users }) => {
    return (  
        <div className={styles['list-container']}>
            <ul>
                {users.length > 0 && users.map((user, id) => (
                    <li key={generateKey(user.login)}>
                        <div className={styles.item}>
                            <div className={styles['item-img']}>
                                <img src={user.avatar_url} alt="okoko" />
                            </div>
                            <div className={styles['item-name']}>{user.login}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

List.defaultProps = {
    users: [],
}

List.propTypes = {
    users: PropTypes.array,
}
 
export default List;