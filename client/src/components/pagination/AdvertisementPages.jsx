import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Pagination } from 'react-bootstrap';
import { Context } from '../../index';

const AdvertisementPages = observer(() => {
    const { advertisement } = useContext(Context)
    const pageCount = Math.ceil(advertisement.totalCount / advertisement.limit)
    const pages = []

    for (let index = 0; index < pageCount; index++) {
        pages.push(index + 1)
    }
    return (
        <Pagination>
           {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={advertisement.page === page}
                    onClick={() => advertisement.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default AdvertisementPages;