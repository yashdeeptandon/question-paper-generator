import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../ui/pagination";
import styles from "./dynamic-table.module.css";
import { Skeleton } from "../../ui/skeleton";

interface DynamicTableProperties<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  loading?: boolean;
  onRowClick?: (rowData: TData) => void;
  enableSorting?: boolean;
  enablePagination?: boolean;
}

function DynamicTable<TData>({
  data,
  columns,
  loading = false,
  onRowClick,
  enableSorting = false,
  enablePagination = false,
}: DynamicTableProperties<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable<TData>({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    ...(enableSorting && { getSortedRowModel: getSortedRowModel() }),
    ...(enablePagination && { getPaginationRowModel: getPaginationRowModel() }),
  });

  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex;

  // Generate an array of page numbers for pagination
  const pageNumbers = React.useMemo(() => {
    const totalPageCount = pageCount;
    const pages = [];

    // You can adjust the range of pages displayed here
    const maxPageNumbers = 5;
    let startPage = Math.max(currentPage - Math.floor(maxPageNumbers / 2), 0);
    let endPage = startPage + maxPageNumbers - 1;

    if (endPage >= totalPageCount) {
      endPage = totalPageCount - 1;
      startPage = Math.max(endPage - maxPageNumbers + 1, 0);
    }

    for (let index = startPage; index <= endPage; index++) {
      pages.push(index);
    }

    return pages;
  }, [currentPage, pageCount]);

  return (
    <div className="flex size-full flex-col font-primary-text">
      <div className="overflow-auto">
        <Table className="border-striped border">
          <TableHeader className="sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="p-3">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              // Render loading state
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  onClick={() => onRowClick && onRowClick(row.original)}
                  className="cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              // Render no data state
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {enablePagination && (
        <div className="w-full py-4">
          <Pagination className="flex justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={table.getCanPreviousPage() ? "#" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    if (table.getCanPreviousPage()) {
                      table.previousPage();
                    }
                  }}
                  className={
                    table.getCanPreviousPage()
                      ? ""
                      : `${styles.pagination_disabled}`
                  }
                  aria-disabled={!table.getCanPreviousPage()}
                />
              </PaginationItem>

              {/* First Page Link and Ellipsis */}
              {pageNumbers[0] > 0 && (
                <>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        table.setPageIndex(0);
                      }}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  {pageNumbers[0] > 1 && <PaginationEllipsis />}
                </>
              )}

              {/* Page Number Links */}
              {pageNumbers.map((pageNumber) => (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    isActive={pageNumber === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      table.setPageIndex(pageNumber);
                    }}
                  >
                    {pageNumber + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {/* Last Page Link and Ellipsis */}
              {(() => {
                const lastPageNumber = pageNumbers.at(-1);
                if (
                  lastPageNumber !== undefined &&
                  lastPageNumber < pageCount - 1
                ) {
                  return (
                    <>
                      {lastPageNumber < pageCount - 2 && <PaginationEllipsis />}
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            table.setPageIndex(pageCount - 1);
                          }}
                        >
                          {pageCount}
                        </PaginationLink>
                      </PaginationItem>
                    </>
                  );
                }
                return null;
              })()}

              <PaginationItem>
                <PaginationNext
                  href={table.getCanNextPage() ? "#" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    if (table.getCanNextPage()) {
                      table.nextPage();
                    }
                  }}
                  className={
                    table.getCanNextPage()
                      ? ""
                      : `${styles.pagination_disabled}`
                  }
                  aria-disabled={!table.getCanNextPage()}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}

export default DynamicTable;
