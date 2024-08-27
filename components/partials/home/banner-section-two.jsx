import Reveal from "react-awesome-reveal";
import { LazyLoadImage } from 'react-lazy-load-image-component';

// import Custom Components
import ALink from '~/components/features/custom-link';
import OwlCarousel from '~/components/features/owl-carousel';

import { bannerSlider } from '~/utils/data/carousel';
import { fadeIn, fadeInLeftShorter } from '~/utils/data/keyframes';

export default function BannerSectionTwo() {
    return (
        <section className="banner-section2 pb-4 pt-5 mt-10">
            <div className="container mt-10 pt-6 mt-md-0 pt-md-0">
                <div className="row gutter-md">
                    <div className="banner">
                        <div className="banner-content pt-lg-9 y-50">
                            <Reveal keyframes={fadeIn} delay={300} duration={1000} triggerOnce>
                                <div className="title-wrapper mt-1">
                                    <h2 className="text-left title">Our Amazing People</h2>
                                    <span className="badge">Who We Are</span>
                                </div>
                            </Reveal>
                            <p className="banner-desc">
                                Lorem ipsum dolor sit amet, consectetur adipiscing eli blandit massa im. Nullam
                                id
                                varius nunc. Vivamus bibendum mex, et faucibus lacus venena bibe...
                        </p>
                            <ALink className="btn btn-link btn-underline btn-dark" href="/shop">Learn more<i className="d-icon-arrow-right"></i></ALink>
                        </div>
                    </div>
                    <div className="banner-image-wrapper overflow-hidden">
                        <Reveal keyframes={fadeInLeftShorter} delay={600} duration={1000} triggerOnce>
                            <OwlCarousel adClass="banner-carousel owl-theme owl-shadow-carousel" options={bannerSlider}>
                                <div className="image-box overlay-dark">
                                    <figure>
                                        <LazyLoadImage
                                            src="./images/home/banner/2.jpg"
                                            alt="banner"
                                            effect="opacity"
                                            width="240"
                                            height="320"
                                        />
                                    </figure>
                                    <div className="text-center">
                                        <p>Lorem ipsum dolor
                                        sit amet, consectetur
                                        adipiscing elit.
                                        Duis nec vestibulum
                                        magna, et dapibus
                                    lacus. </p>
                                    </div>
                                </div>
                                <div className="image-box overlay-dark">
                                    <figure>
                                        <LazyLoadImage
                                            src="./images/home/banner/3.jpg"
                                            alt="banner"
                                            effect="opacity"
                                            width="240"
                                            height="320"
                                        />
                                    </figure>
                                    <div className="text-center">
                                        <p>Lorem ipsum dolor
                                        sit amet, consectetur
                                        adipiscing elit.
                                        Duis nec vestibulum
                                        magna, et dapibus
                                    lacus. </p>
                                    </div>
                                </div>
                                <div className="image-box overlay-dark">
                                    <figure>
                                        <LazyLoadImage
                                            src="./images/home/banner/4.jpg"
                                            alt="banner"
                                            effect="opacity"
                                            width="240"
                                            height="320"
                                        />
                                    </figure>
                                    <div className="text-center">
                                        <p>Lorem ipsum dolor
                                        sit amet, consectetur
                                        adipiscing elit.
                                        Duis nec vestibulum
                                        magna, et dapibus
                                    lacus. </p>
                                    </div>
                                </div>
                            </OwlCarousel>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    )
}