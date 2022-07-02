import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import './HeaderSecondClient.scss';
import { FormattedMessage } from 'react-intl';
import { changeLanguageApp } from '../../store/actions';
import { languages } from '../../utils/constant';
import { withRouter } from 'react-router';
import * as actions from "../../store/actions";
import logoMain from "../../../src/assets/images/logo-02.png";

class HeaderSecondClient extends Component {

    constructor(props) {
        super(props);
        this.headerRef = createRef();
        this.navHeader = createRef();
        this.headerBottomRef = createRef();
    }

    componentDidMount() {
        window.addEventListener('scroll', this.scrollHeader);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scrollHeader);
    }



    changeLanguageClick = (language) => {
        this.props.changeLanguageApp(language)

    }
    clickHome = () => {
        this.props.history.push(`/homepage`);
    }
    clickLogin = () => {
        let currentLink = window.location.href
        sessionStorage.setItem('cd-link', `${currentLink}`);
        this.props.history.push(`/login-patient-user`);
    }
    clickItem1 = () => {
        if (this.props.refItem1) {
            this.props.refItem1.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        }
    }
    clickItem2 = () => {
        if (this.props.refItem2) {
            this.props.refItem2.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        }
    }
    clickItem3 = () => {
        if (this.props.refItem3) {
            this.props.refItem3.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        }
    }
    clickItem4 = () => {
        if (this.props.refItem4) {
            this.props.refItem4.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
        }
    }
    scrollHeader = () => {
        let stickyHeader = this.headerRef.current.offsetTop;

        if (window.pageYOffset > stickyHeader) {
            this.navHeader.current.classList.add("sticky-header");
            this.headerBottomRef.current.classList.add("sticky-header-bottom");


        } else {
            this.navHeader.current.classList.remove("sticky-header");
            this.headerBottomRef.current.classList.remove("sticky-header-bottom");
        }
    }
    render() {
        var { language, patientInfo, isLoggedInPatient, processLogoutPatient } = this.props;
        //console.log(isLoggedInPatient);

        return (
            <React.Fragment>
                <header ref={this.headerRef}>
                    <div className="container">
                        <div id="header" className="row header--top">
                            <div className="header-right text-center col-xs-12 col-sm-8">
                                <div className="module" data-location="header">
                                    <div className="top--list">
                                        <ul className="list-unstyled mb-0 d-flex justify-content-end align-items-center">

                                            <li className="social--facebook">
                                                <span className='icon-top-top-header'>
                                                    <i className="fab fa-facebook-f"></i>

                                                </span>
                                            </li>
                                            <li className="social--zalo">
                                                <span className='icon-top-top-header'>
                                                    <i className="fab fa-instagram"></i>

                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div id="nav-top-menu" className="nav-top-menu clearfix">
                    <div id="main-menu" className="main-menu">
                        <nav id="navbg" className="navbar navbar-inverse">
                            <div className="container">
                                <div className="navbar-header" ref={this.navHeader}>
                                    <span className="logomenu" onClick={() => { this.clickHome() }}>
                                        <img src={logoMain} alt="online english" />
                                    </span>
                                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                        <span className="icon-bar"></span>
                                    </button>

                                </div>

                                <div className="collapse navbar-collapse" id="myNavbar">
                                
                                    <ul className=".navbar nav-right">
                                        <li>
                                            <div className="changeLanguage">
                                                <span className={language === languages.VI ? "changeLanguageVI active" : "changeLanguageVI"}
                                                    onClick={() => this.changeLanguageClick(languages.VI)}
                                                >
                                                    VI
                                                </span>
                                                <span className={language === languages.EN ? "changeLanguageEN active" : "changeLanguageEN"}
                                                    onClick={() => this.changeLanguageClick(languages.EN)}
                                                >
                                                    EN
                                                </span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="login-right">
                                                {
                                                    isLoggedInPatient ?
                                                        <>
                                                            <span className="welcom-user-title">
                                                                <FormattedMessage id="loginHeader.welcome" />&nbsp;
                                                            </span>
                                                            <span className='name-user-header'>
                                                                {
                                                                    patientInfo && patientInfo.firstName ? patientInfo.firstName : ''
                                                                }
                                                            </span>
                                                            <div className="btn btn-logout" onClick={processLogoutPatient}>

                                                                <i className="fas fa-sign-out-alt"></i>
                                                            </div>

                                                        </>

                                                        :
                                                        <>
                                                            <div className="login-paintion-right"
                                                                onClick={this.clickLogin}
                                                            >

                                                                <FormattedMessage id="header.login" />

                                                            </div>

                                                        </>

                                                }



                                            </div>
                                        </li>
                                    </ul>
                                </div>


                            </div>
                        </nav>
                    </div>
                </div >

                <div className="header-bottom" ref={this.headerBottomRef}>
                    <div className="container">
                        <div className="row align-items-center flex">
                            <div className="col-md-6 header-bottom-title-1">
                                <h6>TRUNG TÂM HỘ TRỢ ĐĂNG KÝ VÀ DẠY CÁC KHÓA HỌC TIẾNG ANH</h6>
                            </div>
                            <div className="col-md-6 header-bottom-title-2">
                                <div className="information-item flex">
                                    <div className="address">
                                        Địa chỉ:
                                        <b> Lô Z, KCN Bình Minh, Thị xã Bình Tân, Tỉnh Vĩnh Long</b>
                                    </div>
                                    <div className="hotline">
                                        Hotline
                                        <span >
                                            <b>0909999999</b>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment >
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        patientInfo: state.patient.patientInfo,
        isLoggedInPatient: state.patient.isLoggedInPatient,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogoutPatient: () => dispatch(actions.processLogoutPatient()),
        changeLanguageApp: (language) => dispatch(changeLanguageApp(language)),

    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderSecondClient));

