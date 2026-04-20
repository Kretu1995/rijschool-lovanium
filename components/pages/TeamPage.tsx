'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Briefcase, Heart, Star, ArrowRight, Mail } from 'lucide-react';
import Link from 'next/link';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

interface TeamMember {
  name: string;
  role: string;
  initials: string;
  color: string;
  bio: string;
  specializations: string[];
  hobbies: string;
  experience: string;
}

function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  const t = useTranslations('team');

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="card-light-hover rounded-3xl overflow-hidden group"
    >
      {/* Avatar header */}
      <div
        className="h-36 flex items-center justify-center relative overflow-hidden"
        style={{ backgroundColor: member.color }}
      >
        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, white 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="relative w-20 h-20 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <span className="text-white font-black text-3xl">{member.initials}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Name + role */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-navy">{member.name}</h3>
          <p className="text-slate-400 text-sm">{member.role}</p>
        </div>

        {/* Experience badge */}
        <div className="inline-flex items-center gap-1.5 bg-navy-50 text-navy text-xs font-semibold px-3 py-1 rounded-full mb-4">
          <Star size={10} className="text-gold fill-gold" />
          {t('experience')}: {member.experience}
        </div>

        {/* Bio */}
        <p className="text-slate-500 text-sm leading-relaxed mb-5">{member.bio}</p>

        {/* Specializations */}
        <div className="mb-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            <Briefcase size={11} />
            {t('specializations')}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {member.specializations.map((s, i) => (
              <span key={i} className="text-xs bg-gold-bg text-gold font-medium px-2.5 py-1 rounded-full">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Hobbies */}
        <div className="pt-4 border-t border-surface-border flex items-center gap-2">
          <Heart size={12} className="text-slate-300 flex-shrink-0" />
          <p className="text-slate-400 text-xs">{member.hobbies}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function TeamPage() {
  const t = useTranslations('team');
  const locale = useLocale();
  const members = t.raw('members') as TeamMember[];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-navy-50/50 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
              <Link href={`/${locale}`} className="hover:text-navy transition-colors">Home</Link>
              <span>/</span>
              <span className="text-navy font-medium">{t('eyebrow')}</span>
            </div>

            <p className="eyebrow mb-4">{t('eyebrow')}</p>
            <h1 className="heading-xl mb-5 max-w-2xl">{t('headline')}</h1>
            <p className="text-slate-500 text-lg leading-relaxed max-w-xl">{t('subtitle')}</p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-8 mt-12 pt-10 border-t border-surface-border"
          >
            {[
              { value: '7', label: 'Gecertificeerde instructeurs' },
              { value: '60+', label: 'Jaar gecombineerde ervaring' },
              { value: '5', label: 'Specialisatiedomeinen' },
            ].map((stat, i) => (
              <div key={i}>
                <p className="text-4xl font-black text-navy">{stat.value}</p>
                <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team grid */}
      <section className="section-padding bg-surface">
        <div className="container-wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {members.map((member, i) => (
              <MemberCard key={i} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Vacancy section */}
      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <AnimatedSection>
            <div className="inline-flex w-14 h-14 rounded-2xl bg-gold-bg items-center justify-center mb-6">
              <Briefcase size={24} className="text-gold" />
            </div>
            <h2 className="heading-md mb-4">{t('vacancyTitle')}</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">{t('vacancyText')}</p>
            <a
              href="mailto:info@rijschoollovanium.be"
              className="btn-gold inline-flex items-center gap-2"
            >
              <Mail size={16} />
              {t('vacancyCta')}
              <ArrowRight size={15} />
            </a>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-navy py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-white/60 text-sm mb-2 uppercase tracking-widest">Rijschool Lovanium</p>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
            Klaar om te starten met één van onze instructeurs?
          </h2>
          <Link
            href={`/${locale}#booking`}
            className="btn-gold inline-flex items-center gap-2"
          >
            Schrijf je in <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
