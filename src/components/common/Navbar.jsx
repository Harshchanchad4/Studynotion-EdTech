import React, { useEffect, useState } from 'react'
import { Link, matchPath } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { useSelector } from "react-redux"
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { categories } from "../../services/apis"
import { apiConnector } from "../../services/operations/apiconnector"
import axios from 'axios'
import { BsChevronDown } from "react-icons/bs"
import Menu from '../MenuBar/Menu'






const Navbar = () => {

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    const location = useLocation();

    // api call

    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false)


    const fetchSubLinks = async () => {
        try {
            const result = await axios.get(categories.CATEGORIES_API);
            console.log("printing sublink result ", result);
            setSubLinks(result.data.data);



        } catch (error) {
            console.log("could not fetch the category list");

        }
    }

    useEffect(() => {
        fetchSubLinks();
    }, [])




    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    };


    return (
        <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 '>

            <div className='sm:hidden block relative mr-2 px-2'>



                {token !== null && <Menu />}


            </div>

            <div className='flex w-11/12 max-w-maxContent items-center justify-between'>




                <div className='flex justify-center items-center gap-3 text-white'>

                    {/* image  */}
                    <Link to="/" >
                        <img src={logo} alt="Studynotion logo" width={160} height={42} loading='lazy' />
                    </Link>
                </div>

                {/* nav links */}
                <nav className="hidden md:block">                                                                    {/* Navigation links */}
                    <ul className="flex gap-x-6 text-richblack-25">

                        {NavbarLinks.map((link, index) => (

                            <li key={index}>
                                {
                                    link.title === "Catalog" ? (

                                        <>
                                            <div className={`group relative flex cursor-pointer items-center gap-1 ${matchRoute("/catalog/:catalogName") ? "text-yellow-25" : "text-richblack-25"}`} >
                                                <p> {link.title} </p>  <BsChevronDown />                                   {/*   "Catalog \/"   */}

                                                <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                                                    <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                                                    {
                                                        loading ? (<p className="text-center"> Loading... </p>) : subLinks?.length ? (

                                                            <>
                                                                {

                                                                    // subLinks?.filter((subLink) => subLink?.courses.length > 0)?.map((subLink, i) => (
                                                                    subLinks?.map((subLink, i) => (

                                                                        <Link to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`} className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50" key={i} >
                                                                            <p>{subLink.name}</p>
                                                                        </Link>
                                                                    ))
                                                                }
                                                            </>
                                                        ) : (<p className="text-center">No Courses Found</p>)
                                                    }
                                                </div>
                                            </div>
                                        </>

                                    ) : (
                                        <Link to={link?.path}>
                                            <p className={` ${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"} `}> {link.title}  </p>
                                        </Link>
                                    )
                                }
                            </li>

                        ))
                        }

                    </ul>
                </nav>


                {/* login signup dashbord */}
                <div className='flex gap-x-4 items-center text-white text-lg justify-center'>
                    {
                        user && user?.accountType !== "Instructor" && (
                            <Link to="/dashboard/cart">
                                <div className='relative'>

                                    <AiOutlineShoppingCart className='relative text-3xl' />
                                    {
                                        totalItems > 0 && (
                                            <div className='w-4 absolute right-[0] top-3 bg-richblack-400 rounded-full text-sm flex justify-center items-center'>
                                                {totalItems}
                                            </div>
                                        )
                                    }
                                </div>



                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/login">
                                <button className='border sm:text-xl text-sm border-richblack-700 bg-richblack-800 px-[6px] sm:px-[10px] sm:py-[4px] py-[4px] text-richblack-100 rounded-md '>
                                    Log in
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/signup">
                                <button className='border text-sm sm:text-xl border-richblack-700 bg-richblack-800 px-[6px] sm:px-[10px] sm:py-[4px] py-[4px] text-richblack-100 rounded-md '>
                                    Sign up
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && <ProfileDropDown />
                    }


                </div>


            </div>


        </div>
    )
}

export default Navbar