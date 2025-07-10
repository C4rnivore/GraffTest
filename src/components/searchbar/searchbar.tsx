import DebouncedInput from "./input";
import type { SearchbarProps } from "../../lib/types";

function Searchbar({onInputChange}:SearchbarProps) {
    return (  
        <div className="mb-10 flex flex-row gap-15 items-center" >
            <div className="font-bold text-2xl">PostFinder</div>
            <DebouncedInput delay={500} callback={(debouncedValue) => onInputChange(debouncedValue)}/>
        </div>
    );
}

export default Searchbar;