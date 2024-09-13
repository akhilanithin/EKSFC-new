import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { connect } from 'react-redux';

import ALink from '~/components/features/custom-link';

import { cartActions } from '~/store/cart';
import { modalActions } from '~/store/modal';
import { wishlistActions } from '~/store/wishlist';
import 'react-lazy-load-image-component/src/effects/opacity.css';

import { toDecimal } from '~/utils';

function ProductTwo(props) {

    const { product, adClass = 'text-center', toggleWishlist, wishlist, addToCart, openQuickview, isCategory = true } = props;

// console.log(product?.variation.length);




    const PRODUCT_IMAGE_BASEURL = process.env.NEXT_PUBLIC_PRODUCT_IMAGE_BASEURL;


    const getPrice = () => {
        // Check if product has variations
        if (product.variation && product.variation.length > 0) {
            const variation = product.variation[0];


            // Check if the variation has offers
            if (variation.offers && variation.offers.length > 0) {
                const offerPrice = variation.offers[0].price;
                return offerPrice


            }

            // Return the price from the variation if no offers are present
            const originalPrice = variation.price
            return originalPrice;
        }

        // Fallback if no variations are present
        return 'Price not available';
    };




    {/* 
https://admin.essentialkonjacskinfoods.com/assets/img/products/1722234980697-lumos-accne.jpg */}




    var categories = Array.isArray(product?.category) ? product?.category : [product?.category];


    // decide if the product is wishlisted
    let isWishlisted;
    isWishlisted = wishlist.findIndex(item => item?.id === product?.id) > -1 ? true : false;




    const showQuickviewHandler = () => {
        openQuickview(product?.id);
    }

    const wishlistHandler = (e) => {



        if (toggleWishlist) {
            toggleWishlist(product);
        }

        e.preventDefault();
        let currentTarget = e.currentTarget;
        currentTarget.classList.add('load-more-overlay', 'loading');

        setTimeout(() => {
            currentTarget.classList.remove('load-more-overlay', 'loading');
        }, 1000);

    }




    const addToCartHandler = (e) => {
        e.preventDefault();
        // console.log(e.preventDefault());
        addToCart({ ...product, qty: 1, price: getPrice() });
    }



  // Calculate the average star rating
  const averageStarRating = () => {
    
    var ratings = Array.isArray(product?.review) ? product?.review : [product?.review];
    var ratingContainer =ratings.map((index,item) => ({ index, item }))
    const totalStars = ratingContainer.reduce((sum, review) => sum + review.index.star, 0);
    const numberOfReviews = ratingContainer.length;
    return (totalStars / numberOfReviews).toFixed(2); 
  };


//   console.log(product?.review.length);
const variations = Array.isArray(product.variation) ? product.variation : [product.variation];
const getDiscounts = () => variations.flatMap(variation => variation.offers || []);
const discounts = getDiscounts();
const discount = discounts.length > 0 ? discounts[0] : null;
const discountValue = discount ? discount.discount : 0;
const discountPrice = discount ? discount.price : null;
const basePrice = variations[0]?.price || 0;
const showDiscountedPrice = discountPrice && discountPrice < basePrice;

    return (


        <>
            {/* full grid */}


            <div className={`product text-left ${adClass}`} >

                {/* image Field */}


                <figure className="product-media">
                    <ALink href={`/product/default/${product?.id}`}>

                        <LazyLoadImage
                            alt="product"
                            src={`${PRODUCT_IMAGE_BASEURL}/products/${product?.image}`}
                            threshold={500}
                            effect="opacity"
                            width='300'
                            height="338"
                        />


                        {
                            product?.variation.length >= 2 ?

                                <video
                                    loop
                                    // muted
                                    autoPlay
                                    playsInline
                                    className="video-tag"
                                    poster=""
                                    width='300'
                                    height="338"

                                >
                                    <source src="https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                : ""
                        }
{/* 

                        <video
                            loop
                            muted
                            autoPlay
                            playsInline
                            className="video-tag"
                            poster=""
                            width='300'
                            height="338"

                        >
                            <source src="https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>  */}

                    </ALink>


                    {/* Label New & Sales */}


                    <div className="product-label-group">

                        {product.fresharrival === 0 ? <label className="product-label label-new">New</label> : ''}

                    
                            {
                               product?.variation ?
                                    <div>
                                        {product?.variation.map((item, index) => (
                                          

                                            item?.offers.length > 0 && item?.offers ?
                                                product.variation.length === 0 ?

                                                    <label className="product-label label-sale">{item?.offers[0]?.discount} % OFF</label>
                                                    : <label className="product-label label-sale">Sale</label>
                                                : ''


                                     

                                        ))}
                                    </div>


                                    : ""
                            }

                        





                        

                    </div>




                    {/* Addto cart & Wishlisted */}


                    <div className="product-action-vertical">

                        {/* Add to cart */}


                        {/* correct  logic */}

                        {
                            product.variation.length > 1 ?

                                <ALink href={`/product/default/${product?.id}`} className="btn-product-icon btn-cart" title="Go to product">
                                    <i className="d-icon-arrow-right"></i>
                                </ALink> :
                                <a href="#" className="btn-product-icon btn-cart" title="Add to cart" onClick={addToCartHandler}>
                                    <i className="d-icon-bag"></i>
                                </a>
                        }




                        {/* wishlist */}


                        <a href="#" className="btn-product-icon btn-wishlist" title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'} onClick={wishlistHandler}>
                            <i className={isWishlisted ? "d-icon-heart-full" : "d-icon-heart"}></i>
                        </a>
                    </div>


                    {/* Quick View */}


                    <div className="product-action">
                        <ALink href={`/product/default/${product?.id}`} className="btn-product btn-quickview" title="Quick View" onClick={showQuickviewHandler}>Quick View</ALink>
                    </div>

                </figure>


                {/* Product Details */}


                <div className="product-details">
                    {/* Category */}

                    {
                        isCategory ?


                            <div className="product-cat">
                                {
                                    product.category ?
                                        <div>
                                            {categories?.map((item, index) => (

                                                <React.Fragment key={index}>
                                                    <ALink href={{ pathname: '/shop', query: { category: item?.name } }}>
                                                        {item?.name}
                                                        {/* {index < product.category.length - 1 ? ', ' : ""} */}
                                                    </ALink>
                                                </React.Fragment>

                                            ))}
                                        </div>


                                        : ""
                                }

                            </div> : ""


                    }

                    {/* Product Name */}


                    <h3 className="product-name">
                        <ALink href={`/product/default/${product?.id}`}>{product?.name}</ALink>
                    </h3>



                    {/* Product Price  */}


                    <div className="product-price">

                    {showDiscountedPrice ? (
                        <>
                            <del className="old-price"> AED {toDecimal(basePrice)}</del>
                            <ins className="new-price"> AED {toDecimal(discountPrice)}</ins>
                        </>
                    ) : (
                        <ins className="new-price">AED {toDecimal(basePrice)}</ins>
                        
                    )}


                    </div>




                    {/* ratings */}

                    <div className="ratings-container">
                        {
                            product?.review ?
                                <div>

                                    <div className="ratings-full">
                                        {averageStarRating() > 0 ?

                                            <span className="ratings" style={{ width: 20 * averageStarRating() + '%' }}></span> : []
                                        }
                                        <span className="tooltiptext tooltip-top"> averageStarRating()</span>
                                    </div>


                                </div>

                                : ""
                        }

                        {product?.review.length ? <ALink href={`/product/default/${product?.id}`} className="rating-reviews">( {product?.review.length} reviews )</ALink> : ''}
                      

                    </div>

                </div>



            </div>

        </>



    )
}

function mapStateToProps(state) {
    return {
        wishlist: state.wishlist.data ? state.wishlist.data : []
    }
}

export default connect(mapStateToProps, { toggleWishlist: wishlistActions.toggleWishlist, addToCart: cartActions.addToCart, ...modalActions })(ProductTwo);