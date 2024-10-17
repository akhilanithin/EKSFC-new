import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/react-hooks';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ALink from '~/components/features/custom-link';
import { GET_PRODUCTS } from '~/server/queries';
import withApollo from '~/server/apollo';
import { toDecimal } from '~/utils';

interface Product {
    slug: string;
    name: string;
    pictures: { url: string }[];
    price: number[];
    variants: any[];
}

interface ProductsData {
    products: {
        data: Product[];
    };
}

function SearchForm() {
    const router = useRouter();
    const [search, setSearch] = useState<string>("");
    const [searchProducts, { data }] = useLazyQuery<ProductsData>(GET_PRODUCTS);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleBodyClick = (e: MouseEvent) => onBodyClick(e);
        document.body.addEventListener("click", handleBodyClick);

        return () => {
            document.body.removeEventListener("click", handleBodyClick);
        };
    }, []);

    useEffect(() => {
        setSearch("");
    }, [router.query.slug]);

    useEffect(() => {
        if (search.length > 2) {
            if (timer) clearTimeout(timer);
            const timerId = setTimeout(() => {
                searchProducts({ variables: { search: search } });
                setTimer(null);
            }, 500);

            setTimer(timerId);
        }
    }, [search]);

    useEffect(() => {
        const resultsElement = document.querySelector('.header-search.show-results');
        if (resultsElement) resultsElement.classList.remove('show-results');
    }, [router.pathname]);

    const removeXSSAttacks = (html: string) => {
        const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

        while (SCRIPT_REGEX.test(html)) {
            html = html.replace(SCRIPT_REGEX, "");
        }

        html = html.replace(/ on\w+="[^"]*"/g, "");

        return { __html: html };
    };

    const matchEmphasize = (name: string) => {
        const regExp = new RegExp(search, "i");
        return name.replace(regExp, (match) => `<strong>${match}</strong>`);
    };

    const showSearchBox = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.closest('.header-search')?.classList.toggle('show');
    };

    const onBodyClick = (e: MouseEvent) => {
        if (e.target instanceof HTMLElement && e.target.closest('.header-search')) return;

        document.querySelector('.header-search.show')?.classList.remove('show');
        document.querySelector('.header-search.show-results')?.classList.remove('show-results');
    };

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const onSubmitSearchForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push({
            pathname: '/shop',
            query: { search: search }
        });
    };

    return (
        <div className="header-search hs-toggle d-block">
            <ALink href="#" className="search-toggle d-flex align-items-center" role="button">
                <i className="d-icon-search"></i>
            </ALink>
            <form action="#" method="get" onSubmit={onSubmitSearchForm} className="input-wrapper">
                <input 
                    type="text" 
                    className="form-control" 
                    name="search" 
                    autoComplete="off" 
                    value={search} 
                    onChange={onSearchChange}
                    placeholder="Search..." 
                    required 
                    onClick={showSearchBox} 
                />

                <button className="btn btn-search" type="submit">
                    <i className="d-icon-search"></i>
                </button>

                <div className="live-search-list bg-grey-light scrollable">
                    {search.length > 2 && data && data.products.data.map((product, index) => (
                        <ALink href={`/product/default/${product.slug}`} className="autocomplete-suggestion" key={`search-result-${index}`}>
                            <LazyLoadImage 
                                src={process.env.NEXT_PUBLIC_ASSET_URI + product.pictures[0].url} 
                                width={40} 
                                height={40} 
                                alt="product" 
                            />
                            <div 
                                className="search-name" 
                                dangerouslySetInnerHTML={removeXSSAttacks(matchEmphasize(product.name))} 
                            ></div>
                            <span className="search-price">
                                {
                                    product.price[0] !== product.price[1] ? 
                                        product.variants.length === 0 ? 
                                            <>
                                                <span className="new-price mr-1">${toDecimal(product.price[0])}</span>
                                                <span className="old-price">${toDecimal(product.price[1])}</span>
                                            </> 
                                            : 
                                            <span className="new-price">${toDecimal(product.price[0])} – ${toDecimal(product.price[1])}</span>
                                        : <span className="new-price">${toDecimal(product.price[0])}</span>
                                }
                            </span>
                        </ALink>
                    ))}
                </div>
            </form>
        </div>
    );
}

export default withApollo({ ssr: typeof window === 'undefined' })(SearchForm);
