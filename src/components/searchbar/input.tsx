import { useState, useEffect } from "react";
import type { DebouncedInputProps } from "../../lib/types";

function DebouncedInput({delay, callback} : DebouncedInputProps) {
    const [inputValue, setInputValue] = useState<string>('')
    const [debouncedValue, setDebouncedValue] = useState<string>('')

    useEffect(()=>{
        const debouncer = setTimeout(()=>{
            setDebouncedValue(inputValue)
        }, delay)

        return ()=> clearTimeout(debouncer)
    },[inputValue, debouncedValue])

    useEffect(() => {
        callback(debouncedValue);
    }, [debouncedValue, callback]);


    return (
        <input
            type="text"
            className={"border border-black rounded-sm w-full px-3 py-2"}
            placeholder="Найти пост"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
        />
    )
}

export default DebouncedInput;