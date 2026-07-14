import React, { useState, useMemo } from 'react';
import { Calculator, MessageCircle, HelpCircle, Check } from 'lucide-react';

interface AddonOption {
  id: string;
  name: string;
  price: number;
  perGuest?: boolean;
}

const ADDON_OPTIONS: AddonOption[] = [
  { id: 'florals', name: 'Premium Floral Styling & Centerpieces', price: 35000 },
  { id: 'balloons', name: 'Custom Balloon Installation', price: 12000 },
  { id: 'sound', name: 'PA System & DJ Services', price: 25000 },
  { id: 'photo', name: 'Professional Photography & Video', price: 40000 },
  { id: 'catering', name: 'Luxury Catering & Buffet Setup', price: 1200, perGuest: true },
  { id: 'vip', name: 'VIP Lounge Furniture Setup', price: 30000 },
];

const EVENT_BASES: Record<string, number> = {
  'Wedding': 120000,
  'Traditional Wedding': 80000,
  'Baby Shower': 40000,
  'Graduation': 45000,
  'Birthday Party': 35000,
  'Other': 80000,
};

const EVENT_PER_GUEST: Record<string, number> = {
  'Wedding': 350,
  'Traditional Wedding': 250,
  'Baby Shower': 200,
  'Graduation': 200,
  'Birthday Party': 150,
  'Other': 250,
};

export const BudgetEstimator: React.FC = () => {
  const [eventType, setEventType] = useState<string>('Wedding');
  const [guestCount, setGuestCount] = useState<number>(100);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['florals', 'sound']);

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((addonId) => addonId !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const budgetRange = useMemo(() => {
    const basePrice = EVENT_BASES[eventType] || 80000;
    const perGuestPrice = EVENT_PER_GUEST[eventType] || 250;
    
    let addonsTotal = 0;
    selectedAddons.forEach((addonId) => {
      const addon = ADDON_OPTIONS.find((a) => a.id === addonId);
      if (addon) {
        if (addon.perGuest) {
          addonsTotal += addon.price * guestCount;
        } else {
          addonsTotal += addon.price;
        }
      }
    });

    const total = basePrice + (guestCount * perGuestPrice) + addonsTotal;
    
    // Create a 15% range for estimation buffer
    const min = Math.round((total * 0.9) / 1000) * 1000;
    const max = Math.round((total * 1.1) / 1000) * 1000;

    return { min, max };
  }, [eventType, guestCount, selectedAddons]);

  const handleWhatsAppShare = () => {
    const formattedMin = budgetRange.min.toLocaleString();
    const formattedMax = budgetRange.max.toLocaleString();
    
    const selectedAddonNames = selectedAddons
      .map((addonId) => {
        const addon = ADDON_OPTIONS.find((a) => a.id === addonId);
        return addon ? `- ${addon.name}` : null;
      })
      .filter(Boolean)
      .join('%0A');

    const message = `Hi Adelyne! 🌸 I just estimated my event on your website budget estimator.%0A%0A*Event details:*%0A- *Type:* ${eventType}%0A- *Guests:* ${guestCount}%0A%0A*Selected Options:*%0A${selectedAddonNames || '- None'}%0A%0A*Estimated Cost Range:* KSh ${formattedMin} - KSh ${formattedMax}%0A%0AI would love to discuss feasibility and availability. Please reach out to me!`;
    
    window.open(`https://wa.me/254710739550?text=${message}`, '_blank');
  };

  return (
    <section id="estimator" className="py-24 bg-rose-50/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-rose-600 font-cursive text-3xl mb-4 block">Interactive Planning</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Estimate Your Event Budget</h2>
          <div className="w-24 h-1 bg-rose-500 mx-auto rounded-full mb-6" />
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get an instant estimated range for your celebration. Customize your package details and send it straight to us on WhatsApp to lock in your date.
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-gray-100">
          {/* Inputs Section */}
          <div className="lg:col-span-7 p-8 md:p-12 space-y-8">
            {/* Step 1: Event Type */}
            <div>
              <label className="block text-gray-800 font-semibold mb-4 text-lg">1. Choose Event Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.keys(EVENT_BASES).map((type) => (
                  <button
                    key={type}
                    onClick={() => setEventType(type)}
                    className={`py-3 px-4 rounded-2xl font-medium border-2 text-sm transition-all ${
                      eventType === type
                        ? 'border-rose-500 bg-rose-50/55 text-rose-700 shadow-sm'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Guest Count Slider */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-gray-800 font-semibold text-lg">2. Number of Guests</label>
                <span className="bg-rose-100 text-rose-700 px-4 py-1.5 rounded-full font-bold text-sm">
                  {guestCount} Guests
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="500"
                step="10"
                value={guestCount}
                onChange={(e) => setGuestCount(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-500 focus:outline-none"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
                <span>20 Guests</span>
                <span>250 Guests</span>
                <span>500+ Guests</span>
              </div>
            </div>

            {/* Step 3: Add-on Services */}
            <div>
              <label className="block text-gray-800 font-semibold mb-4 text-lg">3. Include Custom Add-ons</label>
              <div className="space-y-3">
                {ADDON_OPTIONS.map((addon) => {
                  const isSelected = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-rose-500 bg-rose-50/20 shadow-sm'
                          : 'border-gray-150 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-all ${
                            isSelected
                              ? 'bg-rose-500 border-rose-500 text-white'
                              : 'border-gray-300'
                          }`}
                        >
                          {isSelected && <Check className="w-4 h-4" />}
                        </div>
                        <span className="font-semibold text-gray-800 text-sm md:text-base">{addon.name}</span>
                      </div>
                      <span className="text-rose-600 font-bold text-xs md:text-sm shrink-0 whitespace-nowrap">
                        +{addon.perGuest ? `KSh ${addon.price}/guest` : `KSh ${addon.price.toLocaleString()}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Pricing Results Side */}
          <div className="lg:col-span-5 bg-gradient-to-br from-rose-600 to-rose-700 p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
            {/* Decorative layout design */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-black/10 rounded-full blur-2xl" />

            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-3 mb-6 bg-white/10 w-fit px-4 py-2 rounded-2xl border border-white/20">
                <Calculator className="w-5 h-5 text-rose-100" />
                <span className="text-xs uppercase tracking-widest font-bold">Live Estimation</span>
              </div>

              <div>
                <span className="text-rose-200 text-xs md:text-sm uppercase tracking-widest block mb-2 font-semibold">
                  Estimated Range for {eventType}
                </span>
                <div className="flex flex-col sm:flex-row items-baseline gap-1 sm:gap-2">
                  <span className="text-4xl md:text-5xl font-extrabold tracking-tight">
                    KSh {budgetRange.min.toLocaleString()}
                  </span>
                  <span className="text-xl font-medium text-rose-200">to</span>
                  <span className="text-4xl md:text-5xl font-extrabold tracking-tight">
                    KSh {budgetRange.max.toLocaleString()}
                  </span>
                </div>
                <span className="text-[11px] text-rose-200/70 italic mt-3 block">
                  *This estimate serves as a guidance range. Actual package pricing is subject to custom specifications and styling details.
                </span>
              </div>

              <div className="border-t border-white/20 pt-6">
                <h4 className="font-bold mb-4 text-base">Summary of Selections</h4>
                <ul className="space-y-2 text-xs md:text-sm text-rose-100">
                  <li className="flex justify-between">
                    <span>Base Setup ({eventType})</span>
                    <span className="font-semibold">Included</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Seating & Styling ({guestCount} guests)</span>
                    <span className="font-semibold">Included</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Selected Add-ons</span>
                    <span className="font-semibold">{selectedAddons.length} services</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative z-10 pt-8 mt-8 lg:mt-0">
              <button
                onClick={handleWhatsAppShare}
                className="w-full bg-white text-rose-700 hover:bg-rose-50 font-bold py-4 px-6 rounded-2xl shadow-xl transition-all duration-300 hover:scale-103 active:scale-97 flex items-center justify-center gap-3 text-base"
              >
                <MessageCircle className="w-6 h-6 fill-rose-700 text-white" />
                Book Quote via WhatsApp
              </button>
              <div className="flex items-center gap-2 justify-center text-xs text-rose-200/80 mt-4">
                <HelpCircle className="w-4 h-4" />
                <span>Instant planning redirection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
