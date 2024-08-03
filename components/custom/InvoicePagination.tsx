"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

type InvoicePaginationProps = {
  totalPages: number;
};

function InvoicePagination({ totalPages }: InvoicePaginationProps) {
  const [pages, setPages] = useState(1);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams],
  );

  const currentPage = parseInt(params.get("page") || "1");

  function handlePageChange(page: number) {
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  }

  function handlePrevious() {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setPages(Math.max(1, newPage - 2));
      handlePageChange(newPage);
    }
  }

  function handleNext() {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setPages(Math.max(1, newPage - 2));
      handlePageChange(newPage);
    }
  }

  useEffect(() => {
    if (currentPage > totalPages) {
      toast.error("Invalid page number. Redirecting to the last page.");
      params.set("page", totalPages.toString());
      router.push(`${pathname}?${params.toString()}`);
    }
  }, [currentPage, pathname, router, totalPages, params]);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem
          className="cursor-pointer select-none"
          onClick={handlePrevious}
        >
          <PaginationPrevious isActive={currentPage > 1} />
        </PaginationItem>
        {currentPage > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {Array.from(
          { length: Math.min(3, totalPages) },
          (v, i) => i + pages,
        ).map((page) => (
          <PaginationItem
            className="cursor-pointer"
            onClick={() => handlePageChange(page)}
            key={page}
          >
            <PaginationLink isActive={currentPage === page}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {totalPages > 3 && pages + 2 < totalPages && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem
          className="cursor-pointer select-none"
          onClick={handleNext}
        >
          <PaginationNext isActive={currentPage < totalPages} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default InvoicePagination;
