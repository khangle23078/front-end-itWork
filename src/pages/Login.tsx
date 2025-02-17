import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
// import BannerLogin from '../assets/images/banner-login.png';
import { RootState, useAppDispatch } from '../app/store';
import { useSelector } from 'react-redux';
import { signInByUser } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
// import Logo from '../assets/images/logo.jpg';
import { signin } from '../api/auth';

type Props = {}
type FormValues = {
    email: string,
    password: string,
}

const schema = yup.object({
    email: yup.string()
        .email('Vui lòng nhập đúng định dạng email')
        .required('Vui lòng nhập email'),
    password: yup.string()
        .required('Vui lòng nhập mật khẩu')
})

const Login: React.FC = (props: Props) => {
    // const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(schema)
    })

    const onSignin: SubmitHandler<FormValues> = async (user: FormValues) => {
        const { data } = await signin(user);
        localStorage.setItem('user', JSON.stringify(data));
        console.log(data);
        if (data.data) {
            if (data.data.role_id == 1) {
                navigate('/');
                return true
            }
            if (data.data.role_id == 2) {
                navigate('/employer');
                return true
            }
        }
    }
    return (
        <div>
            <div>
                <div className="container-fluid login-fluid clear-left clear-right">
                    <div className="login-container">
                        {/* login header */}
                        <div className="login-header">
                            <div className="w-login m-auto">
                                <div className="login-logo d-flex align-items-center">
                                    {/* <a href="#">Tech<span class="txb-logo">Jobs.</span></a> */}
                                    <Link to="/">
                                        {/* <img src={Logo} alt="itWork" width={70} height={70} /> */}
                                    </Link>
                                    <span className="login-breadcrumb"><em>/</em> Đăng Nhập</span>
                                </div>
                                <div className="login-right">
                                    <Link to="/" className="btn btn-return">Trang chủ</Link>
                                </div>
                            </div>
                        </div>
                        {/* (end) login header */}
                        <div className="clearfix" />
                        <div className="padding-top-90" />
                        {/* login main */}
                        <div className="login-main">
                            <div className="w-login m-auto">
                                <div className="row">
                                    {/* login main descriptions */}
                                    <div className="col-md-6 col-sm-12 col-12 login-main-left">
                                        {/* <img src={BannerLogin} /> */}
                                    </div>
                                    {/* login main form */}
                                    <div className="col-md-6 col-sm-12 col-12 login-main-right">
                                        <form className="login-form" method='POST' onSubmit={handleSubmit(onSignin)}>
                                            <div className="login-main-header">
                                                <h3>Đăng Nhập</h3>
                                            </div>
                                            <div className="input-div one">
                                                <label htmlFor="email" className='py-2'>Tên email</label>
                                                <div className="div lg-lable">
                                                    <input type="text" className="input form-control-lgin" placeholder='nhận email' {...register('email')} />
                                                </div>
                                                <p className='text-danger py-2'>{errors.email?.message}</p>
                                            </div>
                                            <div className="input-div pass">
                                                <label htmlFor="password" className='py-2'>Mật khẩu</label>
                                                <div className="div lg-lable">
                                                    <input type="password" className="input form-control-lgin" placeholder='nhập password'{...register('password')} />
                                                </div>
                                                <p className='text-danger py-2'>{errors.password?.message}</p>
                                            </div>
                                            <div className="form-group d-block frm-text">
                                                <Link to="/pickpassword" className="fg-login d-inline-block">Quên mật khẩu</Link>
                                                <a data-bs-toggle='modal' data-bs-target='#signup-form' className="fg-login float-right d-inline-block">Bạn chưa có tài khoản? Đăng ký</a>
                                            </div>
                                            <button type="submit" className="btn btn-primary float-right btn-login d-block w-100">
                                                {/* {
                                                    auth.loading ?
                                                        <div className="spinner-border text-light" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div> :
                                                        
                                                } */}
                                                Đăng Nhập
                                            </button>
                                            <div className="form-group d-block w-100 mt-5">
                                                <div className="text-or text-center">
                                                    <span>Hoặc</span>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6 col-12 pr-7">
                                                        <button className="btn btn-secondary btn-login-facebook btnw w-100 float-left">
                                                            <i className="fa fa-facebook mx-2" aria-hidden="true" />
                                                            <span>Đăng nhập bằng Facebook</span>
                                                        </button>
                                                    </div>
                                                    <div className="col-sm-6 col-12 pl-7">
                                                        <button className="btn btn-secondary btn-login-google btnw w-100 float-left">
                                                            <i className="fa fa-google mx-2" aria-hidden="true" />
                                                            <span>Đăng nhập bằng Google</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* (end) login main */}
                    </div>
                </div>

                <footer className="login-footer">
                    <div className="w-login m-auto">
                        <div className="row">
                            {/* login footer left */}
                            <div className="col-md-6 col-sm-12 col-12 login-footer-left">
                                <div className="login-copyright">
                                    <p>Copyright © 2020 <a href="#"> Itwork</a>. All Rights Reserved.</p>
                                </div>
                            </div>
                            {/* login footer right */}
                            <div className="col-md-6 col-sm-12 col-12 login-footer-right">
                                <ul>
                                    <li><a href="#">Terms &amp; Conditions</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>

            {/* Modal signup */}
            <div className="modal fade" id="signup-form" tabIndex={-1} aria-labelledby="signup-form" aria-hidden="true" style={{ minWidth: '800px ' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className="modal-title  text-center" id="signup-form">
                                Chào bạn,bạn hãy dành vài giây để xác nhận thông tin này nhé
                            </p>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex justify-content-around">
                            <div className='contenrmodal '>
                                <img src="https://res.cloudinary.com/dgeqw8b5i/image/upload/v1662714590/news2_pgluai.jpg" className='rounded-circle' width="250" height="250" />
                                <a className="d-block btn btn-primary text-white" href="/login/signupempoly" >Nhà tuyển dụng</a>
                            </div>
                            <div className='contenrmodal '>
                                <img src="https://res.cloudinary.com/dgeqw8b5i/image/upload/v1662714590/news2_pgluai.jpg" className='rounded-circle' width="250" height="250" />
                                <a className="d-block btn btn-primary text-white" href="/login/signupcandidate" >Ứng viên</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Login