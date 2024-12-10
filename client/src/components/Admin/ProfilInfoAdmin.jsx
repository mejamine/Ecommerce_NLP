import { useNavigate } from 'react-router-dom';
import React,{useEffect,useState,useRef} from 'react'
import {FaTicketAlt} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux'
import { AiFillEdit } from "react-icons/ai";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { firebaseApp } from '../../firebase.js'
import { loddingStart, userUpdateFailed, userUpdateSuccess } from '../../redux/admin/adminSlice.js';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function ProfileInfoAdmin() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { currentAdmin } = useSelector((state) => state.admin);
  const [file, setFile] = useState(undefined);
  const [uploadingPerc, setUploadingPerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});


  
  const dispatch = useDispatch();
  




  const fileRef = useRef(null);
  const { loading } = useSelector((state) => state.user);

  const handleFileUpload = (file) => {
    if (file) {
      const fireBaseStorage = getStorage(firebaseApp);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(fireBaseStorage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadingPerc(Math.round(progress));
        },
        (error) => {
          setFileUploadError(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setFormData({ ...formData, avatar: downloadUrl });
          });
        }
      );
    }
  };

  useEffect(() => {
    handleFileUpload(file);
  }, [file]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true)
    try {
      dispatch(loddingStart());
      const res = await fetch(`http://localhost:4000/ecommerce/users/update/${currentAdmin._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const userData = await res.json();

      //===checking reqest success or not ===//
      if (userData.success === false) {
        dispatch(userUpdateFailed(userData.message));

        //===showing error in tostify====//
        toast.error(userData.message, {
          autoClose: 5000,
        });
      } else {
        dispatch(userUpdateSuccess(userData));
        toast.success("Profile updated successfully", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      dispatch(userUpdateFailed(error.message));
      toast.error(error.message, {
        autoClose: 2000,
      });
    }
  };

 
  const [pathname,setPathName]=useState(true);
  const navigate = useNavigate();
  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [commandesG, setCommandesG] = useState([]);
    const [commandesGM, setCommandesGM] = useState([]);

    useEffect(() => {
      const loadCommandeGP=async()=>{
          try {
              const response = await fetch(`http://localhost:4000/ecommerce/commandes`);
              if (response.ok) {
                const data = await response.json();
                // Trier les commandes par date de création (du plus récent au plus ancien)
                const sortedCommandes = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setCommandesG(sortedCommandes);
              } else {
                console.error('Erreur lors de la récupération des commandes:', response.statusText);
              }
            } catch (error) {
              console.error('Erreur lors de la récupération des commandes:', error);
            }
      }
      
      loadCommandeGP();
  },[])







  return (
    <div>
        {pathname?
          <div className='sm:grid sm:grid-cols-2'>
            <div className='col-span-1 '>
            <div className='rounded-lg bg-white shadow-md shadow-black text-center items-center justify-center mx-10 py-10 px-5 h-[400px]'>
            <img
                src={currentAdmin.avatar}
                className="h-20 w-20 mb-3 rounded-full border-[1px]  border-red-500 mx-auto"
                 alt="profile image"
            />
            <div className='flex items-center justify-center text-center text-lg my-2 font-bold'> Username : {currentAdmin.username}</div>
            <div className='flex items-center justify-center text-center text-lg my-2 font-bold'> Email : {currentAdmin.email}</div>
            
        </div>
            </div>
            <div className=' py-10 flex text-center justify-center items-center sm:mt-0'>
              <button onClick={()=>setPathName(false)}
                className='bg-black text-white px-20 py-10 rounded-lg text-lg font-bold hover:text-gray-900 '
                >Update</button>
            </div>
          </div>
          :
          <div className='sm:grid sm:grid-cols-2 '>
            <div className='flex text-center justify-center items-center'>
              <button onClick={()=>setPathName(true)}
                className='bg-black text-white px-20 mb-10 py-10 rounded-lg text-lg font-bold hover:text-gray-900'
                >View</button>
            </div>
            <div className='col-span-1  '>
            <div className="profile_info rounded-lg bg-white  mx-10 py-4 px-5 shadow-lg shadow-black h-[400px]">
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="mb-2">
                <div className="image_container w-full flex items-center justify-center  relative max-w-[100px] mx-auto">
                  <input
                    onChange={(e) => setFile(e.target.files[0])}
                    hidden
                    accept="image/*"
                    type="file"
                    name="profile"
                    id="profile_image"
                    ref={fileRef}
                  />

                  <img
                    src={formData.avatar || currentAdmin.avatar}
                    onClick={() => fileRef.current.click()}
                    className="h-20 w-20 mb-3 rounded-full border-[1px]  border-gray-900"
                    alt="profile image"
                  />
                  <i className="h-4 w-4 rounded-full flex items-center justify-center bg-red-500 text-white absolute bottom-2 right-0">
                    <AiFillEdit />
                  </i>
                </div>

                {fileUploadError ? (
                  <p className="text-xs text-red-700 font-medium text-center">
                    File upload failed
                  </p>
                ) : uploadingPerc > 0 && uploadingPerc < 100 ? (
                  <p className="text-xs text-black font-medium text-center">
                    File uploading...{uploadingPerc}%
                  </p>
                ) : (
                  uploadingPerc === 100 && (
                    <p className="text-xs text-green-600 font-medium text-center">
                      File uploaded!!!
                    </p>
                  )
                )}
              </div>

              <label className="text-left font-heading text-sm pl-1 ">
                Nom d'utilisateur
              </label>
              <input
                defaultValue={currentAdmin.username}
                name="username"
                type="text"
                placeholder="Username"
                className="form_input bg-slate-200 rounded-md !pl-3 mt-1 !border-[1px] focus:!border-red-500 mb-3"
                onChange={handleChange}
              />

              <label className="text-left font-heading text-sm pl-1 ">
                Email
              </label>
              <input
                defaultValue={currentAdmin.email}
                name="email"
                type="email"
                placeholder="email"
                className="  form_input bg-slate-200 rounded-md !pl-3 !border-[1px] focus:!border-red-500 mb-3"
                onChange={handleChange}
              />

              <label className="text-left font-heading text-sm pl-1 ">
                Mot de Passe
              </label>
              <input
                type="password"
                name="password"
                placeholder="Mot de Passe"
                className="mt-1  form_input bg-slate-200 rounded-md !pl-3 !border-[1px] focus:!border-red-500"
                onChange={handleChange}
              />

              <button
                disabled={loading}
                type="submit"
                className="py-2 px-5 bg-black text-white rounded-md w-full font-heading  mt-4 hover:opacity-90"
              >
                {loading ? "Loading..." : "Enregistrer"}
              </button>
            </form>
          </div>
            </div>
            
          </div>
        }
      
    </div>
  );
}

