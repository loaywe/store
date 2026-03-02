import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddOrder = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, usersRes] = await Promise.all([
          axios.get('http://localhost:51770/product'),
          axios.get('http://localhost:51770/user')
        ]);

        setProducts(productsRes.data.Products || []);
        setUsers(usersRes.data.users || []);
      } catch (err) {
        setError('فشل في تحميل البيانات: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!selectedProduct || !selectedUser) {
      setError('الرجاء اختيار المنتج والعميل.');
      return;
    }

    const product = products.find(p => p._id === selectedProduct);
    if (!product) {
      setError('المنتج المحدد غير موجود.');
      return;
    }

    const orderData = {
      user: selectedUser,
      product: selectedProduct,
      totalprice: product.price
    };

    try {
      await axios.post('http://localhost:51770/order/addorder', orderData);
      setSuccessMessage('تم إضافة الطلبية بنجاح!');
      setSelectedProduct('');
      setSelectedUser('');
    } catch (err) {
      setError('فشل في إضافة الطلبية: ' + (err.response?.data?.message || err.message));
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
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 my-8" dir="rtl">
      <h2 className="text-2xl font-bold text-blue-600 text-center border-b-2 border-blue-600 pb-3 mb-6">
        إضافة طلبية جديدة
      </h2>

      {error && (
        <div className="bg-red-50 border-r-4 border-red-500 text-red-700 p-4 rounded mb-4">
          {error}
        </div>
      )}
      {successMessage && (
        <div className="bg-green-50 border-r-4 border-green-500 text-green-700 p-4 rounded mb-4">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="product" className="block text-gray-700 font-semibold mb-1">
            اختر المنتج:
          </label>
          <select
            id="product"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- اختر منتجًا --</option>
            {products.map(product => (
              <option key={product._id} value={product._id}>
                {product.name} - {product.price} ريال
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="user" className="block text-gray-700 font-semibold mb-1">
            اختر العميل:
          </label>
          <select
            id="user"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- اختر عميلاً --</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          إضافة الطلبية
        </button>
      </form>
    </div>
  );
};

export default AddOrder;