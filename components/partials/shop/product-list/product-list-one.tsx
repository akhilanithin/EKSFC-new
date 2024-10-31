import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/react-hooks';
import { Col, Row, Card, Button, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import useFetch from "~/components/partials/shop/hooks/useFetch";
import withApollo from '~/server/apollo';
import ProductTwo from '~/components/features/product/product-two';
import ProductEight from '~/components/features/product/product-eight';
import Pagination from '~/components/features/pagination';
import { GET_PRODUCTS } from '~/server/queries';

function ProductListOne(props) {
    const { itemsPerRow = 3, type = "left", isToolbox = true } = props;
    const router = useRouter();
    const query = router.query;
    const gridType = query.type ? query.type : 'grid';
    const gridClasses = {
        3: "cols-2 cols-sm-3",
        4: "cols-2 cols-sm-3 cols-md-4",
        5: "cols-2 cols-sm-3 cols-md-4 cols-xl-5",
        6: "cols-2 cols-sm-3 cols-md-4 cols-xl-6",
        7: "cols-2 cols-sm-3 cols-md-4 cols-lg-5 cols-xl-7",
        8: "cols-2 cols-sm-3 cols-md-4 cols-lg-5 cols-xl-8"
    };

    const productURL = process.env.NEXT_PUBLIC_PRODUCT_URL || '';
    const productToken = process.env.NEXT_PUBLIC_PRODUCT_TOKEN || '';
    const { data, loading, error } = useFetch(productURL, productToken);
    const products = data?.data;





    const [getProducts] = useLazyQuery(GET_PRODUCTS);

    useEffect(() => {
        getProducts({
            variables: {
                search: query.search,
                colors: query.colors ? query.colors.split(',') : [],
                sizes: query.sizes ? query.sizes.split(',') : [],
                brands: query.brands ? query.brands.split(',') : [],
                min_price: parseInt(query.min_price),
                max_price: parseInt(query.max_price),
                category: query.category,
                tag: query.tag,
                sortBy: query.sortby,
                from: perPage * (page - 1),
                to: perPage * page
            }
        });
    }, [query]);

    function filterActiveProducts(products) {
        return products?.filter(item => !item?.status) || [];
    }

    const filteredProducts = filterActiveProducts(products);
    const perPage = query.per_page ? parseInt(query.per_page) : 12;
    const page = query.page ? parseInt(query.page) : 1;

    // Calculate total pages
    const totalPage = Math.ceil(filteredProducts.length / perPage);

    // Slice filtered products for the current page
    const displayedProducts = filteredProducts.slice((page - 1) * perPage, page * perPage);

    // Display loading indicator
    if (loading) {
        return <Spinner animation="border" variant="primary" style={{ margin: "100px auto", display: "block" }} />;
    }

    // Handle error state
    if (error) {
        return <p className="text-danger fw-bolder fs-4">Error: {error.message}</p>;
    }

    return (
        <>

        {/* Toolbox */}
            {isToolbox ? <ToolBox type={type} /> : ''}




            {
                loading ?
                    gridType === 'grid' ?
                        <div className={`row product-wrapper ${gridClasses[itemsPerRow]}`}>
                            {
                                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) =>
                                    <div className="product-loading-overlay" key={'popup-skel-' + item}></div>
                                )
                            }
                        </div> :
                        <div className="row product-wrapper skeleton-body cols-1">
                            {
                                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) =>
                                    <div className="skel-pro skel-pro-list mb-4" key={'list-skel-' + item}></div>
                                )
                            }
                        </div>
                    : ''
            }




{/* view product as grid /list  */}



            {
                gridType === 'grid' ?
                <div className={`row product-wrapper ${gridClasses[itemsPerRow]}`}>
                {displayedProducts.map(item => (
                    <div className="product-wrap" key={'shop-' + item?.name}>
                        <ProductTwo product={item} adClass="" />
                    </div>
                ))}
            </div>
                    :
                    <div className="product-lists product-wrapper">
                        {/* { products && products.map( item =>
                            <ProductEight product={ item } key={ 'shop-list-' + item?.name } />
                        ) } */}
                    </div>
            }





            {filteredProducts.length === 0 && <p className="ml-1">No products were found matching your selection.</p>}



            {filteredProducts.length > 0 && (
                <div className="toolbox toolbox-pagination">
                    <p className="show-info">Showing <span>{perPage * (page - 1) + 1} - {Math.min(perPage * page, filteredProducts.length)} of {filteredProducts.length}</span> Products</p>
                    <Pagination totalPage={totalPage} />
                </div>
            )}


        </>
    );
}

export default withApollo({ ssr: typeof window === 'undefined' })(ProductListOne);
