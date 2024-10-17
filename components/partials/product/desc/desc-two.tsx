import React from 'react';

import ALink from '~/components/features/custom-link';
import Accordion from '~/components/features/accordion/accordion';
import Card from '~/components/features/accordion/card';
import { toDecimal } from '~/utils';

interface Size {
    name: string;
    value: string;
}

interface Color {
    name: string;
    value: string;
}

interface Brand {
    name: string;
}

interface Category {
    name: string;
}

interface ProductVariant {
    size?: { name: string; size: string };
    color?: { name: string; color: string };
}

interface Product {
    variants: ProductVariant[];
    categories: Category[];
    brands: Brand[];
    reviews: number;
    ratings: number;
    name: string;
}

interface DescTwoProps {
    product: Product;
    adClass?: string;
}

const DescTwo: React.FC<DescTwoProps> = ({ product, adClass = '' }) => {
    const colors: Color[] = [];
    const sizes: Size[] = [];

    if (product.variants.length > 0) {
        if (product.variants[0].size) {
            product.variants.forEach(item => {
                if (sizes.findIndex(size => size.name === item.size!.name) === -1) {
                    sizes.push({ name: item.size!.name, value: item.size.size });
                }
            });
        }

        if (product.variants[0].color) {
            product.variants.forEach(item => {
                if (colors.findIndex(color => color.name === item.color!.name) === -1) {
                    colors.push({ name: item.color!.name, value: item.color.color });
                }
            });
        }
    }

    const setRating = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        const activeElement = e.currentTarget.parentNode.querySelector('.active');
        if (activeElement) {
            activeElement.classList.remove('active');
        }

        e.currentTarget.classList.add('active');
    };

    return (
        <div className={`product-details ${adClass}`}>
            <Accordion adClass="accordion-simple">
                <Card title="Description" expanded={true} adClass="card-description">
                    <div className="row">
                        <div className="col-12 mb-8">
                            <p className="mb-6">
                                Praesent id enim sit amet. Tdio vulputate eleifend in in tortor.
                                Ellus massa. Siti iMassa ristique sit amet condim vel, facilisis
                                quimequistiqutiqu amet condim Dilisis Facilisis quis sapien.
                                Praesent id enim sit amet.
                            </p>
                            <ul className="mb-6">
                                <li>Praesent id enim sit amet. Tdio vulputate</li>
                                <li>Eleifend in in tortor. Ellus massa. Dristique sitii</li>
                                <li>Massa ristique sit amet condim vel</li>
                                <li>Dilisis Facilisis quis sapien. Praesent id enim sit amet</li>
                            </ul>
                            <p className="mb-0">
                                Praesent id enim sit amet odio vulputate eleifend in in tortor.
                                Sellus massa, tristique sitiismonec tellus massa, tristique sit
                                amet condim vel, facilisis quimequistiqutiqu amet condim vel, facilisis Facilisis
                                quis sapien. Praesent id enim sit amet odio vulputate odio vulputate eleifend
                                in in tortor. Sellus massa, tristique sitiismonec tellus massa, tristique sit
                                ametcdimel, facilisis quimequistiqutiqu amet condim vel, facilisis Facilisis quis
                                sapien. Praesent id enim sit amet odio vulputate.
                            </p>
                        </div>
                    </div>
                </Card>

                <Card title="Additional information" adClass="card-additional">
                    <ul>
                        {product.categories.length > 0 && (
                            <li>
                                <label>Categories:</label>
                                <p>
                                    {product.categories.map((item, index) => (
                                        <React.Fragment key={`${item.name}-${index}`}>
                                            {item.name}
                                            {index < product.categories.length - 1 ? ', ' : ''}
                                        </React.Fragment>
                                    ))}
                                </p>
                            </li>
                        )}
                        {product.brands.length > 0 && (
                            <li>
                                <label>Brands:</label>
                                <p>
                                    {product.brands.map((item, index) => (
                                        <React.Fragment key={`${item.name}-${index}`}>
                                            {item.name}
                                            {index < product.brands.length - 1 ? ', ' : ''}
                                        </React.Fragment>
                                    ))}
                                </p>
                            </li>
                        )}
                        {colors.length > 0 && (
                            <li>
                                <label>Color:</label>
                                <p>
                                    {colors.map((item, index) => (
                                        <React.Fragment key={`${item.name}-${index}`}>
                                            {item.name}
                                            {index < colors.length - 1 ? ', ' : ''}
                                        </React.Fragment>
                                    ))}
                                </p>
                            </li>
                        )}
                        {sizes.length > 0 && (
                            <li>
                                <label>Size:</label>
                                <p>
                                    {sizes.map((item, index) => (
                                        <React.Fragment key={`${item.name}-${index}`}>
                                            {item.name}
                                            {index < sizes.length - 1 ? ', ' : ''}
                                        </React.Fragment>
                                    ))}
                                </p>
                            </li>
                        )}
                    </ul>
                </Card>

                <Card title="Size Guide" adClass="card-sizeguide">
                    <figure className="size-image mt-4 mb-4">
                        <img src="./images/size_guide.png" alt="Size Guide Image" width="217" height="398" />
                    </figure>
                    <figure className="size-table mt-4 mb-4">
                        <table>
                            <thead>
                                <tr>
                                    <th>SIZE</th>
                                    <th>CHEST(IN.)</th>
                                    <th>WAIST(IN.)</th>
                                    <th>HIPS(IN.)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size, index) => (
                                    <tr key={size}>
                                        <th>{size}</th>
                                        <td>{index === 0 ? '34-36' : index === 1 ? '36-38' : index === 2 ? '38-40' : index === 3 ? '40-42' : index === 4 ? '42-45' : '45-48'}</td>
                                        <td>{index === 0 ? '27-29' : index === 1 ? '29-31' : index === 2 ? '31-33' : index === 3 ? '33-36' : index === 4 ? '36-40' : '40-44'}</td>
                                        <td>{index === 0 ? '34.5-36.5' : index === 1 ? '36.5-38.5' : index === 2 ? '38.5-40.5' : index === 3 ? '40.5-43.5' : index === 4 ? '43.5-47.5' : '47.5-51.5'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </figure>
                </Card>

                <Card title={`Reviews (${product.reviews})`} adClass="card-reviews">
                    {product.reviews === 0 ? (
                        <div className="comments mb-2 pt-2 pb-2 border-no">
                            There are no reviews yet.
                        </div>
                    ) : (
                        <div className="comments mb-8 pt-2 pb-2 border-no">
                            <ul>
                                {[...Array(product.reviews)].map((_, index) => (
                                    <li key={index}>
                                        <div className="comment">
                                            <figure className="comment-media">
                                                <ALink href="#">
                                                    <img src={`./images/blog/comments/${index + 1}.jpg`} alt="avatar" width="100" height="100" />
                                                </ALink>
                                            </figure>
                                            <div className="comment-body">
                                                <div className="comment-rating ratings-container mb-0">
                                                    <div className="ratings-full">
                                                        <span className="ratings" style={{ width: product.ratings * 20 + '%' }}></span>
                                                        <span className="tooltiptext tooltip-top">{toDecimal(product.ratings)}</span>
                                                    </div>
                                                </div>
                                                <div className="comment-user">
                                                    <span className="comment-date text-body">September 22, 2020 at 9:42 pm</span>
                                                    <h4><ALink href="#">John Doe</ALink></h4>
                                                </div>
                                                <div className="comment-content">
                                                    <p>
                                                        Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo,
                                                        eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti.
                                                        Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="reply">
                        <div className="title-wrapper text-left">
                            <h3 className="title title-simple text-left text-normal">
                                {product.reviews > 0 ? "Add a Review" : `Be The First To Review “${product.name}”`}
                            </h3>
                            <p>Your email address will not be published. Required fields are marked *</p>
                        </div>
                        <div className="rating-form">
                            <label htmlFor="rating" className="text-dark">Your rating *</label>
                            <span className="rating-stars selected">
                                {[1, 2, 3, 4, 5].map(num => (
                                    <a className={`star-${num}`} href="#" onClick={setRating} key={`star-${num}`}>{num}</a>
                                ))}
                            </span>
                            <select name="rating" id="rating" required style={{ display: 'none' }}>
                                <option value="">Rate…</option>
                                <option value="5">Perfect</option>
                                <option value="4">Good</option>
                                <option value="3">Average</option>
                                <option value="2">Not that bad</option>
                                <option value="1">Very poor</option>
                            </select>
                        </div>
                        <form action="#">
                            <textarea id="reply-message" cols={30} rows={6} className="form-control mb-4" placeholder="Comment *" required></textarea>
                            <div className="row">
                                <div className="col-md-6 mb-5">
                                    <input type="text" className="form-control" id="reply-name" name="reply-name" placeholder="Name *" required />
                                </div>
                                <div className="col-md-6 mb-5">
                                    <input type="email" className="form-control" id="reply-email" name="reply-email" placeholder="Email *" required />
                                </div>
                            </div>
                            <div className="form-checkbox mb-4">
                                <input type="checkbox" className="custom-checkbox" id="signin-remember" name="signin-remember" />
                                <label className="form-control-label" htmlFor="signin-remember">
                                    Save my name, email, and website in this browser for the next time I comment.
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary btn-rounded">Submit<i className="d-icon-arrow-right"></i></button>
                        </form>
                    </div>
                </Card>
            </Accordion>
        </div>
    );
};

export default DescTwo;
