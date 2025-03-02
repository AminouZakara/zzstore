import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import myContext from '../../context/data/myContext';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { addToCart } from '../../redux/cartSlice';
import { fireDB } from '../../firebase/FirebaseConfig';
import { FaAngleLeft, FaAngleRight, FaArrowAltCircleLeft, FaArrowAltCircleRight, FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { BiRightArrow } from 'react-icons/bi';
import { SlArrowRight } from 'react-icons/sl';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

function ProductInfo() {

    {/**
         title: productTemp.data().title,
                price: productTemp.data().price,
                image: productTemp.data().image,
                description: productTemp.data().description,
                category: productTemp.data().category,
                stock: productTemp.data().stock,
                rating: productTemp.data().rating,
                reviews: productTemp.data().reviews,
        */}
    const context = useContext(myContext);
    const { loading, setLoading, mode, selectedColor, selectedSize, handleColorClicked, handleSizeClicked } = context;

    const [products, setProducts] = useState('')
    const params = useParams()
    // console.log(products.title)

    const getProductData = async () => {
        setLoading(true)
        try {
            const productTemp = await getDoc(doc(fireDB, "products", params.id))
            // console.log(productTemp)

            setProducts({
                id: productTemp.id, ...productTemp.data()

            });
            // console.log(productTemp.data())
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    console.log("products", products);


    useEffect(() => {
        getProductData()

    }, [])



    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart)
    // console.log(cartItems)

    // add to cart
    const addCart = (products) => {
        dispatch(addToCart(products))
        toast.success('add to cart');
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])

    // Slide the images
    const [currentIndex, setCurrentIndex] = useState(0);
    // next Slide
    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === products.images.length - 1 ? 0 : prevIndex + 1
        );
    };
    // preview Slide
    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? products.images.length - 1 : prevIndex - 1
        );
    };

 




    return (
        <Layout>
            <section className="text-gray-600 body-font overflow-hidden">
                {
                    loading ? (
                        <div className="flex justify-center items-center h-screen">
                            <h2>Loading ...</h2>
                        </div>
                    ) : (
                        <div className="container px-5 py-10 mx-auto">
                            {products &&
                                <div className="w-full  mx-auto flex flex-wrap">

                                    <div className='w-full flex justify-center items-center  md:w-1/2 '  style={{ textAlign: "center", position: "relative", }}>

                                        {/* Left Arrow */}
                                        <FiChevronLeft
                                            onClick={prevSlide}
                                            size={35}
                                            style={{
                                                position: "absolute",
                                                top: "50%",
                                                left: "-18px",
                                                transform: "translateY(-50%)",
                                                cursor: "pointer",
                                                color: "#333",
                                                backgroundColor: "#fff",
                                                borderRadius: "50%",
                                            }}
                                        />

                                        <img
                                            src={products.images[currentIndex]}
                                            alt={`Slide ${currentIndex}`}
                                            className='w-full md:w-2/5 h-auto'
                                            style={{  borderRadius: "10px" }}

                                        />
                                        {/* Right Arrow */}

                                        <FiChevronRight
                                            onClick={nextSlide}
                                            size={35}
                                            style={{
                                                position: "absolute",
                                                top: "50%",
                                                right: "-18px",
                                                transform: "translateY(-50%)",
                                                cursor: "pointer",
                                                color: "#333",
                                                backgroundColor: "#fff",
                                                borderRadius: "50%",
                                            }}
                                        />
                                    </div>
                                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                        <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                            Z-Z Store
                                        </h2>
                                        <h1 style={{ color: mode === 'dark' ? 'white' : '', }} className="text-gray-900 text-3xl title-font font-medium mb-1">
                                            {products.title}
                                        </h1>
                                        <div className="flex items-center">
                                            <h4>Colors:</h4>
                                            <div className="flex ml-2">
                                                {
                                                    products.colors.map((color, index) => (
                                                        <div key={index}
                                                            className="flex"
                                                            style={{
                                                                flexDirection: "row",
                                                                boxShadow : "0px 0px 10px rgba(0,0,0,2)",
                                                                backgroundColor: color, width: "20px", height: "20px", borderRadius: "50%",
                                                                margin: "15px", cursor: "pointer", outline: selectedColor === color ? `4px solid ${color}` : "",
                                                            }}
                                                            onClick={() => handleColorClicked(color)}
                                                        ></div>

                                                    ))}
                                            </div>
                                        </div>
                                        <div className="flex items-center">
                                            <h4>Sizes:</h4>
                                            <div className="flex ml-2">
                                                {
                                                    products.sizes.map((size, index) => (
                                                        <div key={index} className="flex"
                                                            style={{
                                                                flexDirection: "row",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                 width: "20px", height: "20px",
                                                                 margin: "10px", cursor: "pointer",
                                                                 borderRadius: "10%",
                                                                 borderWidth: "2px",
                                                                 padding: "12px",
                                                                 paddingInline : "18px",
                                                                 borderColor: selectedSize === size ? "black" : "",
                                                            }}
                                                            onClick={() => handleSizeClicked(size)}
                                                        >
                                                            <p style={{ color: mode === 'dark' ? 'white' : '', }} className="text-gray-900 text-xl ">{size}</p>
                                                        </div>
                                                    ))}
                                            </div>

                                        </div>
                                        <div className="flex mb-4">
                                            <span className="flex items-center">
                                                <svg
                                                    fill="currentColor"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    className="w-4 h-4 text-indigo-500"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                </svg>
                                                <svg
                                                    fill="currentColor"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    className="w-4 h-4 text-indigo-500"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                </svg>
                                                <svg
                                                    fill="currentColor"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    className="w-4 h-4 text-indigo-500"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                </svg>
                                                <svg
                                                    fill="currentColor"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    className="w-4 h-4 text-indigo-500"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                </svg>
                                                <svg
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    className="w-4 h-4 text-indigo-500"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                </svg>
                                                <span className="text-gray-600 ml-3">4 Reviews</span>
                                            </span>
                                            <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                                <a className="text-gray-500">
                                                    <svg
                                                        fill="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        className="w-5 h-5"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                                    </svg>
                                                </a>
                                                <a className="text-gray-500">
                                                    <svg
                                                        fill="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        className="w-5 h-5"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                                    </svg>
                                                </a>
                                                <a className="text-gray-500">
                                                    <svg
                                                        fill="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        className="w-5 h-5"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                                                    </svg>
                                                </a>
                                            </span>
                                        </div>
                                        <p style={{ color: mode === 'dark' ? 'white' : '', }} className="leading-relaxed border-b-2 mb-5 pb-5">
                                            {products.description}
                                        </p>

                                        <div className="flex">
                                            <span style={{ color: mode === 'dark' ? 'white' : '', }} className="title-font font-medium text-2xl text-gray-900">
                                                {products.price} CFA
                                            </span>
                                            <button onClick={() => addCart(products)} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                                                Add To Cart
                                            </button>
                                            <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                                                <svg
                                                    fill="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    className="w-5 h-5"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>}
                        </div>
                    )
                }

            </section>

        </Layout>
    )
}

export default ProductInfo