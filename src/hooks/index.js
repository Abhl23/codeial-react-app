import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../providers/AuthProvider';

import { editProfile, fetchUserFriends, login as userLogin, signup as userSignup } from '../api';
import {
  getItemFromLocalStorage,
  LOCALSTORAGE_TOKEN_KEY,
  removeItemFromLocalStorage,
  setItemInLocalStorage,
} from '../utils';
import jwt from 'jwt-decode';

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);

      if (userToken) {
        const user = jwt(userToken);

        const response = await fetchUserFriends();
        
        if(response.success){
          user.friendships=response.data.friends;
        }

        setUser(user);
      }

      setLoading(false);
    };

    getUser();
  }, []);

  const login = async (email, password) => {
    const response = await userLogin(email, password);

    if (response.success) {
      setUser(response.data.user);

      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );

      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const logout = () => {
    setUser(null);
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
  };

  const signup = async (name, email, password, confirmPassword) => {
    const response = await userSignup(name, email, password, confirmPassword);

    if (response.success) {
      return {
        success: true,
      };
    } else {
      return {
        message: response.message,
        success: false,
      };
    }
  };

  const updateUser = async (userId, name, password, confirmPassword) => {
    const response = await editProfile(userId, name, password, confirmPassword);

    if (response.success) {
      setUser(response.data.user);

      setItemInLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );

      return {
        success: true,
      };
    } else {
      return {
        message: response.message,
        success: false,
      };
    }
  };

  return {
    user,
    login,
    logout,
    signup,
    updateUser,
    loading,
  };
};

export const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange: handleChange,
  };
};
