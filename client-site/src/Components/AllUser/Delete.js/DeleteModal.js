import axios from 'axios';
import { loadingIcon } from '../../utils/icons';
import { useState } from 'react';

const DeleteModal = ({ setOpenDeleteModal, userList, setUserList, currentUser }) => {
    const [loading, setLoading] = useState(false);

    const onClickDelete = () => {
        setLoading(true);
        axios.delete(`http://localhost:4000/api/users/${currentUser?.id}`).then((res) => {
            setLoading(false);
            setOpenDeleteModal(false);
            setUserList(userList.filter(user => user.id !== currentUser.id));
        })
            .catch(function (error) {
                console.log(error);
                setLoading(false);
                setOpenDeleteModal(false);
            });
    }

    return <div className='bg-white rounded'>
        <div className="flex justify-end mt-[10px] mr-[10px]">
            <svg onClick={() => setOpenDeleteModal(false)} width="20px" height="20px" viewBox="0 0 48 48" fill="none">
                <rect width="48" height="48" fill="white" fillOpacity="0.01" />
                <path d="M8 8L40 40" stroke="#000000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 40L40 8" stroke="#000000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
        <div className=' p-12 rounded'>
            <div className='p-[5px] w-[50px] h-[50px] m-auto border border-solid border-black rounded-[50%] flex items-center justify-center'>
                <svg className='' width="20px" height="20px" viewBox="0 0 48 48" fill="none">
                    <rect width="48" height="48" fill="white" fillOpacity="0.01" />
                    <path d="M8 8L40 40" stroke="#000000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 40L40 8" stroke="#000000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            <h1 className='text-black text-[22px] text-center mt-[10px]'>Are you sure</h1>
            <p> Are you sure you want to delete item Id</p>
            <div className="mt-[20px] flex items-center justify-center gap-[10px]">
                <button className='bg-black text-white py-[6px] px-[14px] rounded-[2px]' onClick={() => setOpenDeleteModal(false)}>Cancel</button>
                <button onClick={() => onClickDelete()} className={`bg-red-600 text-white py-[6px] px-[14px] rounded-[2px] ${loading && "bg-slate-400"}`}>Delete</button>
                {loadingIcon(loading)}
            </div>
        </div>
    </div>
}
export default DeleteModal;