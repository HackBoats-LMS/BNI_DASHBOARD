import React from 'react'

const Navbar = ({ chapterData }: { chapterData?: any }) => {
    return (
        <div className='w-full border-b border-emerald-100 bg-white px-4 py-3 sm:px-6 md:px-10 lg:px-20'>

            <div className='flex items-center justify-between gap-4'>

                {/* Logo Text */}
                <div className='flex items-center flex-shrink-0'>
                    <span className='text-2xl sm:text-3xl font-black tracking-tight text-emerald-900'>
                        Impact
                    </span>

                    <span className='text-2xl sm:text-3xl font-semibold tracking-tight text-emerald-600'>
                        Sync
                    </span>
                </div>

                {/* Powered By */}
                <div className='flex flex-col items-start'>
                    <p className='text-[10px] sm:text-xs md:text-sm font-semibold text-gray-600 mb-1'>
                        powered by
                    </p>

                    <a
                        href="https://www.hackboats.com"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="/HB.png"
                            alt="Hybrid Brain"
                            className='h-8 sm:h-10 md:h-10 lg:h-10 w-auto object-contain cursor-pointer transition-transform duration-200 hover:scale-105'
                        />
                    </a>
                </div>

            </div>
        </div>
    )
}

export default Navbar