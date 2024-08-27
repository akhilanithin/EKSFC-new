import Reveal from 'react-awesome-reveal';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import OwlCarousel from '~/components/features/owl-carousel';

import { fadeIn } from '~/utils/data/keyframes';
import { mainSlider5 } from '~/utils/data/carousel';

export default function Instagram() {
    return (
        <section className="instagram-section pt-lg-10 pb-8">
            <Reveal keyframes={fadeIn} delay={300} duration={1000} triggerOnce>
                <div className="container pb-8 pt-8">
                    <Reveal keyframes={fadeIn} delay={300} duration={1000} triggerOnce>
                        <div className="title-wrapper mb-5 mt-1">
                            <h2 className="text-left title with-link">Our Instagram</h2>
                            <span className="badge">Featured</span>
                        </div>
                    </Reveal>
                    <OwlCarousel adClass="owl-theme brand-carousel" options={mainSlider5}>
                        <figure className="instagram">
                            <a href="#">
                                <LazyLoadImage
                                    src="./images/home/instagram/1.jpg"
                                    alt="brand"
                                    effect="opacity"
                                    width="280"
                                    height="280"
                                />
                            </a>
                        </figure>
                        <figure className="instagram">
                            <a href="#">
                                <LazyLoadImage
                                    src="./images/home/instagram/2.jpg"
                                    alt="brand"
                                    effect="opacity"
                                    width="280"
                                    height="280"
                                />
                            </a>
                        </figure>
                        <figure className="instagram">
                            <a href="#">
                                <LazyLoadImage
                                    src="./images/home/instagram/3.jpg"
                                    alt="brand"
                                    effect="opacity"
                                    width="280"
                                    height="280"
                                />
                            </a>
                        </figure>
                        <figure className="instagram">
                            <a href="#">
                                <LazyLoadImage
                                    src="./images/home/instagram/4.jpg"
                                    alt="brand"
                                    effect="opacity"
                                    width="280"
                                    height="280"
                                />
                            </a>
                        </figure>
                    </OwlCarousel>
                </div>
            </Reveal>
        </section>
    )
}