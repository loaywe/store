import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Felter from "../component/felter";
import Search from "../component/search";

function Admin({ data, setdata, items, setitems, colomndifult, feltercolmn, serchof, columndelet, itemname, usersList, productsList }) {
  const [colmnname, setcolmnname] = useState(columndelet);
  const [keey, setkeey] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [Filters, setRFilters] = useState(feltercolmn || {});
  const [page, setPage] = useState(1);
  const sarchof = serchof;

  const buildKeys = () => {
    let temp = [];
    // التأكد من أن data هي مصفوفة ولها طول
    if (Array.isArray(data) && data.length > 0) {
      Object.keys(data[0] || {})
        .filter(key => !colmnname.includes(key))
        .forEach((key) => {
          const value = data[0][key];
          if (typeof value === "object" && value !== null && !Array.isArray(value)) {
            Object.keys(value).forEach(subKey => {
              temp.push(`${key}_${subKey}`);
            });
          } else {
            temp.push(key);
          }
        });
    }
    setkeey(temp);
  };

  const getNestedValue = (obj, path) => {
    if (path.includes("_")) {
      const [a, b] = path.split("_");
      return obj?.[a]?.[b];
    } else {
      return obj?.[path];
    }
  };

  const getItemName = (itemId, list) => {
    if (!itemId || !list || list.length === 0) return itemId;
    const found = list.find((item) => String(item._id) === String(itemId));
    return found ? found.name || found.email || itemId : itemId;
  };

  const getDisplayValue = (obj, path, endpoint) => {
    const value = getNestedValue(obj, path);
    if (endpoint === "order") {
      if (path === "user" && usersList) {
        return getItemName(value, usersList);
      }
      if (path === "product" && productsList) {
        return getItemName(value, productsList);
      }
    }
    return value;
  };

  const applyFilters = (users) => {
    return users && users.filter((user) => {
      return Object.keys(Filters).every((key) => {
        if (Filters[key] === "") return true;
        const value = getNestedValue(user, key);
        return value?.toString().toLowerCase().includes(Filters[key].toLowerCase());
      });
    });
  };

  useEffect(() => {
    let userflt = data && data;

    if (searchTerm !== "") {
      userflt = userflt.filter((item) =>
        item[serchof].toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    let result = applyFilters(userflt);
    setitems(result || []); // نضمن أن result ليس null
  }, [searchTerm, Filters]);

  useEffect(() => {
    buildKeys();
  }, [data]);

  const navigate = useNavigate();
  const location = useLocation();
  const endpoint = location.pathname.split("/")[1] || "";

  const edetitem = (id) => {
    navigate(`/edit/${endpoint}/${encodeURIComponent(id)}`);
  };

  const delettitem = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:51770/${endpoint}/${id}`);
      alert(response.data);
      setitems((prev) => prev.filter((it) => it._id !== id));
    } catch (error) {
      const msg = error?.response?.data || error.message || "Delete failed";
      alert(msg);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-5 border-b-2 border-blue-600 pb-2 inline-block">
        {itemname} Management
      </h2>

      {/* شريط الأدوات */}
      <div className="flex flex-wrap gap-4 items-center bg-gray-50 p-4 rounded-lg mb-6">
        <Link to={`/add/${endpoint}`} className="inline-flex items-center gap-2 bg-cyan-500 text-white px-5 py-2 rounded-full font-medium hover:bg-cyan-600 hover:-translate-y-0.5 transition shadow-sm">
          <span>➕</span> Add {itemname}
        </Link>

        <Search feltered={setSearchTerm} typefelter="name" />

        {Object.keys(Filters).map((key) => (
          <Felter setfelter={setRFilters} felter={Filters} items={data} typefelter={key} key={key} />
        ))}
      </div>

      {/* الجدول */}
      <div className="overflow-x-auto mt-4">
        <table className="w-full border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-3">#</th>
              {items && items.length > 0
                ? keey.map((key, index) => <th key={index} className="p-3">{key}</th>)
                : colomndifult.map((col, index) => <th key={index} className="p-3">{col}</th>)}
              <th className="p-3">Setting⚙️</th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? (
              items.slice((page - 1) * 4, page * 4).map((user, index) => (
                <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="p-3 text-center font-semibold text-blue-600">{index + 1}</td>
                  {keey.map((key, i) => (
                    <td key={i} className="p-3 text-center">
                      {getDisplayValue(user, key, endpoint) ?? "_"}
                    </td>
                  ))}
                  <td className="p-3 text-center">
                    <button
                      onClick={() => edetitem(user._id)}
                      className="border border-blue-600 text-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-600 hover:text-white transition mx-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this item?")) {
                          delettitem(user._id);
                        }
                      }}
                      className="border border-pink-600 text-pink-600 px-3 py-1 rounded text-sm hover:bg-pink-600 hover:text-white transition mx-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={keey.length + 2} className="text-center p-4 text-gray-500">
                  لا توجد بيانات
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* أزرار التنقل */}
      <div className="flex justify-center gap-3 mt-5">
        <button
          onClick={() => setPage(page > 1 ? page - 1 : 1)}
          className="w-10 h-10 rounded-full bg-blue-600 text-white text-xl hover:bg-indigo-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={page === 1}
        >
          &lt;
        </button>
        <button
          onClick={() => setPage(page < Math.ceil((items?.length || 0) / 4) ? page + 1 : page)}
          className="w-10 h-10 rounded-full bg-blue-600 text-white text-xl hover:bg-indigo-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={page >= Math.ceil((items?.length || 0) / 4)}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default Admin;