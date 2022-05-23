import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Pagination } from 'react-bootstrap';
import { Context } from '../../index';

const SummaryPages = observer(() => {
    const { summary } = useContext(Context)
    const pageCount = Math.ceil(summary.totalCount / summary.limit)
    const pages = []

    for (let index = 0; index < pageCount; index++) {
        pages.push(index + 1)
    }
    
    return (
        <Pagination>
           {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={summary.page === page}
                    onClick={() => summary.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default SummaryPages;