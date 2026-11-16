import React, { useState, useEffect } from 'react';
import { Package, Users, ShoppingCart, LayoutDashboard, Settings, LogOut, Plus, Edit, Trash2, Home, Activity, FileText } from 'lucide-react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE_URL = '/api';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [data, setData] = useState({ products: [], customers: [], orders: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('isAdminLoggedIn')) {
      navigate('/admin-login');
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [productsRes, customersRes, ordersRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/products.php`),
        axios.get(`${API_BASE_URL}/customers.php`),
        axios.get(`${API_BASE_URL}/orders.php`),
      ]);
      setData({
        products: productsRes.data || [],
        customers: customersRes.data || [],
        orders: ordersRes.data || []
      });
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch data. Make sure the PHP backend is running at ' + API_BASE_URL);
    }
    setLoading(false);
  };

  const handleDelete = async (type, id, idField) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/${type}.php`, { data: { [idField]: id } });
      fetchData();
    } catch (err) {
      alert('Error deleting item');
    }
  };

  const handleSave = async (e, type) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${API_BASE_URL}/${type}.php`, formData);
      } else {
        await axios.post(`${API_BASE_URL}/${type}.php`, formData);
      }
      setShowModal(false);
      setFormData({});
      fetchData();
    } catch (err) {
      alert('Error saving item');
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setFormData(item);
      setIsEditing(true);
    } else {
      setFormData({});
      setIsEditing(false);
    }
    setShowModal(true);
  };

  const handleViewOrder = async (orderId) => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/orders.php?id=${orderId}`);
      setSelectedOrder(res.data);
      setShowOrderModal(true);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch order details');
      setLoading(false);
    }
  };

  const renderDashboard = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Total Products</p>
          <h3 className="text-3xl font-bold text-gray-800">{data.products.length}</h3>
        </div>
        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
          <Package size={24} />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Total Customers</p>
          <h3 className="text-3xl font-bold text-gray-800">{data.customers.length}</h3>
        </div>
        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
          <Users size={24} />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">Total Orders</p>
          <h3 className="text-3xl font-bold text-gray-800">{data.orders.length}</h3>
        </div>
        <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center">
          <ShoppingCart size={24} />
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800">Products</h2>
        <button onClick={() => openModal()} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 text-sm font-medium">
          <Plus size={16} /> Add Product
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm">
              <th className="p-4 font-medium">ID</th>
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Price</th>
              <th className="p-4 font-medium">Stock</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.products.map((product) => (
              <tr key={product.Product_ID} className="hover:bg-gray-50 transition">
                <td className="p-4 text-sm text-gray-600">{product.Product_ID}</td>
                <td className="p-4 text-sm font-medium text-gray-800">{product.Name}</td>
                <td className="p-4 text-sm text-gray-600">{product.Category || '-'}</td>
                <td className="p-4 text-sm text-gray-600">${product.price}</td>
                <td className="p-4 text-sm text-gray-600">{product.Stock_qty}</td>
                <td className="p-4 text-sm text-right">
                  <button onClick={() => openModal(product)} className="text-blue-500 hover:text-blue-700 mr-3 p-1 rounded-md hover:bg-blue-50 transition"><Edit size={16} /></button>
                  <button onClick={() => handleDelete('products', product.Product_ID, 'Product_ID')} className="text-red-500 hover:text-red-700 p-1 rounded-md hover:bg-red-50 transition"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
            {data.products.length === 0 && (
              <tr><td colSpan="6" className="p-8 text-center text-gray-500 text-sm">No products found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderCustomers = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800">Customers</h2>
        <button onClick={() => openModal()} className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition flex items-center gap-2 text-sm font-medium">
          <Plus size={16} /> Add Customer
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm">
              <th className="p-4 font-medium">ID</th>
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Phone</th>
              <th className="p-4 font-medium">Address</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.customers.map((customer) => (
              <tr key={customer.ID} className="hover:bg-gray-50 transition">
                <td className="p-4 text-sm text-gray-600">{customer.ID}</td>
                <td className="p-4 text-sm font-medium text-gray-800">{customer.Name}</td>
                <td className="p-4 text-sm text-gray-600">{customer.Phone_num || '-'}</td>
                <td className="p-4 text-sm text-gray-600">{customer.address || '-'}</td>
                <td className="p-4 text-sm text-right">
                  <button onClick={() => openModal(customer)} className="text-emerald-500 hover:text-emerald-700 mr-3 p-1 rounded-md hover:bg-emerald-50 transition"><Edit size={16} /></button>
                  <button onClick={() => handleDelete('customers', customer.ID, 'ID')} className="text-red-500 hover:text-red-700 p-1 rounded-md hover:bg-red-50 transition"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
            {data.customers.length === 0 && (
              <tr><td colSpan="5" className="p-8 text-center text-gray-500 text-sm">No customers found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800">Recent Orders</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm">
              <th className="p-4 font-medium">Order ID</th>
              <th className="p-4 font-medium">Customer Name</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.orders.map((order) => (
              <tr key={order.order_ID} className="hover:bg-gray-50 transition">
                <td className="p-4 text-sm text-gray-600">#{order.order_ID}</td>
                <td className="p-4 text-sm font-medium text-gray-800">{order.Customer_Name || 'Unknown Customer'}</td>
                <td className="p-4 text-sm text-gray-600">{new Date(order.order_date).toLocaleString()}</td>
                <td className="p-4 text-sm text-right flex justify-end gap-2">
                  <button onClick={() => handleViewOrder(order.order_ID)} className="text-blue-500 hover:text-blue-700 p-1 rounded-md hover:bg-blue-50 transition" title="View Details"><FileText size={16} /></button>
                  <button onClick={() => handleDelete('orders', order.order_ID, 'order_ID')} className="text-red-500 hover:text-red-700 p-1 rounded-md hover:bg-red-50 transition" title="Delete Order"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
            {data.orders.length === 0 && (
              <tr><td colSpan="4" className="p-8 text-center text-gray-500 text-sm">No orders found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderModal = () => {
    if (!showModal) return null;
    const isProduct = activeTab === 'products';

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="text-lg font-bold text-gray-800">{isEditing ? 'Edit' : 'Add'} {isProduct ? 'Product' : 'Customer'}</h3>
            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 transition">&times;</button>
          </div>
          <form onSubmit={(e) => handleSave(e, isProduct ? 'products' : 'customers')} className="p-6">

            {isProduct ? (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input required type="text" value={formData.Name || ''} onChange={e => setFormData({ ...formData, Name: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input type="text" value={formData.Category || ''} onChange={e => setFormData({ ...formData, Category: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input required type="number" step="0.01" value={formData.price || ''} onChange={e => setFormData({ ...formData, price: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                  <input required type="number" value={formData.Stock_qty || ''} onChange={e => setFormData({ ...formData, Stock_qty: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input type="text" placeholder="https://..." value={formData.image_url || ''} onChange={e => setFormData({ ...formData, image_url: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
                </div>
              </>
            ) : (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input required type="text" value={formData.Name || ''} onChange={e => setFormData({ ...formData, Name: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="text" value={formData.Phone_num || ''} onChange={e => setFormData({ ...formData, Phone_num: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition" />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea rows="3" value={formData.address || ''} onChange={e => setFormData({ ...formData, address: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"></textarea>
                </div>
              </>
            )}

            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition">Cancel</button>
              <button type="submit" className={`px-5 py-2 text-white rounded-lg font-medium transition ${isProduct ? 'bg-blue-600 hover:bg-blue-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}>Save {isProduct ? 'Product' : 'Customer'}</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderOrderModal = () => {
    if (!showOrderModal || !selectedOrder) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="text-lg font-bold text-gray-800">Order #{selectedOrder.order_ID} Details</h3>
            <button onClick={() => setShowOrderModal(false)} className="text-gray-400 hover:text-gray-600 transition">&times;</button>
          </div>
          <div className="p-6 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                <h4 className="text-xs font-bold text-gray-500 tracking-wider uppercase mb-2">Customer Info</h4>
                <p className="font-medium text-gray-800">{selectedOrder.Customer_Name}</p>
                <p className="text-sm text-gray-600 mt-1">{selectedOrder.Phone_num || 'No phone provided'}</p>
                <p className="text-sm text-gray-600 mt-1">{selectedOrder.address || 'No address provided'}</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-100 bg-gray-50">
                <h4 className="text-xs font-bold text-gray-500 tracking-wider uppercase mb-2">Order Info</h4>
                <p className="font-medium text-gray-800">Date Placed</p>
                <p className="text-sm text-gray-600 mt-1">{new Date(selectedOrder.order_date).toLocaleString()}</p>
              </div>
            </div>

            <h4 className="text-sm font-bold text-gray-800 mb-3">Products Ordered</h4>
            <div className="border border-gray-100 rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                  <tr>
                    <th className="p-3 font-medium">Product</th>
                    <th className="p-3 font-medium">Quantity</th>
                    <th className="p-3 font-medium">Unit Price</th>
                    <th className="p-3 font-medium text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {selectedOrder.details && selectedOrder.details.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="p-3 text-sm font-medium text-gray-800">{item.Product_Name}</td>
                      <td className="p-3 text-sm text-gray-600">{item.quantity}</td>
                      <td className="p-3 text-sm text-gray-600">${parseFloat(item.price).toFixed(2)}</td>
                      <td className="p-3 text-sm font-medium text-gray-800 text-right">${(item.quantity * item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                  {!selectedOrder.details || selectedOrder.details.length === 0 ? (
                    <tr><td colSpan="4" className="p-4 text-center text-gray-500 text-sm">No products found for this order.</td></tr>
                  ) : null}
                </tbody>
                <tfoot className="bg-gray-50 border-t border-gray-100">
                  <tr>
                    <td colSpan="3" className="p-3 text-right text-sm font-bold text-gray-800">Total:</td>
                    <td className="p-3 text-right text-sm font-bold text-green-600">
                      ${selectedOrder.details && selectedOrder.details.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0).toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end">
            <button onClick={() => setShowOrderModal(false)} className="px-5 py-2 text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg font-medium transition">Close</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f8fafc] font-sans">
      
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-100 flex-shrink-0 flex flex-col z-20">
        <div className="p-4 md:p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <Activity size={18} />
          </div>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">Admin<span className="text-blue-600">Panel</span></h1>
        </div>

        <nav className="flex-1 p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible scrollbar-hide">
          <button onClick={() => setActiveTab('dashboard')} className={`flex-shrink-0 w-auto md:w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button onClick={() => setActiveTab('products')} className={`flex-shrink-0 w-auto md:w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${activeTab === 'products' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
            <Package size={18} /> Products
          </button>
          <button onClick={() => setActiveTab('customers')} className={`flex-shrink-0 w-auto md:w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${activeTab === 'customers' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
            <Users size={18} /> Customers
          </button>
          <button onClick={() => setActiveTab('orders')} className={`flex-shrink-0 w-auto md:w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${activeTab === 'orders' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
            <ShoppingCart size={18} /> Orders
          </button>

          <div className="md:hidden border-l border-gray-200 mx-2 h-8 self-center"></div>

          <Link to="/" className="md:hidden flex-shrink-0 w-auto flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
            <Home size={18} /> Store
          </Link>
          <button onClick={() => { localStorage.removeItem('isAdminLoggedIn'); navigate('/'); }} className="md:hidden flex-shrink-0 w-auto flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition">
            <LogOut size={18} /> Logout
          </button>
        </nav>

        <div className="p-4 border-t border-gray-100 hidden md:block">
          <Link to="/" className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-xl transition mb-1">
            <Home size={18} /> Back to Store
          </Link>
          <button onClick={() => { localStorage.removeItem('isAdminLoggedIn'); navigate('/'); }} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition mt-2">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-gray-100 px-4 md:px-8 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 capitalize">{activeTab}</h2>
          <div className="flex items-center gap-4">
            <button onClick={fetchData} className="text-sm font-medium text-gray-500 hover:text-blue-600 transition">Refresh</button>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 shadow-sm border-2 border-white"></div>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-100 rounded-xl flex items-center gap-3">
              <span className="font-medium text-sm">{error}</span>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {activeTab === 'dashboard' && renderDashboard()}
              {activeTab === 'products' && renderProducts()}
              {activeTab === 'customers' && renderCustomers()}
              {activeTab === 'orders' && renderOrders()}
            </>
          )}
        </div>
      </main>

      {renderModal()}
      {renderOrderModal()}
    </div>
  );
};

export default Admin;
