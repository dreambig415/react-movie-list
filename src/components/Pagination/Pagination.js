import React, { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';

export default function({currentPage, totalCount, onChange}) {
    const WINDOW_SIZE = 6;
    const [pageWindow, setPageWindow] = useState({start: 1, end:WINDOW_SIZE });
    const pageCount = Math.ceil(totalCount / 10) || 1;

    useEffect(() => {
        if (pageCount > WINDOW_SIZE) {
            setPageWindow({start: currentPage, end: currentPage + WINDOW_SIZE});
        }
    }, []);

    const onPageChange = (pageNum) => () => {
        onChange(pageNum);
    }

    const onPrev = () => {
        if ((currentPage - 1) < pageWindow.start) {
            setPageWindow(prev => { return {start: prev.start - 1, end: prev.end - 1} });
        } 
        onPageChange(currentPage - 1)();
    }

    const onNext = () => {
        if ((currentPage + 1) > pageWindow.end) {
            setPageWindow(prev => { return {start: prev.start + 1, end: prev.end + 1} });
        } 
        onPageChange(currentPage + 1)();
    }

    const onFrist = () => {
        setPageWindow(prev => { return {start: 1, end: WINDOW_SIZE}})
        onPageChange(1)();
    }

    const onLast = () => {
        setPageWindow(prev => { return {start: pageCount - WINDOW_SIZE + 1, end: pageCount} });
        onPageChange(pageCount)();
    }

    return (
        <Pagination className="justify-content-md-center">
            <Pagination.First disabled={currentPage === 1} onClick={onFrist} />
            <Pagination.Prev disabled={currentPage === 1} onClick={onPrev} />
            {
                pageWindow.start === 1 || pageCount < WINDOW_SIZE ? (
                    null
                ) : <Pagination.Ellipsis />
            }
            {
                Array(pageCount < WINDOW_SIZE ? pageCount : WINDOW_SIZE).fill().map((item, index) => {
                    const pageNum = pageWindow.start + index;
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
            {
                pageWindow.end === pageCount || pageCount < WINDOW_SIZE ? (
                    null
                ) : <Pagination.Ellipsis />
            } 
            <Pagination.Next disabled={currentPage === pageCount} onClick={onNext} />
            <Pagination.Last disabled={currentPage === pageCount} onClick={onLast}/>
        </Pagination>  
    )
}