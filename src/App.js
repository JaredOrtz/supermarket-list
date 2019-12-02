import React, { useState } from 'react';
import { deleteItem, getItems } from './api'
import { ModalAddItem } from './components/ModalAddItem'
import { Empty } from './components/Empty'
import { Item } from './components/Item'

export const App = () => {
  const c = console.log,
        ls = localStorage;
    
  const [ listItems, setListItems] = useState( 
    ls.getItem('items') === null ? [] : [...JSON.parse(ls.getItem('items'))]
  )

  const handleDeleteItem = (i) => {
    // Eliminamos el item del localStorage
    deleteItem(i)
      .then(newList => { 
        setListItems([...newList]) 
      })
      .catch(error => c(error))
  }

  const [ modalIsOpen, setModalIsOpen ] = useState(false)

  const onCloseModal = () => {
    setModalIsOpen(false)
  }

  const openModal = () => {
    setModalIsOpen(true)
  }

  const getNewItem = (item) =>{
    setListItems([...item])
    // Cerramos Modal
    onCloseModal()
    c(ls.getItem('items'))
    c([...JSON.parse(ls.getItem('items'))])
    getItems().then(data => JSON.parse(data))
  }

  const renderItems = () => {
    if(listItems.length !== 0) {
      return (
          <ul>
            {
              listItems.map((item, i) => <Item 
              key={i} 
              item={item} 
              i={i} 
              handleDeleteItem={handleDeleteItem}
              /> )
            }
          </ul>
      )
    } else {
      return (
        <Empty />
      )
    }
  }

  return (
    <div className="App">
      <h1 className="title">Supermarket List</h1>
      <small className="total_items">{listItems.length} ITEMS</small>
      <div className="items_content">
        {renderItems()}
        <button className="btn_open-modal" onClick={openModal} >Add item</button>
      </div>
      <ModalAddItem isOpen={modalIsOpen} onClose={onCloseModal} callback={getNewItem} />
    </div>
  );
}
