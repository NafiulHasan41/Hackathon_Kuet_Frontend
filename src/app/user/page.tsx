"use client"

import PdfConverter from "@/components/pdfconverter/pdfConverter";
import Profile from "@/components/profile/profile";
import ProfileCard from "@/components/profilecard/profilecard";
export default function page(){
    const profile={
        userName: "Swagoto",
        userEmail: "swagoto@gmail.com",
        wordsTranslated: 560,
        storiesWritten: 3,
        chatbotInteractions: 12,
    }

    return(
        <>
        <div >
            <PdfConverter/>
        </div>
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-4">
            <Profile key={profile.userEmail} {...profile}></Profile>
        </div>
        
        </>
    )
}