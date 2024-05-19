import { FC } from "react";

interface FiltroBusquedaProps {
    onSearch?: (query: string) => void;
}

const FiltroBusqueda: FC<FiltroBusquedaProps> = ({onSearch}) => {

    const handleSearch = () => {
        const inputElement = document.getElementById("searchId") as HTMLInputElement;
        console.log({inputElement})
        if (onSearch) {
          onSearch(inputElement.value);
        }
      };

    return(
        <div className="flex justify-between p-3 border-b border-slate-50">
            <h3 className="font-semibold">REPORTES</h3>
            <div className="relative flex">
                <input
                    type="search"
                    className="relative m-0 -me-0.5 block flex-auto rounded-s border border-solid border-neutral-200 bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-surface outline-none transition duration-200 ease-in-out placeholder:text-neutral-500 focus:z-[3] focus:border-primary focus:shadow-inset focus:outline-none motion-reduce:transition-none"
                    placeholder="ID Caso, ID Cliente o Tel"
                    aria-label="Search"
                    id="searchId"
                    aria-describedby="button-addon3" />
                <button
                    className="z-[2] inline-block rounded-e border border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-accent-300 hover:bg-primary-50/50 hover:text-primary-accent-300 focus:border-primary-600 focus:bg-primary-50/50 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700"
                    data-twe-ripple-init
                    data-twe-ripple-color="white"
                    type="button"
                    id="button-addon3"
                    onClick={handleSearch}
                >
                    <img src="./search.png" alt="lupa" className="w-5"/>
                </button>
            </div>     
        </div>
    )
}

export default FiltroBusqueda;