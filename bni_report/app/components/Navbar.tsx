import React from 'react'

const Navbar = ({ chapterData }: { chapterData?: any }) => {
    return (
        <div className='w-full px-3 sm:px-5 md:px-10 lg:px-20 py-3 border-b border-emerald-100 bg-white flex items-center justify-between'>

            {/* Left Logo */}
            <div className='flex items-center'>
                <img
                    src="/impact_11.png"
                    className='h-10 sm:h-12 md:h-14 object-contain'
                    alt="Impact Logo"
                />
            </div>

            {/* Right Section */}
            <div className='flex items-center gap-2 sm:gap-3'>
                <h1 className='text-[10px] sm:text-xs md:text-sm font-semibold text-gray-600 whitespace-nowrap'>
                    powered by
                </h1>

                <a href="https://www.hackboats.com" target="_blank" rel="noopener noreferrer">
                    <img
                        src="/HB.png"
                        className='h-6 sm:h-8 md:h-10 object-contain'
                        alt="HB Logo"
                    />
                </a>
            </div>

        </div>
    )
}

export default Navbar