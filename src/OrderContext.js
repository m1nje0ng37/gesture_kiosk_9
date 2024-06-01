import React, { createContext, useState } from 'react';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState([]);

  const addToOrder = (menu) => {
    setOrder((prevOrder) => [...prevOrder, menu]);
  };

  const clearOrder = () => {
    setOrder([]);
  };

  return (
    <OrderContext.Provider value={{ order, addToOrder, clearOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
