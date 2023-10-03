

import axios from 'axios';
import { useState } from 'react';
import { loadingIcon } from '../../utils/icons';

const EditModal = ({ setOpenEditModal, userList, currentUser, setUserList }) => {

    const [updateUser, setUpdateUser] = useState({
        name: currentUser?.name,
        age: currentUser?.age
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const onSubmitForm = (e) => {
        e.preventDefault();

        if (!updateUser?.name) {
            setError("Name field is required");
            return false;
        }
        if (!updateUser?.age) {
            setError("Age field is required");
            return false;
        }
        if (isNaN(updateUser?.age)) {
            setError("Age must be a number");
            return false;
        }
        setLoading(true);
        axios.patch(`https://crudproject-eta.vercel.app/api/users/${currentUser.id}`, { name: updateUser?.name, age: updateUser?.age }).then((res) => {
            setLoading(false);
            setOpenEditModal(false);
            setUserList(userList.map(user => user.id === currentUser.id ? { ...currentUser, name: updateUser.name, age: updateUser.age } : user))
        })
            .catch(function (error) {
                setLoading(false);
                setOpenEditModal(false);
            });
    }

    // useEffect()

    return <div className='w-[25%] m-auto p-12 bg-white  rounded'>
        <div className="flex justify-between">
            <h1 className='text-2xl font-bold text-black mb-[20px] text-center'> Update User</h1>
            <svg onClick={() => setOpenEditModal(false)} width="20px" height="20px" viewBox="0 0 48 48" fill="none">
                <rect width="48" height="48" fill="white" fillOpacity="0.01" />
                <path d="M8 8L40 40" stroke="#000000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 40L40 8" stroke="#000000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
        <form className='w-full' onSubmit={onSubmitForm} >
            <div>
                <input type="text" id='name' className='w-full border border-slid border-lightgrey border-b-[2px] rounded px-[16px] py-[8px] mt-1 focus:outline-none focus:border-[#9b9393] text-lightgrey' value={updateUser?.name} placeholder='input your name' onChange={(e) => setUpdateUser({ ...updateUser, name: e.target.value })} />
                {!updateUser?.name && <span className='text-red'>{error}</span>}
            </div>
            <div className='mt-[15px]'>
                <input type="text" id='age' className='w-full border border-slid border-lightgrey border-b-[2px] rounded px-[16px] py-[8px] mt-1 focus:outline-none focus:border-[#9b9393]' placeholder='input your age' value={updateUser?.age} onChange={(e) => setUpdateUser({ ...updateUser, age: e.target.value })} />
                {(!updateUser?.age || isNaN(updateUser?.age)) && <span className='text-red'>{error}</span>}
            </div>

            <div className='flex items-center '>
                <button className={`mt-[20px] w-[100%] bg-black py-[8px] px-[16px] border border-solid border-white rounded text-white ${loading && "bg-slate-400"} disabled=${loading}`} type='submit'>Update</button>
            </div>

            {loadingIcon(loading)}
        </form>
    </div>
}
export default EditModal;