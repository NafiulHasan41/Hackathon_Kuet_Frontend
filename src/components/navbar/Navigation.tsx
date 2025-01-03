'use client'
import * as React from "react"
import Link from "next/link"
 
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"



export default function Navigation() {
    return (
        <NavigationMenu>
          <NavigationMenuList>
          <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                 Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
                
            <NavigationMenuItem>
              <Link href="/all-users" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                 All Users
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/chat" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                 Bangla Chat
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>
      )
    }
     
    