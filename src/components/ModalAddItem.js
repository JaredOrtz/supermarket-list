import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { addItem } from '../api';

export const ModalAddItem = ({ isOpen, onClose, onAddItem }) => {

    const [ item, setItemValue ] = useState('')

    const handleChange = (e) => {
        setItemValue(e.target.value)
    }

    const onCloseModal = () => {
        setItemValue('')
        onClose()
    }

    const [ loading, setLoading ] = useState(false)
    const [ inputDisabled, setInputDisabled ] = useState(false)

    const handleAddItem = (e) => {
        e.preventDefault();
        setInputDisabled(true)
        setLoading(true)
       // Function API
        addItem(item)
            .then(newItem => {
                setLoading(false)
                onAddItem(newItem)
                setInputDisabled(false)
            })
            .catch(error => console.log(error))

        // Limpiamos el state
        setItemValue('')
    }
        
    if(!isOpen) {
        return null;
    }
            
    return ReactDOM.createPortal(
        <div id="open-modal" className="modal-window">
            <div>
                <h1>Add item</h1>
                <form>
                    <div className="content_input">
                        <input className="input" data-cy="input" type="text" onChange={handleChange} value={item} autoFocus disabled={inputDisabled ? true : false} />
                    </div>
                    <div className="btns_actions">
                        <div>
                            <button type="button" onClick={onCloseModal} className="btn-cancel">Cancel</button>
                        </div>
                        <div>
                            <button type="submit" onClick={handleAddItem} className="btn-add" data-cy="addItem" disabled={item ? false : true}>
                                {
                                    loading ? 'Agregando...' : 'Add'
                                }
                            </button>
                        </div>
                    </div>
                </form>
            </div>
      </div>,
        document.getElementById('modal')
    )
}