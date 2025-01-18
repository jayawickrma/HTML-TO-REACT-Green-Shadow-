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

    // Calculate data for the current page
    const currentPageData = dataSource.slice((currentPage - 1) * pageSize, currentPage * pageSize);
rea
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <AntTable<T>
            bordered
            columns={columns}
            dataSource={currentPageData}
            pagination={{
                pageSize, // Limit to 5 rows per page
                current: currentPage,
                total: dataSource.length, // Total rows in data
                onChange: handlePageChange, // Page change handler
                showSizeChanger: false, // Disable page size changer
                style: { display: 'flex', justifyContent: 'center', alignItems: 'center' }, // Center the pagination
            }}
            key={currentPage} // Refresh table content when the page changes
            scroll={{ x: 'max-content' }} // Enable horizontal scroll if table width exceeds
        />
    );
};

export default Table;
