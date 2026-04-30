/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'motion/react';
import { 
  Wind, 
  Sprout, 
  Users, 
  ArrowRight, 
  Info, 
  BarChart3, 
  Leaf, 
  ShieldCheck, 
  Menu, 
  X, 
  Flame, 
  AlertTriangle,
  Globe,
  Award,
  ChevronRight
} from 'lucide-react';

// --- Data Types ---
interface Program {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: any;
  targets: string[];
}

const programs: Program[] = [
  {
    id: 'mitti',
    title: 'Mitti Labs',
    description: 'Soil restoration via zero-budget natural farming and biochar application.',
    color: 'from-clay/20 to-clay/40',
    icon: Sprout,
    targets: ['3 districts in Year 1', '50,000 farmers by Year 3', 'Soil Report Cards for all']
  },
  {
    id: 'vayu',
    title: 'Vayu Watch',
    description: 'IoT air sensors across farming belts monitoring PM2.5, methane, and ammonia.',
    color: 'from-sage/20 to-sage/40',
    icon: Wind,
    targets: ['50 low-cost sensors', 'Live public dashboard', 'Stubble-to-value program']
  },
  {
    id: 'krishi',
    title: 'Krishi Fellows',
    description: 'Youth-led rural green workforce (ages 21-28) driving grassroots change.',
    color: 'from-moss/20 to-moss/40',
    icon: Users,
    targets: ['30 fellows cohort', 'Community mobilization', '1,000 fellows by Year 5']
  }
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-earth-950/80 backdrop-blur-lg border-b border-white/5 py-4' : 'bg-transparent py-8'}`}
    >
      <div className="container mx-auto px-8 flex justify-between items-center">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-10 h-10 bg-clay rounded-lg rotate-12 flex items-center justify-center group-hover:rotate-0 transition-all duration-500">
             <Sprout className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter italic uppercase text-stone leading-none">BHOOMI PRANA</span>
        </motion.div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-sage">
          {['Programs', 'Impact', 'Fellows', 'Roadmap'].map((item) => (
            <motion.a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="hover:text-clay transition-colors relative group"
              whileHover={{ y: -2 }}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-clay transition-all group-hover:w-full" />
            </motion.a>
          ))}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-clay rounded-full text-white border-b-4 border-earth-brown active:translate-y-1 active:border-b-0 font-bold shadow-lg shadow-clay/20"
          >
            JOIN / LVL 1
          </motion.button>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-full left-0 w-full bg-earth-900 border-b border-white/10 p-8 md:hidden flex flex-col gap-6 text-lg font-black uppercase italic"
          >
            {['Programs', 'Impact', 'Fellows', 'Roadmap'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="hover:text-clay text-stone">
                {item}
              </a>
            ))}
            <button className="bg-clay text-white px-6 py-4 rounded-2xl font-black">
              JOIN THE QUEST
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const Hero = () => {
  return (
    <section className="min-h-screen pt-32 pb-20 relative flex items-center overflow-hidden">
      {/* Background Decor */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-clay/10 rounded-full blur-[120px]" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-moss/10 rounded-full blur-[120px]" 
      />
      <div className="grain-overlay absolute inset-0" />

      <div className="container mx-auto px-8 grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
        <div className="md:col-span-7">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 px-3 py-1 bg-white/5 w-max rounded-md border border-white/10"
          >
            <span className="text-xs font-mono text-sage tracking-widest uppercase">// MISSION: RESTORE INDIA'S BREATH //</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-7xl md:text-9xl font-black italic uppercase leading-[0.85] mb-8 tracking-tighter text-stone"
          >
            ACTION <br/> 
            <motion.span 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="inline-block text-transparent !bg-clip-text !text-white border-t-2 border-b-2 border-white/10 leading-none origin-left"
            >
              IS THE
            </motion.span> <br/>
            ENERGY
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl text-sage/70 mb-10 max-w-xl leading-tight"
          >
            Stop waiting for change. Start the quest to restore our soil and purify our air. Level up the impact of our farmers.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <button className="btn-earth">
              START YOUR QUEST
            </button>
            <button className="btn-outline-earth">
              WATCH IMPACT
            </button>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="md:col-span-5 space-y-6"
        >
          {/* Global Progress Card */}
          <motion.div 
            whileHover={{ y: -5, rotate: 1 }}
            className="organic-card p-8 cursor-default"
          >
            <div className="flex justify-between items-end mb-4">
              <h3 className="mono-tag text-sage/50">Global Restoration Sync</h3>
              <span className="text-sage font-black italic tracking-tighter">88% SYNCED</span>
            </div>
            <div className="w-full h-12 bg-earth-900 rounded-xl border border-white/5 relative overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '88%' }}
                transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 1 }}
                className="h-full bg-linear-to-r from-clay to-sage" 
              />
              <div className="absolute inset-0 flex items-center justify-center font-black text-[10px] tracking-[0.2em] mix-blend-difference pointer-events-none text-stone">
                50,000+ FARMERS ENROLLED
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5, rotate: -1 }}
            className="organic-card p-8 !bg-moss/10 !border-moss/20 cursor-default"
          >
            <h3 className="text-sm font-black uppercase mb-6 flex items-center gap-2 tracking-widest text-stone">
              <span className="w-2 h-2 bg-sage rounded-full animate-pulse"></span> Live Impact Feed
            </h3>
            <div className="space-y-4">
              {[
                { user: 'Zoe_Green', msg: 'Soil sync complete in Karnataka! +500 XP' },
                { user: 'Krishi_01', msg: 'Metti Lab #4 is now operational. 🌿' }
              ].map((feed, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + (i * 0.2) }}
                  key={i} 
                  className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-full bg-earth-800 border-2 ${i === 0 ? 'border-clay' : 'border-sage'} flex-shrink-0 animate-pulse`} />
                  <div>
                    <p className="text-xs font-black tracking-tight text-sand">@{feed.user}</p>
                    <p className="text-[10px] text-sage/70 mt-1">{feed.msg}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const ProblemTriangle = () => {
  return (
    <section className="py-32 bg-earth-900 px-8 relative" id="impact">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8"
        >
          <div className="max-w-2xl">
            <div className="mono-tag mb-4 text-sage">// THE CRISIS TRIANGLE //</div>
            <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-stone">The System <br /> Is Overheating.</h2>
          </div>
          <p className="text-sage/40 max-w-sm text-sm font-medium italic">Chemical-dependent farming is destroying our three core life supports.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { tag: 'Soil', title: 'Dead Soil', stat: '30%', desc: "Land is degraded and biological activity is zero.", icon: Sprout, accent: 'text-clay' },
            { tag: 'Air', title: 'Toxic Air', stat: '7/10', desc: "Worst cities for air quality are agricultural hubs.", icon: Wind, accent: 'text-sage' },
            { tag: 'Growth', title: 'Stagnated', stat: '7x', desc: "Cost of farming has exploded with no profit return.", icon: Users, accent: 'text-moss' },
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              whileHover={{ 
                y: -15, 
                scale: 1.02,
                transition: { type: 'spring', stiffness: 300, damping: 10 }
              }}
              className="organic-card p-10 flex flex-col items-start group cursor-default"
            >
              <motion.div
                whileHover={{ rotate: 15 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <item.icon className={`${item.accent} w-10 h-10 mb-8 transition-transform group-hover:scale-125`} />
              </motion.div>
              <h3 className="text-6xl font-black mb-2 tracking-tighter italic text-stone">{item.stat}</h3>
              <div className="mono-tag mb-6 text-sand/50">{item.title}</div>
              <p className="text-sage/70 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProgramSection = () => {
  return (
    <section className="py-32 px-8" id="programs">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-20"
        >
          <div className="mono-tag mb-4 tracking-[0.5em]">// THE REGISTRY //</div>
          <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter">Choose Your <br /> Mission.</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((p, i) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -10 }}
              className="group organic-card p-10 flex flex-col min-h-[500px]"
            >
              <div className="flex justify-between items-start mb-12">
                <motion.div 
                  whileHover={{ rotate: 180, scale: 1.1 }}
                  className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-clay group-hover:bg-clay transition-all duration-500"
                >
                  <p.icon className="w-8 h-8 group-hover:text-white transition-colors text-sage" />
                </motion.div>
                <div className="text-4xl font-black italic opacity-10 text-stone">0{i + 1}</div>
              </div>

              <h3 className="text-4xl font-black italic uppercase tracking-tighter mb-6 text-stone">{p.title}</h3>
              <p className="text-sage/70 mb-10 flex-1 leading-tight text-lg">{p.description}</p>
              
              <div className="space-y-3 mb-12">
                {p.targets.map((t, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + (idx * 0.1) }}
                    className="flex items-center gap-3 text-[11px] font-mono font-bold text-sage/40 uppercase tracking-widest"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-clay" />
                    {t}
                  </motion.div>
                ))}
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 border border-white/10 rounded-xl font-black italic tracking-widest uppercase text-xs text-stone group-hover:bg-sand group-hover:text-earth-950 transition-all"
              >
                Access Program Database
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ImpactGame = () => {
  const [carbon, setCarbon] = useState(0);

  return (
    <section className="py-32 relative overflow-hidden" id="impact-sync">
      <div className="container mx-auto px-8 text-center relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
          <div className="mono-tag mb-4 tracking-[0.5em] text-sage justify-center">// CALCULATE YOUR IMPACT //</div>
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-16 text-stone">Carbon Sync <br /> Simulator.</h2>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto organic-card p-16 relative group"
        >
          <div className="absolute top-0 right-0 p-4 mono-tag opacity-20 text-sand">LVL 99 ENABLED</div>
           <div className="relative z-10">
              <motion.div 
                key={carbon}
                initial={{ scale: 0.9, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                className="text-8xl md:text-9xl font-black text-clay italic mb-4 tracking-tighter"
              >
                {carbon.toLocaleString()} <span className="text-4xl text-sage">T</span>
              </motion.div>
              <div className="mono-tag text-sage/40 mb-12 justify-center">Total CO2 Sequestered Quest</div>
              
              <div className="space-y-12">
                <div className="space-y-4">
                  <div className="flex justify-between mono-tag !text-sage/40">
                    <span>Fellows Deployed</span>
                    <span className="text-stone">{(carbon / 120).toFixed(0)}</span>
                  </div>
                  <motion.input 
                    whileHover={{ scale: 1.02 }}
                    type="range" 
                    min="0" 
                    max="1000" 
                    step="10"
                    onChange={(e) => setCarbon(parseInt(e.target.value) * 120)}
                    className="w-full h-2 bg-earth-900 rounded-lg border border-white/5 appearance-none cursor-pointer accent-clay"
                  />
                </div>
                
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 italic text-[10px] text-sage/50 uppercase tracking-widest leading-loose">
                  *This sync assumes optimal regenerative stewardship by Krishi Fellows. Actual sync rates may vary by district.
                </div>
              </div>
           </div>
           <motion.div 
            animate={{ 
              opacity: carbon > 0 ? 0.2 : 0.05,
              scale: carbon > 50000 ? 1.2 : 1
            }}
            className="absolute inset-0 bg-clay/5 blur-[80px] -z-10 transition-all duration-500" 
           />
        </motion.div>
      </div>
    </section>
  );
};

const FellowsSection = () => {
  return (
    <section className="py-32 bg-earth-950 overflow-hidden" id="fellows">
      <div className="container mx-auto px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <div className="mono-tag mb-6 text-sage">// THE GREEN WORKFORCE //</div>
            <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-8 leading-none text-stone">The Human <br /> Engine.</h2>
            <p className="text-sage/70 mb-12 text-xl leading-snug italic max-w-lg">
              We don't recruit volunteers. We empower local youth as paid environment infrastructure. Level up your career by saving the soil.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="organic-card p-6 flex-1 border-l-4 border-l-clay !bg-white/5 cursor-default group"
              >
                <div className="text-clay text-4xl font-black italic tracking-tighter mb-1 group-hover:scale-110 transition-transform">1,000+</div>
                <div className="mono-tag text-sage/40">FELLOWS BY Y3</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="organic-card p-6 flex-1 border-l-4 border-l-sage !bg-white/5 cursor-default group"
              >
                <div className="text-sage text-4xl font-black italic tracking-tighter mb-1 group-hover:scale-110 transition-transform">2 YEARS</div>
                <div className="mono-tag text-sage/40">PAID QUEST</div>
              </motion.div>
            </div>
          </motion.div>

          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            {[
              "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1492496913980-501348b61469?q=80&w=600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?q=80&w=600&auto=format&fit=crop"
            ].map((url, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.8, rotate: i % 2 === 0 ? -5 : 5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: i % 2 === 0 ? 3 : -3 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                className={`relative rounded-[40px] overflow-hidden border border-white/5 group shadow-2xl ${i % 2 === 0 ? 'mt-12' : ''}`}
              >
                <img src={url} alt={`Fellow activity ${i}`} className="w-full h-80 object-cover opacity-60 group-hover:opacity-100 transition-all grayscale group-hover:grayscale-0 duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-linear-to-t from-earth-950/80 to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Roadmap = () => {
  return (
    <section className="py-32 bg-earth-950" id="roadmap">
      <div className="container mx-auto px-8 text-center mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="mono-tag mb-4 tracking-[0.5em] text-sage justify-center">// DEPLOYMENT PROTOCOL //</div>
          <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-10 text-stone">The 3-Year <br /> <span className="text-gradient">Scale.</span></h2>
        </motion.div>
        
        <div className="max-w-4xl mx-auto space-y-12 text-left">
          {[
            { year: 'Year 1', phase: 'PROVE IT', points: ['Register NGO & Pilot in 3 districts', 'Recruit 30 Fellows cohort', 'Deploy 50 low-cost IoT sensors'] },
            { year: 'Year 2', phase: 'VALIDATE IT', points: ['Expand to 10 districts across 5 states', 'Partner with State Agriculture Depts', 'Launch verified carbon credit pilot'] },
            { year: 'Year 3', phase: 'SCALE IT', points: ['300 Active Krishi Fellows', 'Parliamentary findings presentation', 'Self-sustaining training revenue models'] }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              whileHover={{ x: 10 }}
              className="organic-card p-10 border-l-8 border-l-clay hover:bg-white/10"
            >
               <div className="flex justify-between items-start mb-6">
                 <div>
                   <div className="mono-tag text-sage/50 mb-2">{item.year}</div>
                   <h3 className="text-4xl font-black italic uppercase tracking-tighter text-stone">{item.phase}</h3>
                 </div>
                 <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-clay font-black italic border border-white/5"
                 >
                   XP
                 </motion.div>
               </div>
               <ul className="grid md:grid-cols-3 gap-6">
                 {item.points.map((p, i) => (
                   <motion.li 
                    key={i} 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    className="flex gap-3 text-sage/70 text-xs font-bold leading-tight uppercase tracking-tight items-start"
                   >
                     <ChevronRight className="w-4 h-4 text-clay shrink-0 mt-0.5" />
                     <span>{p}</span>
                   </motion.li>
                 ))}
               </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 border-t border-white/5 bg-earth-950 px-8 relative overflow-hidden">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="max-w-xs"
        >
          <div className="flex items-center gap-2 mb-6">
            <motion.div 
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 bg-clay rounded rotate-12 flex items-center justify-center"
            >
              <Leaf className="text-white w-4 h-4" />
            </motion.div>
            <span className="font-black italic text-xl tracking-tighter uppercase text-stone">BHOOMI PRANA</span>
          </div>
          <p className="text-sage/40 text-sm leading-tight italic">The soil beneath our feet and the air we breathe are not resources to extract. They are a living inheritance to protect.</p>
        </motion.div>

        <div className="flex flex-wrap gap-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="mono-tag mb-6 text-stone">The Hub</div>
            <div className="flex flex-col gap-4 text-sm font-bold uppercase tracking-widest text-sage/40">
              {['Discord', 'TikTok', 'Instagram'].map(item => (
                <a key={item} href="#" className="hover:text-clay transition-colors hover:translate-x-1 inline-block">{item}</a>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="mono-tag mb-6 text-stone">Protocol</div>
            <div className="flex flex-col gap-4 text-sm font-bold uppercase tracking-widest text-sage/40">
              {['Whitepaper', 'Carbon Policy', 'DAO Governance'].map(item => (
                <a key={item} href="#" className="hover:text-clay transition-colors hover:translate-x-1 inline-block">{item}</a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-right"
        >
           <div className="mono-tag mb-4 opacity-30 text-sage">#SYNCCONFIRMED</div>
           <p className="text-[10px] font-mono text-sage/20">© 2025 BHOOMI PRANA FOUNDATION. <br /> VER: 1.0.4-ACTION</p>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-clay/0 via-clay/20 to-clay/0" />
    </footer>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-earth-950 min-h-screen selection:bg-clay selection:text-white">
      <motion.div className="scroll-indicator" style={{ scaleX }} />
      <Navbar />
      <Hero />
      <ProblemTriangle />
      <ProgramSection />
      <ImpactGame />
      <FellowsSection />
      <Roadmap />
      <Footer />
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-clay/5 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-moss/5 blur-[180px] rounded-full animate-pulse [animation-delay:4s]" />
      </div>
    </div>
  );
}
