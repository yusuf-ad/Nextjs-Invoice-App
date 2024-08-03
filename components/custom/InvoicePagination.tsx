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

type InvoicePaginationProps = {
  totalPages: number;
};

function InvoicePagination({ totalPages }: InvoicePaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const currentPage = parseInt(params.get("page") || "1");

  function handlePageChange(page: number) {
    params.set("page", page.toString());

    router.push(`${pathname}?${params.toString()}`);
  }

  function handlePrevious() {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  }

  function handleNext() {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className="cursor-pointer" onClick={handlePrevious}>
          <PaginationPrevious isActive={currentPage > 1} />
        </PaginationItem>
        {Array.from({ length: totalPages }).map((_, index) => (
          <PaginationItem
            className="cursor-pointer"
            onClick={handlePageChange.bind("this", index + 1)}
            key={index}
          >
            <PaginationLink isActive={currentPage === index + 1}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {totalPages > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem className="cursor-pointer" onClick={handleNext}>
          <PaginationNext isActive={currentPage < totalPages} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default InvoicePagination;
