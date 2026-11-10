'use client'

import Link from 'next/link'
import { ArrowRight, BriefcaseBusiness, Leaf, MapPin, UserRound } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'

const features = [
  { icon: BriefcaseBusiness, title: 'Find jobs', text: 'See job posts in your area.', href: '/jobs', color: 'yellow' },
  { icon: UserRound, title: 'My profile', text: 'Show your skills to employers.', href: '/profile', color: 'green' },
  { icon: Leaf, title: 'Learn from mentors', text: 'Real workers teach you job skills.', href: '/mentors', color: 'blue' },
]

export default function Home() {
  return <><SiteHeader /><main>
    <section className="hero wrap">
      <div className="hero-copy"><p className="eyebrow"><span className="sun-dot" /> Your next step starts here</p><h1>Find a job and learn skills from <em>real workers</em></h1><p className="lede">For people looking for work: find local jobs, make your profile, and learn from mentors.</p><Link className="primary-button" href="/jobs">Find a job <ArrowRight size={18} /></Link><div className="local-note"><MapPin size={16} /> Helping neighbors find their next opportunity</div></div>
      <div className="hero-art" role="img" aria-label="A sunny illustration of a person carrying a plant"><div className="sun" /><div className="hill hill-one" /><div className="hill hill-two" /><div className="person"><span className="head" /><span className="body" /><span className="leg leg-one" /><span className="leg leg-two" /><span className="arm" /></div><div className="plant"><span className="stem" /><span className="leaf leaf-a" /><span className="leaf leaf-b" /></div></div>
    </section>
    <section className="feature-section wrap"><div className="section-heading"><div><p className="eyebrow">Everything in one place</p><h2>A little help goes a long way.</h2></div><p>Start wherever feels right. We&apos;ll meet you there.</p></div><div className="feature-grid">{features.map(({ icon: Icon, ...item }) => <Link className={`feature-card ${item.color}`} href={item.href} key={item.title}><div className="feature-icon"><Icon size={23} /></div><h3>{item.title}</h3><p>{item.text}</p><span className="card-arrow"><ArrowRight size={17} /></span></Link>)}</div></section>
  </main><footer className="wrap footer"><span><strong>Goodwork</strong> — brighter paths to work.</span><span>Made for local communities</span></footer></>
}
