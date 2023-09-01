

const InputField = ({ createUser, setCreateUser, error }) => {
    return <>
        <div>
            <input type="text" id='name' className='w-full border border-slid border-lightgrey border-b-[2px] rounded px-[16px] py-[8px] mt-1 focus:outline-none focus:border-[#9b9393] text-lightgrey' placeholder='input your name' onChange={(e) => setCreateUser({ ...createUser, name: e.target.value })} />
            {!createUser.name && <span className='text-red'>{error}</span>}

        </div>
        <div className='mt-[15px]'>
            <input type="text" id='age' className='w-full border border-slid border-lightgrey border-b-[2px] rounded px-[16px] py-[8px] mt-1 focus:outline-none focus:border-[#9b9393]' placeholder='input your age' onChange={(e) => setCreateUser({ ...createUser, age: e.target.value })} />
            {(!createUser.age || isNaN(createUser.age)) && <span className='text-red'>{error}</span>}
        </div>
    </>
}
export default InputField;