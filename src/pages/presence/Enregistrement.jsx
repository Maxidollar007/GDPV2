import { Header } from "../landing/header"
import { Foot } from "./foot"
import { Records } from "./presence"

export function Enregistrement(){
    return<>
        <Header/>
        <Records/>
        <footer className=' flex justify-between bg-gray-800 w-full absolute bottom-0 font-semibold p-4 shadow-2xl shadow-amber-100 text-white '>
            <div className='my-1 flex m-auto '>©2025StagiaTrack</div>
            <div className='flex gap-10 font-semibold my-1 m-auto '>
                <a href="" className='hover:underline'>Licence</a>
                <a href="" className='hover:underline'>Aide</a>
                <a href="" className='hover:underline'>Contact</a>
                <a href="" className='hover:underline'>Politique</a>
            </div>
            <div className='my-1 m-auto '>
                <i class="ri-whatsapp-line text-xl font-normal m-auto"></i>
                <i class="ri-facebook-line text-xl font-normal m-auto"></i>
                <i class="ri-linkedin-box-fill text-xl font-normal m-auto"></i>
                <i class="ri-github-fill text-xl font-normal m-auto"></i>
            </div>
        </footer>
        
        
    </>
}