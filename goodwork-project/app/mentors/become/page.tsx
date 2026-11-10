'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Heart, MapPin } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.trim().slice(0, 2).toUpperCase()
}

export default function BecomeMentorPage() {
  const [name, setName] = useState('')
  const [job, setJob] = useState('')
  const [location, setLocation] = useState('')
  const [skill, setSkill] = useState('')
  const [contact, setContact] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || loading) return

    setLoading(true)

    const colors = ['coral', 'blue', 'purple']
    const randomColor = colors[Math.floor(Math.random() * colors.length)]

    const newMentor = {
      id: Date.now().toString(),
      name: name.trim(),
      job: job.trim() || 'Mentor',
      location: location.trim(),
      skill: skill.trim() || 'Practical Skills & Advice',
      color: randomColor,
      initials: getInitials(name),
      isNew: true,
    }

    try {
      // 1. 서버 API로 저장
      await fetch('/api/mentors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMentor),
      })
    } catch (err) {
      console.error('API save failed', err)
    }

    try {
      // 2. 브라우저 저장소 백업
      const existing = JSON.parse(localStorage.getItem('goodwork_mentors') || '[]')
      localStorage.setItem('goodwork_mentors', JSON.stringify([newMentor, ...existing]))
    } catch {
      // ignore
    }

    // 3. 브라우저 새로고침 방식으로 멘토 리스트 페이지로 즉시 이동!
    window.location.href = '/mentors'
  }

  return (
    <>
      <SiteHeader />
      <main className="wrap page-main profile-layout">
        <div className="profile-copy">
          <Link href="/mentors" className="bottom-link" style={{ justifyContent: 'flex-start', margin: '0 0 20px 0' }}>
            <ArrowLeft size={16} /> Back to all mentors
          </Link>
          <p className="eyebrow">Share what you know</p>
          <h1>Become a Goodwork mentor.</h1>
          <p>
            You don&apos;t need to be a formal teacher. If you have hands-on experience in your trade or job and want to help neighbors build confidence, we&apos;d love to have you.
          </p>
          <div className="profile-tip">
            <Heart size={18} />
            <span>
              <strong>Give back on your own schedule.</strong><br />
              Most mentors host a 1-hour workshop a month or occasional 1-on-1 chats.
            </span>
          </div>
        </div>

        <form className="profile-form" onSubmit={handleSubmit}>
          <label>
            Full Name *
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Jordan Lee"
            />
          </label>

          <label>
            Trade or Job Title *
            <input
              required
              value={job}
              onChange={(e) => setJob(e.target.value)}
              placeholder="e.g. Web Developer, Electrician, Bike Mechanic"
            />
          </label>

          <label>
            Location (City or Neighborhood)
            <div className="input-icon">
              <MapPin size={16} />
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Riverside, Downtown"
              />
            </div>
          </label>

          <label>
            Skills or Topic You Teach *
            <textarea
              required
              rows={4}
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              placeholder="e.g. Coding basics, resume building, carpentry skills..."
            />
          </label>

          <label>
            Contact Email or Phone (Optional)
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="email@example.com or phone number"
            />
          </label>

          <button className="primary-button" type="submit" disabled={loading} style={{ cursor: 'pointer' }}>
            {loading ? 'Adding to mentor list...' : (
              <>
                Register &amp; View in Mentor List <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>
      </main>
    </>
  )
}
