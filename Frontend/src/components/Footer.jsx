import React from 'react'
import { useNavigate } from "react-router-dom"
import { Truck, Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from "lucide-react"

const footerLinks = {
    Company: [
        { label: "About", path: "/about" },
        { label: "Services", path: "/Service" },
        { label: "Careers", path: "/careers" },
        { label: "Contact", path: "/contact" },
    ],
    Solutions: [
        { label: "Track Shipment", path: "/Shipment" },
        { label: "Book a Shipment", path: "/book" },
        { label: "Fleet Management", path: "/fleet" },
        { label: "Delivery Analytics", path: "/analytics" },
    ],
    Support: [
        { label: "Help Center", path: "/help" },
        { label: "Terms of Service", path: "/terms" },
        { label: "Privacy Policy", path: "/privacy" },
    ],
}

const socials = [
    { icon: Linkedin, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
]

const Footer = () => {
    const navigate = useNavigate()

    return (
        <footer className="bg-[#3A2415] text-white">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 py-14">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
                    {/* Brand + contact */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Truck size={30} color="#F5E4C8" strokeWidth={2} />
                            <div>
                                <h2 className="font-extrabold leading-tight">QuickLogix</h2>
                                <p className="text-xs text-white/60 leading-tight">
                                    Logistics Made Simple
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-white/70 leading-relaxed mb-5 max-w-xs">
                            Seamless shipment management and real-time delivery tracking,
                            from pickup to doorstep.
                        </p>
                        <div className="space-y-2 text-sm text-white/70">
                            <div className="flex items-center gap-2">
                                <MapPin size={16} className="text-[#D9A15C] shrink-0" />
                                <span>MG Road, Pune, Maharashtra, India</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={16} className="text-[#D9A15C] shrink-0" />
                                <span>+91 98765 xxxxx</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail size={16} className="text-[#D9A15C] shrink-0" />
                                <span>support@quicklogix.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([heading, links]) => (
                        <div key={heading}>
                            <h4 className="font-semibold mb-4">{heading}</h4>
                            <ul className="space-y-2.5">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <button
                                            onClick={() => navigate(link.path)}
                                            className="text-sm text-white/70 hover:text-white transition-colors text-left"
                                        >
                                            {link.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-white/50">
                        © {new Date().getFullYear()} QuickLogix. All rights reserved.
                    </p>
                    <div className="flex items-center gap-3">
                        {socials.map(({ icon: Icon, href }, i) => (
                            <a
                                key={i}
                                href={href}
                                aria-label="Social link"
                                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                            >
                                <Icon size={16} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer