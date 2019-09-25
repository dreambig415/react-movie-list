import React from 'react';
import { Pagination } from 'react-bootstrap';

export default function({currentPage, totalCount, onChange}) {
    const pageCount = Math.ceil(totalCount / 10) || 1;
    const onPageChange = (pageNum) => () => {
        onChange(pageNum)
    }

    const onPrev = () => {
        onPageChange(currentPage - 1)();
    }

    const onNext = () => {
        onPageChange(currentPage + 1)();
    }

    return (
        <Pagination>
            <Pagination.First />
            <Pagination.Prev disabled={currentPage === 1} onClick={onPrev} />
            {
                Array(pageCount).fill().map((item, index) => {
                    const pageNum = index + 1;
                    return (
                        <Pagination.Item
                            key={`page_${pageNum}`}
                            active={pageNum === currentPage}
                            onClick={onPageChange(pageNum)}
                        >
                            {pageNum}
                        </Pagination.Item>
                    )
                })
            }  
            <Pagination.Next disabled={currentPage === pageCount} onClick={onNext} />
            <Pagination.Last />
        </Pagination>  
    )
}