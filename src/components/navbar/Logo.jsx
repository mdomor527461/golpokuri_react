import logo from '../../assets/images/logo.png';
export default function Logo(){
    return(
        <div>
            <img src={logo} alt="Logo" className='h-[60px] w-[200px] cursor-pointer'/>
        </div>
    )
}