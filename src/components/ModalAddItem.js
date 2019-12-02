import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { addItem } from '../api';

export const ModalAddItem = (props) => {

    const { isOpen, onClose } = props;

    const [ item, setItemValue ] = useState('')

    const hanldeChange = (e) => {
        setItemValue(e.target.value)
    }

    const onCloseModal = () => {
        setItemValue('')
        onClose()
    }

    const [ loading, setLoading ] = useState(false)

    const handleAddItem = (e) => {
        e.preventDefault();
        setLoading(true)
       // Function API
        addItem(item)
            .then(newItem => {
                setLoading(false)
                props.callback(newItem)
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
                        <input className="input" type="text" onChange={hanldeChange} value={item} autoFocus />
                    </div>
                    <div className="btns_actions">
                        <div>
                            <button type="button" onClick={onCloseModal} className="btn-cancel" >Cancel</button>
                        </div>
                        <div>
                            <button type="submit" onClick={handleAddItem} className="btn-add" disabled={item ? false : true} >
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