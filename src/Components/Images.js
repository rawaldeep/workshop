import React, { useState, useEffect  } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


const Images = props => {
    const [imageUrl, setImageUrl] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    Images.propTypes = {
        movie: PropTypes.object.isRequired
    }
  useEffect(()=>{
    const loadData = async() => {
    let { featured_media } = props.movie;
     const getImageUrl = await axios.get(`http://localhost:8090/workshop/wordpress/wp-json/wp/v2/media/${featured_media}`);
            setImageUrl(getImageUrl.data.media_details.sizes.full.source_url);
        }
            loadData();
            return () => {
                setIsLoaded(true);
            }
        },[props]);
    if(isLoaded){
        return (
            <>
              <img src={imageUrl} />
            </>
          );
      }
      return null;
}

export default Images;