import React, { useState } from 'react'
import { Truck, Menu, X } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"

const navLinks = [
    { label: "Home", path: "/" },
    { label: "Track Shipment", path: "/Shipment" },
    { label: "Services", path: "/Service" },
    { label: "About", path: "/about" },
]

const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [menuOpen, setMenuOpen] = useState(false)

    const handleNav = (path) => {
        navigate(path)
        setMenuOpen(false)
    }

    return (
        <nav className="bg-[#F8F0E3] text-[#4A2A16] relative z-50">
            <div className="flex items-center justify-between px-5 sm:px-10 py-4">
                {/* Logo */}
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleNav("/")}
                >
                    <Truck size={32} color="#4A2A16" strokeWidth={2} className="sm:w-[38px] sm:h-[38px]" />
                    <div>
                        <h2 className="font-extrabold text-base sm:text-lg leading-tight">QuickLogix</h2>
                        <p className="text-[10px] sm:text-xs text-[#8B6F52] leading-tight">
                            Logistics Made Simple
                        </p>
                    </div>
                </div>

                {/* lappi links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.path
                        return (
                            <button key={link.path} onClick={() => handleNav(link.path)} 
                            className={`relative pb-1 font-medium transition-colors ${
                                    isActive
                                        ? "text-[#4A2A16]"
                                        : "text-[#6B4E36] hover:text-[#4A2A16]"
                                }`}
                            >
                                {link.label}
                                {isActive && (
                                    <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-[#4A2A16] rounded-full" />
                                )}
                            </button>
                        )
                    })}
                </div>

                {/* lapii */}
                <button
                    onClick={() => handleNav("/login")}
                    className="hidden md:block bg-[#5A321B] text-white font-medium px-6 py-2.5 rounded-lg hover:bg-[#4A2A16] transition-colors"
                >
                    Login
                </button>

                {/* Mobile */}
                <button
                    className="md:hidden p-1"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {/* Mobile dropdown */}
            {menuOpen && (
                <div className="md:hidden flex flex-col gap-1 px-5 pb-5 bg-[#F8F0E3] border-t border-[#E5D5BE]">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.path
                        return (
                            <button
                                key={link.path}
                                onClick={() => handleNav(link.path)}
                                className={`text-left py-3 font-medium border-b border-[#EFE3D0] ${
                                    isActive ? "text-[#4A2A16]" : "text-[#6B4E36]"
                                }`}
                            >
                                {link.label}
                            </button>
                        )
                    })}
                    <button
                        onClick={() => handleNav("/login")}
                        className="mt-3 bg-[#5A321B] text-white font-medium px-6 py-2.5 rounded-lg"
                    >
                        Login
                    </button>
                </div>
            )}
        </nav>
    )
}

export default Navbar