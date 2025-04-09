import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets"; 
import axios from 'axios'
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "https://tommato-backend-4knp.onrender.com"
    const [token,setToken] = useState("")
    const [food_list,setFoodList] = useState([])

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    const updateCartQuantity = async (itemId, quantity) => {
        if (quantity === -1 && cartItems[itemId] > 1) {
          setCartItems(prevState => ({ ...prevState, [itemId]: prevState[itemId] - 1 }));
          if (token) {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
          }
        } else if (quantity === 1) {
          setCartItems(prevState => ({ ...prevState, [itemId]: prevState[itemId] + 1 }));
          if (token) {
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
          }
        }
      };
      
      const removeItemFromCart = async (itemId) => {
        setCartItems(prevState => ({...prevState, [itemId]: 0}));
        if (token) {
          await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
      };

      const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async () => {
        const response = await axios.get(url+"/api/food/list")
        setFoodList(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
        setCartItems(response.data.cartData);
    }

    useEffect(()=>{
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token")); 
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])

    const ContextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        updateCartQuantity,
        removeItemFromCart,
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={ContextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;