import React from "react";
import { Col, Row, Card, Button, Spinner } from "react-bootstrap"; // Added Spinner for loading state
import { useDispatch } from "react-redux";
import useFetch from "~/components/partials/shop/hooks/useFetch";

function Home() {
    const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjUsImlhdCI6MTczMDE5OTQ0MywiZXhwIjoxNzMwMjg1ODQzfQ.VOFv-t_4enUFxYHQGr-KjTyLN9U3KOnAm38jtMIaslRdv9SZqrCkGtRJ2_23YPijroKUn2BqH1o1FucMapixRA' // Use your actual token
    const { data, loading, error } = useFetch(
        "https://api.eksfc.com/api/products?search=&limit=300&page=1&sortField=id&sortOrder=DESC",
        token
    );

    console.log("Fetched Data:", data); // Log fetched data

    // Display loading indicator
    if (loading) {
        return <Spinner animation="border" variant="primary" style={{ margin: "100px auto", display: "block" }} />;
    }

    // Handle error state
    if (error) {
        return <p className="text-danger fw-bolder fs-4">Error: {error}</p>;
    }

    // Render the product data if available
    return (
        <>
                 {/* {
                isToolbox ? <ToolBox type={ type } /> : ''
            }
            {
                loading ?
                    gridType === 'grid' ?
                        <div className={ `row product-wrapper ${ gridClasses[ itemsPerRow ] }` }>
                            {
                                [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ].map( ( item ) =>
                                    <div className="product-loading-overlay" key={ 'popup-skel-' + item }></div>
                                )
                            }
                        </div> :
                        <div className="row product-wrapper skeleton-body cols-1">
                            {
                                [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ].map( ( item ) =>
                                    <div className="skel-pro skel-pro-list mb-4" key={ 'list-skel-' + item }></div>
                                )
                            }
                        </div>
                    : ''
            }
            {
                gridType === 'grid' ?
                    <div className={ `row product-wrapper ${ gridClasses[ itemsPerRow ] }` }>
                        { products && products.map( item =>
                            <div className="product-wrap" key={ 'shop-' + item.slug }>
                                <ProductTwo product={ item } adClass="" />
                            </div>
                        ) }
                    </div>
                    :
                    <div className="product-lists product-wrapper">
                        { products && products.map( item =>
                            <ProductEight product={ item } key={ 'shop-list-' + item.slug } />
                        ) }
                    </div>
            }

            {
                products && products.length === 0 ?
                    <p className="ml-1">No products were found matching your selection.</p> : ''
            }

            {
                data && data.products.total > 0 ?
                    <div className="toolbox toolbox-pagination">
                        {
                            data && <p className="show-info">Showing <span>{ perPage * ( page - 1 ) + 1 } - { Math.min( perPage * page, data.products.total ) } of { data.products.total }</span>Products</p>
                        }

                        <Pagination totalPage={ totalPage } />
                    </div> : ''
            } */}
        </>


    );
}

export default Home;
