"use client"

import PdfConverter from "@/components/pdfconverter/pdfConverter";
import Profile from "@/components/profile/profile";

export default function page(){

    return(
        <>
        <div >
            <PdfConverter/>
        </div>
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-4">
        </div>
        </>
    )
}