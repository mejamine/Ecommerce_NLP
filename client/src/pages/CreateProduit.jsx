import  { useState ,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const CreateProduit = () =>{
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);

      const [isOffer, setIsoffer] = useState(false);

    const { currentAdmin } = useSelector(state => state.admin)

    const [imageFile, setImageFile] = useState([]);
    const [uploadError, setUploadError] = useState({
        isError: false,
        message: ''
    });
    const [formSubmitLoading, setFormSubmitLoading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        imgUrl: [],
    })


    const navigate = useNavigate()

    useEffect(()=>{
        document.getElementById("admin").hidden=true;
        if(currentAdmin.role==="admin"){
            document.getElementById("admin").hidden=false;
        }
    },[])

    const { register, handleSubmit, getValues, setError, formState: { errors } } = useForm({
        mode: "onChange"
    });






    const cloud_name="dwc6xwzko";
    const preset_key="first-upload";
    const handleImageUpload = async () => {

        if (imageFile.length > 0 && imageFile.length + formData.imgUrl.length < 13) {
            setLoading(true)
            const promises = [];
            for (let i = 0; i < imageFile.length; i++) {
                const formdata = new FormData();
                formdata.append("file",imageFile[i]);
                formdata.append('upload_preset',preset_key);
                axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,formdata)
                .then(res=>{
                    setFormData({ ...formData, imgUrl: formData.imgUrl.concat(res.data.secure_url) })
                    setLoading(false)
                })
                .catch(err=>{
                    setUploadError({ ...uploadError, isError: true, message: error })
                    setLoading(false)
                })
            }
        }
        else {
            setUploadError({ ...uploadError, isError: true, message: 'Select file first (max:12)' })
            setLoading(false)
        }

    }



    const handleDelete = (index) => {
        setFormData({ ...formData, imgUrl: formData.imgUrl.filter((items) => items != formData.imgUrl[index]) })
    }

    uploadError.isError && toast.error(uploadError.message, {
        autoClose: 2000,
    })


    const handleFormSubmit = async (data) => {
        console.log(data);
        console.log(formData.imgUrl);
        try {
            setFormSubmitLoading(true)
            const res = await fetch('http://localhost:4000/ecommerce/produits/', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    ...data,
                    imgUrl: formData.imgUrl,
                })
            })
            const serverRes = await res.json();
            if (serverRes.success === false) {
                toast.error(serverRes.message, {
                    autoClose: 2000,
                })
                setFormSubmitLoading(false)
            }
            else {
                navigate(`/produit/${serverRes._id}`)
                setFormSubmitLoading(false)
            }

        } catch (error) {
            toast.error(error.message, {
                autoClose: 2000,
            })
            setFormSubmitLoading(false)
        }
    }



    return (
        <main>
            <section id='admin'>
                <div className='h-32 w-full'></div>
                <div className="container py-7 md:py-16 max-w-5xl">
                    <h1 className='text-center text-2xl font-heading font-bold text-black'>Ajouter Un Produit</h1>
                    <div className="mt-8 form_container">
                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <div className='feilds_container grid gap-5 md:gap-10 grid-col-1 md:grid-cols-2 items-start'>

                                {/* ====== Form Sections Start Form Here ===== */}
                                <div className="info_container">
                                    <div className="input_feilds">
                                        <input
                                            id='title'
                                            type="text"
                                            placeholder='titre'
                                            name='title'
                                            className='form_input border-[1px] bg-customC rounded-md placeholder:text-sm text-black'
                                            min={10} max={50}
                                            {...register('title', { required: 'This field is required*' })}
                                        />
                                        {errors.title && <p className='text-red-700 text-xs'>{errors.title.message}</p>}

                                        <textarea
                                            id='description'
                                            type="text"
                                            placeholder='Description'
                                            name='description'
                                            className='form_input border-[1px] bg-customC rounded-md placeholder:text-sm mt-3 text-black'
                                            {...register('description', { required: 'This field is required*' })}
                                        />
                                        {errors.description && <p className='text-red-700 text-xs'>{errors.description.message}</p>}

                                        <input
                                            id='quantite'
                                            type="number"
                                            placeholder='quantité'
                                            name='quantite'
                                            className='form_input border-[1px] bg-customC rounded-md placeholder:text-sm mb-2 text-black'
                                            min={1}
                                            {...register('quantite', {
                                                required: 'This field is required*',
                                                valueAsNumber: true,
                                                validate: value => value > 0 || 'Quantity must be a positive integer'
                                            })}
                                        />
                                        {errors.quantite && <p className='text-red-700 text-xs'>{errors.quantite.message}</p>}

                                        <input
                                            id='prix'
                                            type="number"
                                            placeholder='prix'
                                            name='prix'
                                            className='form_input border-[1px] bg-customC rounded-md placeholder:text-sm mb-2 text-black'
                                            step="0.01"
                                            min={0.01}
                                            {...register('prix', {
                                                required: 'This field is required*',
                                                valueAsNumber: true,
                                                validate: value => value > 0 || 'Price must be a positive number'
                                            })}
                                        />
                                        {errors.prix && <p className='text-red-700 text-xs'>{errors.prix.message}</p>}

                                        <div className='flex flex-column items-center mb-2'>
                                            <input
                                                id='offer'
                                                type="checkbox"
                                                className="checkbox w-5 h-5 border-gray-400 rounded-full checked:bg-customC mr-5 text-black"
                                                {...register('offer')}
                                                onChange={() => setIsoffer(!isOffer)}
                                            />
                                            <span className="label-text font-medium">Avez-vous une offre?</span>
                                        </div>

                                        {isOffer &&
                                            <input
                                                id='discountPrix'
                                                type="number"
                                                name="discountPrix"
                                                placeholder='prix de solde'
                                                className="form_input border-[1px] bg-customC rounded-md placeholder:text-sm mb-2 text-black"
                                                {...register('discountPrix', {
                                                    required: 'This field is required*',
                                                    validate: (value) => {
                                                        const { prix } = getValues();
                                                        if (+prix < +value) {
                                                            return '*Discount price should be lower than regular price';
                                                        }
                                                    }
                                                })}
                                            />
                                        }
                                        {errors.discountPrix && <p className='text-red-700 text-xs'>{errors.discountPrix.message}</p>}

                                        <input
                                            id='type'
                                            type="text"
                                            placeholder='type'
                                            name='type'
                                            className='form_input border-[1px] bg-customC rounded-md placeholder:text-sm text-black'
                                            min={10} max={50}
                                            {...register('type')}
                                        />
                                        {errors.type && <p className='text-red-700 text-xs'>{errors.type.message}</p>}
                                    </div>
                                </div>

                                {/* === Image Uploading Section Start Here === */}
                                <div>
                                    <p className='font-content text-[16px] mb-3 font-normal text-black'>
                                        <span className='font-semibold mr-1'>Note:</span>
                                        La première image sera l'image de couverture (max:12)
                                    </p>
                                    <div className="image_upload_container md:p-5 md:border-2 bg-transparent border-dashed rounded-sm md:flex items-center justify-center gap-2">

                                        <input
                                            onChange={(e) => setImageFile(e.target.files)}
                                            required
                                            multiple
                                            accept='image/*'
                                            type="file"
                                            className={`file-input file:bg-customC/30 bg-customC  ${loading ? "md:w-4/6" : 'md:w-4/5'} w-full`} />
                                        <button
                                            disabled={loading || imageFile.length === 0}
                                            onClick={handleImageUpload}
                                            type='button'
                                            className={`w-full text-black text-sm py-2 border-2 bg-customC border-black rounded-md mt-2 uppercase font-heading ${loading ? "md:w-2/6" : 'md:w-1/5'} md:h-[3rem] md:mt-0 duration-500 hover:shadow-lg disabled:border-gray-500 disabled:text-gray-500`}>
                                            {loading ? 'Uploading...' : 'Upload'}
                                        </button>
                                    </div>
                                    <div>
                                        {
                                            formData.imgUrl.length > 0 && formData.imgUrl.map((imgSrc, index) => {
                                                return (
                                                    <div key={index} className="uploaded_images p-2 pr-5 border-2 mt-4 rounded-md flex items-center justify-between">
                                                        <img src={imgSrc} alt="property Image" className='w-24 h-20 object-cover rounded-md' />
                                                        <button
                                                            onClick={() => handleDelete(index)}
                                                            type='button'
                                                            className='font-medium text-lg text-gray-800 flex items-center underline hover:opacity-75'>Delete</button>
                                                    </div>
                                                )
                                            })
                                        }
                                        <div className="post_btn mt-7">
                                            <button
                                                disabled={formData.imgUrl.length < 1 || loading || formSubmitLoading}
                                                type='submit'
                                                className="w-full bg-black text-xl tracking-wider font-heading rounded-md hover:opacity-90 disabled:opacity-70 duration-300 text-white p-3">
                                                {formSubmitLoading ? 'Creating...' : 'Ajouter Produit'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <ToastContainer />
            </section>
        </main>
    );
};

export default CreateProduit;