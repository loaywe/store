import { useState, useEffect } from "react";
import axios from "axios";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import AdminUser from "./pages/adminuser";
import AddUser from "./pages/adminAddUser";
import AdminAddProduct from "./pages/adminAddProduct";
import AddOrder from "./pages/adminAddOrder";
import AdminEditUser from "./pages/adminEditUser";
import AdminEditProduct from "./pages/adminEditProduct";
import EditOrder from "./pages/AdminEditOrder";
function Home() {
  return (
    <div className="text-center py-20 px-5">
      <h1 className="text-4xl font-bold mb-4 text-indigo-500">
        👋 Welcome
      </h1>

      <h2 className="text-2xl font-semibold mb-6 text-slate-200">
        🛒 Product Management System
      </h2>

      <p className="max-w-xl mx-auto text-slate-400 text-lg leading-relaxed">
        This page is used to manage products within the system.
        You can view products, users, and orders through the control panel.
      </p>

      <p className="mt-8 text-slate-500 text-sm">
        🚀 Store Management System – Simple and organized user experience
      </p>
    </div>
  );
}
function App() {
  const [data, setdata] = useState(null);
  const [users, setusers] = useState(null);
  const [product, setproduct] = useState(null);
  const [order, setorder] = useState(null);

  const location = useLocation();
  const [items] = useState(["user", "product", "order"]);

  const fetchdata = async (item) => {
    try {
      const response = await axios.get(`http://localhost:51770/${item}`);
      setdata(response.data);
      setusers(response.data.users);
      setproduct(response.data.Products);
      setorder(response.data.orders);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const page = location.pathname.split("/").filter(Boolean)[0];
    if (!page) return;
    fetchdata(page);
  }, [location.pathname]);

  return (
    <div className="flex bg-slate-900 min-h-screen">
      {/* Sidebar */}
      <div className="w-64 fixed left-0 top-0 h-screen bg-slate-800 border-r border-white/5 p-6 flex flex-col gap-4 z-50 text-slate-200">
<h2 className="text-xl font-bold text-indigo-400 mb-6">
  Control Panel
</h2>        {items.map((name) => (
          <Link
            key={name}
            to={`/${name}`}
            className="px-3 py-2 rounded-lg hover:bg-slate-700 transition block"
          >
            👥 {name}
          </Link>
        ))}
      </div>

      {/* Content Area */}
      <div className="ml-64 flex-1 p-8 w-full">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* صفحات الإضافة */}
          <Route path="/add/user" element={<AddUser />} />
          <Route path="/add/product" element={<AdminAddProduct />} />
          <Route path="/add/order" element={<AddOrder />} />

          {/* صفحات التعديل */}
          <Route path="/edit/user/:id" element={<AdminEditUser />} />
          <Route path="/edit/product/:id" element={<AdminEditProduct />} />
          <Route path="/edit/order/:id" element={<EditOrder />} />

          {/* صفحات العرض */}
          <Route
            path="/user"
            element={
              <AdminUser
                data={data && data.users}
                setdata={setdata}
                items={users}
                setitems={setusers}
                colomndifult={['street', 'city', 'email', 'role', 'age', 'name']}
                feltercolmn={{ role: "", age: "", address_city: "" }}
                serchof="name"
                columndelet={["ferstname", "lastname", "_id", "__v", "password"]}
                itemname={"User"}
              />
            }
          />
          <Route
            path="/product"
            element={
              <AdminUser
                data={data && data.Products}
                setdata={setdata}
                items={product}
                setitems={setproduct}
                colomndifult={['criatdate', 'category', 'expirdate', 'price', 'name']}
                feltercolmn={{ price: "", criatdate: "", category: "" }}
                serchof="name"
                columndelet={["_id", "__v"]}
                itemname={"Product"}
              />
            }
          />
          <Route
            path="/order"
            element={
              <AdminUser
                data={data && data.orders}
                setdata={setdata}
                items={order}
                setitems={setorder}
                colomndifult={[
                  'totalprice', 'orderdate', 'street', 'city',
                  'email', 'age', 'gender', 'name', 'category', 'productName'
                ]}
                feltercolmn={{
                  address_city: "",
                  totalprice: "",
                  category: ""
                }}
                serchof="name"
                columndelet={["_id", "__v"]}
                itemname={"Order"}
                usersList={users}
                productsList={product}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;