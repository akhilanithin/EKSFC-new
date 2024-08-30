import Reveal from "react-awesome-reveal";
import { useRef, useEffect, useState } from "react";

import OwlCarousel from '~/components/features/owl-carousel';
import { productSlider2 } from '~/utils/data/carousel';

// import Custom Components
import ALink from '~/components/features/custom-link';
import ProductTwo from '~/components/features/product/product-two';

import { fadeIn } from '~/utils/data/keyframes';

import FeaturedCollection from './featured-collection';



export default function ProductCollection(props) {
const {data,loading}=props
    

    const ref = useRef();
    let iso;

  
    useEffect(() => {
        if (data?.data.trendingCategories) {
            createIso();
        }
    }, [data?.data.trendingCategories]);

    async function createIso() {
        await isotopeLoad();
        isoFilter(null, 'all'); // Default to showing all items
    }

    async function isotopeLoad() {
        const Isotope = (await import('isotope-layout')).default;
        iso = new Isotope(ref.current, {
            itemSelector: '.grid-item',
            layoutMode: 'masonry',
            masonry: {
                columnWidth: ''
            }
        });
    }

    function isoFilter(e, cat) {

        // console.log(cat);
        

        if (e) {
            e.preventDefault();
            e.currentTarget.closest('.nav-filters').querySelector('.active').classList.remove('active');
            e.currentTarget.classList.add('active');
        }
        if (iso) {
            iso.arrange({
                filter: function (index, itemElem) {

               
                 
                    if (cat === 'all') return true;
                    return itemElem.classList.contains(cat.split(' ')[0]);
                }
            });
        }
    }

    function getProductCategory(product) { 
        // Convert object entries to an array of objects with 'key' and 'value'
        var formattedArray = Object.entries(product?.category).map(([key, value]) => ({ key, value }));
        var createdOnEntry = formattedArray.find(item => item.key === "name");     
        var categoryValue = createdOnEntry ? createdOnEntry.value : "other";
        
        // console.log(categoryValue);
        
        return categoryValue
    }
  

    return (
     
        <div className="product-filter-section container pt-10 mt-10 pb-8">
            <Reveal keyframes={fadeIn} delay={200} duration={300} triggerOnce>
                <div className="title-wrapper mt-1">
                    <h2 className="text-left title with-link">
                    Trending products
                        <ALink href="/shop">View All Products<i className="d-icon-arrow-right"></i></ALink>
                    </h2>

                    <span className="badge">Featured</span>
                </div>
            </Reveal>
            <div className="row">
                <div className="col-md-3 mb-6 mb-md-0">
                    <div className="nav-filters">
                        <ul className="nav-filters product-filters mr-0">
                            <li><a href="#" className="nav-filter active" onClick={e => isoFilter(e, 'all')}>All</a></li>
                            {data?.data.trendingCategories.map((category, index) => (
                                <li key={index}>
                                    <a href="#" className="nav-filter" onClick={e => isoFilter(e, category.name)}>{category.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="row grid" id="products-grid" ref={ref}>
                        {loading ?
                            [1, 2, 3, 4, 5, 6].map(item => (
                                <div className="grid-item col-md-4 col-6" key={'loading-' + item}>
                                    <div className="product-loading-overlay"></div>
                                </div>
                            ))
                            :
                            data?.data.trending && data?.data.trending.map((item, index) => (  
                                
                                item?.feature?  <div className={`grid-item col-md-4 col-6 ${getProductCategory(item)}`} key={`product-${index}`}>
                                    <ProductTwo adClass="shadow-product text-center mb-2" product={item} />
                                </div>:[]
                            ))

                        }
                       
                    </div>
                </div>
            </div>
        </div>    

    );
}
