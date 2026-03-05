"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem } from "@/context/CartContext";

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  items: CartItem[];
  subtotal: number;
  vat: number;
  total: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered";
  date: string;
}

interface OrderContextType {
  orders: Order[];
  placeOrder: (user: { email: string; name: string }, items: CartItem[], subtotal: number, vat: number, total: number) => Order;
  getOrdersByEmail: (email: string) => Order[];
  getAllOrders: () => Order[];
  updateOrderStatus: (id: string, status: Order["status"]) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("pixelden_orders");
    if (stored) {
      try {
        setOrders(JSON.parse(stored));
      } catch {}
    }
  }, []);

  function persist(updated: Order[]) {
    setOrders(updated);
    localStorage.setItem("pixelden_orders", JSON.stringify(updated));
  }

  function placeOrder(user: { email: string; name: string }, items: CartItem[], subtotal: number, vat: number, total: number): Order {
    const order: Order = {
      id: `PD-${Date.now().toString(36).toUpperCase()}`,
      userId: user.email,
      userEmail: user.email,
      userName: user.name,
      items: [...items],
      subtotal,
      vat,
      total,
      status: "Pending",
      date: new Date().toISOString(),
    };
    persist([order, ...orders]);
    return order;
  }

  function getOrdersByEmail(email: string) {
    return orders.filter((o) => o.userEmail === email);
  }

  function getAllOrders() {
    return orders;
  }

  function updateOrderStatus(id: string, status: Order["status"]) {
    persist(orders.map((o) => (o.id === id ? { ...o, status } : o)));
  }

  return (
    <OrderContext.Provider value={{ orders, placeOrder, getOrdersByEmail, getAllOrders, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used within OrderProvider");
  return context;
}
