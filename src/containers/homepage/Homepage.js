import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import HeaderHome from './HeaderHome';
import Banner from './Banner';
import Container from './Container';
import Footer from './Footer';
import ScrollTop from './ScrollTop';

class Homepage extends Component {

    constructor(props) {
        super(props);
        this.homeRef = React.createRef();
        this.state = {
            refItem1: '',
            refItem2: '',
            refItem3: '',
            refItem4: '',
        }
    }

    getRef = (ref1, ref2, ref3, ref4) => {
        this.setState({
            refItem1: ref1,
            refItem2: ref2,
            refItem3: ref3,
            refItem4: ref4,
        })
    }


    render() {
        var { refItem1, refItem2, refItem3, refItem4 } = this.state;

        return (
            <>
                <div className="home__page__container"
                    ref={this.homeRef}

                >
                    <ScrollTop />
                    <HeaderHome
                        refItem1={refItem1}
                        refItem2={refItem2}
                        refItem3={refItem3}
                        refItem4={refItem4}
                    />

                    <Banner
                        refItem2={refItem2}
                    />
                    <Container
                        getRef={this.getRef}
                    />
                    <Footer />

                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
