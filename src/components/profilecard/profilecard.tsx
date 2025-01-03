import * as React from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import { Avatar, AvatarImage } from "@/components/ui/avatar";
  import { Button } from "../ui/button";
  interface ProfileCardProps{
    id: number;
    name: string;
    posterAvatar: string;
  }

  export default function ProfileCard(
    {
        id,
        name,
        posterAvatar,

    }: ProfileCardProps
  ){
    return(
        <Card className="w-[250px] m-2 border p-1 rounded-lg shadow-lg transition-all hover:shadow-xl">
      <CardHeader key={id} className="h-min-[200px]">
        <div className="flex items-center justify-between gap-6 rounded-[8px]">
          <div
            className="avatar rounded-full min-h-11 min-w-11 bg-green-100 text-white fond-[700]
                    flex items-center justify-center hover:bg-green-500 cursor-pointer"
          >
            <Avatar>
              <AvatarImage src={posterAvatar} alt="@shadcn" />
            </Avatar>
          </div>
          <div className="grow">
            <p className="text-xl text-gray-800">{name}</p>
            <Button>See Profile</Button>
          </div>

        </div>
      </CardHeader> 
              </Card>
    )
  }