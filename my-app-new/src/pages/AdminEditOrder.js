import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
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
        const orderRes = await axios.get(`http://localhost:51770/order/${id}`);
        const orderData = orderRes.data.order;
        setOrder(orderData);
        setSelectedProduct(orderData.product?._id || '');
        setSelectedUser(orderData.user?._id || '');

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
  }, [id]);

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

    const updatedOrder = {
      user: selectedUser,
      product: selectedProduct,
      totalprice: product.price
    };

    try {
      await axios.put(`http://localhost:51770/order/${id}`, updatedOrder);
      setSuccessMessage('تم تحديث الطلبية بنجاح!');
      setTimeout(() => navigate('/order'), 2000);
    } catch (err) {
      setError('فشل في تحديث الطلبية: ' + (err.response?.data?.message || err.message));
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
        تعديل الطلبية
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

      {order && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6 border-r-4 border-blue-500">
          <h4 className="text-blue-600 font-semibold mb-2">البيانات الحالية:</h4>
          <p className="text-gray-700 mb-1">
            <span className="font-semibold">المنتج:</span> {order.product?.name || 'غير محدد'}
          </p>
          <p className="text-gray-700 mb-1">
            <span className="font-semibold">العميل:</span> {order.user?.name || 'غير محدد'}
          </p>
          <p className="text-gray-700 mb-1">
            <span className="font-semibold">السعر الإجمالي:</span> {order.totalprice}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">تاريخ الطلبية:</span> {new Date(order.orderdate).toLocaleString()}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* اختيار المنتج */}
        <div>
          <label htmlFor="product" className="block text-gray-700 font-semibold mb-1">
            اختر المنتج الجديد:
          </label>
          <select
            id="product"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          >
            <option value="">-- اختر منتجًا --</option>
            {products.map(product => (
              <option key={product._id} value={product._id}>
                {product.name} - {product.price} ريال
              </option>
            ))}
          </select>
        </div>

        {/* اختيار العميل */}
        <div>
          <label htmlFor="user" className="block text-gray-700 font-semibold mb-1">
            اختر العميل الجديد:
          </label>
          <select
            id="user"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          >
            <option value="">-- اختر عميلاً --</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>
                {user.name} ({user.email})
              </option>
            ))}
          </select>
        </div>

        {/* الأزرار */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            حفظ التغييرات
          </button>
          <button
            type="button"
            onClick={() => navigate('/order')}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            إلغاء
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditOrder;