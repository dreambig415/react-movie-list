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

    const onFrist = () => {
        onPageChange(1)();
    }

    const onLast = () => {
        onPageChange(pageCount)();
    }

    return (
        <Pagination className="justify-content-md-center">
            <Pagination.First disabled={currentPage === 1} onClick={onFrist} />
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
            <Pagination.Last disabled={currentPage === pageCount} onClick={onLast}/>
        </Pagination>  
    )
}