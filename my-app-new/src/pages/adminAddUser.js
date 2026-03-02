import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminAddUser() {
  const navigate = useNavigate();
  const [sampleKeys, setSampleKeys] = useState(null);
  const [form, setForm] = useState({});
  const [useJson, setUseJson] = useState(false);
  const [jsonRaw, setJsonRaw] = useState("");

  useEffect(() => {
    const fetchSample = async () => {
      try {
        const res = await axios.get("http://localhost:51770/user");
        const arrays = Object.values(res.data).filter((v) => Array.isArray(v));
        const list = arrays.length ? arrays[0] : [];
        const sample = list[0] || null;
        if (sample) {
          setSampleKeys(
            Object.keys(sample).filter(
              (k) => k !== "_id" && k !== "__v" && k !== "name"
            )
          );
          const initial = {};
          Object.keys(sample).forEach((k) => {
            initial[k] = "";
          });
          setForm(initial);
        } else {
          setUseJson(true);
        }
      } catch (err) {
        console.error(err);
        setUseJson(true);
      }
    };
    fetchSample();
  }, []);

  const handleChange = (key, val) => {
    const updated = { ...(form || {}), [key]: val };
    if (
      key === "ferstname" ||
      key === "firstname" ||
      key === "firstName" ||
      key === "lastname" ||
      key === "lastName"
    ) {
      const first =
        updated.ferstname || updated.firstname || updated.firstName || "";
      const last = updated.lastname || updated.lastName || "";
      updated.name = `${first} ${last}`.trim();
    }
    setForm(updated);
  };

  const isDateTimeField = (fieldName) => {
    const lowerName = String(fieldName).toLowerCase();
    return lowerName.includes("date") || lowerName.includes("time");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let payload = useJson ? JSON.parse(jsonRaw) : { ...form };
      const first =
        payload.ferstname || payload.firstname || payload.firstName || "";
      const last = payload.lastname || payload.lastName || "";
      const computed = `${first} ${last}`.trim();
      if (computed) payload.name = computed;
      await axios.post("http://localhost:51770/user/adduser", payload);
      alert("Created");
      navigate("/user");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data || err.message || "Create failed");
    }
  };

  // وضع JSON (عند عدم وجود عينة)
  if (useJson) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 my-8" dir="rtl">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">إضافة مستخدم</h2>
        <p className="text-gray-600 mb-3">لم يتم العثور على عينة - يرجى إدخال JSON كامل للمستخدم الجديد</p>
        <textarea
          value={jsonRaw}
          onChange={(e) => setJsonRaw(e.target.value)}
          className="w-full min-h-[200px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 font-mono"
          placeholder='{"field": "value"}'
        />
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition"
          >
            إنشاء
          </button>
          <button
            onClick={() => navigate("/user")}
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-md transition"
          >
            إلغاء
          </button>
        </div>
      </div>
    );
  }

  if (!sampleKeys) {
    return (
      <div className="text-center py-12 text-gray-500 text-lg">
        جاري التحميل...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 my-8" dir="rtl">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">إضافة مستخدم</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {sampleKeys.map((key) => {
          const inputType = isDateTimeField(key) ? "datetime-local" : "text";
          return (
            <div key={key}>
              <label className="block text-gray-700 font-semibold mb-1">
                {key}
              </label>
              <input
                type={inputType}
                value={form[key] ?? ""}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
              />
            </div>
          );
        })}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition"
          >
            إنشاء
          </button>
          <button
            type="button"
            onClick={() => navigate("/user")}
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-md transition"
          >
            إلغاء
          </button>
        </div>
      </form>
    </div>
  );
}