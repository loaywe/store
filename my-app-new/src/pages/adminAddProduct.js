import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    expirdate: '',
    category: 'food' // قيمة افتراضية
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!formData.name || !formData.price || !formData.expirdate) {
      setError('الرجاء ملء جميع الحقول المطلوبة');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:51770/product/addproduct', {
        name: formData.name,
        price: Number(formData.price),
        expirdate: formData.expirdate,
        category: formData.category
      });

      setSuccess('تم إضافة المنتج بنجاح!');
      setFormData({
        name: '',
        price: '',
        expirdate: '',
        category: 'food'
      });
      console.log('Product added:', response.data);
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.message || err.message;
      setError('فشل في إضافة المنتج: ' + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md p-8 my-8" dir="rtl">
      <h2 className="text-2xl font-bold text-blue-600 text-center border-b-2 border-blue-600 pb-3 mb-6">
        إضافة منتج جديد
      </h2>

      {error && (
        <div className="bg-red-50 border-r-4 border-red-500 text-red-700 p-4 rounded mb-4">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border-r-4 border-green-500 text-green-700 p-4 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* اسم المنتج */}
        <div>
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
            اسم المنتج *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        {/* السعر */}
        <div>
          <label htmlFor="price" className="block text-gray-700 font-semibold mb-1">
            السعر *
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        {/* تاريخ الانتهاء */}
        <div>
          <label htmlFor="expirdate" className="block text-gray-700 font-semibold mb-1">
            تاريخ الانتهاء *
          </label>
          <input
            type="date"
            id="expirdate"
            name="expirdate"
            value={formData.expirdate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        {/* الفئة */}
        <div>
          <label htmlFor="category" className="block text-gray-700 font-semibold mb-1">
            الفئة *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          >
            <option value="food">طعام</option>
            <option value="electronics">إلكترونيات</option>
            <option value="clothing">ملابس</option>
          </select>
        </div>

        {/* زر الإضافة */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'جاري الإضافة...' : 'إضافة المنتج'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;