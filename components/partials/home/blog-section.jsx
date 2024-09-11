import React, { useEffect, useState } from 'react';
import Reveal from 'react-awesome-reveal';

import OwlCarousel from '~/components/features/owl-carousel';

import PostEight from '~/components/features/post/post-eight';

import { fadeIn, fadeInLeftShorter } from '~/utils/data/keyframes';
import { mainSlider6 } from '~/utils/data/carousel';

const axios = require('axios');

function BlogSection() {

    const [data, setData] = useState(null); // State to hold the fetched data
    const [error, setError] = useState(null); // State to hold any error

    const BLOG_URL = process.env.NEXT_PUBLIC_BLOG_URL;
    const BLOG_TOKEN = process.env.NEXT_PUBLIC_BLOG_TOKEN;

    useEffect(() => {
        // Define the function to fetch data
        const fetchData = async () => {
            try {
                const response = await axios.get(BLOG_URL, {
                    headers: {
                        'Authorization': `Bearer ${BLOG_TOKEN}`,
                        'Content-Type': 'application/json',// or other content types if needed
                        'konjac-version': '1.0.1'
                    }
                });
                setData(response.data); // Update state with fetched data
            } catch (err) {
                setError(err); // Update state with error
            }
        };

        fetchData(); // Call the function to fetch data
    }, [BLOG_URL, BLOG_TOKEN]); // Dependencies array: fetch when url or token changes

    if (error) {
        return <div>Error: {error.message}</div>; // Display error message if there's an error
    }

    if (!data) {
        return <div>Loading...</div>; // Display loading state if data is not yet loaded
    }


    console.log(data);
    


    return (



        <section className="blog-section mt-8 mb-10 bg-white" style={{ backgroundImage: 'url(images/home/banner/5.jpg)' }}>
            <Reveal keyframes={fadeInLeftShorter} delay={300} duration={1000} triggerOnce>
                <div className="container">
                    <Reveal keyframes={fadeIn} delay={300} duration={1000} triggerOnce>
                        <div className="title-wrapper mt-1 mb-5">
                            <h2 className="text-left title with-link text-white">Our Latest Blog</h2>
                            <span className="badge text-white">Who we are</span>
                        </div>
                    </Reveal>

                    <OwlCarousel adClass="owl-theme owl-shadow-carousel" options={mainSlider6}>
                        {/* {
                            posts && posts.length ?
                                posts.slice(15, 18).map((post, index) => (
                                    <React.Fragment key={"post-eight" + index}>
                                        <div className="blog-post mb-4">
                                            <PostEight post={post} adClass="overlay-zoom" />
                                        </div>
                                    </React.Fragment>
                                )) : ''
                        } */}
                    </OwlCarousel>
                </div>
            </Reveal>
        </section>


    )
}

export default React.memo(BlogSection);