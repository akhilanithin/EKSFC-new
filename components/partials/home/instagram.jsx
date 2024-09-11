import Reveal from 'react-awesome-reveal';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import OwlCarousel from '~/components/features/owl-carousel';

import { fadeIn } from '~/utils/data/keyframes';
import { mainSlider5 } from '~/utils/data/carousel';
import axios from 'axios';
import React,{useEffect,useState} from "react";




export default function Instagram() {


    const instagramURL = process.env.NEXT_PUBLIC_INSTAGRAM_URL;
    const facebookAccessToken = process.env.NEXT_PUBLIC_FACEBOOK_ACCESS_TOKEN;
        
    const [instagram,setInstagram] = useState(null);
    const [error, setError] = useState(null);


    // https://graph.instagram.com/me/media?fields=id,media_type,media_url,caption,thumbnail_url,permalink,timestamp,username&limit=55&access_token=IGQWRQOEhaXzF3VEdmbG1IWXd1VnlKZAk9JbndVYzRPM0gtVWpLd1BucEdCTlM1QWhNMVJ3VmZAaSHlYbkNScHZAQZAFZAuM2JyZAVJKS1NfNEFGU2FyQ2NwZAGV4Y05mTHVyQ0x3aGZABdzhBZAXE5SFE4aVZAqa1BBVlQ2X0EZD




    useEffect(() => {
        const numOdPhotos=500
              axios({
                method: "get",
                url:`${instagramURL}&limit=${numOdPhotos}&access_token=${facebookAccessToken}`
                
              }).then((resp) => {
         
                
                setInstagram(resp.data.data.filter((post) => post.media_type === "VIDEO"))
      
              }).catch((err) => {
                // console.log(err);
                setError(err)
              });
            }, [])

 


    return (
        <section className="instagram-section pt-lg-10 pb-8">
            <Reveal keyframes={fadeIn} delay={300} duration={1000} triggerOnce>
                <div className="container pb-8 pt-8">
                    <Reveal keyframes={fadeIn} delay={300} duration={1000} triggerOnce>
                        <div className="title-wrapper mb-5 mt-1">
                            <h2 className="text-left title with-link">Our Instagram</h2>
                            <span className="badge">Featured</span>
                        </div>
                    </Reveal>
                    <OwlCarousel adClass="owl-theme brand-carousel" options={mainSlider5}>
                 
                        {instagram?.map((item, index) => (

                            <figure className="instagram">
                                <a  key={index} href={`${item?.permalink}`}>
                                    <LazyLoadImage
                                        src={`${item?.thumbnail_url}`}      
                                        alt="Instagram Video"
                                        threshold={500}
                                        effect="opacity"
                                         width="280"
                                        height="280"
                                        // style={{
                                        //     width: '100%',
                                        //     height: '250px',
                                        //     objectFit: 'cover', 
                                        //     alignItems: 'center'
                                        // }}
                                    />
                                </a>
                            </figure>


                        ))}


                      




               



                    </OwlCarousel>
                </div>
            </Reveal>
        </section>
    )
}