import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/react-hooks';

import ToolBox from '~/components/partials/shop/toolbox';
import ProductTwo from '~/components/features/product/product-two';
import ProductEight from '~/components/features/product/product-eight';
import Pagination from '~/components/features/pagination';

import withApollo from '~/server/apollo';
import { GET_PRODUCTS } from '~/server/queries';

// Define the types for the product and props
interface Product {
    slug: string;
    // Add other relevant properties here
}

interface ProductListOneProps {
    itemsPerRow?: number;
    type?: string;
    isToolbox?: boolean;
}

const ProductListOne: React.FC<ProductListOneProps> = (props) => {
    const { itemsPerRow = 3, type = "left", isToolbox = true } = props;
    const router = useRouter();
    const query = router.query;
    const [getProducts, { data, loading, error }] = useLazyQuery(GET_PRODUCTS);
    const products: Product[] | undefined = data?.products.data;
    
    const gridClasses: Record<number, string> = {
        3: "cols-2 cols-sm-3",
        4: "cols-2 cols-sm-3 cols-md-4",
        5: "cols-2 cols-sm-3 cols-md-4 cols-xl-5",
        6: "cols-2 cols-sm-3 cols-md-4 cols-xl-6",
        7: "cols-2 cols-sm-3 cols-md-4 cols-lg-5 cols-xl-7",
        8: "cols-2 cols-sm-3 cols-md-4 cols-lg-5 cols-xl-8"
    };

    const perPage = query.per_page ? parseInt(query.per_page as string) : 12;
    const totalPage = data ? Math.ceil(data.products.total / perPage) : 1;
    const page = query.page ? parseInt(query.page as string) : 1;
    const gridType = query.type ? (query.type as string) : 'grid';

    useEffect(() => {
        getProducts({
            variables: {
                search: query.search,
                colors: query.colors ? (query.colors as string).split(',') : [],
                sizes: query.sizes ? (query.sizes as string).split(',') : [],
                brands: query.brands ? (query.brands as string).split(',') : [],
                min_price: query.min_price ? parseInt(query.min_price as string) : undefined,
                max_price: query.max_price ? parseInt(query.max_price as string) : undefined,
                category: query.category,
                tag: query.tag,
                sortBy: query.sortby,
                from: perPage * (page - 1),
                to: perPage * page
            }
        });
    }, [query]);

    return (
        <>
            {isToolbox && <ToolBox type={type} />}
            {loading ? (
                gridType === 'grid' ? (
                    <div className={`row product-wrapper ${gridClasses[itemsPerRow]}`}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                            <div className="product-loading-overlay" key={'popup-skel-' + item}></div>
                        ))}
                    </div>
                ) : (
                    <div className="row product-wrapper skeleton-body cols-1">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                            <div className="skel-pro skel-pro-list mb-4" key={'list-skel-' + item}></div>
                        ))}
                    </div>
                )
            ) : (
                <>
                    {gridType === 'grid' ? (
                        <div className={`row product-wrapper ${gridClasses[itemsPerRow]}`}>
                            {products?.map((item) => (
                                <div className="product-wrap" key={'shop-' + item.slug}>
                                    <ProductTwo product={item} adClass="" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="product-lists product-wrapper">
                            {products?.map((item) => (
                                <ProductEight product={item} key={'shop-list-' + item.slug} />
                            ))}
                        </div>
                    )}

                    {products && products.length === 0 && (
                        <p className="ml-1">No products were found matching your selection.</p>
                    )}

                    {data && data.products.total > 0 && (
                        <div className="toolbox toolbox-pagination">
                            <p className="show-info">
                                Showing <span>{perPage * (page - 1) + 1} - {Math.min(perPage * page, data.products.total)} of {data.products.total}</span> Products
                            </p>
                            <Pagination totalPage={totalPage} />
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default withApollo({ ssr: typeof window === 'undefined' })(ProductListOne);
