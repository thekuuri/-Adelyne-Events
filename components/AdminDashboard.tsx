import React, { useState, useMemo } from 'react';
import { FileText, Image as ImageIcon, Plus, Trash2, Download, LogOut, ArrowLeft, PlusCircle, Check, Edit2 } from 'lucide-react';
import { GalleryImage } from '../types';

interface AdminDashboardProps {
  galleryImages: GalleryImage[];
  onUpdateGallery: (images: GalleryImage[]) => void;
  onLogout: () => void;
}

interface QuoteItem {
  id: string;
  description: string;
  qty: number;
  unitPrice: number;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  galleryImages,
  onUpdateGallery,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'quotes' | 'gallery'>('quotes');

  // --- Gallery State ---
  const [newImgUrl, setNewImgUrl] = useState('');
  const [newImgCategory, setNewImgCategory] = useState('Wedding');
  const [newImgTitle, setNewImgTitle] = useState('');
  const [editingImageId, setEditingImageId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editCategory, setEditCategory] = useState('');

  // --- Quote State ---
  const [clientName, setClientName] = useState('Sarah & John');
  const [clientEmail, setClientEmail] = useState('sarah.john@example.com');
  const [clientPhone, setClientPhone] = useState('+254 712 345 678');
  const [eventDate, setEventDate] = useState('2026-12-18');
  const [eventType, setEventType] = useState('Wedding');
  const [quoteNo, setQuoteNo] = useState('AE-2026-042');
  const [quoteNotes, setQuoteNotes] = useState(
    '1. A 50% deposit is required to secure the event date.\n2. Balance is payable 14 days before the event setup.\n3. Damage to hired items will be charged to the client.'
  );

  // Dynamic Quote items list
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([
    { id: '1', description: 'Fairytale Arch & Floral Backdrop setup', qty: 1, unitPrice: 45000 },
    { id: '2', description: 'VIP Seating and tables for 100 guests', qty: 100, unitPrice: 250 },
    { id: '3', description: 'Sound System, DJ & PA setup', qty: 1, unitPrice: 25000 },
    { id: '4', description: 'Day-of Event Coordination service fee', qty: 1, unitPrice: 30000 },
  ]);

  // Temporary row input state
  const [tempDesc, setTempDesc] = useState('');
  const [tempQty, setTempQty] = useState(1);
  const [tempPrice, setTempPrice] = useState(0);

  // --- Quote Calculations ---
  const subtotal = useMemo(() => {
    return quoteItems.reduce((acc, item) => acc + item.qty * item.unitPrice, 0);
  }, [quoteItems]);

  const taxRate = 0.16; // 16% VAT standard in Kenya
  const vatAmount = useMemo(() => {
    return subtotal * taxRate;
  }, [subtotal]);

  const grandTotal = useMemo(() => {
    return subtotal + vatAmount;
  }, [subtotal, vatAmount]);

  // --- Gallery Actions ---
  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImgUrl.trim() || !newImgTitle.trim()) return;

    const newItem: GalleryImage = {
      id: Date.now(),
      url: newImgUrl.trim(),
      category: newImgCategory,
      title: newImgTitle.trim(),
    };

    onUpdateGallery([newItem, ...galleryImages]);
    setNewImgUrl('');
    setNewImgTitle('');
  };

  const handleDeleteImage = (id: number) => {
    if (confirm('Are you sure you want to delete this image from the gallery?')) {
      onUpdateGallery(galleryImages.filter((img) => img.id !== id));
    }
  };

  const handleStartEdit = (img: GalleryImage) => {
    setEditingImageId(img.id);
    setEditTitle(img.title);
    setEditCategory(img.category);
  };

  const handleSaveEdit = (id: number) => {
    const updated = galleryImages.map((img) => {
      if (img.id === id) {
        return { ...img, title: editTitle, category: editCategory };
      }
      return img;
    });
    onUpdateGallery(updated);
    setEditingImageId(null);
  };

  // --- Quote Table Actions ---
  const handleAddQuoteItem = () => {
    if (!tempDesc.trim() || tempPrice <= 0 || tempQty <= 0) return;

    const newItem: QuoteItem = {
      id: Date.now().toString(),
      description: tempDesc.trim(),
      qty: tempQty,
      unitPrice: tempPrice,
    };

    setQuoteItems([...quoteItems, newItem]);
    setTempDesc('');
    setTempQty(1);
    setTempPrice(0);
  };

  const handleRemoveQuoteItem = (id: string) => {
    setQuoteItems(quoteItems.filter((item) => item.id !== id));
  };

  // --- PDF Export Logic ---
  const handleDownloadPDF = () => {
    const element = document.getElementById('quote-pdf-render');
    if (!element) return;

    const opt = {
      margin: [12, 12, 12, 12],
      filename: `Quote_${clientName.replace(/\s+/g, '_')}_${quoteNo}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    // Dynamically pull html2pdf CDN package on demand to minimize package sizes
    const runExport = () => {
      const worker = (window as any).html2pdf();
      worker.set(opt).from(element).save();
    };

    if ((window as any).html2pdf) {
      runExport();
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      script.onload = () => {
        runExport();
      };
      document.body.appendChild(script);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Banner Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 px-6 py-4 shadow-sm">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Adelyne Events" className="h-10 md:h-12 w-auto" />
            <div className="border-l pl-3 border-gray-200">
              <h1 className="text-xl font-bold text-gray-800">Admin Control Center</h1>
              <p className="text-xs text-rose-500 font-semibold tracking-wider uppercase">Portal Console</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-gray-150 p-1 rounded-xl flex gap-1 border border-gray-200">
              <button
                onClick={() => setActiveTab('quotes')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                  activeTab === 'quotes'
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <FileText className="w-4 h-4" /> Quotes
              </button>
              <button
                onClick={() => setActiveTab('gallery')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                  activeTab === 'gallery'
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <ImageIcon className="w-4 h-4" /> Gallery
              </button>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center gap-2 bg-gray-950 text-white hover:bg-rose-600 px-4 py-2 rounded-xl text-sm font-bold shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> Exit Portal
            </button>
          </div>
        </div>
      </header>

      {/* Main Panel Content */}
      <main className="flex-1 container mx-auto px-6 py-8">
        {activeTab === 'quotes' ? (
          /* TAB 1: QUOTE BUILDER SECTION */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Inputs Panel */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200/60 space-y-6">
                <h3 className="text-xl font-bold text-gray-900 border-b pb-3 border-gray-100 flex items-center gap-2">
                  <span className="w-2.5 h-6 bg-rose-500 rounded-full inline-block" />
                  Quote Metadata
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Quote Reference</label>
                    <input
                      type="text"
                      value={quoteNo}
                      onChange={(e) => setQuoteNo(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Event Date</label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Client Full Name</label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Event Category</label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm font-medium bg-white"
                    >
                      <option>Wedding</option>
                      <option>Traditional Wedding</option>
                      <option>Baby Shower</option>
                      <option>Graduation</option>
                      <option>Birthday Party</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Client Email</label>
                    <input
                      type="email"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Client Phone</label>
                    <input
                      type="text"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Line Items Adder */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200/60 space-y-6">
                <h3 className="text-xl font-bold text-gray-900 border-b pb-3 border-gray-100 flex items-center gap-2">
                  <span className="w-2.5 h-6 bg-rose-500 rounded-full inline-block" />
                  Service Line Items
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Item/Service Description</label>
                    <input
                      type="text"
                      value={tempDesc}
                      onChange={(e) => setTempDesc(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm font-medium"
                      placeholder="e.g. VIP Tents & Chair covers"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Quantity</label>
                      <input
                        type="number"
                        min="1"
                        value={tempQty}
                        onChange={(e) => setTempQty(parseInt(e.target.value) || 1)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Unit Price (KSh)</label>
                      <input
                        type="number"
                        min="0"
                        value={tempPrice}
                        onChange={(e) => setTempPrice(parseFloat(e.target.value) || 0)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm font-medium"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddQuoteItem}
                    className="w-full bg-gray-900 hover:bg-rose-500 text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-97 cursor-pointer"
                  >
                    <PlusCircle className="w-5 h-5" /> Append Line Item
                  </button>
                </div>

                {/* Items List Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="border-b border-gray-100 text-gray-400 text-xs font-bold uppercase">
                        <th className="py-3">Description</th>
                        <th className="py-3 text-center">Qty</th>
                        <th className="py-3 text-right">Price</th>
                        <th className="py-3 text-right">Total</th>
                        <th className="py-3 text-center"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {quoteItems.map((item) => (
                        <tr key={item.id} className="text-gray-700">
                          <td className="py-3.5 font-medium">{item.description}</td>
                          <td className="py-3.5 text-center">{item.qty}</td>
                          <td className="py-3.5 text-right">{item.unitPrice.toLocaleString()}</td>
                          <td className="py-3.5 text-right font-semibold">{(item.qty * item.unitPrice).toLocaleString()}</td>
                          <td className="py-3.5 text-center">
                            <button
                              onClick={() => handleRemoveQuoteItem(item.id)}
                              className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {quoteItems.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-gray-400 italic">No line items added yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Terms and Conditions Edit box */}
                <div className="pt-4 border-t border-gray-100">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Quote Terms & Conditions</label>
                  <textarea
                    value={quoteNotes}
                    onChange={(e) => setQuoteNotes(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-xs text-gray-600 resize-none font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Right Preview Side */}
            <div className="lg:col-span-6 space-y-6 sticky top-28">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-gray-800 uppercase text-xs tracking-wider">Generated Quote Document</h4>
                <button
                  onClick={handleDownloadPDF}
                  className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-2.5 px-6 rounded-2xl shadow-md flex items-center gap-2 hover:scale-103 active:scale-97 transition-all cursor-pointer text-sm"
                >
                  <Download className="w-4 h-4" /> Export Quote PDF
                </button>
              </div>

              {/* Quote PDF rendered preview card */}
              <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
                <div 
                  id="quote-pdf-render" 
                  className="bg-white p-10 font-sans text-gray-800"
                  style={{ minHeight: '297mm', width: '100%', boxSizing: 'border-box' }}
                >
                  {/* PDF Header letterhead */}
                  <div className="flex justify-between items-start border-b-2 border-rose-500 pb-6 mb-8">
                    <div>
                      {/* Logo and company title */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-rose-500 font-serif font-extrabold text-2xl tracking-wide">ADELYNE EVENTS</span>
                      </div>
                      <p className="text-xs text-gray-400 font-semibold tracking-widest uppercase">...mapping memories</p>
                    </div>
                    <div className="text-right text-xs text-gray-500 space-y-1">
                      <p className="font-bold text-gray-850 text-sm">Adelyne Events Limited</p>
                      <p>Nairobi, Kenya</p>
                      <p>WhatsApp: +254 710 739 550</p>
                      <p>Email: hello@adelyneevents.com</p>
                    </div>
                  </div>

                  {/* Document Meta and Client block */}
                  <div className="flex justify-between items-start gap-8 mb-8 text-xs">
                    <div>
                      <h4 className="font-bold text-rose-500 uppercase tracking-widest mb-3 text-[10px]">Client Details</h4>
                      <p className="font-bold text-sm text-gray-850 mb-1">{clientName}</p>
                      {clientEmail && <p className="mb-0.5">{clientEmail}</p>}
                      {clientPhone && <p className="mb-0.5">{clientPhone}</p>}
                    </div>

                    <div className="text-right">
                      <h3 className="text-xl font-extrabold text-gray-850 uppercase tracking-wider mb-2">QUOTE</h3>
                      <div className="space-y-1 text-gray-600">
                        <p><span className="font-semibold text-gray-400">Quote Ref:</span> {quoteNo}</p>
                        <p><span className="font-semibold text-gray-400">Date:</span> {new Date().toLocaleDateString()}</p>
                        <p><span className="font-semibold text-gray-400">Event Date:</span> {eventDate ? new Date(eventDate).toLocaleDateString() : 'TBD'}</p>
                        <p><span className="font-semibold text-gray-400">Event Type:</span> {eventType}</p>
                      </div>
                    </div>
                  </div>

                  {/* Invoice Details Table */}
                  <table className="w-full text-xs text-left mb-8 border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 font-bold uppercase border-b border-gray-200">
                        <th className="py-2.5 px-3">Description</th>
                        <th className="py-2.5 px-3 text-center w-16">Qty</th>
                        <th className="py-2.5 px-3 text-right w-24">Unit (KSh)</th>
                        <th className="py-2.5 px-3 text-right w-32">Total (KSh)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 border-b border-gray-200">
                      {quoteItems.map((item) => (
                        <tr key={item.id}>
                          <td className="py-3 px-3 font-medium text-gray-800">{item.description}</td>
                          <td className="py-3 px-3 text-center">{item.qty}</td>
                          <td className="py-3 px-3 text-right">{item.unitPrice.toLocaleString()}</td>
                          <td className="py-3 px-3 text-right font-semibold">{(item.qty * item.unitPrice).toLocaleString()}</td>
                        </tr>
                      ))}
                      {quoteItems.length === 0 && (
                        <tr>
                          <td colSpan={4} className="py-8 text-center text-gray-400 italic">No line items configured.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>

                  {/* Calculations totals block */}
                  <div className="flex justify-end mb-8 text-xs">
                    <div className="w-64 space-y-2 border-t border-gray-100 pt-3">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal:</span>
                        <span>KSh {subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>VAT (16%):</span>
                        <span>KSh {vatAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-base font-extrabold text-gray-900 border-t border-gray-200 pt-2">
                        <span>Grand Total:</span>
                        <span className="text-rose-600">KSh {grandTotal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Notes / Terms block inside PDF */}
                  {quoteNotes && (
                    <div className="text-[10px] text-gray-500 border-t border-gray-100 pt-6">
                      <h5 className="font-bold text-gray-700 uppercase tracking-widest mb-2">Terms & Conditions</h5>
                      <p className="whitespace-pre-line leading-relaxed italic">{quoteNotes}</p>
                    </div>
                  )}

                  {/* PDF Footer signoff */}
                  <div className="mt-12 text-center text-[10px] text-gray-400 border-t border-gray-100 pt-6">
                    <p>Thank you for choosing Adelyne Events. We look forward to planning your special day!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* TAB 2: GALLERY MANAGEMENT SECTION */
          <div className="space-y-8">
            {/* Add Image Card block */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200/60 max-w-4xl mx-auto">
              <h3 className="text-xl font-bold text-gray-900 border-b pb-4 border-gray-100 flex items-center gap-2 mb-6">
                <span className="w-2.5 h-6 bg-rose-500 rounded-full inline-block" />
                Upload New Gallery Photo
              </h3>

              <form onSubmit={handleAddImage} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                <div className="md:col-span-1">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Photo Category</label>
                  <select
                    value={newImgCategory}
                    onChange={(e) => setNewImgCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm font-medium bg-white"
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Traditional">Traditional</option>
                    <option value="Baby Shower">Baby Shower</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Evening">Evening</option>
                  </select>
                </div>

                <div className="md:col-span-1">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Photo Caption/Title</label>
                  <input
                    required
                    type="text"
                    value={newImgTitle}
                    onChange={(e) => setNewImgTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm font-medium"
                    placeholder="e.g. Garden Floral Arch"
                  />
                </div>

                <div className="md:col-span-1">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Image Source URL</label>
                  <input
                    required
                    type="text"
                    value={newImgUrl}
                    onChange={(e) => setNewImgUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none text-sm font-medium"
                    placeholder="Unsplash URL or file path"
                  />
                </div>

                <div className="md:col-span-3 pt-2">
                  <button
                    type="submit"
                    className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-3.5 px-8 rounded-2xl shadow-md hover:shadow-rose-500/20 active:scale-97 transition-all flex items-center justify-center gap-2 cursor-pointer w-full text-sm"
                  >
                    <Plus className="w-5 h-5" /> Append Photo to Gallery
                  </button>
                </div>
              </form>
            </div>

            {/* Grid List of Current Photos */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200/60">
              <h3 className="text-xl font-bold text-gray-900 border-b pb-4 border-gray-100 flex items-center gap-2 mb-6">
                <span className="w-2.5 h-6 bg-rose-500 rounded-full inline-block" />
                Live Gallery Catalog ({galleryImages.length} items)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {galleryImages.map((img) => (
                  <div key={img.id} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between bg-white relative">
                    <div>
                      {/* Photo preview frame */}
                      <div className="aspect-video relative bg-gray-100">
                        <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                          {img.category}
                        </span>
                      </div>

                      {/* Info details */}
                      <div className="p-4 space-y-3">
                        {editingImageId === img.id ? (
                          <div className="space-y-3">
                            <input
                              type="text"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              className="w-full px-2 py-1.5 border rounded text-xs outline-none"
                            />
                            <select
                              value={editCategory}
                              onChange={(e) => setEditCategory(e.target.value)}
                              className="w-full px-2 py-1.5 border rounded text-xs outline-none bg-white"
                            >
                              <option value="Wedding">Wedding</option>
                              <option value="Traditional">Traditional</option>
                              <option value="Baby Shower">Baby Shower</option>
                              <option value="Birthday">Birthday</option>
                              <option value="Evening">Evening</option>
                            </select>
                          </div>
                        ) : (
                          <div>
                            <h5 className="font-bold text-gray-800 text-sm truncate">{img.title}</h5>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{img.category}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Edit Action block */}
                    <div className="border-t border-gray-50 p-4 flex gap-2">
                      {editingImageId === img.id ? (
                        <>
                          <button
                            onClick={() => handleSaveEdit(img.id)}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold p-2 rounded-lg flex items-center justify-center gap-1 text-xs flex-1"
                          >
                            <Check className="w-3.5 h-3.5" /> Save
                          </button>
                          <button
                            onClick={() => setEditingImageId(null)}
                            className="border border-gray-200 text-gray-500 p-2 rounded-lg text-xs"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleStartEdit(img)}
                            className="border border-gray-200 text-gray-600 hover:border-rose-500 hover:text-rose-600 font-bold p-2 rounded-lg flex items-center justify-center gap-1.5 text-xs flex-1"
                          >
                            <Edit2 className="w-3.5 h-3.5" /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteImage(img.id)}
                            className="border border-red-200 hover:bg-red-50 text-red-500 p-2 rounded-lg"
                            aria-label="Delete image"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
