import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { connect } from 'react-redux';

import ALink from '~/components/features/custom-link';

import { cartActions } from '~/store/cart';
import { modalActions } from '~/store/modal';
import { wishlistActions } from '~/store/wishlist';

// import { toDecimal } from '~/utils';

function ProductTwo(props) {

    const { product, adClass = 'text-center', toggleWishlist, wishlist, addToCart, openQuickview, isCategory = true } = props;

//    console.log(product);
   


    // console.log(product?.category);
    // console.log(typeof(product?.category));


    // find the value of category
        // Convert object entries to an array of objects with 'key' and 'value'
        var formattedArray = Object.entries(product?.category).map(([key, value]) => ({ key, value }));
        var createdOnEntry = formattedArray.find(item => item.key === "name");     
        var categoryValue = createdOnEntry ? createdOnEntry.value : "other";
        // console.log(categoryValue);
        


        // find the value of discount  
    const discount = product?.variation[0].offers ?product?.variation[0].offers:[]   
    var discountArray = Object.entries(discount).map(([key, value]) => ({ key, value }))



    // decide if the product is wishlisted
    let isWishlisted;
    isWishlisted = wishlist.findIndex(item => item?.name === product?.name) > -1 ? true : false;



 
    

    const showQuickviewHandler = () => {
        openQuickview(product?.name);
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
        addToCart({ ...product, qty: 1, price: "5000" });
        
    }



    return (


        <>

            <div className={`product text-left ${adClass}`}>
                <figure className="product-media">

                    <ALink href={ `/product/default/${ product.name }` }>
                        <LazyLoadImage
                            alt="product"
                            src={`https://admin.essentialkonjacskinfoods.com/assets/img/products/${product?.image}`}
                            threshold={500}
                            effect="opacity"
                            width="300"
                            height="338"
                        />

            {/* {
                product.pictures.length >= 2 ?
                    <LazyLoadImage
                        alt="product"
                        src={process.env.NEXT_PUBLIC_ASSET_URI + product.pictures[1].url}
                        threshold={500}
                        width="300"
                        height="338"
                        effect="opacity"
                        wrapperClassName="product-image-hover"
                    />
                    : ""
            }  */}

        </ALink>



        <div className="product-label-group">
            {product.fresharrival === 1 ? <label className="product-label label-new">New</label> : ''}
            {product?.trending === 1 ? <label className="product-label label-top">Trending</label> : ''}
 


                        {
                            discountArray.length > 0 && discountArray[0].value?
                                product.variation.length === 0 ?
                                    <label className="product-label label-sale">{discountArray[0].value.discount} % OFF</label>
                                    : <label className="product-label label-sale">Sale</label>
                                : ''
                        }
        </div>


                    <div className="product-action-vertical">
        
                        {
                            product.variation.length > 0 ?
                                <ALink href={`http://localhost:3000/product/default/${product?.name}`} className="btn-product-icon btn-cart" title="Go to product">
                                    <i className="d-icon-arrow-right"></i>
                                </ALink> :
                                <a href="#" className="btn-product-icon btn-cart" title="Add to cart" onClick={addToCartHandler}>
                                    <i className="d-icon-bag"></i>
                                </a>
                        }
                        <a href="#" className="btn-product-icon btn-wishlist" title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'} onClick={wishlistHandler}>
                            <i className={isWishlisted ? "d-icon-heart-full" : "d-icon-heart"}></i>
                        </a>
                    </div>

        <div className="product-action">
        <ALink href="#" className="btn-product btn-quickview" title="Quick View" onClick={ showQuickviewHandler }>Quick View</ALink>
        </div>
    </figure>

    <div className="product-details">

                    {
                        isCategory ?
                            <div className="product-cat">
                                <React.Fragment key={categoryValue}>
                                    <ALink href={{ pathname: '/shop', query: { category: categoryValue } }}>
                                    {categoryValue}
                                        {/* {index < product.category.length - 1 ? ', ' : ""} */}
                                    </ALink>
                                </React.Fragment>
                            </div> : ""
                    }

        <h3 className="product-name">
            <ALink href={`http://localhost:3000/product/default/${product?.name}`}>{product?.name}</ALink>
        </h3>

        <div className="product-price">
            {/* {
                product.price[0] !== product.price[1] ?
                    product.variants.length === 0 || (product.variants.length > 0 && !product.variants[0].price) ?
                        <>
                            <ins className="new-price">${toDecimal(product.price[0])}</ins>
                            <del className="old-price">${toDecimal(product.price[1])}</del>
                        </>
                        :
                        < del className="new-price">${toDecimal(product.price[0])} – ${toDecimal(product.price[1])}</del>
                    : <ins className="new-price">${toDecimal(product.price[0])}</ins>
            } */}
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