import React, { useState } from 'react';
import Ratting from '../components/Ratting';
import { Link } from 'react-router-dom';

import { CATEGORYSHOW_API_URL} from '../Constants/URL';
const title = "Our Products";
const response = await fetch(CATEGORYSHOW_API_URL);
const ProductData = await response.json();
// console.log(userdata)
// const [userDatas, setData] = useState([]);
// const fetchData = async () => {
//     try {
//       const response = await fetch(CATEGORYSHOW_API_URL);
//       const userdata = await response.json();
//       console.log(userdata)
//     //   setData(userdata);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };


const CategoryShowCase = () => {
    const [items, setItems] = useState(ProductData);
    const filterItem = (categItem) => {
        const updateItems = ProductData.filter((curElem) => {
            return curElem.category_name === categItem;
        });

        setItems(updateItems)
    }
    return (
        <div className='course-section style-3 padding-tb'>
            <div className='course-shape one'>
                <img src="/src/assets/images/shape-img/icon/01.png" alt="" />
            </div>
            <div className='course-shape two'>
                <img src="/src/assets/images/shape-img/icon/02.png" alt="" />
            </div>

            <div className='container'>
                <div className='section-header'>
                    <h2 className='title'>{title}</h2>
                    <div className='course-filter-group'>              
                
                        <ul className='lab-ul'>
                            <li onClick={() => setItems(ProductData)}>All</li>
                            <li onClick={() => filterItem("Shoes")}>Shoes</li>
                            <li onClick={() => filterItem("Bags")}>Bags</li>
                            <li onClick={() => filterItem("Phones")}>Phones</li>
                            <li onClick={() => filterItem("Beauty")}>Beauty</li>
                        </ul>
                    </div>
                </div>

                <div className='section-wrapper'>
                    <div className='row g-4 justify-content-center row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1'>
                        {
                            items.map((product) => <div key={product.id} className='col'>
                                <div className='course-item style-4'>
                                    <div className='course-inner'>
                                        <div className='course-thumb'>
                                            <img src={product.imgUrl} alt="" />
                                            <div className='course-category'>
                                                <div className='course-cate'>
                                                    <a href="#">{product.category_name}</a>
                                                </div>
                                                <div className='course-review'>
                                                    <Ratting/>
                                                </div>

                                            </div>

                                        </div>
                                        
                                        <div className='course-content'>
                                            <Link to={'/shop/${product.id}'}>{product.product_name}</Link>
                                            <div className='course-footer'>
                                                <div className='course-author'>
                                                    <Link to='/' className='ca-name'>{product.brand_name}</Link>
                                                </div>
                                                <div className='course-price'>
                                                    {product.price}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>)
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CategoryShowCase