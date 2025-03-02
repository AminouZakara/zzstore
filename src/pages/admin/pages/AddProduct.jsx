import React, { useContext } from 'react'
import myContext from '../../../context/data/myContext'

function AddProduct() {
    const context = useContext(myContext);
    const { products, setProducts, addProduct, handleFileChange, loading,
        setLoading, handleSizeChange, handleColorChange, selectedSizes, selectedColors, } = context

    const sizesAvailable = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
    const colorsAvailable = [
        "Red", "Blue", "Green", "Gray", "Black", "White", 
        "Yellow", "Purple", "Orange", "Pink", "beige",];



    return (
        <div>
            <div className=' flex justify-center items-center h-screen'>
                <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                    <div >
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Add Product</h1>
                    </div>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className='w-full mb-4 rounded-lg text-white '
                    />
                    <div className='flex '>
                        <input type="text"
                            onChange={(e) => setProducts({ ...products, title: e.target.value })}
                            value={products.title}
                            name='title'
                            className='bg-gray-600 mb-4 w-full text-white placeholder:text-gray-200 outline-none  px-2 py-2 rounded-lg'
                            placeholder='Product title'
                        />
                    </div>
                    <div>
                        <input type="text"
                            name='price'
                            onChange={(e) => setProducts({ ...products, price: e.target.value })}
                            value={products.price}
                            className='bg-gray-600 mb-4 w-full text-white placeholder:text-gray-200 outline-none  px-2 py-2 rounded-lg'
                            placeholder='Product price'
                        />
                    </div>
                    <div>
                        <input type="text"
                            name='category'
                            onChange={(e) => setProducts({ ...products, category: e.target.value })}
                            value={products.category}
                            className='bg-gray-600 mb-4 w-full text-white placeholder:text-gray-200 outline-none  px-2 py-2 rounded-lg'
                            placeholder='Product category'
                        />
                    </div>
                    {/* Colors Selection */}
                    <div className='mb-4'>
                        <label style={{ color:"yellow" }}>Colors:</label>
                        {colorsAvailable.map((color) => (
                            <label key={color} style={{ margin: "10px", color:"white" }}>
                                <input type="checkbox" value={color} checked={selectedColors.includes(color)} onChange={() => handleColorChange(color)} />
                                {color}
                            </label>
                        ))}
                    </div>
                    {/* Sizes Selection */}
                    <div className='mb-4'>
                        <label style={{ color:"yellow" }}>Sizes:</label>
                        {sizesAvailable.map((size) => (
                            <label key={size} style={{ margin: "10px", color:"white" }}>
                                <input type="checkbox" value={size} checked={selectedSizes.includes(size)} onChange={() => handleSizeChange(size)} />
                                {size}
                            </label>
                        ))}
                    </div>
                    <div>
                        <textarea cols="30" rows="10"
                            name='description'
                            onChange={(e) => setProducts({ ...products, description: e.target.value })}
                            value={products.description}
                            className='bg-gray-600 mb-4 w-full text-white placeholder:text-gray-200 outline-none  px-2 py-2 rounded-lg'
                            placeholder='Product description'>

                        </textarea>
                    </div>
                    <div className=' flex justify-center mb-3'>
                        <button
                            onClick={addProduct}
                            disabled={loading}
                            className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
                            {
                                loading ? 'Loading...' : 'Add Product'
                            }
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddProduct