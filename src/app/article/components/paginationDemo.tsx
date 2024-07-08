// components/ui/pagination-demo.tsx
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";
  import { useState, useEffect } from 'react';
  
  interface PaginationDemoProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
  }
  
  export function PaginationDemo({ currentPage, totalPages, onPageChange }: PaginationDemoProps) {
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      function handleResize() {
        setIsMobile(window.innerWidth < 768);
      }
  
      window.addEventListener("resize", handleResize);
      handleResize();
  
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    const visiblePages = isMobile ? 3 : 5;
    const startPage = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
    const endPage = Math.min(startPage + visiblePages - 1, totalPages);
  
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
  
    return (
      <Pagination>
        <PaginationContent className="flex justify-center space-x-2">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) {
                  onPageChange(currentPage - 1);
                }
              }}
              className={`${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </PaginationItem>
          {pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page);
                }}
                className={`${
                  page === currentPage ? "font-bold text-blue-600" : ""
                }`}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          {totalPages > visiblePages && endPage < totalPages && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) {
                  onPageChange(currentPage + 1);
                }
              }}
              className={`${
                currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }
  