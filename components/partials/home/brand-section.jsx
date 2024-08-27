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
                            
                            // <figure className="brand">
                            //     <img src={`https://admin.essentialkonjacskinfoods.com/assets/img/products/${product?.image} alt="Brand" width="125" height="53" />
                            // </figure>

                        ))}
                

                    {/* <figure className="brand">
                        <img src="images/home/brands/1.png" alt="Brand" width="125" height="53" />
                    </figure>
                    <figure className="brand">
                        <img src="images/home/brands/2.png" alt="Brand" width="104" height="56" />
                    </figure>
                    <figure className="brand">
                        <img src="images/home/brands/3.png" alt="Brand" width="117" height="31" />
                    </figure>
                    <figure className="brand">
                        <img src="images/home/brands/4.png" alt="Brand" width="139" height="58" />
                    </figure>
                    <figure className="brand">
                        <img src="images/home/brands/5.png" alt="Brand" width="123" height="36" />
                    </figure>
                    <figure className="brand">
                        <img src="images/home/brands/6.png" alt="Brand" width="113" height="36" />
                    </figure>
                    <figure className="brand">
                        <img src="images/home/brands/7.png" alt="Brand" width="144" height="43" />
                    </figure> */}



                </OwlCarousel>
            </section>
        </Reveal>
    )
}

export default React.memo(BrandSection);