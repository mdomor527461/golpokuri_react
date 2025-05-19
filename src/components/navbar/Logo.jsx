import logo from '../../assets/images/logo.png';
export default function Logo(){
    return(
        <div>
            <img src={logo} alt="Logo" className='h-[200px] w-[200px]'/>
        </div>
    )
}