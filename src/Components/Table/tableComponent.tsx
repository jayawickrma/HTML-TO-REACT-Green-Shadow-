import {useState} from "react";
import { Table as AntTable } from 'antd';
import type { TableColumnsType } from 'antd';

interface TableProps<T> {
    columns: TableColumnsType<T>;
    dataSource: T[];
}

const Table = <T extends object>({ columns, dataSource }: TableProps<T>) => {
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;


    const currentPageData = dataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <AntTable<T>
            bordered
            columns={columns}
            dataSource={currentPageData}
            pagination={{
                pageSize,
                current: currentPage,
                total: dataSource.length,
                onChange: handlePageChange,
                showSizeChanger: false,
                style: { display: 'flex', justifyContent: 'center', alignItems: 'center' },
            }}
            key={currentPage}
            scroll={{ x: 'max-content' }}
        />
    );
};

export default Table;
