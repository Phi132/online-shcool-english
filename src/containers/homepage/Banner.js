import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Banner.scss';
import { FormattedMessage } from 'react-intl';
import { changeLanguageApp } from '../../store/actions';
import { languages } from '../../utils/constant';

class HeaderHome extends Component {


    constructor(props) {
        super(props);
        this.state = {
            banner1: true,
            banner2: false,
        }
    }

    changeLanguageClick = (language) => {
        this.props.changeLanguageApp(language)
    }
    clickNext = () => {
        this.setState({
            banner1: false,
            banner2: true,
        })
    }
    clickPrev = () => {
        this.setState({
            banner1: true,
            banner2: false,
        })
    }
    clickItem2 = () => {
        if (this.props.refItem2) {
            this.props.refItem2.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
        }
    }

    render() {
        var language = this.props.language;
        var { banner1, banner2 } = this.state;
        return (
            <React.Fragment>
                <div className='container-main-banner'>
                    <div className='main-banner'>
                        <div className="banner-area"
                            style={banner2 ? {
                                "animation": "banner2-active 0.3s linear",
                                "transform": "translateX(-100%)"
                            } :
                                {
                                    "animation": "banner1-active 0.3s linear",
                                    "transform": "translateX(0%)"
                                }}
                        >
                            <div className='arrow-next' onClick={() => this.clickNext()}>
                                <i className="fas fa-chevron-right"></i>
                            </div>
                            <div className="banner--overlay">
                                <div className="banner-container">
                                    <ul className="banner-content">
                                        <li className="banner-item-1">
                                            <div className="title-1-item-1">
                                                <span>
                                                    <FormattedMessage
                                                        id="header.title1"
                                                    />
                                                </span>

                                            </div>
                                            <div className="title-2-item-2">
                                                <span>
                                                    <FormattedMessage
                                                        id="header.title2"
                                                    />
                                                </span>

                                            </div>
                                        </li>
                                        <li className="banner-item-2">


                                        </li>
                                        <li className="banner-item-3">

                                        </li>
                                        <li className="banner-item-4">

                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>

                        <div className="banner-area-2"
                            style={banner1 ? {
                                "animation": "banner1-active 0.3s linear",
                                "transform": "translateX(0%)"
                            } :
                                {
                                    "animation": "banner2-active 0.3s linear",
                                    "transform": "translateX(-100%)"
                                }}

                        >
                            <div className='arrow-prev' onClick={() => this.clickPrev()}>
                                <i className="fas fa-chevron-left"></i>
                            </div>
                            <div className="banner--overlay">
                                <div className="banner-container">
                                    <ul className="banner-content">
                                        <li className="banner-item-1">
                                            <div className="title-1-item-1">
                                                <span>
                                                    <FormattedMessage
                                                        id="header.title1"
                                                    />
                                                </span>

                                            </div>
                                            <div className="title-2-item-2">
                                                <span>
                                                    <FormattedMessage
                                                        id="header.title2"
                                                    />
                                                </span>

                                            </div>
                                        </li>
                                        <li className="banner-item-2">


                                        </li>
                                        <li className="banner-item-3">

                                        </li>
                                        <li className="banner-item-4">

                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


                <div className='option-learning'>
                    <div className='header-option'>
                        <div className='header-option-1'>
                            <FormattedMessage id="header.banner.ourCourses" />
                        </div>
                        <div className='header-option-2'>
                            <FormattedMessage id="header.banner.QualityOurCourses" />
                        </div>

                    </div>
                    <div className='container-option'>
                        <div className='content-option'>
                            <div className='content-option-item--1'>
                                <div className='iamge-option-1'>

                                </div>
                                <div className='name-option-1'>
                                    IELTS
                                </div>
                                <div className='describe-option-1'>
                                    Discover a wide variety of exclusive learning materials
                                    to support your preparation for the IELTS exam.
                                </div>
                                <div className='read-option-1'
                                    onClick={this.clickItem2}
                                >
                                    <div className='read-more-btn'>
                                        <div>
                                            <FormattedMessage id="header.banner.readMore" />
                                        </div>

                                    </div>
                                </div>

                            </div>
                            <div className='content-option-item--2'>
                                <div className='iamge-option-2'>

                                </div>
                                <div className='name-option-2'>
                                    IELTS
                                </div>
                                <div className='describe-option-2'>
                                    Discover a wide variety of exclusive learning materials
                                    to support your preparation for the IELTS exam.
                                </div>
                                <div className='read-option-2'
                                    onClick={this.clickItem2}
                                >
                                    <div className='read-more-btn'>
                                        <div>
                                            <FormattedMessage id="header.banner.readMore" />
                                        </div>

                                    </div>
                                </div>

                            </div>
                            <div className='content-option-item--3'>
                                <div className='iamge-option-3'>

                                </div>
                                <div className='name-option-3'>
                                    IELTS
                                </div>
                                <div className='describe-option-3'>
                                    Discover a wide variety of exclusive learning materials
                                    to support your preparation for the IELTS exam.
                                </div>
                                <div className='read-option-3'
                                    onClick={this.clickItem2}
                                >
                                    <div className='read-more-btn'>
                                        <div>
                                            <FormattedMessage id="header.banner.readMore" />
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='see-all-courses'
                            onClick={this.clickItem2}
                        >
                            <div className='content-see-all-course'>
                                <FormattedMessage id="header.banner.seeAllOurCourse" />
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageApp: (language) => dispatch(changeLanguageApp(language))

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(HeaderHome);

