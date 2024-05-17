import { useState, useEffect, useMemo } from "react";
import { db } from "../data/database";


const useCart = () => {

    const initialCart = () => {
        const localStorageCart = localStorage.getItem("cart");
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    };

    const [data] = useState(db);
    const [cart, setCart] = useState(initialCart);

    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    //esta funcion es lo que actualizara nuestro state(cart)
    function addToCart(item) {
        const itemExists = cart.findIndex((guitar) => guitar.id === item.id);
        //existe en el carrito
        if (itemExists >= 0) {
            if (cart[itemExists].quantity >= MAX_ITEMS) return;
            const updatedCart = [...cart];
            updatedCart[itemExists].quantity++;
            setCart(updatedCart);
        } else {
            item.quantity = 1;
            setCart([...cart, item]);
        }
    }

    //remove item from cart function
    function removeFromCart(id) {
        setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
    }

    //function to incremeant items in cart
    function increaseQuantity(id) {
        const updatedCart = cart.map((item) => {
            if (item.id === id && item.quantity < MAX_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity + 1,
                };
            }
            return item;
        });
        setCart(updatedCart);
    }

    //function to decreases items in cart
    function decreasedQuantity(id) {
        const removeItemFromCart = cart.map((item) => {
            if (item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1,
                };
            }
            return item;
        });
        setCart(removeItemFromCart);
    }
    //function to set cart to empty again
    function emptyCart() {
        setCart([]);
    }

    //State derivado
    const isEmpty = useMemo(() => cart.length === 0, [cart]);

    //reduce para calcular total del carrito
    const cartTotal = useMemo(() =>
        cart.reduce((total, item) => total + item.quantity * item.price, 0)
    );

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        decreasedQuantity,
        increaseQuantity,
        emptyCart,
        isEmpty,
        cartTotal
    }
}

export default useCart;