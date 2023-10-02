import { useState, Dispatch, SetStateAction } from 'react';


export default function useCart(productsAndPrices: Map<string, number>): [Map<string, number>, (itemName: string, value: number) => void] {
    const [cart, setCart]: [Map<string, number>,  Dispatch<SetStateAction<Map<string, number>>>] = useState(new Map<string, number>());

    if (cart.size === 0) {
        productsAndPrices.forEach((_, productName) => {
            setCart(new Map<string, number>(cart.set(productName, 0.00)));
        });
    }

    const setCartItem = (itemName: string, value: number) => {
        setCart(new Map<string, number>(cart.set(itemName, value)));
    }

    return [cart, setCartItem];
}
