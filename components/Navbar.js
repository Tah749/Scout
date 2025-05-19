import Link from "next/link"

const Navbar = () => {
    return (
    <div>
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>

    <h1 className="title" >Scout</h1>
    <img className="titleLogo" src="/images/football.png" />
    
    <Link href='/help'>
        <button className='navIcons'><i className="fa fa-info"></i></button>
    </Link>
    <Link href='/stats'>
        <button className='navIcons' ><i className="fa fa-newspaper-o"></i></button>
    </Link>
    <Link href='/fixtures'>
        <button className='navIcons' ><i className="fa fa-calendar"></i></button>
    </Link>
    <Link href='/login'>
        <button className='navIcons' ><i className="fa fa-user"></i></button>
    </Link>
    <Link href='/'>
        <button className='navIcons' ><i className="fa fa-home"></i></button>
    </Link>

    </div>
    )

}

export default Navbar


