import React, { useState } from 'react';
import { User, Calendar, Palette, CheckCircle2, ChevronRight, ChevronLeft, Send, Sparkles } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  vibe: string;
  notes: string;
}

const INITIAL_STATE: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  eventType: 'Wedding',
  eventDate: '',
  guestCount: '50-150',
  vibe: 'Vibrant & Colorful',
  notes: '',
};

export const InquiryWizard: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_STATE);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < 4) setStep((s) => s + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Compile WhatsApp message
    const message = `Hi Adelyne! 🌸 I would like to make a planning inquiry.%0A%0A` +
      `*Client Details:*%0A` +
      `- *Name:* ${formData.firstName} ${formData.lastName}%0A` +
      `- *Email:* ${formData.email}%0A` +
      `- *Phone:* ${formData.phone || 'Not provided'}%0A%0A` +
      `*Event details:*%0A` +
      `- *Type:* ${formData.eventType}%0A` +
      `- *Date:* ${formData.eventDate || 'TBD'}%0A` +
      `- *Guests:* ${formData.guestCount}%0A%0A` +
      `*Aesthetic & Vibe:*%0A` +
      `- *Theme Vibe:* ${formData.vibe}%0A` +
      `- *Notes:* ${formData.notes || 'None'}%0A%0A` +
      `Looking forward to hearing from you!`;

    window.open(`https://wa.me/254710739550?text=${message}`, '_blank');
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData(INITIAL_STATE);
    setStep(1);
    setIsSubmitted(false);
  };

  // Check validations per step
  const isStepValid = () => {
    if (step === 1) {
      return formData.firstName.trim() !== '' && formData.lastName.trim() !== '' && formData.email.trim() !== '';
    }
    if (step === 2) {
      return formData.eventType !== '';
    }
    return true;
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header Progress Node Tracker */}
      <div className="bg-rose-50/50 border-b border-gray-100 p-6 flex justify-between items-center">
        <h4 className="font-bold text-gray-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-rose-500" />
          <span>Event Inquiry Wizard</span>
        </h4>
        {!isSubmitted && (
          <span className="text-xs font-bold text-rose-600 bg-rose-100 px-3 py-1 rounded-full uppercase tracking-wider">
            Step {step} of 4
          </span>
        )}
      </div>

      {!isSubmitted && (
        <div className="w-full bg-gray-100 h-1">
          <div
            className="bg-rose-500 h-1 transition-all duration-500"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      )}

      {isSubmitted ? (
        /* Submission Success Page */
        <div className="p-8 md:p-12 text-center space-y-6 animate-in fade-in duration-500">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 font-serif">Inquiry Redirected!</h3>
          <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
            Your detailed event details have been formatted and sent directly to Adelyne Events via WhatsApp. If the chat window did not open, click the button below to retry.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={handleSubmit}
              className="bg-[#25D366] text-white hover:bg-[#20b858] font-bold px-8 py-3.5 rounded-xl shadow-lg flex items-center gap-2"
            >
              Open WhatsApp Chat Again
            </button>
            <button
              onClick={handleReset}
              className="border-2 border-gray-200 text-gray-600 hover:border-rose-500 hover:text-rose-600 font-bold px-6 py-3.5 rounded-xl transition-all"
            >
              Start New Inquiry
            </button>
          </div>
        </div>
      ) : (
        /* Multistep Form Content */
        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
          {/* STEP 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-5 h-5 text-rose-500" />
                <h5 className="font-bold text-gray-900 text-lg">Introduce Yourself</h5>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                  <input
                    required
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => updateField('firstName', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all text-sm md:text-base"
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                  <input
                    required
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => updateField('lastName', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all text-sm md:text-base"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all text-sm md:text-base"
                  placeholder="jane@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number (Optional)</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all text-sm md:text-base"
                  placeholder="e.g. +254 712 345 678"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Event Details */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-rose-500" />
                <h5 className="font-bold text-gray-900 text-lg">Event Particulars</h5>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Event Category</label>
                <select
                  value={formData.eventType}
                  onChange={(e) => updateField('eventType', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all bg-white text-sm md:text-base"
                >
                  <option value="Wedding">Wedding</option>
                  <option value="Traditional Wedding">Traditional Wedding</option>
                  <option value="Baby Shower">Baby Shower</option>
                  <option value="Graduation">Graduation</option>
                  <option value="Birthday Party">Birthday Party</option>
                  <option value="Other">Other / Corporate</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Desired Event Date</label>
                <input
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => updateField('eventDate', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all text-sm md:text-base bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Expected Guest Count</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['Under 50', '50-150', '150-300', '300+'].map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => updateField('guestCount', tier)}
                      className={`py-3 px-2 rounded-xl text-xs md:text-sm font-semibold border-2 transition-all ${
                        formData.guestCount === tier
                          ? 'border-rose-500 bg-rose-50/50 text-rose-700'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Vibe & Notes */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-2 mb-2">
                <Palette className="w-5 h-5 text-rose-500" />
                <h5 className="font-bold text-gray-900 text-lg">Aesthetic Vision</h5>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Aesthetic & Theme Vibe</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Vibrant & Colorful',
                    'Soft & Pastels',
                    'Modern & Minimalist',
                    'Classic & Elegant',
                    'Cultural Heritage',
                    'Undecided / Custom',
                  ].map((vibeOption) => (
                    <button
                      key={vibeOption}
                      type="button"
                      onClick={() => updateField('vibe', vibeOption)}
                      className={`py-3 px-4 rounded-xl text-left text-xs md:text-sm font-medium border-2 transition-all ${
                        formData.vibe === vibeOption
                          ? 'border-rose-500 bg-rose-50/50 text-rose-700'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {vibeOption}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Vision & Custom Styling Requests</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => updateField('notes', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all text-sm md:text-base resize-none"
                  placeholder="Share a details description of your setup requirements, colors, flowers, etc."
                />
              </div>
            </div>
          )}

          {/* STEP 4: Review Summary */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-rose-500" />
                <h5 className="font-bold text-gray-900 text-lg">Review Selections</h5>
              </div>

              <div className="bg-rose-50/40 rounded-2xl p-6 space-y-4 border border-rose-100/50 text-sm md:text-base">
                <div className="grid grid-cols-2 gap-4 border-b border-rose-200/10 pb-4">
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Contact Name</span>
                    <p className="font-bold text-gray-800">{formData.firstName} {formData.lastName}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Email Address</span>
                    <p className="font-semibold text-gray-800 truncate">{formData.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 border-b border-rose-200/10 pb-4">
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Event Type</span>
                    <p className="font-bold text-gray-800">{formData.eventType}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Date</span>
                    <p className="font-bold text-gray-800">{formData.eventDate || 'To be decided'}</p>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-bold">Guests</span>
                    <p className="font-bold text-gray-800">{formData.guestCount}</p>
                  </div>
                </div>

                <div>
                  <span className="text-xs text-gray-400 uppercase tracking-wider font-bold block mb-1">Theme & Styling Vibe</span>
                  <span className="inline-block bg-rose-100 text-rose-700 text-xs px-3 py-1.5 rounded-full font-bold">
                    {formData.vibe}
                  </span>
                </div>

                {formData.notes && (
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-bold block mb-1">Additional Notes</span>
                    <p className="text-gray-600 text-xs md:text-sm bg-white p-3 rounded-lg border border-gray-100 leading-relaxed italic">
                      "{formData.notes}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action buttons footer */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-100">
            {step > 1 ? (
              <button
                type="button"
                onClick={prevStep}
                className="flex items-center gap-2 border-2 border-gray-200 text-gray-600 hover:border-gray-300 font-semibold py-3 px-6 rounded-xl transition-all active:scale-95 text-sm"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                disabled={!isStepValid()}
                className={`flex items-center gap-2 font-bold py-3.5 px-8 rounded-xl transition-all shadow-md text-sm ${
                  isStepValid()
                    ? 'bg-rose-500 hover:bg-rose-600 text-white hover:shadow-rose-500/20 active:scale-95 cursor-pointer'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
                }`}
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20b858] text-white font-bold py-3.5 px-8 rounded-xl shadow-lg transition-all active:scale-95 text-sm"
              >
                Send Inquiry to WhatsApp <Send className="w-4 h-4 fill-white text-transparent" />
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};
