import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorDetail.scss';
import { FormattedMessage } from 'react-intl';
import { changeLanguageApp } from '../../store/actions';
import * as actions from '../../store/actions';
import * as service from '../../services'
import { languages } from '../../utils/constant'
import HeaderHome from '../homepage/HeaderHome';
import ReactHtmlParser from 'react-html-parser';
import Appointment from './schedules/Appointment';
import DoctorInfo from './doctorDetail/DoctorInfo';
import LoadingOverlay from 'react-loading-overlay';
import Loading from './schedules/Loading';
import Footer from '../homepage/Footer';

class DoctorDetail extends Component {

    changeLanguageClick = (language) => {
        this.props.changeLanguageApp(language)

    }
    constructor(props) {
        super(props);
        this.appointment = React.createRef();
        this.state = {
            idDocotrAppointment: this.props.match.params.id,
            contentCkeditor: {},

            isLoading: false,
        }
    }

    storeCkeditor = (e) => {
        if (e) {
            this.setState({
                contentCkeditor: e,
            })
        }
    }

    isLoading = (isLoading) => {
        this.setState({
            isLoading: isLoading
        })
    }

    clickAppointment = () => {
        if (this.appointment && this.appointment.current) {
            this.appointment.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
        }
    }

    render() {
        var { language, dataDoctor } = this.props;
        var { idDocotrAppointment } = this.state

        return (
            <React.Fragment>
                <LoadingOverlay
                    active={this.state.isLoading}
                    spinner={<Loading />}

                >

                    <HeaderHome />
                    <div className='space-top'></div>
                    <div className="container-doctor-detail">
                        <DoctorInfo
                            idDocotrAppointment={idDocotrAppointment}
                            storeCkeditor={this.storeCkeditor}
                        />





                    </div>

                    <div className="description">
                        <div className='appointment-doctor'>
                            <span ref={this.appointment}>
                                <Appointment
                                    idDoctor={+idDocotrAppointment}
                                    isLoading={this.isLoading}
                                />
                            </span>

                            <div className='make-an-appointment'>
                                <div className='make-an-appointment-1'>

                                </div>
                                <div className='make-an-appointment-2'>
                                    <FormattedMessage id="doctor-outstanding.Makeanappointment" />
                                </div>
                                <div className='make-an-appointment-3'>
                                    <FormattedMessage id="doctor-outstanding.desMakeAnAppointment" />
                                </div>
                                <div className='make-an-appointment-4'
                                    onClick={this.clickAppointment}
                                >
                                    <FormattedMessage id="doctor-outstanding.Makeanappointment" />
                                </div>

                            </div>
                        </div>
                        <div className='describe-cv'>
                            <div className='curriculum-vitae'>
                                <FormattedMessage id="doctor-outstanding.curriculumVitae" />

                            </div>
                            <div className="description-doctor">
                                {
                                    this.state.contentCkeditor && this.state.contentCkeditor.contentHTML &&
                                    (
                                        ReactHtmlParser(this.state.contentCkeditor.contentHTML)
                                    )
                                }

                            </div>
                        </div>

                    </div>

                    <Footer />

                </LoadingOverlay>


            </React.Fragment >
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        dataDoctor: state.doctor.doctorInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageApp: (language) => dispatch(changeLanguageApp(language)),
        //getDoctorDetail: (id) => dispatch(actions.doctorInfo(id)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail);

