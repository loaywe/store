import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    expirdate: '',
    category: 'food'
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // جلب بيانات المنتج
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:51770/product/${id}`);
        const product = response.data.product;

        const expirdate = product.expirdate
          ? new Date(product.expirdate).toISOString().split('T')[0]
          : '';

        setFormData({
          name: product.name || '',
          price: product.price || '',
          expirdate: expirdate,
          category: product.category || 'food'
        });
        setError('');
      } catch (err) {
        setError('فشل في تحميل بيانات المنتج: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    if (!formData.name || !formData.price || !formData.expirdate) {
      setError('الرجاء ملء جميع الحقول المطلوبة');
      setSaving(false);
      return;
    }

    try {
      await axios.put(`http://localhost:51770/product/${id}`, {
        name: formData.name,
        price: Number(formData.price),
        expirdate: formData.expirdate,
        category: formData.category
      });

      setSuccess('تم تحديث المنتج بنجاح!');
      setTimeout(() => navigate('/product'), 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.message || err.message;
      setError('فشل في تحديث المنتج: ' + errorMsg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-500 text-lg">
        جاري تحميل البيانات...
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md p-8 my-8" dir="rtl">
      <h2 className="text-2xl font-bold text-blue-600 text-center border-b-2 border-blue-600 pb-3 mb-6">
        تعديل المنتج
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

        {/* الأزرار */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/product')}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            إلغاء
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;