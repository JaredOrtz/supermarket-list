import delay from 'delay'
const ls = localStorage;

export const getItems = () => {
    return new Promise( async (resolve, reject) => {
        if(ls.getItem('items') != null) {
            await delay(2000);
            resolve(ls.getItem('items'))
        } else {
            reject(new Error('Hubo un error al obtener los items'))
        }
    })
}

export const addItem = (item) => {
    return new Promise( async (resolve, reject) => {
        if(ls.getItem('items') == null) {
            const items = []
            items.push(item)
            ls.setItem('items', JSON.stringify(items))
            await delay(1500);
            resolve([...items])
        } else {
            const items = JSON.parse(ls.getItem('items'))
            items.push(item)
            ls.setItem('items', JSON.stringify(items))
            await delay(1500);
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
        await delay(800);
        resolve(list)
        reject(new Error('No hay nada que eliminar'))
    })
}