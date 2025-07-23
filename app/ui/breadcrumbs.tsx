'use client'

import { usePathname } from 'next/navigation'

export default function Breadcrumbs() {
  const paths = usePathname()
  const pathNames = paths.split('/').filter( path => path )

  return (
    <nav className="flex mb-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <a href="/dashboard" className="text-gray-700 hover:text-gray-900 inline-flex items-center">
            Home
          </a>
        </li>
        {
          pathNames.map( (link, index) => {
            return (
              <li key={index}>
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L11.586 9 7.293 4.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <a href={`/${link}`} className="ml-1 text-gray-700 hover:text-gray-900 md:ml-2">{link.charAt(0).toUpperCase() + link.slice(1)}</a>
                </div>
              </li>
            )
          })
        }
      </ol>
    </nav>
  );
};