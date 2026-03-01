import { useState, useEffect } from "react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const monthlyRevenue = [
  { month: "Jan", revenue: 42000, users: 1200, churn: 3.2 },
  { month: "Feb", revenue: 47500, users: 1380, churn: 2.8 },
  { month: "Mar", revenue: 51200, users: 1520, churn: 3.1 },
  { month: "Apr", revenue: 49800, users: 1490, churn: 2.5 },
  { month: "May", revenue: 58300, users: 1740, churn: 2.2 },
  { month: "Jun", revenue: 63100, users: 1920, churn: 1.9 },
  { month: "Jul", revenue: 71400, users: 2150, churn: 2.0 },
  { month: "Aug", revenue: 68900, users: 2080, churn: 2.3 },
  { month: "Sep", revenue: 76200, users: 2340, churn: 1.7 },
  { month: "Oct", revenue: 82500, users: 2590, churn: 1.5 },
  { month: "Nov", revenue: 89100, users: 2810, churn: 1.4 },
  { month: "Dec", revenue: 97400, users: 3120, churn: 1.2 },
];

const trafficSources = [
  { name: "Organic", value: 38, color: "#6366f1" },
  { name: "Direct", value: 27, color: "#06b6d4" },
  { name: "Referral", value: 19, color: "#f59e0b" },
  { name: "Social", value: 16, color: "#10b981" },
];

const recentActivity = [
  { user: "Sarah Chen", action: "Upgraded to Pro", time: "2m ago", avatar: "SC", color: "#6366f1" },
  { user: "Marcus Okafor", action: "New signup", time: "14m ago", avatar: "MO", color: "#06b6d4" },
  { user: "Priya Sharma", action: "Cancelled subscription", time: "1h ago", avatar: "PS", color: "#f59e0b" },
  { user: "James Liu", action: "Upgraded to Enterprise", time: "2h ago", avatar: "JL", color: "#10b981" },
  { user: "Nina Volkov", action: "New signup", time: "3h ago", avatar: "NV", color: "#ec4899" },
];

const topPages = [
  { page: "/dashboard", views: 12840, change: 12.4 },
  { page: "/features", views: 8320, change: 8.1 },
  { page: "/pricing", views: 6750, change: -2.3 },
  { page: "/docs", views: 5190, change: 21.7 },
  { page: "/blog", views: 4280, change: 5.6 },
];

const navItems = ["Overview", "Analytics", "Users", "Revenue", "Reports", "Settings"];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 10,
        padding: "10px 14px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        fontSize: 13,
        fontFamily: "'DM Sans', sans-serif"
      }}>
        <p style={{ color: "#6b7280", marginBottom: 4, fontWeight: 500 }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color, fontWeight: 600, margin: 0 }}>
            {p.name === "revenue" ? `$${p.value.toLocaleString()}` : p.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("Overview");
  const [animatedValues, setAnimatedValues] = useState({ revenue: 0, users: 0, mrr: 0, nps: 0 });

  useEffect(() => {
    const targets = { revenue: 97400, users: 3120, mrr: 8125, nps: 72 };
    const duration = 1200;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const ease = 1 - Math.pow(1 - progress, 3);
      setAnimatedValues({
        revenue: Math.round(targets.revenue * ease),
        users: Math.round(targets.users * ease),
        mrr: Math.round(targets.mrr * ease),
        nps: Math.round(targets.nps * ease),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: "Total Revenue", value: `$${animatedValues.revenue.toLocaleString()}`, change: "+18.2%", positive: true, sub: "vs last month", icon: "💰" },
    { label: "Active Users", value: animatedValues.users.toLocaleString(), change: "+11.0%", positive: true, sub: "vs last month", icon: "👥" },
    { label: "MRR", value: `$${animatedValues.mrr.toLocaleString()}`, change: "+9.4%", positive: true, sub: "Monthly Recurring", icon: "📈" },
    { label: "NPS Score", value: animatedValues.nps, change: "-1.4%", positive: false, sub: "User satisfaction", icon: "⭐" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f8fafc",
      fontFamily: "'DM Sans', sans-serif",
      display: "flex",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .nav-item { transition: all 0.15s ease; }
        .nav-item:hover { background: #f1f5f9 !important; }
        .stat-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .stat-card:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.10) !important; }
        .activity-row { transition: background 0.15s ease; }
        .activity-row:hover { background: #f8fafc; }
        .page-row { transition: background 0.15s ease; }
        .page-row:hover { background: #f8fafc; }
      `}</style>

      {/* Sidebar */}
      <aside style={{
        width: 230,
        background: "#fff",
        borderRight: "1px solid #e9edf3",
        display: "flex",
        flexDirection: "column",
        padding: "28px 0",
        position: "fixed",
        height: "100vh",
        top: 0, left: 0,
        zIndex: 10,
      }}>
        {/* Logo */}
        <div style={{ padding: "0 24px 32px", borderBottom: "1px solid #f0f4f8" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 34, height: 34,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              borderRadius: 10,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ color: "#fff", fontSize: 16 }}>◈</span>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#0f172a", letterSpacing: "-0.3px" }}>Lumina</div>
              <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>Analytics</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ padding: "20px 12px", flex: 1 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0 12px", marginBottom: 8 }}>Main Menu</div>
          {navItems.map(item => (
            <div
              key={item}
              className="nav-item"
              onClick={() => setActiveNav(item)}
              style={{
                padding: "9px 12px",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 14,
                fontWeight: activeNav === item ? 600 : 400,
                color: activeNav === item ? "#6366f1" : "#64748b",
                background: activeNav === item ? "#eef2ff" : "transparent",
                marginBottom: 2,
                display: "flex", alignItems: "center", gap: 10,
              }}
            >
              <span style={{ fontSize: 15 }}>
                {item === "Overview" ? "⊞" : item === "Analytics" ? "◉" : item === "Users" ? "◎" : item === "Revenue" ? "◈" : item === "Reports" ? "▦" : "⊙"}
              </span>
              {item}
            </div>
          ))}
        </nav>

        {/* User */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid #f0f4f8" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "linear-gradient(135deg, #6366f1, #06b6d4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700, color: "#fff"
            }}>YS</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>Yashasvi</div>
              <div style={{ fontSize: 11, color: "#94a3b8" }}>Admin</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ marginLeft: 230, flex: 1, padding: "36px 36px 36px 36px", minHeight: "100vh" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: "#0f172a", letterSpacing: "-0.5px", lineHeight: 1.2 }}>
              Good morning, Yashasvi 👋
            </h1>
            <p style={{ color: "#94a3b8", marginTop: 4, fontSize: 14, fontWeight: 400 }}>
              Here's what's happening with Lumina today.
            </p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{
              padding: "9px 16px", borderRadius: 9, border: "1px solid #e2e8f0",
              background: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 500,
              color: "#475569", display: "flex", alignItems: "center", gap: 6
            }}>
              📅 Last 12 months
            </div>
            <div style={{
              padding: "9px 16px", borderRadius: 9,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              cursor: "pointer", fontSize: 13, fontWeight: 600,
              color: "#fff", display: "flex", alignItems: "center", gap: 6
            }}>
              ＋ Export Report
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18, marginBottom: 28 }}>
          {stats.map((s, i) => (
            <div key={i} className="stat-card" style={{
              background: "#fff",
              borderRadius: 14,
              padding: "22px 24px",
              border: "1px solid #e9edf3",
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ fontSize: 22 }}>{s.icon}</div>
                <div style={{
                  fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 20,
                  color: s.positive ? "#059669" : "#dc2626",
                  background: s.positive ? "#ecfdf5" : "#fef2f2",
                }}>{s.change}</div>
              </div>
              <div style={{ marginTop: 16 }}>
                <div style={{ fontSize: 28, fontWeight: 700, color: "#0f172a", letterSpacing: "-1px", fontFamily: "'DM Mono', monospace" }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 13, color: "#94a3b8", marginTop: 4, fontWeight: 500 }}>{s.label}</div>
                <div style={{ fontSize: 11, color: "#cbd5e1", marginTop: 2 }}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 18, marginBottom: 28 }}>
          {/* Revenue Chart */}
          <div style={{
            background: "#fff", borderRadius: 14, padding: "24px",
            border: "1px solid #e9edf3", boxShadow: "0 2px 12px rgba(0,0,0,0.04)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>Revenue Overview</h3>
                <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>Monthly performance this year</p>
              </div>
              <div style={{ display: "flex", gap: 16, fontSize: 12 }}>
                <span style={{ color: "#6366f1", fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#6366f1", display: "inline-block" }}></span> Revenue
                </span>
                <span style={{ color: "#06b6d4", fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#06b6d4", display: "inline-block" }}></span> Users
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={210}>
              <AreaChart data={monthlyRevenue} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="usersGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.12} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f8" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8", fontFamily: "DM Sans" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8", fontFamily: "DM Sans" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5} fill="url(#revGrad)" dot={false} />
                <Area type="monotone" dataKey="users" stroke="#06b6d4" strokeWidth={2.5} fill="url(#usersGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Traffic Sources */}
          <div style={{
            background: "#fff", borderRadius: 14, padding: "24px",
            border: "1px solid #e9edf3", boxShadow: "0 2px 12px rgba(0,0,0,0.04)"
          }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>Traffic Sources</h3>
            <p style={{ fontSize: 12, color: "#94a3b8", marginBottom: 24 }}>Where your users come from</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {trafficSources.map((src, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: "#475569" }}>{src.name}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", fontFamily: "DM Mono" }}>{src.value}%</span>
                  </div>
                  <div style={{ height: 7, background: "#f1f5f9", borderRadius: 10, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", width: `${src.value}%`,
                      background: src.color, borderRadius: 10,
                      transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)"
                    }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 24, padding: "14px 16px",
              background: "#f8fafc", borderRadius: 10,
              border: "1px solid #f0f4f8"
            }}>
              <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500, marginBottom: 4 }}>TOTAL SESSIONS</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", fontFamily: "DM Mono" }}>37,180</div>
              <div style={{ fontSize: 11, color: "#10b981", fontWeight: 600, marginTop: 2 }}>↑ 14.2% this month</div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.2fr", gap: 18 }}>
          {/* Churn Rate */}
          <div style={{
            background: "#fff", borderRadius: 14, padding: "24px",
            border: "1px solid #e9edf3", boxShadow: "0 2px 12px rgba(0,0,0,0.04)"
          }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>Churn Rate</h3>
            <p style={{ fontSize: 12, color: "#94a3b8", marginBottom: 20 }}>Monthly churn % over year</p>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={monthlyRevenue} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f8" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="churn" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Top Pages */}
          <div style={{
            background: "#fff", borderRadius: 14, padding: "24px",
            border: "1px solid #e9edf3", boxShadow: "0 2px 12px rgba(0,0,0,0.04)"
          }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>Top Pages</h3>
            <p style={{ fontSize: 12, color: "#94a3b8", marginBottom: 16 }}>By page views this month</p>
            <div>
              {topPages.map((p, i) => (
                <div key={i} className="page-row" style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "9px 8px", borderRadius: 8, cursor: "default"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 11, color: "#cbd5e1", fontWeight: 700, fontFamily: "DM Mono", width: 14 }}>{i + 1}</span>
                    <span style={{ fontSize: 12, color: "#475569", fontFamily: "DM Mono" }}>{p.page}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#0f172a", fontFamily: "DM Mono" }}>{p.views.toLocaleString()}</span>
                    <span style={{
                      fontSize: 10, fontWeight: 600, padding: "2px 6px", borderRadius: 20,
                      color: p.change > 0 ? "#059669" : "#dc2626",
                      background: p.change > 0 ? "#ecfdf5" : "#fef2f2",
                    }}>{p.change > 0 ? "+" : ""}{p.change}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div style={{
            background: "#fff", borderRadius: 14, padding: "24px",
            border: "1px solid #e9edf3", boxShadow: "0 2px 12px rgba(0,0,0,0.04)"
          }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>Recent Activity</h3>
            <p style={{ fontSize: 12, color: "#94a3b8", marginBottom: 16 }}>Latest user actions</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {recentActivity.map((a, i) => (
                <div key={i} className="activity-row" style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "9px 8px", borderRadius: 9, cursor: "default"
                }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
                    background: a.color + "22",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 700, color: a.color, fontFamily: "DM Mono"
                  }}>{a.avatar}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.user}</div>
                    <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 1 }}>{a.action}</div>
                  </div>
                  <div style={{ fontSize: 11, color: "#cbd5e1", flexShrink: 0 }}>{a.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
