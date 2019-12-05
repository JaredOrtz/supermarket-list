import delay from 'delay'
const ls = localStorage;

export const getItems = () => {
    return new Promise( async (resolve, reject) => {
        if(ls.getItem('items') !== null) {
            await delay(3000);
            resolve(ls.getItem('items'))
        } 
        reject(new Error('No hay Items'))
    })
}

export const addItem = (item) => {
    return new Promise( async (resolve, reject) => {
        if(item){
            const items = ls.getItem('items') ? JSON.parse(ls.getItem('items')) : []
            await delay(1500);
            items.push(item)
            ls.setItem('items', JSON.stringify(items))
            resolve([...items])
        }
        reject(new Error('No hay nada que agregar'))
    })
}

export const deleteItem = (i) => {
    return new Promise( async (resolve, reject) => {
        const list = JSON.parse(ls.getItem('items'))
        list.splice(i, 1)
        ls.setItem('items', JSON.stringify(list))
        await delay(1500);
        resolve(list)
        reject(new Error('No hay nada que eliminar'))
    })
}