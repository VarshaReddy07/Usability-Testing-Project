import React from 'react';
import { logoLight, paymentLogo } from '../assets';
import {ImGithub} from "react-icons/im";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaYoutube,
    FaHome,
} from "react-icons/fa";
import {MdLocationOn} from "react-icons/md";
import {BsPersonFill, BsPaypal} from "react-icons/bs";

const Footer = () => {
  return (
    <div className="bg-black text-[#949494] py-20 font-titleFont">
        <div className="max-w-screen-xl mx-auto grid grid-cols-4">
            {/* ============ LogoIcon Start Here ==========*/}
            <div className="flex flex-col gap-7">
                <img className="w-32" src={logoLight} alt="logoLight"/>
                <p className="text-white text-sm tracking-wide">© everestapparel.shop</p>
                <img className="w-56" src={paymentLogo} alt="paymentLogo"/>
                <div className="flex gap-5 text-lg text-gray-400">
                    <a
                        href="https://github.com/Mitchell-Hess/designer-clothing-store"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white duration-300 cursor-pointer"
                    >
                    <ImGithub />
                    </a>
                    <FaYoutube className="hover:text-white duration-300 cursor-pointer"/>
                    <FaFacebookF className="hover:text-white duration-300 cursor-pointer"/>
                    <FaTwitter className="hover:text-white duration-300 cursor-pointer"/>
                    <FaInstagram className="hover:text-white duration-300 cursor-pointer"/>
                </div>
            </div>
            {/* ============ LogoIcon End Here ============*/}
            {/* ============ LocateUs Start Here ==========*/}
            <div>
                <h2 className="text-2xl font-semibold text-white mb-4">locate us</h2>
                <div className="text-base flex flex-col gap-2">
                    <p>University of North Texas, Discovery Park</p>
                    <p>Mobile: (555) 555-5555</p>
                    <p>Phone: (555) 555-5555</p>
                    <p>e-mail: everestapparel01@gmail.com</p>
                </div>
            </div>
            {/* ============ LocateUs End Here ============*/}
            {/* ============ Profile Start Here ===========*/}
            <div>
                <h2 className="text-2xl font-semibold text-white mb-4">profile</h2>
                <div className="flex flex-col gap-2 text-base">
                    <p className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer">
                        <span>
                            <BsPersonFill/>
                        </span>
                        my account
                    </p>
                    <p className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer">
                        <span>
                            <BsPaypal/>
                        </span>
                        checkout
                    </p>
                    <p className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer">
                        <span>
                            <FaHome/>
                        </span>
                        order tracking
                    </p>
                    <p className="flex items-center gap-3 hover:text-white duration-300 cursor-pointer">
                        <span>
                            <MdLocationOn/>
                        </span>
                        help & support
                    </p>
                </div>
            </div>
            {/* ============ Profile End Here =============*/}
            {/* ============ Subscribe Start Here =========*/}
            <div className="flex flex-col justify-center">
                <input 
                    className="bg-transparent border px-4 py-2 text-sm" 
                    placeholder="e-mail"
                    type="text"/>
                <button className="text-sm border text-white border-t-0 hover:bg-gray-900
                active:bg-white active:text-black">
                    Subscribe
                </button>
            </div>
            {/* ============ Subscribe End Here ===========*/}
        </div>
    </div>
  );
};

export default Footer