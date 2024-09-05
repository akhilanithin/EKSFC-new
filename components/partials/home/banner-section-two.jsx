import Reveal from "react-awesome-reveal";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import React,{useEffect,useState} from "react";

import axios from 'axios'

// import Custom Components

import OwlCarousel from '~/components/features/owl-carousel';

import { bannerSlider } from '~/utils/data/carousel';
import { fadeIn, fadeInLeftShorter } from '~/utils/data/keyframes';
import ALink from '~/components/features/custom-link';

export default function BannerSectionTwo() {



    const YOUTUBE_URL = process.env.NEXT_PUBLIC_YOUTUBE_URL;
    const VIDEOS_PLAYLIST_ID = process.env.NEXT_PUBLIC_VIDEOS_PLAYLIST_ID;
    const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

    
    const [videos,   setVideos] = useState(null);
    const [error, setError] = useState(null);


   



  useEffect(() => {
  const noOfItems=10
        axios({
          method: "get",
          url:`${YOUTUBE_URL}?part=snippet&maxResults=${noOfItems}&playlistId=${VIDEOS_PLAYLIST_ID}&key=${GOOGLE_API_KEY}`
        //   'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=PLmLDpkciAl3o0BDtNSl8_cluQuyYfoTv-&key=AIzaSyA34QjlATndVGfvl_RwqZuyepTMYyhoB6I'
          
        }).then((resp) => {
          
        //   console.log(resp.data.items.filter((item) => item.snippet.thumbnails !== undefined && item.snippet.title !== "Private video"))
          setVideos(resp.data.items.filter((item) => item.snippet.thumbnails !== undefined && item.snippet.title !== "Private video"))

        }).catch((err) => {
          console.log(err);
          setError(err)
        });
      }, [])


      function formatDateInDubaiTimezone(isoDateString) {
        // Create a Date object from the ISO string (which is in UTC)
        const date = new Date(isoDateString);
    
        // Define formatting options for the Dubai timezone
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true, // 12-hour format with AM/PM
            timeZone: 'Asia/Dubai'
        };
    
        // Format the date for the Dubai timezone
        const formatter = new Intl.DateTimeFormat('en-GB', options);
        const formattedDate = formatter.format(date);
    
        // Construct the formatted string
        return formattedDate.replace(',', '');
    }
    





    return (
 
        <section className="banner-section2 pb-4 pt-5 mt-10">
            <div className="container mt-10 pt-6 mt-md-0 pt-md-0">
                <div className="row gutter-md">
                    <div className="banner">
                        <div className="banner-content pt-lg-9 y-50">
                            <Reveal keyframes={fadeIn} delay={300} duration={1000} triggerOnce>
                                <div className="title-wrapper mt-1">
                                  <span className="badge">Videos</span>
                                  <h2>YouTube Videos</h2>
                                 
                                  
                                </div>
                            </Reveal>
                            <p className="banner-desc">
                            Watch our latest videos collections on our YouTube channel. Hassle-free to watch, share, and like.
                        </p>
                            <ALink className="btn btn-link btn-underline btn-dark" href="/shop">Learn more<i className="d-icon-arrow-right"></i></ALink>
                        </div>
                    </div>


                    
                    <div className="banner-image-wrapper overflow-hidden">
                        <Reveal keyframes={fadeInLeftShorter} delay={600} duration={1000} triggerOnce>
                            <OwlCarousel adClass="banner-carousel owl-theme owl-shadow-carousel" options={bannerSlider}>
                            {videos?.map((item, index) => (

                    
                                
                                <div>
                                    <ALink key={index} className="video-card" target="_blank" rel="noopener noreferrer"
                                        href={`https://www.youtube.com/watch?v=${item?.snippet.resourceId.videoId}`}>
                                        <div className="MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation1 MuiCard-root css-w88nxk">

                                            <img className="MuiCardMedia-root MuiCardMedia-media MuiCardMedia-img w-100 css-rhsghg"

                                                src={`${item?.snippet.thumbnails.standard.url}`}
                                               

                                                alt={`${item?.snippet.title}`} />

                                            <div className="MuiCardContent-root css-1qw96cp">
                                                <div className="MuiTypography-root MuiTypography-h6 MuiTypography-gutterBottom css-4an0mh">
                                                {item?.snippet.title.slice(0, item?.snippet.title.length - 10) + '...'}
                                                </div>
                                                <br></br>
                                                <div className="MuiTypography-root MuiTypography-p MuiTypography-gutterBottom css-urftx4">
                                                    {` published at : ${formatDateInDubaiTimezone(item?.snippet.publishedAt)}`}
                                                </div>
                                            </div>
                                        </div>
                                    </ALink>

                            

                            </div>
                                
                            ))}
                             
                
                            </OwlCarousel>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    )
}