"use client"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover"

interface DatePickerDemoProps {
    value?: Date;
    onChange: (date: Date | undefined) => void;
    placeholder?: string;
}

export function DatePickerDemo({ value, onChange, placeholder = "Pick your birthday" }: DatePickerDemoProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    data-empty={!value}
                    className="data-[empty=true]:text-muted-foreground w-[400px] justify-start text-left font-normal"
                >
                    <CalendarIcon />
                    {value ? format(value, "PPP") : <span>{placeholder}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={onChange}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}