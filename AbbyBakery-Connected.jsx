import { useState, useRef, useEffect } from "react";

// ─────────────────────────────────────────────
// BACKEND URL — Your live Render backend
// ─────────────────────────────────────────────
const API_URL = "https://abby-backend.onrender.com";

// ─────────────────────────────────────────────
// BUSINESS DATA
// ─────────────────────────────────────────────
const BUSINESS = {
  name: "Abby Cake and Bites",
  location: "Njiapanda, 25232 Njiapanda, Himo",
  phone: "0620 767 919",
  hours: {
    Monday: "7:00 AM – 7:00 PM",
    Tuesday: "7:00 AM – 7:00 PM",
    Wednesday: "7:00 AM – 7:00 PM",
    Thursday: "7:00 AM – 7:00 PM",
    Friday: "7:00 AM – 8:00 PM",
    Saturday: "7:00 AM – 8:00 PM",
    Sunday: "Closed",
  },
};

const MENU = [
  {
    category: "Custom Cakes", emoji: "🎂",
    items: [
      { name: "Birthday Cake", sizes: ["6\"","8\"","10\"","12\""], priceRange: "TZS 25,000 – 80,000", description: "Personalized, themed & decorated to your wishes" },
      { name: "Wedding Cake", sizes: ["2-tier","3-tier","4-tier"], priceRange: "TZS 80,000 – 300,000", description: "Elegant multi-tier masterpieces for your big day" },
      { name: "Anniversary Cake", sizes: ["6\"","8\"","10\""], priceRange: "TZS 30,000 – 75,000", description: "Romantic designs with personalized messages" },
      { name: "Baby Shower Cake", sizes: ["6\"","8\""], priceRange: "TZS 28,000 – 60,000", description: "Adorable pastel creations for new arrivals" },
    ],
  },
  {
    category: "Flavors Available", emoji: "✨",
    items: [
      { name: "Vanilla", description: "Classic, light & fluffy", priceRange: "Included" },
      { name: "Chocolate", description: "Rich dark chocolate", priceRange: "Included" },
      { name: "Red Velvet", description: "Velvety smooth with cream cheese", priceRange: "Included" },
      { name: "Lemon", description: "Zesty & refreshing", priceRange: "Included" },
      { name: "Strawberry", description: "Sweet berry delight", priceRange: "+ TZS 3,000" },
      { name: "Caramel", description: "Buttery caramel indulgence", priceRange: "+ TZS 3,000" },
    ],
  },
  {
    category: "Bites & Pastries", emoji: "🍪",
    items: [
      { name: "Cupcakes", sizes: ["6 pcs","12 pcs"], priceRange: "TZS 12,000 – 22,000", description: "Mini decorated cupcakes in any flavor" },
      { name: "Cookies", sizes: ["6 pcs","12 pcs"], priceRange: "TZS 8,000 – 15,000", description: "Freshly baked butter & chocolate chip cookies" },
      { name: "Brownies", sizes: ["4 pcs","9 pcs"], priceRange: "TZS 10,000 – 20,000", description: "Fudgy dark chocolate brownies" },
      { name: "Cake Pops", sizes: ["6 pcs","12 pcs"], priceRange: "TZS 12,000 – 22,000", description: "Fun bite-sized cake balls on a stick" },
      { name: "Doughnuts", sizes: ["6 pcs","12 pcs"], priceRange: "TZS 9,000 – 17,000", description: "Glazed, sprinkled or filled doughnuts" },
      { name: "Muffins", sizes: ["4 pcs","8 pcs"], priceRange: "TZS 8,000 – 15,000", description: "Blueberry, banana or choco-chip muffins" },
    ],
  },
];

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
  :root {
    --cream: #fdf6ee; --blush: #f5d6c8; --rose: #e8a598;
    --dusty-rose: #c97d6e; --brown: #6b3f2a; --dark: #2c1810;
    --gold: #c9a96e; --sage: #a8b89a; --white: #ffffff;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--dark); overflow-x: hidden; }
  .nav { background: var(--white); border-bottom: 1px solid var(--blush); padding: 0 24px; height: 64px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 100; box-shadow: 0 2px 20px rgba(107,63,42,0.06); }
  .nav-brand { display: flex; align-items: center; gap: 10px; }
  .nav-logo { width: 38px; height: 38px; background: linear-gradient(135deg, var(--rose), var(--dusty-rose)); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; }
  .nav-title { font-family: 'Playfair Display', serif; font-size: 18px; color: var(--brown); font-weight: 700; }
  .nav-links { display: flex; gap: 8px; }
  .nav-btn { padding: 8px 16px; border-radius: 20px; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; transition: all 0.2s; background: transparent; color: var(--brown); }
  .nav-btn:hover { background: var(--blush); }
  .nav-btn.active { background: var(--dusty-rose); color: white; }
  .status-dot { display: inline-flex; align-items: center; gap: 5px; font-size: 12px; color: #888; padding: 4px 10px; background: #f9f9f9; border-radius: 20px; border: 1px solid #eee; }
  .dot { width: 7px; height: 7px; border-radius: 50%; background: #e0a0a0; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
  .hero { background: linear-gradient(160deg, #fdf0e6 0%, #f9e2d2 50%, #f5d6c8 100%); padding: 80px 24px 60px; text-align: center; position: relative; overflow: hidden; }
  .hero::before { content: ''; position: absolute; inset: 0; background-image: radial-gradient(circle at 20% 50%, rgba(201,165,110,0.12) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(232,165,152,0.15) 0%, transparent 40%); }
  .hero-badge { display: inline-block; background: rgba(201,125,110,0.12); color: var(--dusty-rose); padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: 500; letter-spacing: 0.05em; margin-bottom: 20px; border: 1px solid rgba(201,125,110,0.2); }
  .hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(36px, 8vw, 68px); color: var(--brown); line-height: 1.1; margin-bottom: 16px; }
  .hero h1 em { font-style: italic; color: var(--dusty-rose); }
  .hero p { font-size: 17px; color: #8a6050; max-width: 480px; margin: 0 auto 32px; line-height: 1.6; }
  .hero-ctas { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .btn-primary { background: linear-gradient(135deg, var(--dusty-rose), #b56e60); color: white; padding: 14px 28px; border-radius: 30px; border: none; font-size: 15px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; box-shadow: 0 4px 20px rgba(201,125,110,0.35); }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(201,125,110,0.45); }
  .btn-secondary { background: white; color: var(--dusty-rose); padding: 14px 28px; border-radius: 30px; border: 2px solid var(--rose); font-size: 15px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
  .btn-secondary:hover { background: var(--blush); }
  .container { max-width: 900px; margin: 0 auto; padding: 40px 24px; }
  .info-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 48px; }
  .info-card { background: white; border-radius: 16px; padding: 20px; border: 1px solid rgba(232,165,152,0.2); box-shadow: 0 2px 16px rgba(107,63,42,0.05); }
  .info-card-icon { font-size: 24px; margin-bottom: 10px; }
  .info-card-label { font-size: 11px; font-weight: 600; color: var(--rose); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
  .info-card-value { font-size: 15px; color: var(--dark); font-weight: 500; line-height: 1.5; }
  .section-header { text-align: center; margin-bottom: 32px; }
  .section-header h2 { font-family: 'Playfair Display', serif; font-size: clamp(26px, 5vw, 38px); color: var(--brown); margin-bottom: 8px; }
  .section-header p { color: #8a6050; font-size: 15px; }
  .menu-category { margin-bottom: 40px; }
  .menu-category-title { font-family: 'Playfair Display', serif; font-size: 22px; color: var(--brown); margin-bottom: 16px; display: flex; align-items: center; gap: 10px; padding-bottom: 12px; border-bottom: 2px solid var(--blush); }
  .menu-items { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 14px; }
  .menu-item { background: white; border-radius: 14px; padding: 18px; border: 1px solid rgba(232,165,152,0.2); transition: all 0.2s; cursor: pointer; }
  .menu-item:hover { border-color: var(--rose); box-shadow: 0 4px 16px rgba(201,125,110,0.15); transform: translateY(-2px); }
  .menu-item-name { font-weight: 600; font-size: 15px; color: var(--dark); margin-bottom: 4px; }
  .menu-item-desc { font-size: 12px; color: #9a7060; margin-bottom: 8px; line-height: 1.4; }
  .menu-item-price { font-size: 13px; font-weight: 600; color: var(--dusty-rose); }
  .menu-item-sizes { font-size: 11px; color: #aaa; margin-top: 4px; }
  .hours-grid { background: white; border-radius: 16px; padding: 24px; border: 1px solid rgba(232,165,152,0.2); box-shadow: 0 2px 16px rgba(107,63,42,0.05); }
  .hours-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #f5ede8; font-size: 15px; }
  .hours-row:last-child { border-bottom: none; }
  .hours-day { font-weight: 500; color: var(--dark); }
  .hours-time { color: #8a6050; }
  .hours-closed { color: #d4a0a0; font-style: italic; }
  .map-container { border-radius: 16px; overflow: hidden; border: 1px solid rgba(232,165,152,0.2); box-shadow: 0 2px 16px rgba(107,63,42,0.05); margin-top: 32px; }
  .map-placeholder { background: linear-gradient(135deg, #f5ede8, #fdf0e6); height: 280px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; color: var(--brown); }
  .map-placeholder-icon { font-size: 40px; }
  .map-placeholder h3 { font-family: 'Playfair Display', serif; font-size: 20px; }
  .map-placeholder p { font-size: 14px; color: #8a6050; }
  .map-open-btn { background: var(--dusty-rose); color: white; padding: 10px 20px; border-radius: 20px; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; }
  .chat-wrapper { max-width: 700px; margin: 0 auto; }
  .chat-box { background: white; border-radius: 24px; border: 1px solid rgba(232,165,152,0.3); box-shadow: 0 4px 30px rgba(107,63,42,0.08); overflow: hidden; display: flex; flex-direction: column; height: 580px; }
  .chat-header { background: linear-gradient(135deg, var(--dusty-rose), #b56e60); padding: 18px 20px; display: flex; align-items: center; gap: 12px; color: white; }
  .chat-avatar { width: 44px; height: 44px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px; }
  .chat-header-info h3 { font-size: 16px; font-weight: 600; }
  .chat-header-info p { font-size: 12px; opacity: 0.85; }
  .online-dot { width: 8px; height: 8px; background: #7fff7f; border-radius: 50%; display: inline-block; margin-right: 5px; }
  .chat-messages { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 12px; background: #fdf9f7; }
  .chat-messages::-webkit-scrollbar { width: 4px; }
  .chat-messages::-webkit-scrollbar-thumb { background: var(--blush); border-radius: 2px; }
  .msg { max-width: 80%; animation: fadeSlide 0.3s ease; }
  @keyframes fadeSlide { from { opacity:0; transform: translateY(8px); } to { opacity:1; transform: translateY(0); } }
  .msg.user { align-self: flex-end; }
  .msg.assistant { align-self: flex-start; }
  .msg-bubble { padding: 12px 16px; border-radius: 18px; font-size: 14px; line-height: 1.6; white-space: pre-wrap; }
  .msg.user .msg-bubble { background: linear-gradient(135deg, var(--dusty-rose), #b56e60); color: white; border-bottom-right-radius: 4px; }
  .msg.assistant .msg-bubble { background: white; color: var(--dark); border: 1px solid rgba(232,165,152,0.25); border-bottom-left-radius: 4px; box-shadow: 0 2px 8px rgba(107,63,42,0.06); }
  .msg-time { font-size: 11px; color: #bbb; margin-top: 4px; padding: 0 4px; }
  .msg.user .msg-time { text-align: right; }
  .typing-indicator { display: flex; gap: 5px; align-items: center; padding: 14px 16px; }
  .typing-dot { width: 7px; height: 7px; background: var(--rose); border-radius: 50%; animation: typingBounce 1.2s infinite; }
  .typing-dot:nth-child(2) { animation-delay: 0.2s; }
  .typing-dot:nth-child(3) { animation-delay: 0.4s; }
  @keyframes typingBounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
  .chat-input-area { padding: 14px 16px; border-top: 1px solid rgba(232,165,152,0.2); background: white; display: flex; gap: 10px; align-items: flex-end; }
  .chat-input { flex: 1; border: 1.5px solid var(--blush); border-radius: 20px; padding: 10px 16px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--dark); outline: none; resize: none; max-height: 100px; transition: border-color 0.2s; background: #fdf9f7; }
  .chat-input:focus { border-color: var(--dusty-rose); }
  .chat-send-btn { width: 42px; height: 42px; background: linear-gradient(135deg, var(--dusty-rose), #b56e60); border: none; border-radius: 50%; color: white; font-size: 18px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; flex-shrink: 0; }
  .chat-send-btn:hover { transform: scale(1.08); }
  .chat-send-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
  .quick-replies { display: flex; flex-wrap: wrap; gap: 8px; padding: 0 20px 14px; background: #fdf9f7; }
  .quick-reply-btn { padding: 7px 14px; background: white; border: 1.5px solid var(--blush); border-radius: 16px; font-size: 13px; color: var(--dusty-rose); cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 500; transition: all 0.15s; }
  .quick-reply-btn:hover { background: var(--blush); border-color: var(--rose); }
  .order-success { background: white; border-radius: 20px; padding: 32px; text-align: center; border: 2px solid rgba(168,184,154,0.4); box-shadow: 0 4px 24px rgba(107,63,42,0.08); }
  .order-success-icon { font-size: 52px; margin-bottom: 16px; }
  .order-success h3 { font-family: 'Playfair Display', serif; font-size: 24px; color: var(--brown); margin-bottom: 8px; }
  .order-success p { color: #8a6050; font-size: 15px; line-height: 1.6; }
  .order-details { background: #fdf9f7; border-radius: 12px; padding: 16px; margin: 20px 0; text-align: left; font-size: 14px; line-height: 2; color: var(--dark); }
  .order-detail-row { display: flex; justify-content: space-between; border-bottom: 1px solid #f0e8e4; }
  .order-detail-row:last-child { border-bottom: none; }
  .order-detail-key { color: #9a7060; font-weight: 500; }
  .order-detail-val { font-weight: 600; color: var(--brown); }
  .admin-login { max-width: 360px; margin: 60px auto; background: white; border-radius: 20px; padding: 40px 32px; box-shadow: 0 4px 30px rgba(107,63,42,0.1); text-align: center; }
  .admin-login h2 { font-family: 'Playfair Display', serif; font-size: 26px; color: var(--brown); margin-bottom: 6px; }
  .admin-login p { color: #9a7060; font-size: 14px; margin-bottom: 28px; }
  .form-field { margin-bottom: 16px; text-align: left; }
  .form-field label { display: block; font-size: 13px; font-weight: 600; color: var(--brown); margin-bottom: 6px; }
  .form-input { width: 100%; padding: 11px 14px; border: 1.5px solid var(--blush); border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: var(--dark); outline: none; transition: border-color 0.2s; }
  .form-input:focus { border-color: var(--dusty-rose); }
  .admin-panel { max-width: 900px; margin: 0 auto; padding: 32px 24px; }
  .admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 28px; flex-wrap: wrap; gap: 12px; }
  .admin-header h2 { font-family: 'Playfair Display', serif; font-size: 28px; color: var(--brown); }
  .admin-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 14px; margin-bottom: 28px; }
  .stat-card { background: white; border-radius: 14px; padding: 18px; border: 1px solid rgba(232,165,152,0.2); }
  .stat-card-val { font-size: 28px; font-weight: 700; color: var(--dusty-rose); font-family: 'Playfair Display', serif; }
  .stat-card-label { font-size: 12px; color: #9a7060; margin-top: 4px; font-weight: 500; }
  .orders-table { background: white; border-radius: 16px; overflow: hidden; border: 1px solid rgba(232,165,152,0.2); }
  .orders-table-header { background: linear-gradient(135deg, var(--blush), #f9e2d2); padding: 14px 20px; display: grid; grid-template-columns: 80px 1fr 1fr 120px 100px; gap: 10px; font-size: 12px; font-weight: 700; color: var(--brown); text-transform: uppercase; letter-spacing: 0.05em; }
  .order-row { padding: 14px 20px; display: grid; grid-template-columns: 80px 1fr 1fr 120px 100px; gap: 10px; border-bottom: 1px solid #f5ede8; font-size: 14px; align-items: center; }
  .order-row:last-child { border-bottom: none; }
  .order-row:hover { background: #fdf9f7; }
  .status-badge { padding: 4px 10px; border-radius: 10px; font-size: 11px; font-weight: 600; display: inline-block; }
  .status-pending { background: #fff3cd; color: #856404; }
  .status-confirmed { background: #d4edda; color: #155724; }
  .wa-float { position: fixed; bottom: 24px; right: 24px; width: 54px; height: 54px; background: #25D366; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 26px; cursor: pointer; box-shadow: 0 4px 16px rgba(37,211,102,0.4); z-index: 999; text-decoration: none; transition: all 0.2s; }
  .wa-float:hover { transform: scale(1.1); }
  .footer { background: var(--dark); color: rgba(255,255,255,0.7); text-align: center; padding: 32px 24px; font-size: 14px; margin-top: 60px; }
  .footer strong { color: var(--rose); }
  .error-msg { background: #fff0f0; color: #c0392b; padding: 10px 14px; border-radius: 10px; font-size: 13px; margin-bottom: 12px; border: 1px solid #ffd5d5; }
  @media (max-width: 600px) {
    .orders-table-header, .order-row { grid-template-columns: 60px 1fr 1fr; }
    .orders-table-header span:nth-child(4), .orders-table-header span:nth-child(5),
    .order-row span:nth-child(4), .order-row span:nth-child(5) { display: none; }
    .nav-links .nav-btn span { display: none; }
  }
`;

// ─────────────────────────────────────────────
// API HELPERS
// ─────────────────────────────────────────────

// Send chat message through backend
async function sendChatMessage(messages) {
  const res = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Chat failed");
  return data.reply;
}

// Submit order to backend (saves to MongoDB + sends email)
async function submitOrder(orderData) {
  const res = await fetch(`${API_URL}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Order failed");
  return data.order;
}

// Admin login
async function adminLogin(username, password) {
  const res = await fetch(`${API_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Login failed");
  return data;
}

// Get all orders (admin)
async function fetchOrders(token) {
  const res = await fetch(`${API_URL}/api/admin/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data;
}

// Get stats (admin)
async function fetchStats(token) {
  const res = await fetch(`${API_URL}/api/admin/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message);
  return data.stats;
}

// ─────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [adminToken, setAdminToken] = useState(null);

  useEffect(() => {
    const el = document.createElement("style");
    el.innerHTML = styles;
    document.head.appendChild(el);
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <>
      <nav className="nav">
        <div className="nav-brand">
          <div className="nav-logo">🎂</div>
          <span className="nav-title">Abby Cake & Bites</span>
        </div>
        <div className="nav-links">
          {["home","menu","chat","admin"].map(p => (
            <button key={p} className={`nav-btn ${page===p?"active":""}`} onClick={()=>setPage(p)}>
              {p==="home"?"🏠 ": p==="menu"?"🎂 ": p==="chat"?"💬 ":"🔐 "}
              <span>{p.charAt(0).toUpperCase()+p.slice(1)}</span>
            </button>
          ))}
        </div>
        <span className="status-dot"><span className="dot"/>Closed · Opens Mon 7AM</span>
      </nav>

      {page==="home" && <HomePage setPage={setPage}/>}
      {page==="menu" && <MenuPage setPage={setPage}/>}
      {page==="chat" && <ChatPage/>}
      {page==="admin" && (adminToken
        ? <AdminPage token={adminToken} onLogout={()=>setAdminToken(null)}/>
        : <AdminLogin onAuth={setAdminToken}/>
      )}

      <a className="wa-float" href="https://wa.me/255620767919" target="_blank" rel="noreferrer">💬</a>
    </>
  );
}

// ─────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────
function HomePage({ setPage }) {
  return (
    <>
      <div className="hero">
        <div className="hero-badge">✨ Handcrafted Cakes & Bites · Himo, Tanzania</div>
        <h1>Where Every Bite is<br/><em>Pure Delight</em></h1>
        <p>Custom cakes, pastries & sweets baked fresh daily with love for every occasion.</p>
        <div className="hero-ctas">
          <button className="btn-primary" onClick={()=>setPage("chat")}>🎂 Order Now via AI</button>
          <button className="btn-secondary" onClick={()=>setPage("menu")}>View Menu</button>
        </div>
      </div>
      <div className="container">
        <div className="info-grid">
          <div className="info-card"><div className="info-card-icon">📍</div><div className="info-card-label">Location</div><div className="info-card-value">{BUSINESS.location}</div></div>
          <div className="info-card"><div className="info-card-icon">📞</div><div className="info-card-label">Phone / WhatsApp</div><div className="info-card-value">{BUSINESS.phone}</div></div>
          <div className="info-card"><div className="info-card-icon">🕐</div><div className="info-card-label">Current Status</div><div className="info-card-value" style={{color:"#c97d6e"}}>Closed · Opens Mon 7 AM</div></div>
          <div className="info-card"><div className="info-card-icon">🚗</div><div className="info-card-label">Delivery</div><div className="info-card-value">Available in Himo<br/>TZS 3,000–8,000</div></div>
        </div>
        <div className="section-header"><h2>Opening Hours</h2><p>We're here to sweeten your week</p></div>
        <div className="hours-grid">
          {Object.entries(BUSINESS.hours).map(([day, time]) => (
            <div className="hours-row" key={day}>
              <span className="hours-day">{day}</span>
              {time==="Closed" ? <span className="hours-closed">Closed</span> : <span className="hours-time">{time}</span>}
            </div>
          ))}
        </div>
        <div className="map-container">
          <div className="map-placeholder">
            <div className="map-placeholder-icon">🗺️</div>
            <h3>Abby Cake and Bites</h3>
            <p>Njiapanda, 25232 Njiapanda, Himo</p>
            <button className="map-open-btn" onClick={()=>window.open("https://maps.google.com/?q=Njiapanda+Himo+Tanzania","_blank")}>Open in Google Maps →</button>
          </div>
        </div>
      </div>
      <footer className="footer"><strong>Abby Cake and Bites</strong> · Njiapanda, Himo · {BUSINESS.phone} · Made with 🎂</footer>
    </>
  );
}

// ─────────────────────────────────────────────
// MENU PAGE
// ─────────────────────────────────────────────
function MenuPage({ setPage }) {
  return (
    <div className="container">
      <div className="section-header"><h2>Our Menu</h2><p>Fresh, handcrafted treats for every occasion</p></div>
      {MENU.map(cat => (
        <div className="menu-category" key={cat.category}>
          <div className="menu-category-title">{cat.emoji} {cat.category}</div>
          <div className="menu-items">
            {cat.items.map(item => (
              <div className="menu-item" key={item.name} onClick={()=>setPage("chat")}>
                <div className="menu-item-name">{item.name}</div>
                <div className="menu-item-desc">{item.description}</div>
                <div className="menu-item-price">{item.priceRange}</div>
                {item.sizes && <div className="menu-item-sizes">Sizes: {item.sizes.join(", ")}</div>}
              </div>
            ))}
          </div>
        </div>
      ))}
      <div style={{textAlign:"center",marginTop:32}}>
        <button className="btn-primary" onClick={()=>setPage("chat")}>Place an Order via AI Chat 🎂</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// CHAT PAGE — Connected to backend
// ─────────────────────────────────────────────
function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi there! 🎂 I'm Abby, your virtual assistant for Abby Cake and Bites!\n\nI can help you with our menu, prices, opening hours, or place an order for you. What can I do for you today?", time: now() }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const endRef = useRef();

  const QUICK = ["What cakes do you have?", "What are your hours?", "I want to order", "Delivery available?", "Prices?"];

  useEffect(() => { endRef.current?.scrollIntoView({behavior:"smooth"}); }, [messages, loading]);

  function now() { return new Date().toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"}); }

  async function send(text) {
    if (!text.trim() || loading) return;
    const userMsg = { role: "user", text, time: now() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    try {
      // Send to backend which calls Anthropic API securely
      const apiMsgs = updated.map(m => ({ role: m.role, content: m.text }));
      const reply = await sendChatMessage(apiMsgs);

      // Check if AI collected full order
      const orderMatch = reply.match(/ORDER_JSON:(\{.*?\})/s);
      if (orderMatch) {
        try {
          const parsed = JSON.parse(orderMatch[1]);

          // Submit order to backend → saves to MongoDB + sends email
          const saved = await submitOrder({
            customer: { name: parsed.customerName, phone: parsed.customerPhone },
            item: { type: parsed.itemType, size: parsed.size, flavor: parsed.flavor, quantity: parsed.quantity },
            delivery: { type: parsed.deliveryType?.toLowerCase().includes("delivery") ? "delivery" : "pickup", address: parsed.address },
            dateNeeded: parsed.dateNeeded,
            notes: parsed.notes || "",
          });

          setCompletedOrder(saved);
          const cleanReply = reply.replace(/ORDER_JSON:\{.*?\}/s, "").trim();
          setMessages(prev => [...prev, { role: "assistant", text: cleanReply || "Your order has been received! 🎉", time: now() }]);
        } catch (orderErr) {
          setMessages(prev => [...prev, { role: "assistant", text: reply.replace(/ORDER_JSON:\{.*?\}/s, "").trim() || "There was an issue saving your order. Please call 0620 767 919.", time: now() }]);
        }
      } else {
        setMessages(prev => [...prev, { role: "assistant", text: reply, time: now() }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: "assistant", text: "Sorry, I'm having trouble connecting. Please call us at 0620 767 919 📞", time: now() }]);
    }
    setLoading(false);
  }

  if (completedOrder) {
    return (
      <div className="container">
        <div className="chat-wrapper">
          <div className="order-success">
            <div className="order-success-icon">🎉</div>
            <h3>Order Confirmed!</h3>
            <p>Thank you! Your order has been saved and a notification email has been sent to the bakery. We'll contact you to confirm.</p>
            <div className="order-details">
              {[
                ["Order ID", completedOrder.orderId],
                ["Name", completedOrder.customer?.name],
                ["Phone", completedOrder.customer?.phone],
                ["Item", completedOrder.item?.type],
                ["Flavor", completedOrder.item?.flavor],
                ["Size", completedOrder.item?.size],
                ["Quantity", completedOrder.item?.quantity],
                ["Delivery", completedOrder.delivery?.type],
                ["Address", completedOrder.delivery?.address || "N/A (Pickup)"],
                ["Date Needed", completedOrder.dateNeeded],
              ].filter(([,v])=>v&&v!=="undefined").map(([k,v])=>(
                <div className="order-detail-row" key={k}>
                  <span className="order-detail-key">{k}</span>
                  <span className="order-detail-val">{v}</span>
                </div>
              ))}
            </div>
            <p style={{fontSize:13,color:"#9a7060",marginBottom:20}}>Questions? Call {BUSINESS.phone}</p>
            <button className="btn-primary" onClick={()=>setCompletedOrder(null)}>Start a New Chat 💬</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="section-header"><h2>Chat with Abby</h2><p>Ask anything or place your order — AI assistant powered by your live backend</p></div>
      <div className="chat-wrapper">
        <div className="chat-box">
          <div className="chat-header">
            <div className="chat-avatar">🎂</div>
            <div className="chat-header-info">
              <h3>Abby · AI Assistant</h3>
              <p><span className="online-dot"/>Connected to live backend · Orders saved to database</p>
            </div>
          </div>
          <div className="chat-messages">
            {messages.map((m,i) => (
              <div key={i} className={`msg ${m.role}`}>
                <div className="msg-bubble">{m.text}</div>
                <div className="msg-time">{m.time}</div>
              </div>
            ))}
            {loading && (
              <div className="msg assistant">
                <div className="msg-bubble">
                  <div className="typing-indicator"><div className="typing-dot"/><div className="typing-dot"/><div className="typing-dot"/></div>
                </div>
              </div>
            )}
            <div ref={endRef}/>
          </div>
          {messages.length <= 2 && (
            <div className="quick-replies">
              {QUICK.map(q=>(<button key={q} className="quick-reply-btn" onClick={()=>send(q)}>{q}</button>))}
            </div>
          )}
          <div className="chat-input-area">
            <textarea className="chat-input" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send(input);}}} placeholder="Type your message..." rows={1}/>
            <button className="chat-send-btn" onClick={()=>send(input)} disabled={loading||!input.trim()}>➤</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ADMIN LOGIN — Uses JWT from backend
// ─────────────────────────────────────────────
function AdminLogin({ onAuth }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    setLoading(true);
    setErr("");
    try {
      const data = await adminLogin(u, p);
      onAuth(data.token);
    } catch (e) {
      setErr(e.message || "Invalid credentials.");
    }
    setLoading(false);
  }

  return (
    <div className="container">
      <div className="admin-login">
        <div style={{fontSize:40,marginBottom:12}}>🔐</div>
        <h2>Admin Login</h2>
        <p>Abby Cake & Bites · Order Dashboard</p>
        {err && <div className="error-msg">{err}</div>}
        <div className="form-field"><label>Username</label><input className="form-input" value={u} onChange={e=>setU(e.target.value)} placeholder="abby_admin"/></div>
        <div className="form-field"><label>Password</label><input className="form-input" type="password" value={p} onChange={e=>setP(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} placeholder="••••••••"/></div>
        <button className="btn-primary" style={{width:"100%",opacity:loading?0.7:1}} onClick={login} disabled={loading}>{loading?"Logging in...":"Login →"}</button>
        <p style={{fontSize:12,color:"#bbb",marginTop:16}}>Credentials set during setup</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ADMIN PANEL — Loads orders from MongoDB
// ─────────────────────────────────────────────
function AdminPage({ token, onLogout }) {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [ordersData, statsData] = await Promise.all([
          fetchOrders(token),
          fetchStats(token),
        ]);
        setOrders(ordersData.data || []);
        setStats(statsData);
      } catch (e) {
        setErr("Failed to load orders. " + e.message);
      }
      setLoading(false);
    }
    load();
  }, [token]);

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>📊 Orders Dashboard</h2>
        <button className="btn-secondary" onClick={onLogout} style={{fontSize:13,padding:"8px 18px"}}>Logout</button>
      </div>

      {err && <div className="error-msg">{err}</div>}

      {stats && (
        <div className="admin-stats">
          <div className="stat-card"><div className="stat-card-val">{stats.totalOrders}</div><div className="stat-card-label">Total Orders</div></div>
          <div className="stat-card"><div className="stat-card-val">{stats.pendingOrders}</div><div className="stat-card-label">Pending</div></div>
          <div className="stat-card"><div className="stat-card-val">{stats.todayOrders}</div><div className="stat-card-label">Today</div></div>
          <div className="stat-card"><div className="stat-card-val">{stats.deliveryCount}</div><div className="stat-card-label">Deliveries</div></div>
        </div>
      )}

      {loading ? (
        <div style={{textAlign:"center",padding:"60px 20px",color:"#9a7060"}}>
          <div style={{fontSize:48,marginBottom:12}}>🎂</div>
          <p>Loading orders from database...</p>
        </div>
      ) : orders.length === 0 ? (
        <div style={{textAlign:"center",padding:"60px 20px",color:"#9a7060"}}>
          <div style={{fontSize:48,marginBottom:12}}>🎂</div>
          <p>No orders yet. Orders placed via the chat will appear here.</p>
        </div>
      ) : (
        <div className="orders-table">
          <div className="orders-table-header">
            <span>Order ID</span><span>Customer</span><span>Item</span><span>Date</span><span>Status</span>
          </div>
          {orders.map(o => (
            <div className="order-row" key={o._id}>
              <span style={{fontSize:11,color:"#bbb",fontWeight:600}}>{o.orderId}</span>
              <span><div style={{fontWeight:600}}>{o.customer?.name}</div><div style={{fontSize:12,color:"#9a7060"}}>{o.customer?.phone}</div></span>
              <span><div style={{fontWeight:500}}>{o.item?.type} – {o.item?.flavor}</div><div style={{fontSize:12,color:"#9a7060"}}>{o.item?.quantity} × {o.item?.size} · {o.delivery?.type}</div></span>
              <span style={{fontSize:12,color:"#9a7060"}}>{new Date(o.createdAt).toLocaleDateString()}</span>
              <span><span className={`status-badge status-${o.status}`}>{o.status}</span></span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
