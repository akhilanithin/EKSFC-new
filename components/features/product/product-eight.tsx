import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { connect, ConnectedProps } from 'react-redux';

import ALink from '~/components/features/custom-link';

import { cartActions } from '~/store/cart';
import { modalActions } from '~/store/modal';
import { wishlistActions } from '~/store/wishlist';

import { toDecimal } from '~/utils';

interface Product {
    slug: string;
    name: string;
    pictures: { url: string }[];
    price: number[];
    categories: { name: string; slug: string }[];
    ratings: number;
    reviews: number;
    short_description: string;
    is_new?: boolean;
    is_top?: boolean;
    discount?: number;
    variants: { price?: number }[];
}

interface ProductEightProps {
    product: Product;
    adClass?: string;
    toggleWishlist?: (product: Product) => void;
    wishlist: Product[];
    addToCart: (product: Product) => void;
    openQuickview: (slug: string) => void;
}

const ProductEight: React.FC<ProductEightProps> = (props) => {
    const { product, adClass, toggleWishlist, wishlist, addToCart, openQuickview } = props;

    // decide if the product is wishlisted
    const isWishlisted = wishlist.some(item => item.slug === product.slug);

    const showQuickviewHandler = () => {
        openQuickview(product.slug);
    };

    const wishlistHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        if (toggleWishlist) {
            toggleWishlist(product);
        }

        const currentTarget = e.currentTarget;
        currentTarget.classList.add('load-more-overlay', 'loading');

        setTimeout(() => {
            currentTarget.classList.remove('load-more-overlay', 'loading');
        }, 1000);
    };

    const addToCartHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        addToCart({ ...product, qty: 1, price: product.price[0] });
    };

    return (
        <div className={`product product-list ${adClass} ${product.variants?.length > 0 ? 'product-variable' : ''}`}>
            <figure className="product-media">
                <ALink href={`/product/default/${product.slug}`}>
                    <LazyLoadImage
                        alt="product"
                        src={`${process.env.NEXT_PUBLIC_ASSET_URI}${product.pictures[0].url}`}
                        threshold={500}
                        effect="opacity"
                        width="300"
                        height="338"
                    />
                    {product.pictures.length >= 2 && (
                        <LazyLoadImage
                            alt="product"
                            src={`${process.env.NEXT_PUBLIC_ASSET_URI}${product.pictures[1].url}`}
                            threshold={500}
                            width="300"
                            height="338"
                            effect="opacity"
                            wrapperClassName="product-image-hover"
                        />
                    )}
                </ALink>

                <div className="product-label-group">
                    {product.is_new && <label className="product-label label-new">New</label>}
                    {product.is_top && <label className="product-label label-top">Top</label>}
                    {product.discount && (
                        <label className="product-label label-sale">
                            {product.variants.length === 0 ? `${product.discount}% OFF` : 'Sale'}
                        </label>
                    )}
                </div>
            </figure>

            <div className="product-details">
                <div className="product-cat">
                    {product.categories?.map((item, index) => (
                        <React.Fragment key={`${item.name}-${index}`}>
                            <ALink href={{ pathname: '/shop', query: { category: item.slug } }}>
                                {item.name}
                                {index < product.categories.length - 1 ? ', ' : ''}
                            </ALink>
                        </React.Fragment>
                    ))}
                </div>

                <h3 className="product-name">
                    <ALink href={`/product/default/${product.slug}`}>{product.name}</ALink>
                </h3>

                <div className="product-price">
                    {product.price[0] !== product.price[1] ? (
                        product.variants.length === 0 || (product.variants.length > 0 && !product.variants[0].price) ? (
                            <>
                                <ins className="new-price">${toDecimal(product.price[0])}</ins>
                                <del className="old-price">${toDecimal(product.price[1])}</del>
                            </>
                        ) : (
                            <del className="new-price">${toDecimal(product.price[0])} – ${toDecimal(product.price[1])}</del>
                        )
                    ) : (
                        <ins className="new-price">${toDecimal(product.price[0])}</ins>
                    )}
                </div>

                <div className="ratings-container">
                    <div className="ratings-full">
                        <span className="ratings" style={{ width: 20 * product.ratings + '%' }}></span>
                        <span className="tooltiptext tooltip-top">{toDecimal(product.ratings)}</span>
                    </div>

                    <ALink href={`/product/default/${product.slug}`} className="rating-reviews">
                        ( {product.reviews} reviews )
                    </ALink>
                </div>

                <p className="product-short-desc">{product.short_description}</p>

                <div className="product-action">
                    {product.variants.length > 0 ? (
                        <ALink href={`/product/default/${product.slug}`} className="btn-product btn-cart" title="Go to product">
                            <span>Select Options</span>
                        </ALink>
                    ) : (
                        <a href="#" className="btn-product btn-cart" title="Add to cart" onClick={addToCartHandler}>
                            <i className="d-icon-bag"></i>
                            <span>Add to cart</span>
                        </a>
                    )}
                    <a
                        href="#"
                        className="btn-product-icon btn-wishlist"
                        title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                        onClick={wishlistHandler}
                    >
                        <i className={isWishlisted ? 'd-icon-heart-full' : 'd-icon-heart'}></i>
                    </a>

                    <ALink href="#" className="btn-product-icon btn-quickview" title="Quick View" onClick={showQuickviewHandler}>
                        <i className="d-icon-search"></i>
                    </ALink>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    wishlist: state.wishlist.data || [],
});

const connector = connect(mapStateToProps, {
    toggleWishlist: wishlistActions.toggleWishlist,
    addToCart: cartActions.addToCart,
    ...modalActions,
});

export default connector(ProductEight);
