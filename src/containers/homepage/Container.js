import React, { Component } from 'react';
import './Container.scss';
import Slider from "react-slick";
import { FormattedMessage } from 'react-intl';

import {
    changeLanguageApp, fetchDoctorLimitStart,
    adminPositionStart,
    allSpecialty, allConsultant,
} from '../../store/actions';
// map
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow,
} from "react-google-maps";
import { languages } from '../../utils/constant'
import { connect } from 'react-redux';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withRouter } from 'react-router';


class Container extends Component {

    constructor(props) {
        super(props);
        this.refItem1 = React.createRef();
        this.refItem2 = React.createRef();
        this.refItem3 = React.createRef();
        this.refItem4 = React.createRef();
        this.refScrollContainer = React.createRef();
        this.state = {
            dataDoctor: [],
            dataSpecialty: [],
            dataConsultant: [],


        }
    }
    componentDidMount() {

        this.props.getDataDoctorLimit();
        this.props.getAllCodePosition();
        this.props.getAllSpecialty();
        this.props.getAllConsultant();

        this.props.getRef(this.refItem1.current, this.refItem2.current,
            this.refItem3.current, this.refItem4.current);

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.dataDoctor !== this.props.dataDoctor) {
            this.setState({
                dataDoctor: this.props.dataDoctor,

            })
        }
        if (prevProps.dataSpecialty !== this.props.dataSpecialty) {
            this.setState({
                dataSpecialty: this.props.dataSpecialty
            })
        }
        if (prevProps.dataConsultant !== this.props.dataConsultant) {
            this.setState({
                dataConsultant: this.props.dataConsultant
            })
        }

    }
    onClickDoctorOutStanding = (doctor) => {
        this.props.history.push(`/doctor-detail-id/${doctor.id}`);
    }
    changeDirectionToMSpecialty = (specialty) => {
        this.props.history.push(`/medical-specialty/${specialty.id}`);
    }
    changeDirectionToRemoteConsultant = (e) => {
        let { isLoggedInPatient } = this.props;
        sessionStorage.setItem('cd-link', `/remote-consultant/${e.id}`);
        if (isLoggedInPatient) {
            this.props.history.push(`/remote-consultant/${e.id}`);
        }
        if (!isLoggedInPatient) {
            this.props.history.push(`/login-patient-user`);
        }
    }

    render() {
        const settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,

        };
        let { dataDoctor, dataSpecialty, dataConsultant } = this.state;
        let language = this.props.language;

        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
                defaultZoom={10}
                defaultCenter={{ lat: 10.814087, lng: 106.658079 }}
            >
                <Marker
                    position={{ lat: 10.814087, lng: 106.658079 }}
                >
                    <InfoWindow>
                        <div> We're here</div>
                    </InfoWindow>
                </Marker>
            </GoogleMap>
        ));
        return (

            <React.Fragment>
                <div>
                    <div className="container-area" ref={this.refItem1}>
                        <div className="container-title">
                            <div className="container-title1">
                                <FormattedMessage id="container.consultant" />
                            </div>
                            <div className="container-title2">
                                <FormattedMessage id="container.remoteConsultant" />
                            </div>
                        </div>
                        <div className="slider-container">
                            <div className="space-bot-top-slider">
                                <Slider {...settings}>
                                    {
                                        dataConsultant && dataConsultant.length > 0 &&
                                        dataConsultant.map((e, index) => {
                                            if (e.image) {
                                                var imgSpecialtyData = Buffer.from(e.image, 'base64').toString('binary');
                                            }
                                            return (
                                                <div className="slider-picture"
                                                    key={index}
                                                    onClick={() => this.changeDirectionToRemoteConsultant(e)}
                                                >
                                                    <div className='slider-content-1'>
                                                        <div className='frame-slider-img'>
                                                            <div className="slider-img" style={{ backgroundImage: `url('${imgSpecialtyData}')` }}>
                                                            </div>
                                                        </div>

                                                        <div className="slider-picture-title">
                                                            <span>
                                                                {e.name}
                                                            </span>
                                                            <div className='description-slider'>
                                                                <div className='time-active'>
                                                                    <i className="fas fa-clock"></i>
                                                                    7:00 - 17:00
                                                                </div>
                                                                <div className='quantity-access'>
                                                                    <i className="fas fa-users"></i>
                                                                    200 +
                                                                </div>
                                                                <div className='status-active'>
                                                                    <i className="fas fa-bell"></i>
                                                                    <FormattedMessage id="status.active" />
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className='read-option'>
                                                            <div className='read-more-btn'>
                                                                <div className='read-more-btn-area'>
                                                                    <div className='arrow-icon-readmore arrow-icon-readmore--hover'>
                                                                        <i className="fas fa-long-arrow-alt-right"></i>
                                                                    </div>
                                                                    <div className='content-readmore-option'>
                                                                        <FormattedMessage id="header.banner.readMore" />

                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            )
                                        })

                                    }
                                    <div className="slider-picture slider-picture-maintenance">
                                        <div className='slider-content-1 slider-picture-maintenance'>
                                            <div className='slider-content-maintenance'>

                                            </div>
                                            <div className='frame-slider-img'>
                                                <div className="slider-img">
                                                </div>
                                            </div>

                                            <div className="slider-picture-title">
                                                <span>
                                                    Hỗ trợ trực tiếp về các thắc mắc trong việc đăng ký
                                                </span>
                                                <div className='description-slider'>
                                                    <div className='time-active'>
                                                        <i className="fas fa-clock"></i>
                                                        7:00 - 17:00
                                                    </div>
                                                    <div className='quantity-access'>
                                                        <i className="fas fa-users"></i>
                                                        200+
                                                    </div>
                                                    <div className='status-active maintenance'>
                                                        <i className="fas fa-bell"></i>
                                                        <FormattedMessage id="status.maintenance" />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='read-option'>
                                                <div className='read-more-btn'>
                                                    <div className='read-more-btn-area'>
                                                        <div className='arrow-icon-readmore arrow-icon-readmore--hover'>
                                                            <i className="fas fa-long-arrow-alt-right"></i>
                                                        </div>
                                                        <div className='content-readmore-option'>
                                                            <FormattedMessage id="header.banner.readMore" />

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="slider-picture slider-picture-maintenance">
                                        <div className='slider-content-1 slider-picture-maintenance'>
                                            <div className='slider-content-maintenance'>

                                            </div>
                                            <div className='frame-slider-img'>
                                                <div className="slider-img">
                                                </div>
                                            </div>

                                            <div className="slider-picture-title">
                                                <span>
                                                    Chăm sóc khách hàng các việc liên quan đến trung tâm
                                                </span>
                                                <div className='description-slider'>
                                                    <div className='time-active'>
                                                        <i className="fas fa-clock"></i>
                                                        7:00 - 17:00
                                                    </div>
                                                    <div className='quantity-access'>
                                                        <i className="fas fa-users"></i>
                                                        200+
                                                    </div>
                                                    <div className='status-active maintenance'>
                                                        <i className="fas fa-bell"></i>
                                                        <FormattedMessage id="status.maintenance" />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='read-option'>
                                                <div className='read-more-btn'>
                                                    <div className='read-more-btn-area'>
                                                        <div className='arrow-icon-readmore arrow-icon-readmore--hover'>
                                                            <i className="fas fa-long-arrow-alt-right"></i>
                                                        </div>
                                                        <div className='content-readmore-option'>
                                                            <FormattedMessage id="header.banner.readMore" />

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="slider-picture slider-picture-maintenance">
                                        <div className='slider-content-1 slider-picture-maintenance'>
                                            <div className='slider-content-maintenance'>

                                            </div>
                                            <div className='frame-slider-img'>
                                                <div className="slider-img">
                                                </div>
                                            </div>

                                            <div className="slider-picture-title">
                                                <span>
                                                    Tư vấn chăm sóc về các khoản học phí trong quá trình học
                                                </span>
                                                <div className='description-slider'>
                                                    <div className='time-active'>
                                                        <i className="fas fa-clock"></i>
                                                        7:00 - 17:00
                                                    </div>
                                                    <div className='quantity-access'>
                                                        <i className="fas fa-users"></i>
                                                        200+
                                                    </div>
                                                    <div className='status-active maintenance'>
                                                        <i className="fas fa-bell"></i>
                                                        <FormattedMessage id="status.maintenance" />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='read-option'>
                                                <div className='read-more-btn'>
                                                    <div className='read-more-btn-area'>
                                                        <div className='arrow-icon-readmore arrow-icon-readmore--hover'>
                                                            <i className="fas fa-long-arrow-alt-right"></i>
                                                        </div>
                                                        <div className='content-readmore-option'>
                                                            <FormattedMessage id="header.banner.readMore" />

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="slider-picture slider-picture-maintenance">
                                        <div className='slider-content-1 slider-picture-maintenance'>
                                            <div className='slider-content-maintenance'>

                                            </div>
                                            <div className='frame-slider-img'>
                                                <div className="slider-img">
                                                </div>
                                            </div>

                                            <div className="slider-picture-title">
                                                <span>
                                                    giúp mọi người hiểu thêm về trung tâm và các chương trình
                                                </span>
                                                <div className='description-slider'>
                                                    <div className='time-active'>
                                                        <i className="fas fa-clock"></i>
                                                        7:00 - 17:00
                                                    </div>
                                                    <div className='quantity-access'>
                                                        <i className="fas fa-users"></i>
                                                        200+
                                                    </div>
                                                    <div className='status-active maintenance'>
                                                        <i className="fas fa-bell"></i>
                                                        <FormattedMessage id="status.maintenance" />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='read-option'>
                                                <div className='read-more-btn'>
                                                    <div className='read-more-btn-area'>
                                                        <div className='arrow-icon-readmore arrow-icon-readmore--hover'>
                                                            <i className="fas fa-long-arrow-alt-right"></i>
                                                        </div>
                                                        <div className='content-readmore-option'>
                                                            <FormattedMessage id="header.banner.readMore" />

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="slider-picture slider-picture-maintenance">
                                        <div className='slider-content-1 slider-picture-maintenance'>
                                            <div className='slider-content-maintenance'>

                                            </div>
                                            <div className='frame-slider-img'>
                                                <div className="slider-img">
                                                </div>
                                            </div>

                                            <div className="slider-picture-title">
                                                <span>
                                                    chương trình đào tạo và chất lượng cao cấp nhất của chúng tôi
                                                </span>
                                                <div className='description-slider'>
                                                    <div className='time-active'>
                                                        <i className="fas fa-clock"></i>
                                                        7:00 - 17:00
                                                    </div>
                                                    <div className='quantity-access'>
                                                        <i className="fas fa-users"></i>
                                                        200+
                                                    </div>
                                                    <div className='status-active maintenance'>
                                                        <i className="fas fa-bell"></i>
                                                        <FormattedMessage id="status.maintenance" />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='read-option'>
                                                <div className='read-more-btn'>
                                                    <div className='read-more-btn-area'>
                                                        <div className='arrow-icon-readmore arrow-icon-readmore--hover'>
                                                            <i className="fas fa-long-arrow-alt-right"></i>
                                                        </div>
                                                        <div className='content-readmore-option'>
                                                            <FormattedMessage id="header.banner.readMore" />

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                                    </div>

                                </Slider>
                            </div>

                        </div>

                    </div>
                    <div className="container-area-2" ref={this.refItem2}>

                        <div className="container-title">
                            <div className="container-title1">
                                <FormattedMessage id="container.nameCourses" />
                            </div>
                            <div className="container-title2">
                                <FormattedMessage id="container.popularCourse" />
                            </div>
                        </div>
                        <div className="slider-container">
                            <div className="space-bot-top-slider">
                                <Slider {...settings}>
                                    {
                                        dataSpecialty && dataSpecialty.length > 0 &&
                                        dataSpecialty.map((e, index) => {
                                            if (e.image) {
                                                var imgSpecialtyData = Buffer.from(e.image, 'base64').toString('binary');
                                            }
                                            return (
                                                <div className="slider-picture"
                                                    key={index}
                                                    onClick={() => this.changeDirectionToMSpecialty(e)}
                                                >
                                                    <div className='slider-content-1'>
                                                        <div className='frame-slider-img'>
                                                            <div className="slider-img" style={{ backgroundImage: `url('${imgSpecialtyData}')` }}>
                                                            </div>
                                                        </div>

                                                        <div className="slider-picture-title">
                                                            <span>
                                                                {e.name}
                                                            </span>
                                                            <div className='description-slider'>
                                                                <div className='time-active'>
                                                                    <i className="fas fa-clock"></i>
                                                                    7:00 - 17:00
                                                                </div>
                                                                <div className='quantity-access'>
                                                                    <i className="fas fa-users"></i>
                                                                    200 +
                                                                </div>
                                                                <div className='status-active'>
                                                                    <i className="fas fa-bell"></i>
                                                                    <FormattedMessage id="status.active" />
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className='read-option'>
                                                            <div className='read-more-btn'>
                                                                <div className='read-more-btn-area'>
                                                                    <div className='arrow-icon-readmore arrow-icon-readmore--hover'>
                                                                        <i className="fas fa-long-arrow-alt-right"></i>
                                                                    </div>
                                                                    <div className='content-readmore-option'>
                                                                        <FormattedMessage id="header.banner.readMore" />

                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })

                                    }
                                    <div className="slider-picture slider-picture-maintenance">
                                        <div className='slider-content-1 slider-picture-maintenance'>
                                            <div className='slider-content-maintenance'>

                                            </div>
                                            <div className='frame-slider-img'>
                                                <div className="slider-img">
                                                </div>
                                            </div>

                                            <div className="slider-picture-title">
                                                <span>
                                                    Lấy lại tát cả gốc cho học sinh trung học cơ sở
                                                </span>
                                                <div className='description-slider'>
                                                    <div className='time-active'>
                                                        <i className="fas fa-clock"></i>
                                                        7:00 - 17:00
                                                    </div>
                                                    <div className='quantity-access'>
                                                        <i className="fas fa-users"></i>
                                                        200+
                                                    </div>
                                                    <div className='status-active maintenance'>
                                                        <i className="fas fa-bell"></i>
                                                        <FormattedMessage id="status.maintenance" />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='read-option'>
                                                <div className='read-more-btn'>
                                                    <div className='read-more-btn-area'>
                                                        <div className='arrow-icon-readmore arrow-icon-readmore--hover'>
                                                            <i className="fas fa-long-arrow-alt-right"></i>
                                                        </div>
                                                        <div className='content-readmore-option'>
                                                            <FormattedMessage id="header.banner.readMore" />

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="slider-picture slider-picture-maintenance">
                                        <div className='slider-content-1 slider-picture-maintenance'>
                                            <div className='slider-content-maintenance'>

                                            </div>
                                            <div className='frame-slider-img'>
                                                <div className="slider-img">
                                                </div>
                                            </div>

                                            <div className="slider-picture-title">
                                                <span>
                                                    Lấy lại tát cả gốc cho học sinh Trung học và học sinh khác
                                                </span>
                                                <div className='description-slider'>
                                                    <div className='time-active'>
                                                        <i className="fas fa-clock"></i>
                                                        7:00 - 17:00
                                                    </div>
                                                    <div className='quantity-access'>
                                                        <i className="fas fa-users"></i>
                                                        200+
                                                    </div>
                                                    <div className='status-active maintenance'>
                                                        <i className="fas fa-bell"></i>
                                                        <FormattedMessage id="status.maintenance" />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='read-option'>
                                                <div className='read-more-btn'>
                                                    <div className='read-more-btn-area'>
                                                        <div className='arrow-icon-readmore arrow-icon-readmore--hover'>
                                                            <i className="fas fa-long-arrow-alt-right"></i>
                                                        </div>
                                                        <div className='content-readmore-option'>
                                                            <FormattedMessage id="header.banner.readMore" />

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="slider-picture slider-picture-maintenance">
                                        <div className='slider-content-1 slider-picture-maintenance'>
                                            <div className='slider-content-maintenance'>

                                            </div>
                                            <div className='frame-slider-img'>
                                                <div className="slider-img">
                                                </div>
                                            </div>

                                            <div className="slider-picture-title">
                                                <span>
                                                    Lấy lại tát cả gốc cho sinh viên đại học còn đang học
                                                </span>
                                                <div className='description-slider'>
                                                    <div className='time-active'>
                                                        <i className="fas fa-clock"></i>
                                                        7:00 - 17:00
                                                    </div>
                                                    <div className='quantity-access'>
                                                        <i className="fas fa-users"></i>
                                                        200+
                                                    </div>
                                                    <div className='status-active maintenance'>
                                                        <i className="fas fa-bell"></i>
                                                        <FormattedMessage id="status.maintenance" />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='read-option'>
                                                <div className='read-more-btn'>
                                                    <div className='read-more-btn-area'>
                                                        <div className='arrow-icon-readmore arrow-icon-readmore--hover'>
                                                            <i className="fas fa-long-arrow-alt-right"></i>
                                                        </div>
                                                        <div className='content-readmore-option'>
                                                            <FormattedMessage id="header.banner.readMore" />

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="slider-picture slider-picture-maintenance">
                                        <div className='slider-content-1 slider-picture-maintenance'>
                                            <div className='slider-content-maintenance'>

                                            </div>
                                            <div className='frame-slider-img'>
                                                <div className="slider-img">
                                                </div>
                                            </div>

                                            <div className="slider-picture-title">
                                                <span>
                                                    Lấy lại tát cả gốc cho sinh viên đại học đã tốt nghiệp đang đi làm
                                                </span>
                                                <div className='description-slider'>
                                                    <div className='time-active'>
                                                        <i className="fas fa-clock"></i>
                                                        7:00 - 17:00
                                                    </div>
                                                    <div className='quantity-access'>
                                                        <i className="fas fa-users"></i>
                                                        200+
                                                    </div>
                                                    <div className='status-active maintenance'>
                                                        <i className="fas fa-bell"></i>
                                                        <FormattedMessage id="status.maintenance" />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='read-option'>
                                                <div className='read-more-btn'>
                                                    <div className='read-more-btn-area'>
                                                        <div className='arrow-icon-readmore arrow-icon-readmore--hover'>
                                                            <i className="fas fa-long-arrow-alt-right"></i>
                                                        </div>
                                                        <div className='content-readmore-option'>
                                                            <FormattedMessage id="header.banner.readMore" />

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="slider-picture slider-picture-maintenance">
                                        <div className='slider-content-1 slider-picture-maintenance'>
                                            <div className='slider-content-maintenance'>

                                            </div>
                                            <div className='frame-slider-img'>
                                                <div className="slider-img">
                                                </div>
                                            </div>

                                            <div className="slider-picture-title">
                                                <span>
                                                    Lấy lại tát cả gốc cho những ngày đam mê học tiếng anh với mọi lứa tuổi
                                                </span>
                                                <div className='description-slider'>
                                                    <div className='time-active'>
                                                        <i className="fas fa-clock"></i>
                                                        7:00 - 17:00
                                                    </div>
                                                    <div className='quantity-access'>
                                                        <i className="fas fa-users"></i>
                                                        200+
                                                    </div>
                                                    <div className='status-active maintenance'>
                                                        <i className="fas fa-bell"></i>
                                                        <FormattedMessage id="status.maintenance" />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='read-option'>
                                                <div className='read-more-btn'>
                                                    <div className='read-more-btn-area'>
                                                        <div className='arrow-icon-readmore arrow-icon-readmore--hover'>
                                                            <i className="fas fa-long-arrow-alt-right"></i>
                                                        </div>
                                                        <div className='content-readmore-option'>
                                                            <FormattedMessage id="header.banner.readMore" />

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                                    </div>


                                </Slider>
                            </div>

                        </div>

                    </div>
                    <div className='description-LE'>
                        <div className='description-LE-main'>
                            <div className='description-LE-left'>

                            </div>
                            <div className='description-LE-right'>
                                <div className='description-LE-right-title-1'>
                                    TIẾNG ANH GIAO TIẾP
                                </div>
                                <div className='description-LE-right-title-2'>
                                    chọn chúng tôi
                                </div>
                                <div className='description-LE-right-underline'>

                                </div>
                                <div className='description-LE-right-title-3'>
                                    Khóa tiếng Anh giao tiếp cho người bận rộn.
                                    Nâng cao khả năng nói và phản xạ tiếng Anh.
                                    Lịch học linh hoạt phù hợp với mọi lịch trình từ sinh viên cho đến người đi làm.
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="lecturers-outstanding" ref={this.refItem4}>
                        <div className='wavy-2'>

                        </div>
                        <div className="container-title">
                            <div className="container-title1">
                                <FormattedMessage id="container.lecturer" />
                            </div>
                            <div className="container-title2">
                                <FormattedMessage id="container.outstandingLecturers" />
                            </div>
                            <div className='under-line'>

                            </div>
                        </div>
                        <div className="slider-container">
                            <div className="space-bot-top-slider">
                                <Slider {...settings}>

                                    {
                                        dataDoctor && dataDoctor.length > 0 &&
                                        dataDoctor.map((value, index) => {
                                            let imageDoctor;
                                            if (value.image) {

                                                imageDoctor = Buffer.from(value.image, 'base64').toString('binary');

                                            }
                                            let infoVi;
                                            let infoEn;
                                            if (!value.positionData.valueEn || !value.positionData.valueVi) {
                                                infoVi = `${value.positionid}, ${value.lastName} ${value.firstName}`
                                                infoEn = `${value.positionid}, ${value.firstName} ${value.lastName}`
                                            } else {
                                                infoVi = `${value.positionData.valueVi}, ${value.lastName} ${value.firstName}`
                                                infoEn = `${value.positionData.valueEn}, ${value.firstName} ${value.lastName}`
                                            }

                                            return (
                                                <div className="slider-doctor" key={index}
                                                    onClick={() => this.onClickDoctorOutStanding(value)}
                                                >
                                                    <div className="slider-doctor-picture">
                                                        <div className="slider-doctor-img"
                                                            style={{ backgroundImage: `url(${imageDoctor})` }}
                                                        >



                                                        </div>
                                                        <div className="info-doctor">
                                                            {
                                                                language === languages.VI ? infoVi : infoEn
                                                            }
                                                        </div>

                                                        <div className='read-option'>
                                                            <div className='read-more-btn'>
                                                                <div>
                                                                    <FormattedMessage id="header.banner.readMore" />
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </Slider>
                            </div>

                        </div>

                    </div>
                    <div className="container-area-3" ref={this.refItem3}>
                        <div className="container-title-3">
                            <div className="container-title1-3">
                                <FormattedMessage id="container.Infrastructure" />
                            </div>
                            <div className="container-title2-3">
                                <FormattedMessage id="container.trainingFacilites" />
                            </div>
                            <div className='under-line'>

                            </div>
                        </div>
                        <div className="slider-container">
                            <div className="space-bot-top-slider">
                                <Slider {...settings}>
                                    <div className="slider-picture--factory slider-picture-maintenance">
                                        <div className='slider-content--factory slider-picture-maintenance'>
                                            <div className='slider-content-maintenance'>

                                            </div>
                                            <div className='frame-slider-img'>
                                                <div className="slider-img--factory">
                                                </div>
                                            </div>

                                            <div className="slider-picture-title--factory">
                                                <span>
                                                    các cơ sở nổi bật ở châu âu đang trong tiến trình xây dựng
                                                </span>
                                                <div className='description-slider'>
                                                    <div className='time-active'>
                                                        <i className="fas fa-clock"></i>
                                                        7:00 - 17:00
                                                    </div>
                                                    <div className='quantity-access'>
                                                        <i className="fas fa-users"></i>
                                                        200+
                                                    </div>
                                                    <div className='status-active maintenance'>
                                                        <i className="fas fa-bell"></i>
                                                        <FormattedMessage id="status.maintenance" />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='read-option'>
                                                <div className='read-more-btn'>
                                                    <div className='read-more-btn-area'>
                                                        <div className='arrow-icon-readmore arrow-icon-readmore--hover'>
                                                            <i className="fas fa-long-arrow-alt-right"></i>
                                                        </div>
                                                        <div className='content-readmore-option'>
                                                            <FormattedMessage id="header.banner.readMore" />

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="slider-picture--factory slider-picture-maintenance">
                                        <div className='slider-content--factory slider-picture-maintenance'>
                                            <div className='slider-content-maintenance'>

                                            </div>
                                            <div className='frame-slider-img'>
                                                <div className="slider-img--factory">
                                                </div>
                                            </div>

                                            <div className="slider-picture-title--factory">
                                                <span>
                                                    Trung tâm nổi bật ở châu phi đang trong dự án khởi công
                                                </span>
                                                <div className='description-slider'>
                                                    <div className='time-active'>
                                                        <i className="fas fa-clock"></i>
                                                        7:00 - 17:00
                                                    </div>
                                                    <div className='quantity-access'>
                                                        <i className="fas fa-users"></i>
                                                        200+
                                                    </div>
                                                    <div className='status-active maintenance'>
                                                        <i className="fas fa-bell"></i>
                                                        <FormattedMessage id="status.maintenance" />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='read-option'>
                                                <div className='read-more-btn'>
                                                    <div className='read-more-btn-area'>
                                                        <div className='arrow-icon-readmore arrow-icon-readmore--hover'>
                                                            <i className="fas fa-long-arrow-alt-right"></i>
                                                        </div>
                                                        <div className='content-readmore-option'>
                                                            <FormattedMessage id="header.banner.readMore" />

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="slider-picture--factory slider-picture-maintenance">
                                        <div className='slider-content--factory slider-picture-maintenance'>
                                            <div className='slider-content-maintenance'>

                                            </div>
                                            <div className='frame-slider-img'>
                                                <div className="slider-img--factory">
                                                </div>
                                            </div>

                                            <div className="slider-picture-title--factory">
                                                <span>
                                                    dự án mở rộng trung tâm trên toàn cầu đang lấy ý kiến
                                                </span>
                                                <div className='description-slider'>
                                                    <div className='time-active'>
                                                        <i className="fas fa-clock"></i>
                                                        7:00 - 17:00
                                                    </div>
                                                    <div className='quantity-access'>
                                                        <i className="fas fa-users"></i>
                                                        200+
                                                    </div>
                                                    <div className='status-active maintenance'>
                                                        <i className="fas fa-bell"></i>
                                                        <FormattedMessage id="status.maintenance" />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='read-option'>
                                                <div className='read-more-btn'>
                                                    <div className='read-more-btn-area'>
                                                        <div className='arrow-icon-readmore arrow-icon-readmore--hover'>
                                                            <i className="fas fa-long-arrow-alt-right"></i>
                                                        </div>
                                                        <div className='content-readmore-option'>
                                                            <FormattedMessage id="header.banner.readMore" />

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="slider-picture--factory slider-picture-maintenance">
                                        <div className='slider-content--factory slider-picture-maintenance'>
                                            <div className='slider-content-maintenance'>

                                            </div>
                                            <div className='frame-slider-img'>
                                                <div className="slider-img--factory">
                                                </div>
                                            </div>

                                            <div className="slider-picture-title--factory">
                                                <span>
                                                    cơ sở nổi bật ở việt nam trong quá trình xây dựng
                                                </span>
                                                <div className='description-slider'>
                                                    <div className='time-active'>
                                                        <i className="fas fa-clock"></i>
                                                        7:00 - 17:00
                                                    </div>
                                                    <div className='quantity-access'>
                                                        <i className="fas fa-users"></i>
                                                        200+
                                                    </div>
                                                    <div className='status-active maintenance'>
                                                        <i className="fas fa-bell"></i>
                                                        <FormattedMessage id="status.maintenance" />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='read-option'>
                                                <div className='read-more-btn'>
                                                    <div className='read-more-btn-area'>
                                                        <div className='arrow-icon-readmore arrow-icon-readmore--hover'>
                                                            <i className="fas fa-long-arrow-alt-right"></i>
                                                        </div>
                                                        <div className='content-readmore-option'>
                                                            <FormattedMessage id="header.banner.readMore" />

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="slider-picture--factory slider-picture-maintenance">
                                        <div className='slider-content--factory slider-picture-maintenance'>
                                            <div className='slider-content-maintenance'>

                                            </div>
                                            <div className='frame-slider-img'>
                                                <div className="slider-img--factory">
                                                </div>
                                            </div>

                                            <div className="slider-picture-title--factory">
                                                <span>
                                                    trung tâm ở đà nẵng trong quá trình hoàn thành và đang chờ đưa vào
                                                </span>
                                                <div className='description-slider'>
                                                    <div className='time-active'>
                                                        <i className="fas fa-clock"></i>
                                                        7:00 - 17:00
                                                    </div>
                                                    <div className='quantity-access'>
                                                        <i className="fas fa-users"></i>
                                                        200+
                                                    </div>
                                                    <div className='status-active maintenance'>
                                                        <i className="fas fa-bell"></i>
                                                        <FormattedMessage id="status.maintenance" />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='read-option'>
                                                <div className='read-more-btn'>
                                                    <div className='read-more-btn-area'>
                                                        <div className='arrow-icon-readmore arrow-icon-readmore--hover'>
                                                            <i className="fas fa-long-arrow-alt-right"></i>
                                                        </div>
                                                        <div className='content-readmore-option'>
                                                            <FormattedMessage id="header.banner.readMore" />

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="slider-picture--factory">
                                        <div className='slider-content--factory slider-picture-maintenance'>
                                            <div className='slider-content-maintenance'>

                                            </div>
                                            <div className='frame-slider-img'>
                                                <div className="slider-img--factory">
                                                </div>
                                            </div>

                                            <div className="slider-picture-title--factory">
                                                <span>
                                                    trung tâm ở thành phố hồ chí minh đã hoàn thành và đang chờ cập nhật
                                                </span>
                                                <div className='description-slider'>
                                                    <div className='time-active'>
                                                        <i className="fas fa-clock"></i>
                                                        7:00 - 17:00
                                                    </div>
                                                    <div className='quantity-access'>
                                                        <i className="fas fa-users"></i>
                                                        200+
                                                    </div>
                                                    <div className='status-active maintenance'>
                                                        <i className="fas fa-bell"></i>
                                                        <FormattedMessage id="status.maintenance" />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='read-option'>
                                                <div className='read-more-btn'>
                                                    <div className='read-more-btn-area'>
                                                        <div className='arrow-icon-readmore arrow-icon-readmore--hover'>
                                                            <i className="fas fa-long-arrow-alt-right"></i>
                                                        </div>
                                                        <div className='content-readmore-option'>
                                                            <FormattedMessage id="header.banner.readMore" />

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>


                                    </div>


                                </Slider>
                            </div>

                        </div>

                    </div>
                    <div className='description-LE-2'>
                        <div className='description-LE-main'>
                            <div className='description-LE-right'>
                                <div className='description-LE-right-title-1'>
                                    XÓA MẤT GỐC
                                    TIẾNG ANH CẤP TỐC
                                </div>
                                <div className='description-LE-right-title-2'>
                                    chọn chúng tôi
                                </div>
                                <div className='description-LE-right-underline'>

                                </div>
                                <div className='description-LE-right-title-3'>
                                    Cải thiện kỹ năng tiếng Anh từ số 0.
                                    Phù hợp với mọi đối tượng từ sinh viên đến người đi làm.
                                    Xóa bỏ mọi rào cản và nỗi sợ học tiếng Anh.
                                </div>
                            </div>
                            <div className='description-LE-left'>

                            </div>

                        </div>

                    </div>

                    <div className='map-area'>
                        <MapWithAMarker
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCz3Z8srEZPiwbV3WQOPZvf7uE6Vj9X0Co&v=3.exp&libraries=geometry,drawing,places"
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `500px` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                        />



                    </div>
                </div >



            </React.Fragment >

        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        isLoggedInPatient: state.patient.isLoggedInPatient,
        language: state.app.language,
        dataDoctor: state.admin.dataDoctor,
        dataSpecialty: state.doctor.dataSpecialty,
        dataConsultant: state.doctor.dataConsultant,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageApp: (language) => dispatch(changeLanguageApp(language)),
        getDataDoctorLimit: () => dispatch(fetchDoctorLimitStart()),
        getAllCodePosition: () => dispatch(adminPositionStart()),
        getAllSpecialty: () => dispatch(allSpecialty()),
        getAllConsultant: () => dispatch(allConsultant()),
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Container));
