import { Link } from "react-router-dom"
export function Error(){
     const button =" bg-gray-500 rounded-xl text-white  shadow-xl flex justify-center py-2 px-10 hover:cursor-pointer hover:bg-red-400 mt-6 "
    return <>
        <div className="flex justify-center items-center min-h-screen flex-col bg-gray-950 text-white font-bold">
            
                        <h2 className="text-2xl">Cette Page est introuvable 😥😥😥</h2>
                <br />
                    <h2>
                        <Link to={"/"}>
                            <button className={button}>Retour Page d'acceuil</button>
                        </Link>
                    </h2>
        </div>
    </> 
}