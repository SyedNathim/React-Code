import React from 'react';
import { Link } from 'react-router-dom';

import { HOMECATEGORY_API_URL} from '../Constants/URL';

const subTitle = "Choose Any Products";
const title = "Buy Everythink with Us";
const btnText = "Get Started Now";

const response = await fetch(HOMECATEGORY_API_URL);
const categoryList = await response.json();

const HomeCategory = () => {
  return (
    <div className='category-section style-4 padding-tb'>
        <div className='container'>
            <div className='section-header text-center'>
                <span className='subtitle'>{subTitle}</span>
                <h2 className='title'>{title}</h2>

            </div>

            <div className='section-wrapper'>
                <div className='row g-4 justify-conent-center row-cols-md-3 row-cols-sm-2 row-cols-1'>
                    {
                         categoryList.map((val, i) => (<div key={i} className='col'>
                            <Link to="/shop" className='category-item'>
                                <div className='category-inner'>
                                    <div className='category-thumb'>
                                        <img src={val.C_imgUrl} alt='' />
                                    </div>

                                    <div className='category-content'>
                                        <div className='cate-icon'>
                                            <i className={val.iconName}></i>

                                        </div>
                                        <Link to="/shop"><h6>{val.category_name}</h6></Link>

                                    </div>

                                </div>
                            </Link>
                            
                            </div>))
                    }
                </div>
                <div className='text-center mt-5'>
                    <Link to="/shop" className='lab-btn'><span>{btnText}</span></Link>

                </div>

            </div>

        </div>

    </div>
  )
}

export default HomeCategory