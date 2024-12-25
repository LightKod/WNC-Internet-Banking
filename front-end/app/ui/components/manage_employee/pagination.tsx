'use client'

import {
    ChevronLeftIcon,
    ChevronRightIcon
} from '@heroicons/react/16/solid';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Pagination({ totalPages }: { totalPages: any }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    return (
        <div className="flex justify-end items-center">
            <PaginationArrow direction="previous" href={createPageURL(currentPage - 1)} isDisabled={currentPage <= 1}/>
            <div className="flex h-10 w-16 justify-center items-center bg-white border border-x-0 border-slate-300">
                <span className="text-gray-950 text-sm">{`${currentPage} / ${totalPages}`}</span>
            </div>
            <PaginationArrow direction="next" href={createPageURL(currentPage + 1)} isDisabled={currentPage >= totalPages}/>
        </div>
    )
}

function PaginationArrow({
    href,
    direction,
    isDisabled
}: {
    href: string,
    direction: 'next' | 'previous',
    isDisabled?: boolean
}) {
    const className = clsx(
        "flex justify-center items-center h-10 w-10 text-white transition-colors duration-300",
        {
            'bg-slate-300 pointer-events-none': isDisabled,
            'bg-blue-600 hover:bg-blue-700': !isDisabled,
            "rounded-s-md": direction === 'previous',
            "rounded-e-md": direction === 'next'
        }
    )

    const icon = direction === 'previous' ? (
        <ChevronLeftIcon className="w-4"/>
    ) : (
        <ChevronRightIcon className="w-4"/>
    )

    return isDisabled ? (
        <div className={className}>
            {icon}
        </div>
    ) : (
        <Link className={className} href={href}>
            {icon}
        </Link>
    )
}