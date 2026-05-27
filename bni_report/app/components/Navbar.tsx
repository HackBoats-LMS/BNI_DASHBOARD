import React from 'react'

const Navbar = ({ chapterData }: { chapterData?: any }) => {
    return (
        <div className='w-full px-4 py-4 border-2 border-b-emerald-100  md:px-10 lg:px-20 bg-white flex justify-between items-center'>
            <div className='flex items-center'>
                <span className='text-3xl font-black tracking-tight text-emerald-900 font-sans'>Impact</span>
                <span className='text-3xl font-semibold tracking-tight text-emerald-600 font-sans'>Sync</span>
            </div>
            <div>
                <h1 className='text-xl font-semibold text-gray-700'>REPORT</h1>
            </div>
        </div>
    )
}

export default Navbar
