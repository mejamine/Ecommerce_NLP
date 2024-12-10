import  { useEffect, useState } from 'react'
import SingIn from '../components/SingIn'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';




const Login = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    const { currentAdmin } = useSelector(state => state.admin)
    const [isNewUser, setIsNewUser] = useState(true)
    const [isFormSubmit, setIsformSubmit] = useState(false);
    const [responseData, setResponseData] = useState();
    const navigate = useNavigate()

    //======handlign Notification for user =====//
    const handleTostify = async () => {
        await responseData.success && setIsNewUser(!isNewUser)
        toast(responseData.message, {
            autoClose: 2000,
        })
    }
    useEffect(() => {
        isFormSubmit && handleTostify();
        setIsformSubmit(false)
    }, [responseData])

    useEffect(() => {
        if (currentAdmin && currentAdmin.email) {
            navigate("/admin")
        }
    }, [])



    return (
        <>
            <div className='h-32 w-full bg-transparent'></div>

            {
                currentAdmin && currentAdmin.email
                    ?
                    <section className='form-section'>
                        <div className="container">
                            <p className='text-base md:text-xl text-center text-black font-heading font-bold '>User existe! Redirection au page admin</p>
                        </div>
                    </section>
                    :
                    <section className='form-section py-10 md:py-20 '>
                        <div className="container ">
                            <div className="form-container px-4 sm:px-8 bg-white py-6 pb-8 sm:py-9 sm:pb-12 max-w-lg mx-auto rounded-sm border-[1px] border-black shadow-brand shadow-black/40">
                                <h1 className='text-left text--red-500 mb-3 font-medium font-heading text-md sm:text-xl'>
                                    Login
                                </h1>
                                
                                        <SingIn />

                                <ToastContainer limit={0} />
                            </div>
                        </div>
                    </section>
            }
            <>
                <Footer />
            </>
        </>
    )
}

export default Login