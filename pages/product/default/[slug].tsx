import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/react-hooks';
import Helmet from 'react-helmet';
import imagesLoaded from 'imagesloaded';

import withApollo from '~/server/apollo';
import { GET_PRODUCT } from '~/server/queries';

import OwlCarousel from '~/components/features/owl-carousel';
import MediaFive from '~/components/partials/product/media/media-five';
import DetailThree from '~/components/partials/product/detail/detail-three';
import RelatedProducts from '~/components/partials/product/related-products';

import { mainSlider17 } from '~/utils/data/carousel';

interface Product {
    data: {
        id: string;
        name: string;
        image: string;
        // Add other product fields as needed
    };
    related: Product[];
}

const ProductMasonry: React.FC = () => {
    const router = useRouter();
    const { slug } = router.query;

    

    

    

    // const { data, loading, error } = useQuery<{ product: Product }>(GET_PRODUCT, { variables: { slug } });

    const productURL = process.env.NEXT_PUBLIC_PRODUCT_URL || '';
    const productToken = process.env.NEXT_PUBLIC_PRODUCT_TOKEN || '';


    const useFetchProducts = () => {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(productURL, {
                method: 'GET',
              headers: {
                'Authorization': `Bearer ${productToken}`,
                'konjac-version': '1.0.1'
              }
            });
    
            if (!response.ok) {
              throw new Error(`Error: ${response.status}`);
            }
    
            const result = await response.json();
            setData(result?.data?.filter(item => !item?.status));
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);
    
      return { data, loading, error };
    };


    const { data, loading, error } = useFetchProducts();

const product = data?.filter(product => (product?.slug) === slug)








    const [loaded, setLoadingState] = useState(false);
    // const product = data?.product.data;
    // const related = data?.product.related;

    useEffect(() => {
      if (!loading && product)
          imagesLoaded('main').on('done', function () {
              setLoadingState(true);
          }).on('progress', function () {
              setLoadingState(false);
          });
      if (loading)
          setLoadingState(false)
  }, [loading, product])

    if (!slug) return null;

    return (

        <>

<main className="main mt-6 single-product">
            <Helmet>
                <title>Riode React eCommerce Template | Product Masonry</title>
            </Helmet>

            <h1 className="d-none">Riode React eCommerce Template - Product Masonry</h1>

            {product !== undefined ? (
                <div className={`page-content mb-10 pb-6 ${loaded ? '' : 'd-none'}`}>
                    <div className="container skeleton-body">
                        <div className="product product-single row mb-2">
                            <div className="col-md-6">
                                <MediaFive product={product} isSticky={true} adClass='pb-0' />
                            </div>
                            <div className="col-md-6">
                                <DetailThree data={product} isDesc={true} adClass="pb-0 mb-6" />
                            </div>
                        </div>
                        {/* <RelatedProducts products={related} /> */}
                    </div>
                </div>
            ) : null}

            {loaded && !loading ? null : (
                <div className="skeleton-body container mb-10">
                    <div className="row mb-7">
                        <div className="col-md-6 sticky-sidebar-wrapper ">
                            <div className="skel-pro-gallery"></div>
                        </div>
                        <div className="col-md-6">
                            <div className="skel-pro-summary mt-4 mt-md-0"></div>
                            <div className="skel-pro-tabs"></div>
                        </div>
                    </div>
                    <section className="pt-3 mt-4">
                        <h2 className="title justify-content-center">Related Products</h2>
                        <OwlCarousel adClass="owl-carousel owl-theme owl-nav-full" options={mainSlider17}>
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div className="product-loading-overlay" key={'popup-skel-' + item}></div>
                            ))}
                        </OwlCarousel>
                    </section>
                </div>
            )}
        </main>

        </>
       
    );
};

export default withApollo({ ssr: typeof window === 'undefined' })(ProductMasonry);
