import React, { Component, createRef } from 'react';
import './ScrollTop.scss';

class ScrollTop extends Component {

    constructor(props) {
        super(props);
        this.arrow = createRef();
    }

    componentDidMount() {
        window.addEventListener('scroll', this.displayArrow);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.displayArrow);
    }

    displayArrow = () => {
        if (window.pageYOffset <= 20) {
            this.arrow.current.classList.add("noneArrow");
        } else {
            this.arrow.current.classList.remove("noneArrow");
        }
    }

    backToTop = () => {
        window.scrollTo(0,0);
    }

    render() {
        return (

            <div className='backToTop' ref={this.arrow}
                onClick={this.backToTop}
            >
                <i class="fas fa-angle-up"></i>
            </div>
        )


    }
}
export default ScrollTop;