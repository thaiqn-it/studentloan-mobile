import React, { createContext, useState,useEffect,useReducer } from "react";
import { userApi } from "../apis/user";
import * as SecureStore from "expo-secure-store";

export const AppContext = createContext();

const getUser = async () => {
  const user = await userApi.getProfile()
  return user.data
}

const userReducer = (state,action) => {
    switch(action.type) {
      case "LOAD" : 
        state = action.data
        return {
          ...state,
        }
      case "CLEAR" :
        state = {}
        return {
          ...state
        }  
    }
}

export default function AppProvider({ children }) { 
    const [ user,setUser ] = useReducer(userReducer, {})
    
    return (
      <AppContext.Provider
        value={{
          user,
          setUser,
          getUser,
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }