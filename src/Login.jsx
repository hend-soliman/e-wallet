import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import toast, { ToastBar } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";


export default function Login() {
    const navigate = useNavigate();



const test = yup.object({
    userEmail : yup.string().required().email(),
    userPassword : yup.string().required().min(4),
    remembermeIndex : yup.boolean().required(),

});

    const handelSubmite = (values)=>{
       let dataVerfication = true;
       if (dataVerfication){
        toast.success('login success')
         if(values.remembermeIndex == true){
            localStorage.setItem('hasLogged' , 'true');
        }else{
             sessionStorage.setItem('hasLogged' , 'true');
        }
        navigate('/instaPay')
       
     
       }else{
        toast.error('Wrong username or password')
       }
       
    };
    useEffect (()=>{
        let hasLogged =sessionStorage.getItem('hasLogged')|| localStorage.getItem('hasLogged') ;
        if(hasLogged === 'true'){
            navigate('/instaPay');
        }

    },[])
  return (
    <div className='w-full h-dvh overflow-auto flex justify-center items-center'>

        <Formik validationSchema={test} initialValues={{userEmail:"", userPassword:"", remembermeIndex:false,}} onSubmit={handelSubmite}>
          <Form className='w-[400px] p-4 rounded-2xl shadow border flex flex-col gap-4 bg-gray-600'>
            <h1>welcome back , please login</h1>
            <Field name="userEmail"  type="email" className="input w-full" placeholder="Enter Your Email" />
            <ErrorMessage name="userEmail" component={'p'} className="text-red-400"/>

            <Field name="userPassword"  type="password" className="input w-full" placeholder="Enter Your Password" />
            <ErrorMessage name="userPassword" className="text-red-400" component={'p'}/>

            <label>
                <Field name="remembermeIndex" className="checkbox checkbox-primary" type="checkbox"/>
                Remember Me
                </label>  
            <button type="submit" className='btn btn-primary w-full'>Login</button>
          </Form>
        </Formik>
    
    </div>
  )
}
