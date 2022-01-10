import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SpecialtyInfo.scss';
// import { FormattedMessage } from 'react-intl';
import { changeLanguageApp } from '../../store/actions';
import * as actions from '../../store/actions';
import * as services from '../../services';
import { languages } from '../../utils/constant';
import { withRouter } from 'react-router';


class SpecialtyInfo extends Component {

    changeLanguageClick = (language) => {
        this.props.changeLanguageApp(language)

    }
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            Ckeditor: {},
            infoDoctor: {},
            position: {},
            gender: {},
            idDocotrAppointment: +this.props.idDocotrAppointment,

        }
    }
    async componentDidMount() {

        let id = this.state.idDocotrAppointment;
        let doctorDetail = await services.doctorDetail(id);
        if (doctorDetail.data.dataDetailDoctor && doctorDetail.data.dataDetailDoctor.err === 0) {
            this.setState({
                data: doctorDetail.data.dataDetailDoctor.dataDetail,
                Ckeditor: doctorDetail.data.dataDetailDoctor.dataDetail.Ckeditor,
            })
            // this.storeCkeditorr(this.state.Ckeditor);
            this.props.getDoctorDetail(id);
            this.setState({
                position: this.props.dataDoctor.positionData,
            })
        }


    }
    componentDidUpdate(prevProps, prevState) {
        // if (this.props.dataDoctor !== prevProps.dataDoctor) {

        //     this.setState({
        //         position: this.props.dataDoctor.positionData,
        //     })


        // }
    }

    // storeCkeditorr = (e) => {
    //     if (this.props.storeCkeditor) {
    //         this.props.storeCkeditor(e);
    //     }

    // }
    clickInfoDoctor = (id) => {
        this.props.history.push(`/doctor-detail-id/${id}`);
    }


    render() {
        var { language } = this.props;
        var { infoDoctor, Ckeditor, data, idDocotrAppointment, position } = this.state
        console.log(position);
        return (
            <React.Fragment>
                <div className="detail-doctor">
                    <div className="img-doctor"
                        onClick={() => this.clickInfoDoctor(data.id)}
                    >
                        <div className="img"
                            style={{ backgroundImage: `url(${data.image})` }}
                        >
                        </div>
                    </div>
                    <div className="info-doctor">
                        <div onClick={() => this.clickInfoDoctor(data.id)} className="name-doctor">
                            {
                                language === languages.VI && this.state.position ?
                                    `GIảng Viên, ${data.lastName} ${data.firstName}`
                                    :

                                    `Lecturer, ${data.firstName} ${data.lastName}`
                            }
                        </div>

                        <div className="description-doctor">
                            <span>
                                {Ckeditor && Ckeditor.description ? Ckeditor.description : ''}
                            </span>


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
        dataDoctor: state.doctor.doctorInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageApp: (language) => dispatch(changeLanguageApp(language)),
        getDoctorDetail: (id) => dispatch(actions.doctorInfo(id)),
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SpecialtyInfo));

