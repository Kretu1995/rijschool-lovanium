'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'bot' | 'user';
  text: string;
  time: string;
}

function getTime() {
  return new Date().toLocaleTimeString('nl-BE', { hour: '2-digit', minute: '2-digit' });
}

const knowledgeBase: { keywords: string[]; answer: string }[] = [
  {
    keywords: ['prijs', 'prijzen', 'kost', 'euro', 'tarief', 'tarieven', 'betalen', 'price', 'cost', 'tarif', 'prix'],
    answer: 'Onze tarieven zijn transparant:\n\n💳 Inschrijving: **€35** (eenmalig)\n📚 Theorieopleiding: **€170** (12 uur)\n🚗 Praktijkles: **€85/uur** (incl. btw)\n\nAlle prijzen zijn inclusief btw. Het rijexamen zelf (ca. €108) is niet inbegrepen.',
  },
  {
    keywords: ['theorie', 'theory', 'théorie', 'verkeersregels', 'examen', 'exam'],
    answer: 'Onze **theorieopleiding** duurt **12 uur** en kost **€170**.\n\nJe leert alle verkeersregels, -tekens en rijgedrag. Leerlingen die de opleiding volgen, slagen veel vaker bij de eerste poging voor het theoretisch examen! 📚',
  },
  {
    keywords: ['praktijk', 'rijles', 'les', 'rijden', 'audi', 'automaat', 'manueel', 'driving', 'conduite'],
    answer: 'Praktijklessen kosten **€85/uur** (incl. btw).\n\n🚗 Moderne Audi-lesvoertuigen\n✅ Manueel én automaat beschikbaar\n👤 Dubbele bediening voor veiligheid\n📅 Flexibele planning op jouw tempo\n\nWe rijden in Leuven, op de ring én op de autosnelweg!',
  },
  {
    keywords: ['inschrij', 'starten', 'beginnen', 'start', 'enroll', 'register', 'inscrire', 'commencer'],
    answer: 'Inschrijven is heel eenvoudig! ✅\n\n1. Stuur ons een berichtje via het **formulier** op de website of via **WhatsApp**\n2. We plannen een gratis **intake gesprek**\n3. Je start jouw rijopleiding!\n\nInschrijving kost eenmalig **€35**.',
  },
  {
    keywords: ['locatie', 'adres', 'waar', 'leuven', 'station', 'bereiken', 'location', 'address'],
    answer: 'We zijn centraal gelegen in **Leuven**! 📍\n\n🏢 Martelarenplein 20E, 3000 Leuven\n🚉 Vlak naast het **treinstation**\n🚌 Bereikbaar met trein, tram & bus\n🚗 Kiss & ride zone aanwezig\n\n**Ma–Vr: 10:00–17:00** (op afspraak)',
  },
  {
    keywords: ['contact', 'bellen', 'whatsapp', 'mail', 'email', 'telefoon', 'phone'],
    answer: 'Je kan ons bereiken via:\n\n📞 **+32 492 48 28 53** (ook WhatsApp!)\n📧 **info@rijschoollovanium.be**\n⏰ **Ma–Vr: 10:00–17:00**\n\nVia WhatsApp krijg je doorgaans het snelste antwoord! 💬',
  },
  {
    keywords: ['team', 'instructeur', 'lesgever', 'gert', 'hugo', 'sandra', 'edward', 'joris', 'Johan', 'ludo'],
    answer: 'Ons team bestaat uit **7 gecertificeerde instructeurs**: Gert (directeur), Hugo, Sandra, Edward, Joris, Johan en Ludo.\n\n🧠 Gespecialiseerd in **rijangst, ADHD & leerstoornissen**\n⭐ Gemiddeld **10+ jaar** ervaring\n✅ Allemaal officieel erkend\n\nBekijk ons team via de navigatie!',
  },
  {
    keywords: ['angst', 'stress', 'nerveus', 'zenuwachtig', 'adhd', 'autisme', 'anxiety', 'anxiété'],
    answer: 'Geen zorgen — we zijn hierin gespecialiseerd! 💙\n\nAl onze instructeurs zijn speciaal opgeleid voor begeleiding van leerlingen met:\n• Rijangst\n• ADHD & ADD\n• Leerstoornissen\n• Autisme\n\nWe werken in een rustige, gestructureerde omgeving zonder druk.',
  },
  {
    keywords: ['wacht', 'snel', 'wanneer', 'beschikbaar', 'waiting', 'wait', 'attente'],
    answer: 'Dankzij onze **korte wachttijden** kun je vaak al **binnen de week** starten! ⚡\n\nNeem contact op via WhatsApp (+32 492 48 28 53) voor de exacte beschikbaarheid.',
  },
  {
    keywords: ['slaag', 'fail', 'misluk', 'gezakt', 'herexamen', 'opnieuw', 'réussir', 'échoué'],
    answer: 'Geen zorgen als je niet slaagt! We geven je niet op. 💪\n\n✅ We analyseren samen wat beter kan\n✅ We plannen gerichte bijscholingslessen\n✅ Je kan het examen zo vaak herhalen als nodig\n\nOnze aanpak zorgt ervoor dat je klaar bent vóór je het probeert.',
  },
];

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const entry of knowledgeBase) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.answer;
    }
  }
  return 'Bedankt voor je vraag! 🙏 Voor een persoonlijk antwoord kan je ons het beste bereiken via:\n\n📞 **+32 492 48 28 53** (WhatsApp)\n📧 **info@rijschoollovanium.be**\n\nWe antwoorden snel!';
}

function formatMessage(text: string) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');
}

export default function ChatBot() {
  const t = useTranslations('chatbot');
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Add greeting on first open
  useEffect(() => {
    if (open && !hasOpened) {
      setHasOpened(true);
      setTimeout(() => {
        setMessages([{ role: 'bot', text: t('greeting'), time: getTime() }]);
      }, 400);
    }
  }, [open, hasOpened, t]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = (text: string = input) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = { role: 'user', text: trimmed, time: getTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const response = getBotResponse(trimmed);
      setTyping(false);
      setMessages((prev) => [...prev, { role: 'bot', text: response, time: getTime() }]);
    }, 900 + Math.random() * 500);
  };

  const quickReplies = t.raw('quickReplies') as string[];

  return (
    <>
      {/* Toggle button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 300, damping: 24 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-8 right-5 z-50 w-14 h-14 rounded-full bg-navy shadow-navy flex items-center justify-center hover:bg-navy-light transition-all duration-200 hover:scale-110"
        aria-label="Open chat"
        style={{ bottom: '7rem' }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={22} className="text-white" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <MessageCircle size={22} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
        {!open && !hasOpened && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold border-2 border-white animate-pulse" />
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-50 bg-white rounded-3xl shadow-2xl border border-surface-border overflow-hidden flex flex-col"
            style={{
              bottom: '13rem',
              right: '1.25rem',
              width: 'min(380px, calc(100vw - 2.5rem))',
              height: '480px',
            }}
          >
            {/* Header */}
            <div className="bg-navy px-5 py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                <Bot size={18} className="text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">{t('title')}</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                  <p className="text-white/60 text-xs">{t('subtitle')}</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-surface">
              {messages.map((msg, i) => (
                <div key={i} className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'bot' ? 'bg-navy' : 'bg-gold'}`}>
                    {msg.role === 'bot' ? <Bot size={13} className="text-white" /> : <User size={13} className="text-white" />}
                  </div>
                  <div className={`max-w-[78%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'bot'
                          ? 'bg-white text-navy shadow-card rounded-bl-sm'
                          : 'bg-navy text-white rounded-br-sm'
                      }`}
                      dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                    />
                    <span className="text-[10px] text-slate-400 px-1">{msg.time}</span>
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex items-end gap-2">
                  <div className="w-7 h-7 rounded-full bg-navy flex items-center justify-center">
                    <Bot size={13} className="text-white" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-card">
                    <div className="flex gap-1">
                      {[0, 0.2, 0.4].map((d, i) => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-slate-300"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: d }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Quick replies — show after greeting, before any user input */}
              {messages.length === 1 && !typing && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {quickReplies.map((reply, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(reply)}
                      className="text-xs bg-white border border-surface-border text-navy px-3 py-1.5 rounded-full hover:bg-navy hover:text-white hover:border-navy transition-all duration-200"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* WhatsApp handoff */}
            <div className="px-4 py-2 border-t border-surface-border bg-white flex items-center justify-between">
              <p className="text-slate-400 text-xs">{t('whatsappText')}</p>
              <a
                href="https://wa.me/32492482853"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#25D366] hover:underline flex items-center gap-1"
              >
                {t('whatsappCta')} →
              </a>
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-surface-border">
              <form
                onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t('placeholder')}
                  className="flex-1 bg-surface border border-surface-border rounded-xl px-4 py-2.5 text-sm text-navy placeholder:text-slate-300 focus:outline-none focus:border-navy/30 focus:ring-2 focus:ring-navy/10 transition-all duration-200"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-xl bg-navy flex items-center justify-center hover:bg-navy-light disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                  aria-label="Send"
                >
                  <Send size={15} className="text-white" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
