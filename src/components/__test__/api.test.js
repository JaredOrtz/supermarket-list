import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { Item } from '../Item';
import { ModalAddItem } from '../ModalAddItem';

Enzyme.configure({ adapter: new Adapter() })

describe('App component', () => {
    test('render Item', () => {
        const wrapper = shallow(<Item />)
        expect(wrapper.exists()).toBe(true)
    });

    test('render Modal', () => {
        const Modal = shallow(<ModalAddItem />)
        expect(Modal.exists()).toBe(true)
    })

    test('Abrimos modal y agregamos un item', () => {
        // add a div with #modal-root id to the global body
        const modalRoot = global.document.createElement('div');
        modalRoot.setAttribute('id', 'modal');
        const body = global.document.querySelector('body');
        body.appendChild(modalRoot);

        const wrapper = shallow(<Item />);
        // Abrimos el modal
        const Modal = mount(<ModalAddItem />);
        Modal.setProps({ isOpen: true })

        // Escribimos Cuidar al perro
        const input = Modal.find('.input');
        input.simulate('change', { target: { value: '2kilos de manzana' } })

        // Damos click en add item
        const buttonAddItem = Modal.find('.btn-add');
        buttonAddItem.simulate('click')
        // /al crear el item, verificamos que el largo sea mayor que cero
        const item = wrapper.find('li')
        expect(item.length > 0).toBeTruthy()
    })
})