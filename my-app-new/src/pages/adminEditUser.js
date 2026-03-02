import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ferstname: '',
    lastname: '',
    email: '',
    password: '',
    role: 'customer',
    age: '',
    gender: 'male',
    address: {
      street: '',
      city: ''
    }
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // جلب بيانات المستخدم عند تحميل المكون
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:51770/user/${id}`);
        const user = response.data.user;

        setFormData({
          ferstname: user.ferstname || '',
          lastname: user.lastname || '',
          email: user.email || '',
          password: '', // لا نجلب كلمة المرور
          role: user.role || 'customer',
          age: user.age || '',
          gender: user.gender || 'male',
          address: {
            street: user.address?.street || '',
            city: user.address?.city || ''
          }
        });
        setError('');
      } catch (err) {
        setError('فشل في تحميل بيانات المستخدم: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    const dataToSend = { ...formData };
    if (!dataToSend.password) {
      delete dataToSend.password;
    }

    try {
      await axios.put(`http://localhost:51770/user/${id}`, dataToSend);
      setSuccess('تم تحديث المستخدم بنجاح!');
      setTimeout(() => navigate('/user'), 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.message || err.message;
      setError('فشل في تحديث المستخدم: ' + errorMsg);
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
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 my-8" dir="rtl">
      <h2 className="text-2xl font-bold text-blue-600 text-center border-b-2 border-blue-600 pb-3 mb-6">
        تعديل المستخدم
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
        {/* الاسم الأول */}
        <div>
          <label htmlFor="ferstname" className="block text-gray-700 font-semibold mb-1">
            الاسم الأول *
          </label>
          <input
            type="text"
            id="ferstname"
            name="ferstname"
            value={formData.ferstname}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        {/* الاسم الأخير */}
        <div>
          <label htmlFor="lastname" className="block text-gray-700 font-semibold mb-1">
            الاسم الأخير *
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        {/* البريد الإلكتروني */}
        <div>
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
            البريد الإلكتروني *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        {/* كلمة المرور */}
        <div>
          <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
            كلمة المرور (اتركها فارغة إذا لم ترد التغيير)
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        {/* الدور */}
        <div>
          <label htmlFor="role" className="block text-gray-700 font-semibold mb-1">
            الدور
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          >
            <option value="customer">عميل</option>
            <option value="admin">مسؤول</option>
          </select>
        </div>

        {/* العمر */}
        <div>
          <label htmlFor="age" className="block text-gray-700 font-semibold mb-1">
            العمر
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        {/* الجنس */}
        <div>
          <label htmlFor="gender" className="block text-gray-700 font-semibold mb-1">
            الجنس
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          >
            <option value="male">ذكر</option>
            <option value="female">أنثى</option>
          </select>
        </div>

        {/* الشارع */}
        <div>
          <label htmlFor="street" className="block text-gray-700 font-semibold mb-1">
            الشارع
          </label>
          <input
            type="text"
            id="street"
            name="street"
            value={formData.address.street}
            onChange={handleAddressChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        {/* المدينة */}
        <div>
          <label htmlFor="city" className="block text-gray-700 font-semibold mb-1">
            المدينة
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.address.city}
            onChange={handleAddressChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
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
            onClick={() => navigate('/user')}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            إلغاء
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;