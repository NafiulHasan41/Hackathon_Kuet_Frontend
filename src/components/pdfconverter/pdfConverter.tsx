import { Textarea } from "@/components/ui/textarea"
import { Button } from "../ui/button"

export default function PdfConverter() {
    return (
        <div className="m-2">
            <div className="flex flex-row flex-wrap justify-center gap-4">
                <div className="md:w-[40%]">
                    <Textarea className="min-h-[300px]" placeholder="write your banglish story here"></Textarea>
                </div>
                <div className="md:w-[40%]">
                    <Textarea className="min-h-[300px]" placeholder="bangla output"></Textarea>
                </div>
            </div>
            <div className="mt-4 items-end gap-3 flex justify-center">
                <Button>Convert to Bangla</Button>
                <Button>Export PDF</Button>
            </div>
        </div>
    )
}