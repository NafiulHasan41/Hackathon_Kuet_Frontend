"use client";

import ShowMetric from "@/components/metric/ShowMetric";
import PrivateRoute from "@/provider/PrivateRoute";

export default function UserPage(){
    return (
        <div className=" p-5 md:p-8 max-w-screen-lg mx-auto  rounded-lg ">
          <PrivateRoute>
          <h1>User Dashboard home Page</h1>
          <ShowMetric/>
          </PrivateRoute>
        </div>
    )
}