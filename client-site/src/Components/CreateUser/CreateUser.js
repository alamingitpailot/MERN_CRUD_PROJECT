
import { useEffect, useState } from 'react';
import axios from 'axios';
import InputField from './Element/InputField';
import SubmitBtn from './Element/SubmitBtn';

const CreateUser = () => {

    const [createUser, setCreateUser] = useState({ name: '', age: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (success) {
            window.location.href = '/';
        }
    }, [success])

    const formSubmit = (e) => {
        e.preventDefault();

        if (!createUser?.name) {
            setError("Name field is required");
            return false;
        }
        if (!createUser?.age) {
            setError("Age field is required");
            return false;
        }
        if (isNaN(createUser?.age)) {
            setError("Age must be a number");
            return false;
        }

        setLoading(true);
        axios.post('https://crudproject-eta.vercel.app/api/users', { name: createUser?.name, age: createUser?.age }).then((res) => {
            setLoading(false);
            setSuccess(true);
        })
            .catch(function (error) {
                setLoading(false);
                setSuccess(false);
            });
    }

    return <div className='pt-[150px]'>
        <div className='w-[25%] m-auto p-12 bg-white rounded'>
            <h1 className='text-2xl font-bold text-black mb-[20px] text-center'>Register User</h1>
            <form className='w-full' onSubmit={formSubmit}>
                <InputField createUser={createUser} setCreateUser={setCreateUser} error={error} />
                <SubmitBtn loading={loading} />
                {!createUser.name ? <span className='text-red'>{error}</span> : (!createUser.age || isNaN(createUser.age)) && <span className='text-red'>{error}</span>}
            </form>
        </div>
    </div>
}
export default CreateUser;