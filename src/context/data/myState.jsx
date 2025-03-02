import React, { useEffect, useState } from 'react'
import MyContext from './myContext'
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDB, storage } from '../../firebase/FirebaseConfig';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function myState(props) {
  const [mode, setMode] = useState('light');
  const [loading, setLoading] = useState(false);

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'rgb(17, 24, 39)';
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';

    }
  }

  const [products, setProducts] = useState({
    title: "",
    price: "",
    category: "",
    description: "",


  })
  // ********************** Add Product Section  **********************
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]); // Preview before upload
  const [uploadedImages, setUploadedImages] = useState([]); // Display after upload
  const [uploading, setUploading] = useState(false);

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  const handleFileChange = (e) => {
    const files = [...e.target.files];
    setImages(files);

    // Generate preview URLs
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };
   // Handle size selection
   const handleSizeChange = (size) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size)
        : [...prevSizes, size]
    );
  };

  // Handle color selection
  const handleColorChange = (color) => {
    setSelectedColors((prevColors) =>
      prevColors.includes(color)
        ? prevColors.filter((c) => c !== color)
        : [...prevColors, color]
    );
  };

  const handleUpload = async () => {


    setUploading(true);


    // Save image URLs to Firestore
    await addDoc(collection(fireDB, "uploads"), { images: uploadedImageUrls });

    setUploadedImages([...uploadedImages, ...uploadedImageUrls]); // Show uploaded images
    setUploading(false);
    alert("Upload successful!");
    setImages([]);
    setPreviewImages([]);
  };
  const addProduct = async () => {
    if (images.length === 0) return alert("Please select images first!");
    if (products.title == null || products.price == null || products.category == null || products.description == null) {
      return toast.error('Please fill all fields')
    }
    const productRef = collection(fireDB, "zzstoreProducts")
    setLoading(true)
    try {
      const uploadedImageUrls = [];

      for (const image of images) {
        const storageRef = ref(storage, `zzstoreImages/${image.name}-${Date.now()}`);
        await uploadBytes(storageRef, image)
        const downloadURL = await getDownloadURL(storageRef);
        uploadedImageUrls.push(downloadURL);
        setUploadedImages([...uploadedImages, downloadURL]);
      }
      const product = {
        title: products.title,
        price: products.price,
        images: uploadedImageUrls,
        category: products.category,
        sizes: selectedSizes,
        colors: selectedColors,
        description: products.description,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        )
      }
      await addDoc(productRef, product)
      setLoading(false)
      toast.success('Product added successfully')
      setImages([])
      setPreviewImages([])
      setUploadedImages([])
      setSelectedSizes([]);
      setSelectedColors([]);
      // ask the user if he wanna add another product. If yes, reset the form otherwise redirect him to the home page
      const response = window.confirm("Do you want to add another product?");
      if (response) {
        setProducts({ title: '', price: '', category: '', description: '' })
        } else {
          window.location.href = '/'
          }
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error('Failed to add product')
    }
  }





  // ****** get product
  const [product, setProduct] = useState([]);

  const getProductData = async () => {
    setLoading(true)
    try {
      const q = query(
        collection(fireDB, "zzstoreProducts"),
        orderBy("time"),
        // limit(5)
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productsArray)
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  //get Orders
  const [order, setOrder] = useState([]);

  const getOrderData = async () => {
    setLoading(true)
    try {
      const querySnapshot = await getDocs(collection(fireDB, 'zzstoreOrders'))
      const orders = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setOrder(orders)
      setLoading(false);

    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  //get User Data
  const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDB, "zzstoreUsers"))
      const orders = result.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setUser(orders)
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  useEffect(() => {
    getOrderData();
    getProductData();
    getUserData();
  }, []);




  // *****************  update and delete product *********************
  const edithandle = (item) => {
    setProducts(item)
  }
  // update product
  const updateProduct = async (item) => {
    setLoading(true)
    try {
      await setDoc(doc(fireDB, "zzstoreProducts", products.id), products);
      toast.success("Product Updated successfully")
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 2000);
      getProductData();
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
    setProducts("")
  }

  // delete product
  const deleteProduct = async (item) => {

    try {
      setLoading(true)
      await deleteDoc(doc(fireDB, "zzstoreProducts", item.id));
      toast.success('Product Deleted successfully')
      setLoading(false)
      getProductData()
    } catch (error) {
      // toast.success('Product Deleted Falied')
      setLoading(false)
    }
  }

  //Filter
  const [searchkey, setSearchkey] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterPrice, setFilterPrice] = useState('')

     // Select colors
     const [selectedColor, setSelectedColor] = useState(null)
     const handleColorClicked = (color) => {
         setSelectedColor(color)
     }
 
     const [selectedSize, setSelectedSize] = useState(null)
     const handleSizeClicked = (size) => {
         setSelectedSize(size)
     }

  return (
    <MyContext.Provider
      value={{
        mode, toggleMode, loading, setLoading, handleFileChange,
        products, setProducts, addProduct, product,
        edithandle, updateProduct, deleteProduct, order, user,
        searchkey, setSearchkey, filterType, setFilterType,
        filterPrice, setFilterPrice, handleSizeChange, handleColorChange,
        selectedSizes, selectedColors, handleSizeClicked, handleColorClicked, selectedSize, selectedColor
      }} >
      {props.children}
    </MyContext.Provider>
  )
}

export default myState