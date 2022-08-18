import { useContext, useEffect, useState } from 'react';

import { AuthContext, PostsContext } from '../providers';

import {
  editProfile,
  fetchUserFriends,
  login as userLogin,
  signup as userSignup,
  getPosts,
} from '../api';
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

        if (response.success) {
          user.friendships = response.data.friends;
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

      const friendsResponse = await fetchUserFriends();

      if (friendsResponse.success) {
        response.data.user.friendships = friendsResponse.data.friends;

        setUser(response.data.user);
      }

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

  const updateUserFriends = (addFriend, friend) => {
    if (addFriend) {
      setUser({
        ...user,
        friendships: [...user.friendships, friend],
      });
    } else {
      const updatedFriendships = user.friendships.filter(
        (friendship) => friendship.to_user._id !== friend
      );

      setUser({
        ...user,
        friendships: updatedFriendships,
      });
    }
  };

  return {
    user,
    login,
    logout,
    signup,
    updateUser,
    updateUserFriends,
    loading,
  };
};

export const usePosts = () => {
  return useContext(PostsContext);
};

export const useProvidePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();

      if (response.success) {
        setPosts(response.data.posts);
      }

      setLoading(false);
    };

    fetchPosts();
  }, []);

  const addPostToState = (post) => {
    const newPosts = [post, ...posts];

    setPosts(newPosts);
  };

  return {
    data: posts,
    loading,
    addPostToState,
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
