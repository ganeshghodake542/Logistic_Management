import React from 'react'
import Navbar from '../components/Navbar'
import {
  MapPin,
  Truck,
  ShieldCheck,
  BarChart3,
  ArrowRight,
  Navigation,
} from "lucide-react"
import { useNavigate } from 'react-router-dom'

const features = [
  {
    icon: MapPin,
    title: "Real-Time Tracking",
    desc: "Track your shipment live with accurate location updates and complete visibility.",
  },
  {
    icon: Truck,
    title: "Smart Logistics",
    desc: "Optimized routes, efficient resource allocation and faster deliveries.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Delivery",
    desc: "Your shipments are safe with verified drivers, secure handling and proof of delivery.",
  },
  {
    icon: BarChart3,
    title: "Delivery Analytics",
    desc: "Get insights with detailed reports, performance metrics and smarter decisions.",
  },
]

const LandingPage = () => {

  const navigate = useNavigate();

  return (
    <div className='bg-[#FBF3E7] min-h-screen'>

      <Navbar />

      <section className='relative overflow-hidden px-6 sm:px-10 pt-16 pb-20 lg:pt-20 lg:pb-28'>
        <div className='max-w-7xl max-auto grid lg:grid-cols-2 gap-16 items-center relative z-10'>
          <div className='lg:pl-10'>

            <p className='text-[#B5652E] text-sm font-semibold tracking-wide mb-4'>
              Smart logistics for a connected world
            </p>

            <h1 className='text-5xl sm:text-6xl font-extrabold text-[#3A2415] leading-[1.1]'>
              Move Smarter.
              <br />
              Deliver Faster.
            </h1>
            <p className='text-[#6B5947] text-lg leading-relaxed mb-8 max-w-md'>
              Seamless shipment management and real-time delivery tracking —
              all in one place. From pickup to doorstep, we keep you informed,
              every step of the way.
            </p>

            <div className='flex flex-wrap gap-4'>
              <button onClick={() => navigate("/book")} className="flex items-center gap-2 bg-[#3A2415] text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-[#2C1B10] transition-colors" >
                Book a Shipment
                <ArrowRight size={18} />
              </button>
              <button onClick={() => navigate("/shipment")} className="flex items-center gap-2 border border-[#3A2415]/30 text-[#3A2415] font-semibold px-6 py-3.5 rounded-xl hover:bg-white transition-colors" >
                <MapPin size={18} />
                Track Shipment
              </button>
            </div>

          </div>

          {/* right dashboard */}

          {/* <div className='relative'>
              <div className='absolute -inset-3 bg-[#3A2415] rounded-[28px] translate-x-4 translate-y-4 -z-10'>
                <div className='bg-white rounded[24px] shadow-xl border border-[#EFE0C8] overflow-hidden flex'>

                </div>
              </div>

            </div> */}


          <div className="relative">
            <div className="absolute -inset-3 bg-[#3A2415] rounded-[28px] translate-x translate-y-4 -z-10" />
            <img src="dashboard.png" alt="" className='border-2 border-[#3A2415] rounded-2xl ' />
          </div>



        </div>

      </section>


    </div>
  )
}

export default LandingPage