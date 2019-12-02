import React from 'react';
import trash from '../assets/trash.svg';

export const Item = (props) => {    
    const { item, i, handleDeleteItem } = props;

    return (
        <li className="animated fadeIn">{item}
            <button type="button" onClick={() => handleDeleteItem(i)}>
                <img src={trash} alt="borrar" /> 
            </button>
        </li>
    )
}