import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";
import React from 'react'
import { FooterLink2 } from "../../data/footer-links"
import { Link } from "react-router-dom"
import Logo from "../../assets/Logo/Logo-Full-Light.png"

import { FaRegCopyright } from "react-icons/fa";




const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = ["Articles", "Blog", "Chart Sheet", "Code challenges", "Docs", "Projects", "Videos", "Workspaces",];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];
const Footer = () => {



    return (
        <div className="min-h-[80vh] md:h-screen   w-screen flex flex-col  justify-center items-center gap-2 ">


            <div className="w-11/12 h-[80%] max-w-[1480px] p-5  flex flex-col md:flex-row gap-10 md:justify-center md:items-start">

                <div className="flex md:w-[48%] w-[100%]  justify-around items-start gap-5 ">

                    <div className="flex gap-3 flex-col">
                        <div>
                            <img src={Logo} alt="" />
                        </div>
                        <h1 className="text-richblack-200 font-semibold">Company</h1>

                        <div className="flex flex-col gap-2 text-richblack-400">
                            {
                                ["Aboout", "Careers", "Affiliates"].map((elem, i) => {
                                    return (
                                        <div key={i} className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200">
                                            <Link to={elem.toLowerCase()}>{elem}</Link>
                                        </div>
                                    )
                                })
                            }
                        </div>




                        <div className="flex gap-2">
                            <FaFacebook className="text-richblack-400" />
                            <FaGoogle className="text-richblack-400" />
                            <FaTwitter className="text-richblack-400" />
                            <FaYoutube className="text-richblack-400" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-7 text-richblack-400">
                        <div className="flex flex-col gap-2">

                            <h1 className="text-richblack-200 font-semibold"> Resources</h1>
                            <div className="flex flex-col gap-2 text-richblack-400">
                                {
                                    Resources.map((elem, i) => {
                                        return (
                                            <div key={i} className="text-[14px] cursor-pointer hover:text-richblack
                                        -50 transition-all duration-200">
                                                <Link to={elem.toLowerCase()}>{elem}</Link>
                                            </div>

                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">

                            <h1 className="text-richblack-200 font-semibold">Supports</h1>
                            <div>Help center</div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-7 text-richblack-400">

                        <div className="flex flex-col gap-2">

                            <h1 className="text-richblack-200 font-semibold">Plans</h1>
                            <div className="flex flex-col gap-2 text-richblack-400">
                                {
                                    Plans.map((elem, i) => {
                                        return (
                                            <div key={i} className="text-[14px] cursor-pointer hover:text-richblack
                                        -50 transition-all duration-200">
                                                <Link to={elem.toLowerCase()}>{elem}</Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">

                            <h1 className="text-richblack-200 font-semibold">Community</h1>
                            <div className="flex flex-col gap-2 text-richblack-400">
                                {
                                    Community.map((elem, i) => {
                                        return (
                                            <div key={i} className="text-[14px] cursor-pointer hover:text-richblack
                                        -50 transition-all duration-200">
                                                <Link to={elem.toLowerCase()}>{elem}</Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>

                    </div>
                </div>


                <div className="w-[1px] h-[90%] mb-2 bg-[#2C333F]  "></div>
            


                <div className="flex md:w-[48%] w-[100%] justify-around items-start gap-5  text-richblack-400 ">
                    {
                        FooterLink2.map((elem, i) => {
                            return (
                                <div key={i} className="flex flex-col gap-2">

                                    <div className="text-richblack-100">{elem.title}</div>
                                    <div className="text-richblack-400 ">
                                        {
                                            elem.links.map((linkelem, i) => {
                                                return (
                                                    <div key={i}>

                                                        <Link to={linkelem.link}>{linkelem.title}</Link>
                                                    </div>
                                                )
                                            })
                                        }

                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

            </div>

            <div className="h-[10%] w-full flex justify-center items-center lg:h-[1%] lg:mb-5">

                <div className="h-[1px] mb-2 bg-[#2C333F] w-11/12 max-w-[1480px] "></div>
            </div>

            <div className="flex h-[10%] flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto  pb-14 text-sm">
                <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">

                    <div className="flex flex-row text-lg">
                        <div className=" border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200 px-3">
                            <Link to={BottomFooter[0].split(" ").join("-").toLocaleLowerCase()}> {BottomFooter[0]} </Link>
                        </div>
                        <div className=" border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200 px-3">
                            <Link to={BottomFooter[1].split(" ").join("-").toLocaleLowerCase()}> {BottomFooter[1]} </Link>
                        </div>
                        <div className="cursor-pointer hover:text-richblack-50 transition-all duration-200 px-3">
                            <Link to={BottomFooter[2].split(" ").join("-").toLocaleLowerCase()}> {BottomFooter[2]} </Link>
                        </div>
                    </div>

                    <div className="text-center flex justify-center text-lg items-center">
                        <span>Made with ❤️ Harsh Chanchad</span>
                        &nbsp;<span><FaRegCopyright /> </span>
                        &nbsp; <span>2024 Studynotion </span>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Footer