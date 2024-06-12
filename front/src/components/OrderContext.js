import React, { createContext, useState } from 'react';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState([]);

  const addToOrder = (item) => {
    setOrder((prevOrder) => [...prevOrder, item]);
  };

  const resetOrder = () => {
    setOrder([]);
  };

  return (
    <OrderContext.Provider value={{ order, addToOrder, resetOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
