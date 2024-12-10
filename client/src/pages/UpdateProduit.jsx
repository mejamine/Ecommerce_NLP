import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useState, useEffect } from 'react';
import { firebaseApp } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';


const UpdateProduit = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { currentAdmin } = useSelector(state => state.admin);
    const [isOffer, setIsoffer] = useState(false);
    const [imageFile, setImageFile] = useState([]);
    const [uploadError, setUploadError] = useState({
        isError: false,
        message: ''
    });
    const [formSubmitLoading, setFormSubmitLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ imgUrl: [] });
    const navigate = useNavigate();
    const params = useParams(); // Get the product ID from the URL parameters

    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm({
        mode: "onChange"
    });

    useEffect(() => {
        const getProduitInfo = async () => {
            const res = await fetch(`http://localhost:4000/ecommerce/produits/${params.id}`);
            const data = await res.json();

            if (data.success === false) {
                toast.error(data.message, { autoClose: 2000 });
            } else {
                setFieldValue(data);
                setFormData({ imgUrl: data.imgUrl });
                if (data.offer) setIsoffer(true);
            }
        };
        getProduitInfo();
    }, [params.id]);

    const setFieldValue = (data) => {
        setValue('title', data.title);
        setValue('description', data.description);
        setValue('quantite', data.quantite);
        setValue('prix', data.prix);
        setValue('type', data.type);
        if (data.discountPrix) setValue('discountPrix', data.discountPrix);
        setIsoffer(data.offer);
    };

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
        setFormData({ imgUrl: formData.imgUrl.filter((_, i) => i !== index) });
    };

    uploadError.isError && toast.error(uploadError.message, { autoClose: 2000 });

    const handleFormSubmit = async (data) => {
        try {
            setFormSubmitLoading(true);
            const res = await fetch(`http://localhost:4000/ecommerce/produits/${params.id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    ...data,
                    imgUrl: formData.imgUrl,
                    userRef: currentAdmin._id,
                    offer: isOffer
                })
            });
            const serverRes = await res.json();
            if (serverRes.success === false) {
                toast.error(serverRes.message, { autoClose: 2000 });
            } else {
                navigate(`/produit/${serverRes._id}`);
            }
        } catch (error) {
            toast.error(error.message, { autoClose: 2000 });
        } finally {
            setFormSubmitLoading(false);
        }
    };

    return (
        <main>
            <section id='admin'>
            <div className='w-full h-32 bg-transparent'></div>
            <div className="container py-7 md:py-16 max-w-5xl">
                    <h1 className='text-center text-2xl font-heading font-bold text-black'>
                        Modifier Un Produit
                    </h1>
                    <div className="mt-8 form_container">
                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <div className='fields_container grid gap-5 md:gap-10 grid-col-1 md:grid-cols-2 items-start'>
                                <div className="info_container">
                                    <div className="input_fields">
                                        <input
                                            id='title'
                                            type="text"
                                            placeholder='Titre'
                                            name='title'
                                            className='form_input border-[1px] bg-customC text-black rounded-md placeholder:text-sm'
                                            {...register('title', { required: 'Ce champ est obligatoire*' })}
                                        />
                                        {errors.title && <p className='text-red-700 text-xs'>{errors.title.message}</p>}

                                        <textarea
                                            id='description'
                                            placeholder='Description'
                                            name='description'
                                            className='form_input border-[1px] bg-customC text-black rounded-md placeholder:text-sm mt-3'
                                            {...register('description', { required: 'Ce champ est obligatoire*' })}
                                        />
                                        {errors.description && <p className='text-red-700 text-xs'>{errors.description.message}</p>}

                                        <input
                                            id='quantite'
                                            type="number"
                                            placeholder='Quantité'
                                            name='quantite'
                                            className='form_input border-[1px] bg-customC text-black rounded-md placeholder:text-sm mb-2'
                                            {...register('quantite', { required: 'Ce champ est obligatoire*' })}
                                        />
                                        {errors.quantite && <p className='text-red-700 text-xs'>{errors.quantite.message}</p>}

                                        <input
                                            id='prix'
                                            type="number"
                                            placeholder='Prix'
                                            name='prix'
                                            className='form_input border-[1px] bg-customC text-black rounded-md placeholder:text-sm mb-2'
                                            {...register('prix', { required: 'Ce champ est obligatoire*' })}
                                        />
                                        {errors.prix && <p className='text-red-700 text-xs'>{errors.prix.message}</p>}

                                        <div className='flex flex-column items-center mb-2'>
                                            <input
                                                id='offer'
                                                type="checkbox"
                                                className="checkbox w-5 h-5 border-gray-400 rounded-full checked:bg-customC mr-5"
                                                {...register('offer')}
                                                onChange={() => setIsoffer(!isOffer)}
                                            />
                                            <span className="label-text font-medium">Avez-vous une offre?</span>
                                        </div>

                                        {isOffer && (
                                            <input
                                                id='discountPrix'
                                                type="number"
                                                placeholder='Prix de solde'
                                                className="form_input border-[1px] bg-customC text-black rounded-md placeholder:text-sm mb-2"
                                                {...register('discountPrix', {
                                                    required: 'Ce champ est obligatoire*',
                                                    validate: (value) => {
                                                        const { prix } = getValues();
                                                        if (+prix < +value) {
                                                            return '*Le prix de solde doit être inférieur au prix normal';
                                                        }
                                                    }
                                                })}
                                            />
                                        )}
                                        {errors.discountPrix && <p className='text-red-700 text-xs'>{errors.discountPrix.message}</p>}

                                        <input
                                            id='type'
                                            type="text"
                                            placeholder='Type'
                                            name='type'
                                            className='form_input border-[1px] bg-customC text-black rounded-md placeholder:text-sm'
                                            {...register('type')}
                                        />
                                        {errors.type && <p className='text-red-700 text-xs'>{errors.type.message}</p>}
                                    </div>
                                </div>



                                <div>
                                    <p className='font-content text-[16px] mb-3 font-normal text-black'>
                                        <span className='font-semibold mr-1'>Note:</span>
                                        La première image sera l'image de couverture (max:12)
                                    </p>
                                    <div className="image_upload_container md:p-5 md:border-2 bg-transparent border-dashed rounded-sm md:flex items-center justify-center gap-2">
                                        <input
                                            onChange={(e) => setImageFile(e.target.files)}
                                            
                                            multiple accept='image/*'
                                            type="file"
                                            className={`file-input file:bg-customC/30 bg-customC ${loading ? "md:w-4/6" : 'md:w-4/5'} w-full`} 
                                        />
                                        <button
                                            disabled={loading || imageFile.length === 0}
                                            onClick={handleImageUpload}
                                            type='button'
                                            className={`w-full text-green-600 bg-customC text-sm py-2 border-2 border-green-600 rounded-md mt-2 uppercase font-heading ${loading ? "md:w-2/6" : 'md:w-1/5'} md:h-[3rem] md:mt-0 duration-500 hover:shadow-lg disabled:border-gray-500 disabled:text-gray-500`}
                                        >
                                            {loading ? 'Uploading...' : 'Upload'}
                                        </button>
                                    </div>
                                    <div>
                                        {formData.imgUrl.length > 0 && formData.imgUrl.map((imgSrc, index) => (
                                            <div key={index} className="uploaded_images p-2 pr-5 border-2 mt-4 rounded-md flex items-center justify-between">
                                                <img src={imgSrc} alt="property Image" className='w-24 h-20 object-cover rounded-md' />
                                                <button
                                                    onClick={() => handleDelete(index)}
                                                    type='button'
                                                    className='font-medium text-lg text-gray-800 flex items-center underline hover:opacity-75'
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        ))}
                                        <div className="post_btn mt-7">
                                            <button
                                                disabled={formData.imgUrl.length < 1 || loading || formSubmitLoading}
                                                type='submit'
                                                className="w-full bg-customC text-black text-xl tracking-wider font-heading rounded-md hover:opacity-90 disabled:opacity-70 duration-300  p-3"
                                            >
                                                {formSubmitLoading ? 'Updating...' : 'modifier Produit'}
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

export default UpdateProduit;
