import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Footer.scss';
import { FormattedMessage } from 'react-intl';
import { changeLanguageApp } from '../../store/actions';
import { languages } from '../../utils/constant';
import { withRouter } from 'react-router';
import * as actions from "../../store/actions";

class Footer extends Component {

    constructor(props) {
        super(props);

    }


    render() {


        return (
            <React.Fragment>
                <div className='footer-area'>

                    <div className="container-footer my-5">

                        <div className="container-main p-4">
                            <div className="container-main-row row mt-4">
                                <div className="main-footer-left col-lg-4 col-md-12 mb-4 mb-md-0">
                                    <div className="title-main-footer-1">Online School</div>

                                    <p>
                                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
                                        voluptatum deleniti atque corrupti.
                                    </p>

                                    <p>
                                        Blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas
                                        molestias.
                                    </p>

                                    <div className="mt-4 footer-icon">

                                        <div className="footer-icon-item">
                                            <i className="fab fa-facebook-f"></i>
                                        </div>

                                        <div className="footer-icon-item">
                                            <i className="fab fa-dribbble"></i>
                                        </div>

                                        <div className="footer-icon-item">
                                            <i className="fab fa-twitter"></i>
                                        </div>

                                        <div className="footer-icon-item">
                                            <i className="fab fa-google-plus-g"></i>
                                        </div>

                                    </div>
                                </div>
                                <div className="main-footer-left col-lg-4 col-md-6 mb-4 mb-md-0">
                                    <div className="title-main-footer-1">Search something</div>

                                    <div className="form-outline form-white mb-4">
                                        <input type="text" id="formControlLg" className="form-control form-control-lg" />

                                    </div>

                                    <ul className="fa-ul footer-contact">
                                        <li className="mb-3">
                                            <span className="fa-li"><i className="fas fa-home"></i></span><span className="ms-2">Warsaw, 00-967, Poland</span>
                                        </li>
                                        <li className="mb-3">
                                            <span className="fa-li"><i className="fas fa-envelope"></i></span><span className="ms-2">contact@example.com</span>
                                        </li>
                                        <li className="mb-3">
                                            <span className="fa-li"><i className="fas fa-phone"></i></span><span className="ms-2">+ 48 234 567 88</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="main-footer-left col-lg-4 col-md-6 mb-4 mb-md-0">
                                    <div className="title-main-footer-1">Opening hours</div>
                                    <div className='opening'>
                                        <ul>
                                            <li className='weekend'>
                                                Monday
                                                <span>07:00-17:00</span>
                                            </li>
                                            <li className='weekend'>
                                                Tuesday
                                                <span>07:00-17:00</span>
                                            </li>
                                            <li className='weekend'>
                                                Wednesday
                                                <span>07:00-17:00</span>
                                            </li>
                                            <li className='weekend'>
                                                Thursday
                                                <span>07:30-17:00</span>
                                            </li>
                                            <li className='weekend'>
                                                Friday
                                                <span>08:00-17:00</span>
                                            </li>


                                        </ul>
                                    </div>

                                </div>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Footer));

