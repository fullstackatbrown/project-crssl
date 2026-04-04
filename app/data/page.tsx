'use client';

import React, { useState, useEffect } from 'react';
import { Search, Download, Database } from 'lucide-react';
import { client } from '../../sanity/lib/client';

// We can add more later too, these are just to match figma
const FILTER_CATEGORIES = [
    'Global Securities',
    'Conflicts',
    'Macroeconomics',
    'World Domination',
    'Make Love, Not War',
];

// Creating data type for dataset imported from Sanity
type Dataset = {
    _id: string;
    name: string;
    slug: { current: string };
    publishedAt: string;
    description: string;
    files: { asset: { url: string } }[];
    links: { title: string; url: string }[];
    contributors: { _id: string; name: string }[];
    content: any[];
}


// Main page
const DataPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState<'datasets' | 'tools'>('datasets');
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [datasets, setDatasets] = useState<Dataset[]>([]);

    // Call client 
    useEffect(() => {
        client.fetch(`*[_type == "exampleDataset"]{
        _id,
        name,
        slug,
        publishedAt,
        description,
        files[]{asset->{url}},
        links,
        contributors[]->{_id, name},
        content
    }`).then(data => setDatasets(data));
    }, []);

    const toggleFilter = (cat: string) => {
        setActiveFilters(prev =>
            prev.includes(cat) ? prev.filter(f => f !== cat) : [...prev, cat]
        );
    };

    return (
        <div className="min-h-screen bg-white font-serif" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            {/* ── Dark Hero Banner ── */}
            <section
                className="relative flex flex-col justify-end px-10 pb-10"
                style={{
                    background: 'linear-gradient(160deg, #4a4a48 0%, #2e2e2c 60%, #1a1a18 100%)',
                    minHeight: '280px',
                }}
            >
                <h2 className="text-4xl font-bold text-white mb-1" style={{ fontFamily: 'Georgia, serif' }}>Data</h2>
                <p className="text-gray-300 text-sm max-w-md" style={{ fontFamily: 'Georgia, serif' }}>
                    Our lab collects data on some of the most vital problems in the world.
                </p>
            </section>

            {/* ── Tab Bar ── */}
            <div className="grid grid-cols-2 border-b border-gray-300 bg-white">
                <button
                    onClick={() => setActiveTab('datasets')}
                    className={`py-4 text-sm font-semibold tracking-wide transition-colors border-r border-gray-300 ${activeTab === 'datasets'
                        ? 'bg-white text-gray-900'
                        : 'bg-gray-50 text-gray-500 hover:bg-white'
                        }`}
                    style={{ fontFamily: 'Georgia, serif' }}
                >
                    Datasets
                </button>
                <button
                    onClick={() => setActiveTab('tools')}
                    className={`py-4 text-sm font-semibold tracking-wide transition-colors ${activeTab === 'tools'
                        ? 'bg-white text-gray-900'
                        : 'bg-gray-50 text-gray-500 hover:bg-white'
                        }`}
                    style={{ fontFamily: 'Georgia, serif' }}
                >
                    Tools &amp; Resources
                </button>
            </div>

            {/* ── Main Content ── */}
            <main className="bg-gray-100 px-10 py-8 min-h-screen">

                {/* Results count */}
                <p className="text-sm text-gray-600 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                    <span className="font-bold text-gray-900">{datasets.length}</span> results
                </p>

                {/* Search bar */}
                <div className="flex items-center gap-2 bg-white border border-gray-300 rounded px-4 py-2 mb-6">
                    <Search className="w-4 h-4 text-gray-400 shrink-0" />
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                        style={{ fontFamily: 'Georgia, serif' }}
                    />
                </div>

                <div className="flex gap-8">

                    {/* ── Sidebar Filters ── */}
                    <aside className="w-48 shrink-0">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-sm font-semibold text-gray-800" style={{ fontFamily: 'Georgia, serif' }}>Filters</span>
                        </div>
                        <ul className="space-y-2">
                            {FILTER_CATEGORIES.map(cat => (
                                <li key={cat} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id={cat}
                                        checked={activeFilters.includes(cat)}
                                        onChange={() => toggleFilter(cat)}
                                        className="w-3.5 h-3.5 accent-gray-700"
                                    />
                                    <label
                                        htmlFor={cat}
                                        className="text-xs text-gray-700 cursor-pointer"
                                        style={{ fontFamily: 'Georgia, serif' }}
                                    >
                                        {cat}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </aside>

                    {/* ── 3-Column Card Grid ── */}
                    <section className="flex-1 grid grid-cols-3 gap-4">
                        {datasets.map(ds => (
                            <article
                                key={ds._id}
                                className="bg-white border border-gray-200 rounded p-4 flex flex-col gap-2"
                            >
                                <span className="text-xs text-gray-400">
                                    {new Date(ds.publishedAt).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </span>
                                <h3
                                    className="text-sm font-semibold text-gray-900 leading-snug"
                                    style={{ fontFamily: 'Georgia, serif' }}
                                >
                                    {ds.name}
                                </h3>
                                <p className="text-xs text-gray-500 flex-1" style={{ fontFamily: 'Georgia, serif' }}>
                                    {ds.description}
                                </p>

                                {/* Contributors */}
                                {ds.contributors?.length > 0 && (
                                    <p className="text-xs text-gray-400">
                                        {ds.contributors.map(c => c.name).join(', ')}
                                    </p>
                                )}

                                <div className="flex gap-2 mt-1">
                                    {/* Links */}
                                    {ds.links?.map(link => (
                                        <a href={link.url} key={link.url} className="flex items-center gap-1 border border-gray-300 rounded px-2 py-1 text-xs text-gray-600 hover:bg-gray-50">
                                            <Database className="w-3 h-3" />
                                            {link.title}
                                        </a>
                                    ))}

                                    {/* Files */}
                                    {ds.files?.map((file, i) => (
                                        <a href={file.asset.url} key={i} download className="flex items-center gap-1 border border-gray-300 rounded px-2 py-1 text-xs text-gray-600 hover:bg-gray-50">
                                            <Download className="w-3 h-3" />
                                            CSV
                                        </a>
                                    ))}
                                </div>
                            </article>
                        ))}

                    </section>

                </div>
            </main>
        </div>
    );
};

export default DataPage;
