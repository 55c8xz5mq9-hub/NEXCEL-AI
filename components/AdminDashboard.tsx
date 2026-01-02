"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface Stats {
  analytics: {
    total: { pageViews: number; contacts: number; demoRequests: number };
    last24h: { pageViews: number; contacts: number; demoRequests: number };
    last7d: { pageViews: number; contacts: number; demoRequests: number };
    last30d: { pageViews: number; contacts: number; demoRequests: number };
    topPages: { page: string; count: number }[];
  };
  contacts: { total: number; unread: number; archived: number };
  demoRequests: { total: number; unread: number; pending: number; archived: number };
}

interface Contact {
  id: string;
  name: string;
  email: string;
  telefon?: string;
  unternehmen?: string;
  betreff?: string;
  nachricht: string;
  createdAt: string;
  read: boolean;
  archived: boolean;
}

interface DemoRequest {
  id: string;
  name: string;
  email: string;
  unternehmen?: string;
  createdAt: string;
  status: "pending" | "approved" | "rejected" | "expired";
  expiresAt?: string;
  read: boolean;
  archived: boolean;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [demoRequests, setDemoRequests] = useState<DemoRequest[]>([]);
  const [activeTab, setActiveTab] = useState<"overview" | "contacts" | "demo" | "analytics">("overview");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    loadData(true);
    // Refresh every 5 seconds for instant updates
    const interval = setInterval(() => loadData(false), 5000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async (isInitial = false) => {
    try {
      if (isInitial) {
        setLoading(true);
      }
      const [statsRes, contactsRes, demoRes, userRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/admin/contacts?archived=false"),
        fetch("/api/admin/demo-requests?archived=false"),
        fetch("/api/admin/me"),
      ]);

      if (statsRes.ok) setStats(await statsRes.json());
      if (contactsRes.ok) setContacts((await contactsRes.json()).contacts);
      if (demoRes.ok) setDemoRequests((await demoRes.json()).requests);
      if (userRes.ok) setUser(await userRes.json());
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      if (isInitial) {
        setLoading(false);
      }
    }
  };

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const markAsRead = async (type: "contact" | "demo", id: string) => {
    try {
      await fetch(`/api/admin/${type === "contact" ? "contacts" : "demo-requests"}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, read: true }),
      });
      loadData();
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Lädt...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6" style={{
      background: "radial-gradient(circle at center, rgba(164, 92, 255, 0.1) 0%, rgba(0, 0, 0, 0.95) 100%)",
    }}>
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">NEXCEL AI CMS</h1>
            <p className="text-[#E5E7EB]/80">
              Willkommen zurück{user?.name ? `, ${user.name}` : ""}
            </p>
          </div>
          <motion.button
            onClick={handleLogout}
            className="px-6 py-3 rounded-xl font-semibold text-white"
            style={{
              background: "rgba(239, 68, 68, 0.2)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Abmelden
          </motion.button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: "overview", label: "Übersicht" },
            { id: "contacts", label: `Kontakte (${contacts.filter((c) => !c.read).length})` },
            { id: "demo", label: `Demo-Anfragen (${demoRequests.filter((r) => !r.read).length})` },
            { id: "analytics", label: "Analytics" },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className="px-6 py-3 rounded-xl font-semibold text-sm transition-all"
              style={{
                background: activeTab === tab.id
                  ? "linear-gradient(135deg, #A45CFF 0%, #C084FC 100%)"
                  : "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "white",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Overview Tab */}
        {activeTab === "overview" && stats && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard
                title="Seitenaufrufe (24h)"
                value={stats.analytics.last24h.pageViews}
                change={`+${stats.analytics.last7d.pageViews - stats.analytics.last24h.pageViews} (7d)`}
                icon="👁️"
              />
              <KPICard
                title="Kontakte (24h)"
                value={stats.analytics.last24h.contacts}
                change={`${stats.contacts.unread} ungelesen`}
                icon="✉️"
              />
              <KPICard
                title="Demo-Anfragen (24h)"
                value={stats.analytics.last24h.demoRequests}
                change={`${stats.demoRequests.pending} ausstehend`}
                icon="🚀"
              />
              <KPICard
                title="Gesamt Kontakte"
                value={stats.contacts.total}
                change={`${stats.contacts.archived} archiviert`}
                icon="📊"
              />
            </div>

            {/* Recent Contacts */}
            <GlassCard title="Neueste Kontakte">
              <div className="space-y-3">
                {contacts.slice(0, 5).map((contact) => (
                  <ContactRow key={contact.id} contact={contact} onMarkRead={() => markAsRead("contact", contact.id)} />
                ))}
              </div>
            </GlassCard>

            {/* Recent Demo Requests */}
            <GlassCard title="Neueste Demo-Anfragen">
              <div className="space-y-3">
                {demoRequests.slice(0, 5).map((request) => (
                  <DemoRequestRow key={request.id} request={request} onMarkRead={() => markAsRead("demo", request.id)} />
                ))}
              </div>
            </GlassCard>
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === "contacts" && (
          <GlassCard title="Alle Kontakte">
            <div className="space-y-3">
              {contacts.map((contact) => (
                <ContactRow key={contact.id} contact={contact} onMarkRead={() => markAsRead("contact", contact.id)} />
              ))}
            </div>
          </GlassCard>
        )}

        {/* Demo Requests Tab */}
        {activeTab === "demo" && (
          <GlassCard title="Alle Demo-Anfragen">
            <div className="space-y-3">
              {demoRequests.map((request) => (
                <DemoRequestRow key={request.id} request={request} onMarkRead={() => markAsRead("demo", request.id)} />
              ))}
            </div>
          </GlassCard>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && stats && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <GlassCard title="Letzte 24 Stunden">
                <div className="space-y-4">
                  <StatItem label="Seitenaufrufe" value={stats.analytics.last24h.pageViews} />
                  <StatItem label="Kontakte" value={stats.analytics.last24h.contacts} />
                  <StatItem label="Demo-Anfragen" value={stats.analytics.last24h.demoRequests} />
                </div>
              </GlassCard>
              <GlassCard title="Letzte 7 Tage">
                <div className="space-y-4">
                  <StatItem label="Seitenaufrufe" value={stats.analytics.last7d.pageViews} />
                  <StatItem label="Kontakte" value={stats.analytics.last7d.contacts} />
                  <StatItem label="Demo-Anfragen" value={stats.analytics.last7d.demoRequests} />
                </div>
              </GlassCard>
              <GlassCard title="Letzte 30 Tage">
                <div className="space-y-4">
                  <StatItem label="Seitenaufrufe" value={stats.analytics.last30d.pageViews} />
                  <StatItem label="Kontakte" value={stats.analytics.last30d.contacts} />
                  <StatItem label="Demo-Anfragen" value={stats.analytics.last30d.demoRequests} />
                </div>
              </GlassCard>
            </div>
            <GlassCard title="Top Seiten">
              <div className="space-y-2">
                {stats.analytics.topPages.map((page, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-[#E5E7EB]">{page.page}</span>
                    <span className="text-[#A45CFF] font-semibold">{page.count}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  );
}

function KPICard({ title, value, change, icon }: { title: string; value: number; change: string; icon: string }) {
  return (
    <motion.div
      className="rounded-2xl p-6"
      style={{
        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(40px) saturate(180%)",
        WebkitBackdropFilter: "blur(40px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 60px rgba(164, 92, 255, 0.15)",
      }}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-3xl">{icon}</span>
        {value > 0 && (
          <span className="text-xs px-2 py-1 rounded-full bg-[#A45CFF]/20 text-[#A45CFF]">
            Neu
          </span>
        )}
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-[#9CA3AF]">{title}</div>
      <div className="text-xs text-[#9CA3AF] mt-2">{change}</div>
    </motion.div>
  );
}

function GlassCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: "rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(40px) saturate(180%)",
        WebkitBackdropFilter: "blur(40px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 60px rgba(164, 92, 255, 0.15)",
      }}
    >
      <h2 className="text-xl font-bold text-white mb-4">{title}</h2>
      {children}
    </div>
  );
}

function ContactRow({ contact, onMarkRead }: { contact: Contact; onMarkRead: () => void }) {
  return (
    <div
      className="p-4 rounded-xl"
      style={{
        background: contact.read ? "rgba(255, 255, 255, 0.03)" : "rgba(164, 92, 255, 0.1)",
        border: `1px solid ${contact.read ? "rgba(255, 255, 255, 0.05)" : "rgba(164, 92, 255, 0.3)"}`,
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-white">{contact.name}</span>
            {!contact.read && (
              <span className="w-2 h-2 rounded-full bg-[#A45CFF]" />
            )}
          </div>
          <div className="text-sm text-[#9CA3AF] mb-1">{contact.email}</div>
          {contact.telefon && (
            <div className="text-xs text-[#9CA3AF] mb-1">📞 {contact.telefon}</div>
          )}
          {contact.unternehmen && (
            <div className="text-xs text-[#9CA3AF] mb-1">🏢 {contact.unternehmen}</div>
          )}
          {contact.betreff && (
            <div className="text-xs text-[#A45CFF] mb-2 font-semibold">📌 {contact.betreff}</div>
          )}
          <div className="text-sm text-[#E5E7EB] line-clamp-3 mb-2">{contact.nachricht}</div>
          <div className="text-xs text-[#9CA3AF] mt-2">
            {new Date(contact.createdAt).toLocaleDateString("de-DE", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
        {!contact.read && (
          <motion.button
            onClick={onMarkRead}
            className="ml-4 px-3 py-1 rounded-lg text-xs font-medium text-white"
            style={{
              background: "rgba(164, 92, 255, 0.2)",
              border: "1px solid rgba(164, 92, 255, 0.3)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Als gelesen
          </motion.button>
        )}
      </div>
    </div>
  );
}

function DemoRequestRow({ request, onMarkRead }: { request: DemoRequest; onMarkRead: () => void }) {
  const statusColors = {
    pending: "rgba(251, 191, 36, 0.2)",
    approved: "rgba(34, 197, 94, 0.2)",
    rejected: "rgba(239, 68, 68, 0.2)",
    expired: "rgba(107, 114, 128, 0.2)",
  };

  return (
    <div
      className="p-4 rounded-xl"
      style={{
        background: request.read ? "rgba(255, 255, 255, 0.03)" : "rgba(164, 92, 255, 0.1)",
        border: `1px solid ${request.read ? "rgba(255, 255, 255, 0.05)" : "rgba(164, 92, 255, 0.3)"}`,
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-white">{request.name}</span>
            {!request.read && (
              <span className="w-2 h-2 rounded-full bg-[#A45CFF]" />
            )}
            <span
              className="px-2 py-0.5 rounded text-xs font-medium"
              style={{
                background: statusColors[request.status],
                color: request.status === "pending" ? "#FBBF24" : request.status === "approved" ? "#22C55E" : request.status === "rejected" ? "#EF4444" : "#6B7280",
              }}
            >
              {request.status === "pending" ? "Ausstehend" : request.status === "approved" ? "Genehmigt" : request.status === "rejected" ? "Abgelehnt" : "Abgelaufen"}
            </span>
          </div>
          <div className="text-sm text-[#9CA3AF] mb-2">{request.email}</div>
          {request.unternehmen && (
            <div className="text-xs text-[#9CA3AF] mb-2">Unternehmen: {request.unternehmen}</div>
          )}
          {request.expiresAt && (
            <div className="text-xs text-[#9CA3AF]">
              Läuft ab: {new Date(request.expiresAt).toLocaleDateString("de-DE")}
            </div>
          )}
          <div className="text-xs text-[#9CA3AF] mt-2">
            {new Date(request.createdAt).toLocaleDateString("de-DE", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
        {!request.read && (
          <motion.button
            onClick={onMarkRead}
            className="ml-4 px-3 py-1 rounded-lg text-xs font-medium text-white"
            style={{
              background: "rgba(164, 92, 255, 0.2)",
              border: "1px solid rgba(164, 92, 255, 0.3)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Als gelesen
          </motion.button>
        )}
      </div>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-[#9CA3AF]">{label}</span>
      <span className="text-2xl font-bold text-white">{value}</span>
    </div>
  );
}

