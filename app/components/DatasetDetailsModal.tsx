'use client';

import React from 'react';
import { ExternalLink, X } from 'lucide-react';

type DatasetDetailsModalProps = {
    dataset: {
        name: string;
        description: string;
        date: string;
        tags: string[];
        files: { asset: { originalFilename: string; url: string } }[];
        links: { text: string; url: string }[];
    } | null;
    onClose: () => void;
};

const DatasetDetailsModal = ({ dataset, onClose }: DatasetDetailsModalProps) => {
    const pointerDownOnBackdrop = React.useRef(false);

    // Prevent background scrolling when modal is open
    React.useEffect(() => {
        if (!dataset) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = previousOverflow; };
    }, [dataset]);

    if (!dataset) return null;
    const { name, description, date } = dataset;
    const displayName = name.trim() ? name.trim() : 'Dataset';
    const displayDescription = description.trim() ? description.trim() : '\u00A0'; // non-breaking space
    const displayDate = date || '\u00A0';

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Details"
            // close modal only if mouse is pressed and released on the background
            onMouseDown={e => {
                pointerDownOnBackdrop.current = e.target === e.currentTarget;
            }}
            onClick={e => {
                if (e.target === e.currentTarget && pointerDownOnBackdrop.current) {
                    onClose();
                }
                pointerDownOnBackdrop.current = false;
            }}
        >
            <div
                className="relative min-h-[50vh] w-full max-w-4xl rounded border border-gray-300 bg-white shadow-xl"
                onClick={e => e.stopPropagation()}
            >
                {/* close button */}
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close modal"
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-transparent text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
                <div className="px-10 pt-5 pb-3">
                    <h2 className="text-lg font-semibold text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
                        {displayName}
                    </h2>
                    <h4 className={`text-md font-medium text-gray-500 ${dataset.date ? '' : 'invisible'}`} style={{ fontFamily: 'Georgia, serif' }}>
                        {displayDate}
                    </h4>
                    <p className="mt-2 text-gray-800" style={{ fontFamily: 'Georgia, serif' }}>
                        {displayDescription}
                    </p>
                </div>
                <div className="max-h-[70vh] overflow-y-auto px-10 py-4">
                    <div className="space-y-2">
                        {/* files and links */}
                        {Object.entries({ Tags: dataset.tags, Files: dataset.files, Links: dataset.links }).map(([field, value]) => (
                            <div key={field.toLowerCase()} className="grid grid-cols-1 gap-1 py-2 text-sm sm:grid-cols-[150px_1fr] sm:gap-3">
                                <div className="font-semibold text-gray-800" style={{ fontFamily: 'Georgia, serif' }}>
                                    {field}
                                </div>
                                <div className="min-w-0 text-gray-700" style={{ fontFamily: 'Georgia, serif' }}>
                                    {field === 'Tags'
                                        ? (value as typeof dataset.tags)?.join(', ') || 'None'
                                        : field === 'Files'
                                        ? renderList((value as typeof dataset.files)?.map(file => ({
                                            text: file.asset.originalFilename || file.asset.url.split('/').pop()!,
                                            url: file.asset.url,
                                            download: true,
                                        })))
                                        : renderList((value as typeof dataset.links)?.map(link => ({
                                            text: link.text?.trim() || link.url,
                                            url: link.url,
                                            link: true,
                                        })))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const downloadFile = async (url: string, filename: string) => {
    const blob = await fetch(url).then(r => r.blob());
    const a = Object.assign(document.createElement('a'), {
        href: URL.createObjectURL(blob),
        download: filename,
    });
    a.click();
    URL.revokeObjectURL(a.href);
};

const renderList = (
    items: {
        text: string;
        url: string;
        download?: boolean;
        link?: boolean
    }[]
) => {
    if (!items || items.length === 0) return 'N/A';

    const renderItem = (item: typeof items[number]) => {
        if (item.link) {
            return (
                <a href={item.url} target="_blank" rel="noreferrer" className="inline text-gray-700 transition-colors hover:text-gray-500">
                    <span className="inline-flex items-center gap-1 border-b border-current pb-0">
                        <span>{item.text}</span>
                        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                </a>
            );
        }
        return (
            <div className="flex items-center justify-between gap-3">
                <span className="min-w-0 flex-1 text-left wrap-break-word">{item.text}</span>
                {item.download && (
                    <button
                        className="shrink-0 cursor-pointer rounded border border-gray-300 px-2 py-1 text-xs text-gray-700 hover:bg-gray-50"
                        onClick={() => downloadFile(item.url, item.text)}
                    >
                        Download
                    </button>
                )}
            </div>
        );
    }

    if (items.length === 1) return renderItem(items[0]);
    return (
        <ul className="list-disc space-y-2 pl-5">
            {items.map(item => (
                <li key={`${item.text}-${item.url}`} className="list-item marker:text-gray-500">
                    {renderItem(item)}
                </li>
            ))}
        </ul>
    );
};

export default DatasetDetailsModal;
