import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Contact = () => {
  const { addToast } = useShop();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addToast('Your inquiry has been routed to our VIP Client Concierge.', 'success');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#070709] pt-32 pb-24 text-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      <div className="glass-panel rounded-3xl p-8 border border-white/10 space-y-2 text-center max-w-2xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-widest text-luxury-gold">VIP Concierge</span>
        <h1 className="text-4xl font-black uppercase text-white">GET IN TOUCH</h1>
        <p className="text-gray-400 text-sm">
          Have bespoke tailoring queries, order tracking requests, or private styling appointments? Our team is at your service.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          {[
            { icon: Phone, title: "Private Concierge Hotline", detail: "+1 (800) 888-AURA / +44 20 7946 0912" },
            { icon: Mail, title: "Direct Email Enquiries", detail: "concierge@aura-noir.com" },
            { icon: MapPin, title: "Flagship Milan Atelier", detail: "Via Montenapoleone 18, 20121 Milano MI, Italy" }
          ].map((c, i) => (
            <div key={i} className="glass-panel rounded-3xl p-6 border border-white/10 flex items-start space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-luxury-gold/20 flex items-center justify-center text-luxury-gold flex-shrink-0">
                <c.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">{c.title}</h3>
                <p className="text-xs text-gray-300 font-mono mt-1">{c.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Form */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-8 border border-white/10 space-y-6">
          <h3 className="text-lg font-extrabold text-white uppercase tracking-wider">Send Concierge Message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-luxury-gold"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">Your Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-luxury-gold"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">Subject</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-luxury-gold"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase block mb-1">Message</label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-luxury-gold"
              />
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-luxury-goldDark via-luxury-gold to-luxury-goldLight text-black font-extrabold text-xs px-8 py-3.5 rounded-xl shadow-glow-gold flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Inquiry</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
