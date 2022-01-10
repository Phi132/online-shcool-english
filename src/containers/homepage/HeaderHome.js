import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HeaderHome.scss';
import { FormattedMessage } from 'react-intl';
import { changeLanguageApp } from '../../store/actions';
import { languages } from '../../utils/constant';
import { withRouter } from 'react-router';
import * as actions from "../../store/actions";

class HeaderHome extends Component {

    constructor(props) {
        super(props);

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
            this.props.refItem1.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
        }
    }
    clickItem2 = () => {
        if (this.props.refItem2) {
            this.props.refItem2.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
        }
    }
    clickItem3 = () => {
        if (this.props.refItem3) {
            this.props.refItem3.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
        }
    }
    clickItem4 = () => {
        if (this.props.refItem4) {
            this.props.refItem4.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
        }
    }

    render() {
        var { language, patientInfo, isLoggedInPatient, processLogoutPatient } = this.props;
        //console.log(isLoggedInPatient);

        return (
            <React.Fragment>
                <div className="header-area">
                    <div className="header-home-container">
                        <div className="left-header-container">
                            <div className="icon__menu__main">
                            </div>
                            <div className="logo__main"
                                onClick={() => { this.clickHome() }}
                            >

                            </div>
                        </div>

                        <div className="middle-header-container">
                            <ul className="middle-header-content">

                                <li className="middle-content-1" onClick={() => { this.clickItem1() }}>
                                    <div className="title-content">
                                        <FormattedMessage
                                            id="header.consultant"
                                        />

                                    </div>
                                    <div className="describe-content">
                                        <span>
                                            <FormattedMessage
                                                id="header.describe-consultant"
                                            />
                                        </span>
                                    </div>
                                </li>
                                <li className="middle-content-1" onClick={() => { this.clickItem2() }}>
                                    <div className="title-content">
                                        <span>
                                            <FormattedMessage
                                                id="header.courses"
                                            />
                                        </span>
                                    </div>
                                    <div className="describe-content">
                                        <span>
                                            <FormattedMessage
                                                id="header.describe-courses"
                                            />
                                        </span>
                                    </div>
                                </li>
                                <li className="middle-content-1" onClick={() => { this.clickItem4() }}>
                                    <div className="title-content">
                                        <span>
                                            <FormattedMessage
                                                id="header.teacher"
                                            />
                                        </span>
                                    </div>
                                    <div className="describe-content">
                                        <span>
                                            <FormattedMessage
                                                id="header.des-teacher"
                                            />
                                        </span>
                                    </div>
                                </li>
                                <li className="middle-content-1" onClick={() => { this.clickItem3() }}>
                                    <div className="title-content">
                                        <span>
                                            <FormattedMessage
                                                id="header.facilities"
                                            />
                                        </span>
                                    </div>
                                    <div className="describe-content">
                                        <span>
                                            <FormattedMessage
                                                id="header.des-facilities"
                                            />
                                        </span>
                                    </div>
                                </li>


                            </ul>
                        </div>

                        <div className="right-header-container">

                            <div className="language-right">
                                <div className="icon-support">
                                    <i className="fas fa-question-circle"></i>
                                </div>
                                <div className="support">
                                    <span>

                                        < FormattedMessage
                                            id="header.support"
                                        />
                                    </span>

                                </div>
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
                            </div>
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
                                            <div className="signin-right">
                                                <FormattedMessage id="header.signup" />
                                            </div>
                                        </>

                                }



                            </div>
                        </div>
                    </div>

                </div>




            </React.Fragment>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderHome));

