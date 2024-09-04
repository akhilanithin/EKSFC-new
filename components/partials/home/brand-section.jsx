import React from 'react';
import Reveal from 'react-awesome-reveal';

import OwlCarousel from '~/components/features/owl-carousel';

import { brandSlider } from '~/utils/data/carousel';
import { fadeIn } from '~/utils/data/keyframes';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function BrandSection(props) {
 
    const{products,loading}=props

    console.log(products?.data.brands.img);


    
    return (
        <Reveal keyframes={fadeIn} duration={1200} delay={300} triggerOnce>
            <section className="brand-section pb-10">
                <h2 className="title d-none">Our Brand</h2>

                <OwlCarousel adClass="owl-theme brand-carousel" options={brandSlider}>

                        {products?.data.brands && products?.data.brands.map((item,index) => (
                            
                            <LazyLoadImage
                            alt="brand"
                            src={`https://admin.essentialkonjacskinfoods.com/assets/img/brands/${item?.img}`}
                            threshold={500}
                            effect="opacity"
                            width="125"
                            height="53"
                            key={index}
                        />

                        ))}

                </OwlCarousel>
            </section>
        </Reveal>
    )
}

export default React.memo(BrandSection);