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








    // find the value of category
    // Convert object entries to an array of objects with 'key' and 'value'
    var formattedArray = Object.entries(product?.category).map(([key, value]) => ({ key, value }));
    var createdOnEntry = formattedArray.find(item => item.key === "name");
    var categoryValue = createdOnEntry ? createdOnEntry.value : "other";
    // console.log(categoryValue);



    // find the value of discount  
    const discount = product?.variation[0].offers ? product?.variation[0].offers : []
    var discountArray = Object.entries(discount).map(([key, value]) => ({ key, value }))



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
        console.log(e.preventDefault());
        addToCart({ ...product, qty: 1, price: getPrice() });
    }

    return (


        <>
            {/* full grid */}


            <div className={`product text-left ${adClass}`} >

                {/* image Field */}


                <figure className="product-media">
                    <ALink href={`/product/default/${product?.id}`}>
                        <div>
                            <LazyLoadImage
                                alt="product"
                                src={`${PRODUCT_IMAGE_BASEURL}/products/${product?.image}`}
                                threshold={500}
                                effect="opacity"
                                width='300'
                                height="338"
                            />
                        </div>
                    </ALink>


                    {/* Label New & Sales */}


                    <div className="product-label-group">

                        {product.fresharrival === 0 ? <label className="product-label label-new">New</label> : ''}

                        {/* {product?.trending === 0 ? <label className="product-label label-top">Trending</label> : ''} */}

                        {
                            discountArray.length > 0 && discountArray[0].value ?
                                product.variation.length === 0 ?
                                    <label className="product-label label-sale">{discountArray[0].value.discount} % OFF</label>
                                    : <label className="product-label label-sale">Sale</label>
                                : ''
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

                                        <React.Fragment key={categoryValue}>
                                            <ALink href={{ pathname: '/shop', query: { category: categoryValue } }}>
                                                {categoryValue}
                                                {/* {index < product.category.length - 1 ? ', ' : ""} */}
                                            </ALink>
                                        </React.Fragment>

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

                        {/* <div>
                            <h6>Price: AED{getPrice()}</h6>
                        </div>  */}


                        {
                            product.variation[0].price !== getPrice() ?
                                product?.variation.length === 0 || (product?.variation.length > 0 && !product.variation[0].price) ?
                                    <>
                                        <ins className="new-price">AED {toDecimal(getPrice())}</ins>
                                        <del className="old-price">AED {toDecimal(product.variation[0].price)}</del>
                                    </>
                                    :
                                    <>
                                        < del className="old-price">AED{toDecimal(product.variation[0].price)} </del>
                                        <ins className="new-price">AED {toDecimal(getPrice())}</ins>

                                    </>
                                : <ins className="new-price">AED{toDecimal(product.variation[0].price)}</ins>
                        }

                    </div>






                    <div className="ratings-container">
                        {/* <div className="ratings-full">
                <span className="ratings" style={{ width: 20 * product.ratings + '%' }}></span>
                <span className="tooltiptext tooltip-top">{product.ratings}</span>
            </div> */}

                        {/* <ALink href={`/product/default/${product.name}`} className="rating-reviews">( {product.reviews} reviews )</ALink> */}
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