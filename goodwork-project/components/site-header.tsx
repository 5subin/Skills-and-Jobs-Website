'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Leaf } from 'lucide-react'

const links = [{ label: 'Jobs', href: '/jobs' }, { label: 'Mentors', href: '/mentors' }, { label: 'My profile', href: '/profile' }]

export function SiteHeader() {
  const pathname = usePathname()
  return <header className="site-header"><div className="nav-wrap"><Link href="/" className="brand"><span className="brand-mark"><Leaf size={18} fill="currentColor" /></span><span>Goodwork</span></Link><nav aria-label="Main navigation">{links.map((link) => <Link className={pathname === link.href ? 'active' : ''} href={link.href} key={link.href}>{link.label}</Link>)}</nav><Link href="/profile" className="header-cta">Create profile <span>↗</span></Link></div></header>
}
