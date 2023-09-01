

import { useEffect, useState } from 'react';
import axios from 'axios';

import EditModal from './Edit/EditModal';
import DeleteModal from './Delete.js/DeleteModal';
import { dateFormat } from '../utils/funtions';


const ShowUser = () => {
    const [userList, setUserList] = useState([]);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:4000/api/users').then((res) => {
            setUserList(res?.data);
        });
    }, []);


    return <div>
        <table className="mt-20 w-5/6 m-auto border-collapse border border-slate-400 text-left rounded">
            <thead>
                <tr className='bg-current'>
                    <th className="border border-slate-300 p-2 text-white">S Number</th>
                    <th className="border border-slate-300 p-2 text-white">User Id</th>
                    <th className="border border-slate-300 p-2 text-white">User Name</th>
                    <th className="border border-slate-300 p-2 text-white">User Age</th>
                    <th className="border border-slate-300 p-2 text-white">Created On</th>
                    <th className="border border-slate-300 p-2 text-white">Action</th>
                </tr>
            </thead>
            <tbody>

                {userList?.map((user, index) => {

                    return <tr key={index}>
                        <td className="border border-slate-300 p-2">{index + 1}</td>
                        <td className="border border-slate-300 p-2">{user?.id}</td>
                        <td className="border border-slate-300 p-2">{user?.name}</td>
                        <td className="border border-slate-300 p-2">{user?.age}</td>
                        <td className="border border-slate-300 p-2">{dateFormat(user?.createdOn)}</td>
                        <td className="border border-slate-300 p-2 flex align-center">

                            <button className='px-4 py-2 bg-green-500 mr-4 rounded text-white' onClick={() => {
                                setCurrentUser(user);
                                setOpenEditModal(true);
                            }}>Edit</button>

                            <button className='px-4 py-2 bg-red-500 rounded text-white' onClick={() => {
                                setCurrentUser(user);
                                setOpenDeleteModal(true);
                            }}>Delete</button>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
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