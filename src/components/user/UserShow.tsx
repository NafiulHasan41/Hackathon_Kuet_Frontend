'use client';

import * as React from 'react';
import useSWR from 'swr';
import axios from 'axios';
import ProfileCard from '../profilecard/profilecard';
import useAxios from '@/hooks/useAxios';


interface User {
    _id: string;
    name: string;
    email?: string;
    phone?: string;
    role: 'user' | 'admin';
    imageURL?: string;
    location?: {
      type: 'Point';
      coordinates: [number, number];
      address?: string;
    };
  }

  interface UsersResponse {
    data: User[];
  }
  
export default function UserList() {
  
    const axiosInstance = useAxios();

  const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

  const { data: users, error, isValidating } = useSWR<UsersResponse>('/api/users', fetcher);

  if (error) return <div>Failed to load users</div>;
  if (isValidating || !users)
    return (
        <div className="flex items-center justify-center h-96">
            <div className="animate-spin h-10 w-10 mr-3 ..."></div>
            <span>Loading...</span> 
        </div>
    );
   console.log(users)
  return (
    <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-4">
      {users?.data?.map((user) => (
        <ProfileCard key={user._id} id={user._id} name={user.name}  />
      ))}
    </div>
  );
}
