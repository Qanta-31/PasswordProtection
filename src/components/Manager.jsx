import React, { useEffect } from 'react';
import { useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, []);

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "bottom-right",
            autoClose: 2000, // Set the autoClose duration here
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text);
    };

    const showPassword = () => {
        if (passwordRef.current.type === "password") {
            passwordRef.current.type = "text";
            ref.current.src = "/hidden.png";
        } else {
            passwordRef.current.type = "password";
            ref.current.src = "/eye.png";
        }
    };

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            const newPassword = { ...form, id: uuidv4() };
            const newPasswordArray = [...passwordArray, newPassword];
            setPasswordArray(newPasswordArray);
            localStorage.setItem("passwords", JSON.stringify(newPasswordArray));
            setForm({ site: "", username: "", password: "" });
        }
        else {
            toast('Error: Password not saved', {
                position: "bottom-right",
                autoClose: 2000, // Set the autoClose duration here
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    const deletePassword = (id) => {
        // if (confirm("Do you really want to delete this password?")) {
            const updatedPasswordArray = passwordArray.filter(item => item.id !== id);
            setPasswordArray(updatedPasswordArray);
            localStorage.setItem("passwords", JSON.stringify(updatedPasswordArray));
        // }
    };

    const editPassword = (id) => {
        const passwordToEdit = passwordArray.find(i => i.id === id);
        setForm(passwordToEdit);
        deletePassword(id);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            <div className="absolute inset-0 -z-10 h-full w-full ">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
            </div>

            <div className="p-3  md:mycontainer">
                <h1 className='text-4xl text font-bold text-center'>
                    <span className="text-green-500">&lt;</span>
                    Pass
                    <span className="text-green-500">OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center text font-bold'>Your own password manager</p>

                <div className='flex flex-col text-black p-4 gap-8 items-center'>
                    <input value={form.site} onChange={handleChange} placeholder='Website URL' className='rounded-full border border-green-500 w-full text-black p-4 py-1' type="text" name="site" autoComplete="off" id='site' />
                    <div className='flex flex-col md:flex-row w-full justify-between gap-8'>
                        <input value={form.username} onChange={handleChange} placeholder='Username' className='rounded-full border border-green-500 w-full text-black p-4 py-1' type="text" name="username" autoComplete="off" id='username' />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Password' className='rounded-full border border-green-500 w-full text-black ps-3 pe-1 py-1' type="password" name="password" autoComplete="new-password" id='password' />
                            <span className='absolute right-[1px] top-[4px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={26} src="/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex gap-2 justify-center items-center bg-green-400 rounded-full p-2 px-6 w-fit hover:bg-green-300 hover:border-2 border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length !== 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-8">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item) => (
                                <tr key={item.id}>
                                    <td className='py-2 border border-white text-center '>
                                        <div className='flex items-center justify-center'>
                                            <a href={item.site} target='_blank' rel='noopener noreferrer'>{item.site}</a>
                                            <div className='lordiconcopy cursor-pointer' onClick={() => copyText(item.site)}>
                                                <img style={{ width: "20px", height: "20px", paddingTop: "3px", paddingLeft: "4px" }} src="/copyblack.png" alt="" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center '>
                                        <div className='flex items-center justify-center'>
                                            <span>{item.username}</span>
                                            <div className='lordiconcopy cursor-pointer' onClick={() => copyText(item.username)}>
                                                <img style={{ width: "20px", height: "20px", paddingTop: "3px", paddingLeft: "4px" }} src="/copyblack.png" alt="" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center '>
                                        <div className='flex items-center justify-center'>
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <div className='lordiconcopy cursor-pointer' onClick={() => copyText(item.password)}>
                                                <img style={{ width: "20px", height: "20px", paddingTop: "3px", paddingLeft: "4px" }} src="/copyblack.png" alt="" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='flex items-center justify-center py-2 border border-white text-center '>
                                        <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                            <img src="/edit.png" alt="edit" style={{ width: "22px", height: "22px" }} />
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ width: "25px", height: "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    );
};

export default Manager;
