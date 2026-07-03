'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Icon from '@/components/ui/AppIcon';

type Step = 1 | 2 | 3;

interface DeliveryForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  deliveryNote: string;
}

interface ScheduleForm {
  date: string;
  time: string;
}

interface PaymentForm {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

const DELIVERY_FEE = 0;

const TIME_SLOTS = [
  '9:00 AM – 11:00 AM',
  '11:00 AM – 1:00 PM',
  '1:00 PM – 3:00 PM',
  '3:00 PM – 5:00 PM',
  '5:00 PM – 7:00 PM',
];

function StepIndicator({ current }: { current: Step }) {
  const steps = [
    { n: 1, label: 'Delivery' },
    { n: 2, label: 'Schedule' },
    { n: 3, label: 'Payment' },
  ];
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {steps.map((s, i) => (
        <React.Fragment key={s.n}>
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                current === s.n
                  ? 'bg-primary text-primary-foreground shadow-gold scale-110'
                  : current > s.n
                  ? 'bg-foreground text-background'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {current > s.n ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7l4 4 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                s.n
              )}
            </div>
            <span className={`text-xs font-medium ${current === s.n ? 'text-foreground' : 'text-muted-foreground'}`}>
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`h-px w-16 sm:w-24 mx-2 mb-5 transition-all duration-300 ${
                current > s.n ? 'bg-foreground' : 'bg-border'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function CheckoutContent() {
  const router = useRouter();
  const { items, removeItem, updateQty, totalPrice } = useCart();
  const [step, setStep] = useState<Step>(1);
  const [processing, setProcessing] = useState(false);

  const [delivery, setDelivery] = useState<DeliveryForm>({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '', deliveryNote: '',
  });

  const [schedule, setSchedule] = useState<ScheduleForm>({ date: '', time: '' });

  const [payment, setPayment] = useState<PaymentForm>({
    cardName: '', cardNumber: '', expiry: '', cvc: '',
  });

  const orderTotal = totalPrice + DELIVERY_FEE;

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
  };

  const handlePayment = async () => {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 2200));
    router.push('/order-confirmed');
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all';
  const labelClass = 'block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5';

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="text-center mb-12">
        <h1 className="font-display text-display font-semibold text-foreground mb-3" style={{ fontStyle: 'italic' }}>
          Checkout
        </h1>
        <p className="text-muted-foreground font-light">Complete your order in just a few steps</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Form Column */}
        <div className="lg:col-span-2">
          <StepIndicator current={step} />

          {/* Step 1: Delivery Address */}
          {step === 1 && (
            <div className="bg-card rounded-3xl border border-border p-8 shadow-card">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-6">Delivery Address</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>First Name</label>
                  <input className={inputClass} placeholder="Jane" value={delivery.firstName} onChange={(e) => setDelivery({ ...delivery, firstName: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Last Name</label>
                  <input className={inputClass} placeholder="Doe" value={delivery.lastName} onChange={(e) => setDelivery({ ...delivery, lastName: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <input className={inputClass} type="email" placeholder="jane@example.com" value={delivery.email} onChange={(e) => setDelivery({ ...delivery, email: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>Phone</label>
                  <input className={inputClass} placeholder="+1 (555) 000-0000" value={delivery.phone} onChange={(e) => setDelivery({ ...delivery, phone: e.target.value })} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Street Address</label>
                  <input className={inputClass} placeholder="123 Blossom Lane" value={delivery.address} onChange={(e) => setDelivery({ ...delivery, address: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>City</label>
                  <input className={inputClass} placeholder="New York" value={delivery.city} onChange={(e) => setDelivery({ ...delivery, city: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>State</label>
                    <input className={inputClass} placeholder="NY" value={delivery.state} onChange={(e) => setDelivery({ ...delivery, state: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelClass}>ZIP</label>
                    <input className={inputClass} placeholder="10001" value={delivery.zip} onChange={(e) => setDelivery({ ...delivery, zip: e.target.value })} />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Delivery Note (optional)</label>
                  <textarea className={inputClass + ' resize-none'} rows={3} placeholder="Leave at door, ring bell, etc." value={delivery.deliveryNote} onChange={(e) => setDelivery({ ...delivery, deliveryNote: e.target.value })} />
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button onClick={() => setStep(2)} className="gold-btn px-10 py-4 rounded-full font-semibold text-base">
                  Continue to Schedule →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Schedule */}
          {step === 2 && (
            <div className="bg-card rounded-3xl border border-border p-8 shadow-card">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-6">Schedule Delivery</h2>
              <div className="space-y-6">
                <div>
                  <label className={labelClass}>Preferred Delivery Date</label>
                  <input
                    type="date"
                    className={inputClass}
                    value={schedule.date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setSchedule({ ...schedule, date: e.target.value })}
                  />
                </div>
                <div>
                  <label className={labelClass}>Preferred Time Window</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSchedule({ ...schedule, time: slot })}
                        className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 text-left ${
                          schedule.time === slot
                            ? 'border-primary bg-primary/8 text-foreground'
                            : 'border-border bg-background text-muted-foreground hover:border-primary/50'
                        }`}
                      >
                        <span className="mr-2">🕐</span> {slot}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-secondary rounded-2xl p-4 flex gap-3">
                  <span className="text-xl">🌸</span>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Same-day delivery is available for orders placed before 12:00 PM. Our florists will prepare your arrangement fresh on the day of delivery.
                  </p>
                </div>
              </div>
              <div className="mt-8 flex justify-between">
                <button onClick={() => setStep(1)} className="outline-btn px-8 py-4 rounded-full font-semibold text-base">
                  ← Back
                </button>
                <button onClick={() => setStep(3)} className="gold-btn px-10 py-4 rounded-full font-semibold text-base">
                  Continue to Payment →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="space-y-5">
              {/* Demo Banner */}
              <div className="rounded-2xl border border-primary/30 bg-primary/6 p-5 flex gap-4 items-start">
                <div className="text-2xl flex-shrink-0">💡</div>
                <div>
                  <p className="text-sm font-bold text-foreground mb-1">Demo Mode</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    You can safely test the checkout using the following test card info:
                  </p>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { label: 'Card Number', value: '4242 4242 4242 4242' },
                      { label: 'CVC', value: '123' },
                      { label: 'Expiry', value: 'Any future date' },
                    ].map((item) => (
                      <div key={item.label} className="bg-card rounded-xl px-3 py-2 border border-border">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{item.label}</p>
                        <p className="text-sm font-bold text-foreground font-mono mt-0.5">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-3xl border border-border p-8 shadow-card">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-2">Payment Details</h2>
                <p className="text-sm text-muted-foreground mb-6">Your payment information is encrypted and secure.</p>

                {/* Card type icons */}
                <div className="flex gap-3 mb-6">
                  {['VISA', 'MC'].map((brand) => (
                    <div
                      key={brand}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-bold tracking-wider ${
                        brand === 'VISA' ? 'border-blue-200 bg-blue-50 text-blue-700' : 'border-red-200 bg-red-50 text-red-600'
                      }`}
                    >
                      {brand === 'VISA' ? 'VISA' : 'Mastercard'}
                    </div>
                  ))}
                </div>

                <div className="space-y-5">
                  <div>
                    <label className={labelClass}>Name on Card</label>
                    <input className={inputClass} placeholder="Jane Doe" value={payment.cardName} onChange={(e) => setPayment({ ...payment, cardName: e.target.value })} />
                  </div>
                  <div>
                    <label className={labelClass}>Card Number</label>
                    <div className="relative">
                      <input
                        className={inputClass + ' pr-12 font-mono tracking-widest'}
                        placeholder="4242 4242 4242 4242"
                        value={payment.cardNumber}
                        maxLength={19}
                        onChange={(e) => setPayment({ ...payment, cardNumber: formatCardNumber(e.target.value) })}
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <svg width="24" height="16" viewBox="0 0 24 16" fill="none" className="text-muted-foreground">
                          <rect width="24" height="16" rx="3" fill="currentColor" opacity="0.15" />
                          <rect x="1" y="5" width="22" height="3" fill="currentColor" opacity="0.4" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Expiry Date</label>
                      <input
                        className={inputClass + ' font-mono'}
                        placeholder="MM/YY"
                        value={payment.expiry}
                        maxLength={5}
                        onChange={(e) => setPayment({ ...payment, expiry: formatExpiry(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>CVC</label>
                      <input
                        className={inputClass + ' font-mono'}
                        placeholder="123"
                        value={payment.cvc}
                        maxLength={4}
                        onChange={(e) => setPayment({ ...payment, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-between items-center">
                  <button onClick={() => setStep(2)} className="outline-btn px-8 py-4 rounded-full font-semibold text-base">
                    ← Back
                  </button>
                  <button
                    onClick={handlePayment}
                    disabled={processing}
                    className="gold-btn px-10 py-4 rounded-full font-semibold text-base flex items-center gap-3 disabled:opacity-70"
                  >
                    {processing ? (
                      <>
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Processing…
                      </>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M2 5h12v8a1 1 0 01-1 1H3a1 1 0 01-1-1V5zM2 5V4a2 2 0 012-2h8a2 2 0 012 2v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        Place Order — ${orderTotal.toFixed(2)}
                      </>
                    )}
                  </button>
                </div>

                <p className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 5V4a3 3 0 016 0v1M2 5h8a1 1 0 011 1v4a1 1 0 01-1 1H2a1 1 0 01-1-1V6a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  256-bit SSL encryption. Your data is always safe.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 bg-card rounded-3xl border border-border p-6 shadow-card">
            <h3 className="font-display text-xl font-semibold text-foreground mb-5">Order Summary</h3>

            {items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground text-sm">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4 mb-5">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3 items-start group">
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-secondary">
                      <img src={item.image} alt={item.alt} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground leading-tight truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground mb-2">${item.price.toFixed(2)} each</p>
                      {/* Quantity controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="w-6 h-6 rounded-full border border-border bg-background flex items-center justify-center text-foreground hover:border-primary/50 transition-all"
                          aria-label="Decrease quantity"
                        >
                          <Icon name="MinusIcon" size={10} />
                        </button>
                        <span className="text-sm font-semibold text-foreground w-4 text-center">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="w-6 h-6 rounded-full border border-border bg-background flex items-center justify-center text-foreground hover:border-primary/50 transition-all"
                          aria-label="Increase quantity"
                        >
                          <Icon name="PlusIcon" size={10} />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-sm font-semibold text-foreground">${(item.price * item.qty).toFixed(2)}</span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-red-500 transition-colors"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Icon name="TrashIcon" size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Delivery</span>
                <span className="text-sage font-semibold">Free</span>
              </div>
              <div className="flex justify-between font-bold text-foreground text-lg border-t border-border pt-3 mt-2">
                <span>Total</span>
                <span className="text-primary">${orderTotal.toFixed(2)}</span>
              </div>
            </div>

            {schedule.date && schedule.time && (
              <div className="mt-5 bg-secondary rounded-2xl p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">Scheduled Delivery</p>
                <p className="text-sm font-semibold text-foreground">{schedule.date}</p>
                <p className="text-sm text-muted-foreground">{schedule.time}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
