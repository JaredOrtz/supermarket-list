import React, { useState } from 'react';
import trash from '../assets/trash.svg';
import { deleteItem } from '../api'

export const Item = ({item, handleDeleteItem, i}) => {    

    const [ loading, setLoading ] = useState(false)
    const onDeleteItem = () => {
        setLoading(true)
        deleteItem(i)
        .then(newList => { 
            handleDeleteItem(newList)
            setLoading(false)
        })
        .catch(error => console.log(error))
    }

    return (
        <li className="animated fadeIn" data-cy="item">{item}
            <button type="button" onClick={onDeleteItem}>
                {
                    loading ? <div className="lds-dual-ring" disabled={loading} ></div> : <img src={trash} alt="borrar" />                 
                }
            </button>
        </li>
    )
}