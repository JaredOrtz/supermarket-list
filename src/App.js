import React, { useEffect, useState } from 'react';
import { getItems } from './api'
import { ModalAddItem } from './components/ModalAddItem'
import { Empty } from './components/Empty'
import { Item } from './components/Item'
import { LoaderItems } from './components/LoaderItems'

export const App = () => {
  const [ listItems, setListItems] = useState([])

  const [ loading, setLoading ] = useState(false)
  useEffect(() => {
    setLoading(true)
    getItems()
      .then(data => {
        setListItems(JSON.parse(data))
        setLoading(false)
      }).catch(error => console.log(error))
  }, [])

  const handleDeleteItem = (newList) => {
    // Recibimos la nueva lista de items
    setListItems([...newList]) 
    setLoading(false)
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
  }

  const renderItems = () => {
    if(loading && listItems.length === 0) {
      return <LoaderItems />
    }
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
        {
          renderItems()
        }
        <button className="btn_open-modal" onClick={openModal} data-cy="openModal" >Add item</button>
      </div>
      <ModalAddItem isOpen={modalIsOpen} onClose={onCloseModal} onAddItem={getNewItem} />
    </div>
  );
}
