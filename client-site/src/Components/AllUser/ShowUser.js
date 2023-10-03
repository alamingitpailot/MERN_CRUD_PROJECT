
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import EditModal from './Edit/EditModal';
import DeleteModal from './Delete.js/DeleteModal';
import { dateFormat } from '../utils/funtions';
import DataTable from 'react-data-table-component';
import FilterComponent from './FilterComponent';


const ShowUser = () => {
    const [userList, setUserList] = useState([]);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    useEffect(() => {
        axios.get('https://crudproject-eta.vercel.app/api/users').then((res) => {
            setUserList(res?.data);
        });
    }, []);

    useEffect(() => {
        userList.map((user, index) => {
            user.serial = index + 1;
        });
    }, [userList]);

    const columns = [

        {
            name: 'Sl.N',
            selector: row => <div className="text-[15px] font-[400]"> {row.serial}</div>,
        },

        {
            name: 'User Id',
            selector: row => row.id,
            sortable: true,
            cell: (row) => (
                <div className="text-[15px] font-[400]"> {row.id}</div>
            )
        },

        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            cell: (row) => (
                <div className="text-[15px] font-[400]"> {row.name}</div>
            )
        },
        {
            name: 'age',
            selector: row => row.age,
            sortable: true,
            cell: (row) => (
                <div className="text-[15px] font-[400]"> {row.age}</div>
            )
        },
        {
            name: 'created On',
            selector: row => dateFormat(row.createdOn),
            sortable: true,
            cell: (row) => (
                <div className="text-[15px] font-[400]"> {row.name}</div>
            )
        },

        {
            name: "Action",
            cell: (row) => (
                <div className=" p-2 flex align-center">
                    <button className='px-4 py-2 bg-green-500 mr-4 rounded text-white' onClick={() => {
                        setCurrentUser(row);
                        setOpenEditModal(true);
                    }}>Edit</button>
                    <button className='px-4 py-2 bg-red-500 rounded text-white font-[500]' onClick={() => {
                        setCurrentUser(row);
                        setOpenDeleteModal(true);
                    }}>Delete</button> </div>

            )
        }
    ];


    const tableHeaderstyle = {
        headCells: {
            style: {
                fontWeight: "bold",
                fontSize: "16px",
                backgroundColor: "#000",
                color: "#fff"
            },
        },
    }


    const filteredItems = userList.filter(
        item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
    );

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        );
    }, [filterText, resetPaginationToggle]);

    return <div>
        <div className="mt-20 w-5/6 m-auto rounded">
            <DataTable columns={columns} data={filteredItems} customStyles={tableHeaderstyle} pagination
                paginationResetDefaultPage={resetPaginationToggle} subHeader subHeaderComponent={subHeaderComponentMemo} selectableRowspersistTableHead />
        </div>
        {openEditModal && <div className={`ModalMainSection fixed left-0 top-0 w-[100%] h-[100%] bg-black flex items-center justify-center z-[1]`} onClick={(e) => {

            if (e.target.classList.contains('ModalMainSection')) {
                setOpenEditModal(false);
            }
        }}>
            <EditModal setOpenEditModal={setOpenEditModal} userList={userList} setUserList={setUserList} currentUser={currentUser} />
        </div>}

        {openDeleteModal && <div className={`ModalMainSection fixed left-0 top-0 w-[100%] h-[100%] bg-black flex items-center justify-center z-[1] `} onClick={(e) => {

            if (e.target.classList.contains('ModalMainSection')) {
                setOpenDeleteModal(false);
            }
        }} >
            <DeleteModal currentUser={currentUser} setOpenDeleteModal={setOpenDeleteModal} userList={userList} setUserList={setUserList} />
        </div>}
    </div>
}
export default ShowUser;
