
import React, { useState } from 'react';
import { Instagram, Youtube, Tv, Flame, TrendingUp, Mail } from 'lucide-react';
import { trackEvent } from '../services/metaPixel';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    trackEvent('Contact', {
      method: 'api_form',
      content_name: 'Booking Inquiry'
    });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormState({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        const msg = data.details ? `${data.error} (${data.details})` : (data.error || 'Etwas ist schief gelaufen.');
        setErrorMessage(msg);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setErrorMessage('Verbindung zum Server fehlgeschlagen.');
    }
  };

  return (
    <section id="contact" className="py-20 bg-banana border-t-8 border-jet scroll-mt-32">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12">
          
          <div className="flex-[3]">
            <div className="bg-white border-4 border-jet shadow-flyer p-8 md:p-12 relative">
              <div className="absolute -top-10 left-10 bg-vest text-white font-display text-2xl px-6 py-2 border-4 border-jet">
                 KIKOS BOOKING
              </div>
              
              <h2 className="text-6xl md:text-8xl font-display text-jet mb-2 text-center uppercase mt-6">BOOKING</h2>
              <p className="font-comic text-2xl text-vest mb-10 text-center">(Ich geh wahrscheinlich eh nicht ran)</p>

              {status === 'success' ? (
                <div className="bg-green-100 border-4 border-green-600 p-8 text-center space-y-4">
                  <h3 className="font-display text-4xl text-green-700 uppercase">BOOM! GESENDET!</h3>
                  <p className="font-comic text-xl text-jet">Deine Nachricht ist im Äther verschwunden. Vielleicht antworte ich sogar.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="bg-jet text-white font-display text-2xl px-8 py-3 border-4 border-jet hover:bg-banana hover:text-jet transition-all"
                  >
                    NOCH EINE SCHICKEN?
                  </button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-jet font-bold mb-2 uppercase text-sm">Dein Name</label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        value={formState.name}
                        placeholder="z.B. Ein besorgter Fan"
                        className="w-full bg-sky/10 border-4 border-jet p-4 font-black focus:outline-none focus:bg-banana/20"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label className="block text-jet font-bold mb-2 uppercase text-sm">E-Mail Adresse</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={formState.email}
                        placeholder="deine@mail.com"
                        className="w-full bg-sky/10 border-4 border-jet p-4 font-black focus:outline-none focus:bg-banana/20"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-jet font-bold mb-2 uppercase text-sm">Nachricht</label>
                    <textarea 
                      name="message"
                      required
                      rows={4} 
                      value={formState.message}
                      placeholder="Mach's lustig, ich langweile mich schnell."
                      className="w-full bg-sky/10 border-4 border-jet p-4 font-black focus:outline-none focus:bg-banana/20"
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  {status === 'error' && (
                    <div className="text-red-600 font-bold text-center bg-red-50 p-4 border-2 border-red-600 space-y-2">
                      <p>FEHLER: {errorMessage}</p>
                      {errorMessage.includes('Verbindung') && (
                        <p className="text-xs font-comic opacity-70">Tipp: Prüfe dein App-Passwort und die E-Mail in den Secrets.</p>
                      )}
                    </div>
                  )}

                  <button 
                    type="submit"
                    disabled={status === 'loading'}
                    className={`w-full bg-vest text-white font-display text-4xl py-6 hover:bg-jet hover:text-banana transition-all border-4 border-jet shadow-flyer uppercase ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {status === 'loading' ? 'WIRD GESCHICKT...' : 'INS LEERE SENDEN'}
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="flex-[2] space-y-6">
             <div className="bg-white p-8 border-4 border-jet shadow-flyer transform -rotate-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-jet p-3 text-banana">
                    <Mail size={32} />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-jet uppercase">BOOKING DRAHT</h3>
                    <p className="font-comic text-vest text-sm">Überspring das Formular:</p>
                  </div>
                </div>
                <a href="mailto:kikomedy@gmail.com" className="block text-xl md:text-2xl font-black text-jet hover:text-vest break-all">
                  kikomedy@gmail.com
                </a>
             </div>

             <a 
              href="https://www.instagram.com/kikomedy/" 
              target="_blank" 
              className="block bg-jet p-8 border-4 border-white shadow-flyer transform hover:scale-105 transition-all group"
             >
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-3 rounded-2xl shadow-lg">
                    <Instagram size={48} className="text-white" />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-banana font-display text-5xl">100K+</span>
                    <span className="text-white/50 text-xs font-bold tracking-widest">FOLLOWERS</span>
                  </div>
                </div>
                <h3 className="text-white font-display text-4xl mb-1">@KIKOMEDY</h3>
                <div className="flex gap-2 items-center text-green-400 font-bold text-xs mb-6">
                  <TrendingUp size={14} /> +12% DIESE WOCHE
                </div>
                <div className="bg-white/10 p-4 border border-white/20 rounded-lg flex items-center gap-3">
                  <Flame className="text-vest" />
                  <span className="text-white font-comic text-sm">"Seine Reels gefährden meinen Verstand."</span>
                </div>
                <div className="mt-6 w-full bg-white text-jet font-display text-2xl py-3 text-center group-hover:bg-banana transition-colors">
                  FOLGE DEM WAHNSINN
                </div>
             </a>

             <div className="grid grid-cols-2 gap-4">
                <a href="https://www.tiktok.com/@kikomedy" target="_blank" className="flex flex-col items-center p-6 bg-white border-4 border-jet shadow-flyer hover:bg-sky group transition-all">
                  <Tv size={32} className="text-vest group-hover:text-white mb-2" />
                  <span className="font-display text-xl text-jet">TIKTOK</span>
                </a>
                <a href="https://www.youtube.com/@kikomedy" target="_blank" className="flex flex-col items-center p-6 bg-white border-4 border-jet shadow-flyer hover:bg-sky group transition-all">
                  <Youtube size={32} className="text-vest group-hover:text-white mb-2" />
                  <span className="font-display text-xl text-jet">YOUTUBE</span>
                </a>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
