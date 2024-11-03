import React, { useEffect, useState } from 'react';
import OwlCarousel from '~/components/features/owl-carousel';
import { mainSlider15 } from '~/utils/data/carousel';

interface Picture {
    url: string;
}

interface ThumbTwoProps {
    product: {
        pictures: Picture[];
    };
    index?: number;
    onChangeIndex: (index: number) => void;
}

const ThumbTwo: React.FC<ThumbTwoProps> = (props) => {
    const { product, index = 0 } = props;
    const thumbs = product.pictures;




    const [thumbRef, setThumbRef] = useState<React.RefObject<any>>(null); // Adjust the type as needed

    useEffect(() => {
        if (thumbRef && index >= 0) {
            thumbRef.current.$car.to(index, 300, true);

            const activeThumb = document.querySelector('.product-thumbs .owl-stage .product-thumb.active');
            if (activeThumb) {
                activeThumb.classList.remove('active');
            }

            const newActiveThumb = document.querySelectorAll('.product-thumbs .owl-stage .owl-item')[index];
            if (newActiveThumb) {
                newActiveThumb.querySelector('.product-thumb')?.classList.add('active');
            }
        }
    }, [index, thumbRef]);

    const thumbActiveHandler = (e: React.MouseEvent<HTMLDivElement>, thumbIndex: number) => {
        props.onChangeIndex(thumbIndex);
        const activeThumb = document.querySelector('.product-thumbs .owl-stage .product-thumb.active');
        if (activeThumb) {
            activeThumb.classList.remove('active');
        }
        e.currentTarget.classList.add('active');
    };

    const changeRefHandler = (carRef: React.RefObject<any>) => {
        if (carRef.current && thumbRef === null) {
            setThumbRef(carRef);
        }
    };

    return (
        <div className="product-thumbs-wrap product-thumbs-two">
            {/* <OwlCarousel adClass="product-thumbs product-thumb-carousel" options={mainSlider15} onChangeRef={changeRefHandler}>
                {thumbs.map((thumb, index) => (
                    <div
                        className={`product-thumb ${index === 0 ? 'active' : ''}`}
                        onClick={(e) => thumbActiveHandler(e, index)}
                        key={`${thumb.url}-2-${index}`}
                    >
                        <img
                            src={`${process.env.NEXT_PUBLIC_ASSET_URI}${thumb.url}`}
                            alt="product thumbnail"
                            width="137"
                            height="137"
                        />
                    </div>
                ))}
            </OwlCarousel> */}
        </div>
    );
};

export default React.memo(ThumbTwo);
