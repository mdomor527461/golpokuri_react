export default function WriteButton({label}){
    return (
        <button className="bg-yellow-400 hover:bg-yellow-500 text-black py-2 px-5 rounded font-bold">
            {label}
        </button>
    )
}