'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';

const DataPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    return (
        <div className="min-h-screen bg-white">
            {/* 1. Hero Section: Split Layout */}
            <section className="flex flex-col md:flex-row min-h-[82vh]">
                {/* Left Side: Text */}
                <div className="w-full md:w-1/2 p-40 flex flex-col justify-center">
                    <h1 className="text-6xl font-black text-black mb-6 tracking-tighter">DATA</h1>
                    <p className="text-x text-black leading-relaxed text-black-700 max-w-md" style={{ width: '800px' }}>
                        The Conflict Research and Security Studies (CRSS)
                        Lab offers students hands-on experience in data collection,
                        data analysis, and research methods. (this is filler btw)
                    </p>
                </div>

                {/* Right Side: Image CURRENTLY FILLER */}
                <div
                    className="w-full md:w-1/2 bg-cover bg-center min-h-[400px]"
                    style={{
                        backgroundImage:
                            "url(https://ih1.redbubble.net/image.872088403.2390/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg)"
                    }}
                >
                    {/* Background image container */}
                </div>
            </section>

            {/* 2. Page Switching Bar */}
            <nav className="flex items-center justify-center min-h-screen-sticky top-0 z-10 border-b-20 border-[#a51c30] flex bg-white">
                <button className="bg-slate-600 text-white px-8 py-3 font-bold uppercase tracking-wider text-sm">
                    Our Data
                </button>
                <button className="flex items-center gap-2 px-8 py-3 text-gray-600 font-bold uppercase tracking-wider text-sm hover:bg-gray-50">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Tools + Resources
                </button>
            </nav>

            {/* 3. Data Area */}
            <main className="p-12 space-y-8 bg-gray-100">
                <section className="max-w-3xl mx-auto">
                    <h1 className="mb-8 text-5xl font-bold text-[#a51c30]">Data</h1>

                    <div className="flex items-center gap-3 border-b-2 border-gray-400 pb-2">
                        <Search className="w-6 h-6 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search datasets"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-transparent text-lg text-gray-700 placeholder-gray-500 outline-none"
                        />
                    </div>

                </section>

                <section>
                    <h1 className="pl-50 mb-20 text-black">search and filter is placeholder text, data links will show below</h1>
                    <h6 className="pl-25 text-1xl font-bold text-black mb-5 text-black">RESULTS</h6>
                    <h1 className="pl-25 text-black">data links will go here</h1>
                </section>
            </main>
        </div>
    );
};

export default DataPage;