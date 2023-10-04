

const InputField = ({ createUser, setCreateUser, error }) => {
    return <>
        <div>
            <input type="text" id='name' className='w-full border border-slid border-lightgrey border-b-[2px] rounded px-[16px] py-[8px] mt-1 focus:outline-none focus:border-[#9b9393] text-lightgrey' placeholder='Input your name' onChange={(e) => setCreateUser({ ...createUser, name: e.target.value })} />
        </div>
        <div className='mt-[15px]'>
            <input type="text" id='age' className='w-full border border-slid border-lightgrey border-b-[2px] rounded px-[16px] py-[8px] mt-1 focus:outline-none focus:border-[#9b9393]' placeholder='Input your age' onChange={(e) => setCreateUser({ ...createUser, age: e.target.value })} />

        </div>
    </>
}
export default InputField;