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
        const settingConsultant = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
        };
        const settingLectOut = {
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

                    <div className="container-area-2" ref={this.refItem2}>
                        <>
                            {/* <div className="container-title">
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

</div> */}
                        </>
                        <div className="container-fluid">
                            <div className="row justify-content-center section-title">
                                <div className="col-lg-12">
                                    <h2 className='title-course'>
                                        <FormattedMessage id="course.title01" /> <br />
                                        <FormattedMessage id="course.title02" />
                                    </h2>
                                    <p className='detail-title-course'>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </p>
                                </div>
                            </div>

                            <div className='content-courses'>
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
                                                            <div className="d-flex justify-content-between mb-20">
                                                                <p className="name-pro">programming language</p>
                                                                <p className="value-course">$150</p>
                                                            </div>
                                                            <span className='name-course'>

                                                                {e.name}

                                                            </span>
                                                            <div className="rate-course">
                                                                <ul className="list">
                                                                    <li>
                                                                        <i className="fa fa-star"></i>
                                                                    </li>
                                                                    <li>
                                                                        <i className="fa fa-star"></i>
                                                                    </li>
                                                                    <li>
                                                                        <i className="fa fa-star"></i>
                                                                    </li>
                                                                    <li>
                                                                        <i className="fa fa-star"></i>
                                                                    </li>
                                                                    <li>
                                                                        <i className="fa fa-star"></i>
                                                                    </li>
                                                                </ul>

                                                                <div className="number-rate">{Math.floor(Math.random() * 101) * 11}  <FormattedMessage id="course.reviews" /></div>
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

                    <div className="container-area" ref={this.refItem1}>
                        <>
                            {/* <div className="container-title">
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

                            </div> */}
                        </>
                        <div className="container size-consultant">
                            <div className="row align-items-center">
                                <div className="col-lg-5">
                                    <div className="section-title text-white">
                                        <h2 className="text-white title-consultant">
                                            <FormattedMessage id="consultant.title01" /> <br />
                                            <FormattedMessage id="consultant.title011" />
                                        </h2>
                                        <p className='des-consultant'>
                                            <FormattedMessage id="consultant.title02" />
                                        </p>
                                    </div>
                                </div>
                                <div className='offset-lg-1 col-md-6 video-left'>
                                    <Slider {...settingConsultant}>
                                        {
                                            dataConsultant && dataConsultant.length > 0 &&
                                            dataConsultant.map((e, index) => {
                                                if (e.image) {
                                                    var imgSpecialtyData = Buffer.from(e.image, 'base64').toString('binary');
                                                }
                                                return (
                                                    <div class="single-video" key={index}
                                                        onClick={() => this.changeDirectionToRemoteConsultant(e)}
                                                    >
                                                        <div class="video-part">
                                                            <img class="img-fluid img-consultant" src="https://www.studytienganh.vn/upload/2021/05/98707.jpg" />
                                                            <div class="overlay"></div>
                                                            <span class="popup-youtube play-btn">
                                                                <img class="play-icon" src="https://preview.colorlib.com/theme/eclipse/img/xplay-btn.png.pagespeed.ic.0u0c3c4gC2.webp" />
                                                            </span>
                                                        </div>
                                                        <h4 class="text-white name-consultant">{e.name}</h4>
                                                        <p class="text-white des-content-consultant">
                                                            <FormattedMessage id="consultant.title02" />
                                                        </p>
                                                    </div>
                                                )
                                            })

                                        }



                                    </Slider>
                                </div>
                            </div>

                        </div>
                    </div>



                    <div className='description-LE'>

                        <div class="bg-image bg-parallax overlay description-LE-img" ></div>

                        <div class="container">
                            <div class="row">
                                <div class="col-md-6">
                                    <h2 class="le-content1">Ceteros fuisset mei no, soleat epicurei adipiscing ne vis.</h2>
                                    <p class="lead ">Ceteros fuisset mei no, soleat epicurei adipiscing ne vis. Et his suas veniam nominati.</p>

                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="lecturers-outstanding" ref={this.refItem4}>
                        <>
                            {/* <div className='wavy-2'>

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

                            </div> */}
                        </>
                        <div className='container px-4'>
                            <div class="row row-lect-out">
                                <div class="col-md-8 text-center heading-section title-lect-out">
                                    <h2 class="mb-4 lect-out-title">
                                        <FormattedMessage id="container.lecturer" />
                                    </h2>
                                    <p>
                                        <FormattedMessage id="container.outstandingLecturers" />
                                    </p>
                                </div>
                            </div>
                            <Slider {...settingLectOut}>

                                {
                                    dataDoctor && dataDoctor.length > 0 &&
                                    dataDoctor.map((value, index) => {
                                        let imageDoctor;
                                        if (value.image) {

                                            imageDoctor = Buffer.from(value.image, 'base64').toString('binary');

                                        }
                                        let nameVi;
                                        let nameEn;
                                        let positionVi;
                                        let positionEn;
                                        if (!value.positionData.valueEn || !value.positionData.valueVi) {
                                            nameVi = `${value.lastName} ${value.firstName}`;
                                            nameEn = `${value.firstName} ${value.lastName}`;
                                            positionVi = value.positionid;
                                            positionEn = value.positionid;

                                        } else {
                                            nameVi = `${value.lastName} ${value.firstName}`;
                                            nameEn = `${value.firstName} ${value.lastName}`;
                                            positionVi = value.positionData.valueVi;
                                            positionEn = value.positionData.valueEn;

                                        }

                                        return (
                                            <div class="staff" key={index}
                                                onClick={() => this.onClickDoctorOutStanding(value)}
                                            >
                                                <div class="img-wrap d-flex align-items-stretch cotain-img">
                                                    <div class="img align-self-stretch img-staff "
                                                        style={{ backgroundImage: `url(${imageDoctor})` }}
                                                    ></div>
                                                </div>
                                                <div class="text pt-3 text-center">
                                                    <h3 className='name-position'>
                                                        {
                                                            language === languages.VI ? nameVi : nameEn
                                                        }
                                                    </h3>
                                                    <span class="position">
                                                        {
                                                            language === languages.VI ? positionVi : positionEn
                                                        }
                                                    </span>
                                                    <div class="faded">
                                                        <p>I am an ambitious workaholic,
                                                            but apart from that,
                                                            pretty simple person.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>

                        </div>
                    </div>


                    <div className="container-area-3" >
                        <div className='container'>
                            <div className='row'>
                                <div class="col-lg-12">
                                    <div class="section-title text-left">
                                        <h2 className='feature-title'>
                                            <FormattedMessage id="feature.header01" /> <br />
                                            <FormattedMessage id="feature.header02" />
                                        </h2>
                                        <p className='feature-detail'>
                                            If you are looking at blank cassettes on the web, you may be
                                            very confused at the difference in price. You may see some for
                                            as low as $.17 each.
                                        </p>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6">
                                    <div class="other-feature-item">
                                        <i class="fal fa-key-skeleton"></i>
                                        <h4>
                                            <FormattedMessage id="feature.content01" />
                                        </h4>
                                        <div className='feature-content'>
                                            <p>
                                                Lorem ipsum dolor sit amet consec tetur adipisicing elit, sed
                                                do eiusmod tempor incididunt labore. Lorem ipsum dolor sit
                                                amet consec tetur adipisicing elit, sed do eiusmod tempor
                                                incididunt labore.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6 mt--160">
                                    <div class="other-feature-item">
                                        <i class="far fa-file-alt"></i>
                                        <h4>
                                            <FormattedMessage id="feature.content02" />
                                        </h4>
                                        <div>
                                            <p>
                                                Lorem ipsum dolor sit amet consec tetur adipisicing elit, sed
                                                do eiusmod tempor incididunt labore. Lorem ipsum dolor sit
                                                amet consec tetur adipisicing elit, sed do eiusmod tempor
                                                incididunt labore.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6 mt--260">
                                    <div class="other-feature-item">
                                        <i class="fal fa-medal"></i>
                                        <h4>
                                            <FormattedMessage id="feature.content03" />
                                        </h4>
                                        <div>
                                            <p>
                                                Lorem ipsum dolor sit amet consec tetur adipisicing elit, sed
                                                do eiusmod tempor incididunt labore. Lorem ipsum dolor sit
                                                amet consec tetur adipisicing elit, sed do eiusmod tempor
                                                incididunt labore.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6">
                                    <div class="other-feature-item">
                                        <i class="fal fa-briefcase"></i>
                                        <h4>
                                            <FormattedMessage id="feature.content04" />
                                        </h4>
                                        <div>
                                            <p>
                                                Lorem ipsum dolor sit amet consec tetur adipisicing elit, sed
                                                do eiusmod tempor incididunt labore. Lorem ipsum dolor sit
                                                amet consec tetur adipisicing elit, sed do eiusmod tempor
                                                incididunt labore.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6 mt--160">
                                    <div class="other-feature-item">
                                        <i class="fal fa-crown"></i>
                                        <h4>
                                            <FormattedMessage id="feature.content05" />
                                        </h4>
                                        <div>
                                            <p>
                                                Lorem ipsum dolor sit amet consec tetur adipisicing elit, sed
                                                do eiusmod tempor incididunt labore. Lorem ipsum dolor sit
                                                amet consec tetur adipisicing elit, sed do eiusmod tempor
                                                incididunt labore.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6 mt--260">
                                    <div class="other-feature-item">
                                        <i class="fal fa-headphones"></i>
                                        <h4>
                                            <FormattedMessage id="feature.content06" />
                                        </h4>
                                        <div>
                                            <p>
                                                Lorem ipsum dolor sit amet consec tetur adipisicing elit, sed
                                                do eiusmod tempor incididunt labore. Lorem ipsum dolor sit
                                                amet consec tetur adipisicing elit, sed do eiusmod tempor
                                                incididunt labore.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='map-area' ref={this.refItem3}>
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
