import React, { useEffect, useState } from 'react';
import Reveal from 'react-awesome-reveal';

import OwlCarousel from '~/components/features/owl-carousel';

import PostEight from '~/components/features/post/post-eight';

import { fadeIn, fadeInLeftShorter } from '~/utils/data/keyframes';
import { mainSlider6 } from '~/utils/data/carousel';

const axios = require('axios');

function BlogSection() {

    const [posts, setPosts] = useState(null); // State to hold the fetched data
    const [error, setError] = useState(null); // State to hold any error
    const [loading, setLoading] = useState(true); 

    const url = process.env.NEXT_PUBLIC_BLOG_URL;
    const token = process.env.NEXT_PUBLIC_BLOG_TOKEN;

    useEffect(() => {
        // Fetch data from API
        const fetchData = async () => {
            try {
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Authorization header
                        'Content-Type': 'application/json', // Optional: Set to the expected content type
                        'konjac-version':'1.0.1'
                    
                    }
                });
                setPosts(response.data); // Set the data state with the API response data
                setLoading(false); // Set loading to false after data is fetched
            } catch (err) {
                setError(err); // Set error state if there's an issue
                setLoading(false); // Set loading to false even if there's an error
            }
        };

        fetchData(); // Call the async function
    }, [url, token]); // Dependencies array: the effect will run if url or token changes

    // Render loading, error, or data based on the component state
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    

  
    
    var blogs = Array.isArray(posts?.data) ? posts?.data : [posts?.data];
  
    
    


    return (



        <section className="blog-section mt-8 mb-10">
            <Reveal keyframes={fadeInLeftShorter} delay={300} duration={1000} triggerOnce>
                <div className="container">
                    <Reveal keyframes={fadeIn} delay={300} duration={1000} triggerOnce>
                        <div className="title-wrapper mt-1 mb-5">
                            <h2 className="text-left title with-link text-black">Our Latest Blog</h2>
                            {/* <span className="badge text-white">Who we are</span> */}
                        </div>
                    </Reveal>

                    <OwlCarousel adClass="owl-theme owl-shadow-carousel" options={mainSlider6}>

                        {
                            posts && posts?.count ?

                            
                                blogs?.map((post, index) => (
                                    <React.Fragment key={"post-eight" + index}>
                                        <div className="blog-post mb-4">
                                            <PostEight post={post} adClass="overlay-zoom" />
                                        </div>
                                    </React.Fragment>
                                )) : ''
                        }  

                    </OwlCarousel>
                </div>
            </Reveal>
        </section>


    )
}

export default React.memo(BlogSection);