import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { loddingStart, signinSuccess, signinFailed } from '../redux/admin/adminSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SingIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading } = useSelector((state) => state.user)




    //======handling form submting function =====//
    const onSubmit = async (formData) => {
        dispatch(loddingStart())
        try {
            const res = await fetch('http://localhost:4000/ecommerce/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const userData = await res.json();

            //===checking reqest success or not ===//
            if (userData.success === false) {
                dispatch(signinFailed(userData.message))

                //===showing error in tostify====//
                toast.error(userData.message, {
                    autoClose: 2000,
                })
            }
            else {
                dispatch(signinSuccess(userData))
                navigate('/admin')
            }
        }
        catch (error) {
            dispatch(signinFailed(error.message))
            toast.error(userData.message, {
                autoClose: 2000,
            })
        }
    };





    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
            >
                <input {...register("email", { required: true })} type="email" placeholder="Email" className="form_input mt-5 bg-customC" />
                {errors.email && <span className='text-black font-semibold text-sm mb-2 mt-1'>Ce champ est obligatoire.</span>}


                <input {...register("userPassword", { required: true })} type="password" placeholder="Password" className="form_input mt-5 bg-customC" />
                {errors.password && <span className='text-black font-semibold text-sm mb-2 mt-1'>Ce champ est obligatoire.</span>}


                <button
                    type='submit'
                    disabled={loading}
                    className="btn bg-customC text-black mt-5 rounded-md w-full hover:bg-customC/30">
                    {
                        loading ? 'Loading...' : 'Login'
                    }
                </button>
            </form>
            <ToastContainer limit={0} />
        </>
    )
}

export default SingIn