import React from 'react'

const Navbar = ({ chapterData }: { chapterData?: any }) => {
    return (
        <div className='w-full px-4 md:px-10 lg:px-20 bg-white flex justify-between items-center '>
            <img src="./infinity_no_bg.png" className=' h-[10vh] aspect-auto' alt="" />
            <div>
                <h1 className='text-xl font-semibold text-gray-700'>BNI REPORT</h1>
            </div>
            
        </div>
    )
}

export default Navbar