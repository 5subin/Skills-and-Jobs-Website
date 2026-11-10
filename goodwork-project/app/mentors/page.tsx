'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CalendarDays, MapPin, Sparkles, Trash2 } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'

export interface Mentor {
  id?: string
  name: string
  job: string
  skill: string
  color: string
  initials: string
  location?: string
  isNew?: boolean
}

const defaultMentors: Mentor[] = [
  { id: 'default-1', name: 'Maya Chen', job: 'Urban Farmer', skill: 'Growing food in small spaces', color: 'coral', initials: 'MC' },
  { id: 'default-2', name: 'Luis Rivera', job: 'Bike Shop Owner', skill: 'Bike repair basics', color: 'blue', initials: 'LR' },
  { id: 'default-3', name: 'Priya Shah', job: 'Studio Manager', skill: 'Confident customer service', color: 'purple', initials: 'PS' },
]

export default function MentorsPage() {
  const [allMentors, setAllMentors] = useState<Mentor[]>(defaultMentors)

  const loadMentors = async () => {
    let customMentors: Mentor[] = []

    // 1. 서버 API에서 저장된 멘토 목록 불러오기
    try {
      const res = await fetch('/api/mentors', { cache: 'no-store' })
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data) && data.length > 0) {
          customMentors = data
        }
      }
    } catch {
      // ignore
    }

    // 2. 브라우저 localStorage에서도 확인 (오프라인/클라이언트 백업)
    if (customMentors.length === 0) {
      try {
        const stored = localStorage.getItem('goodwork_mentors')
        if (stored) {
          const parsed = JSON.parse(stored)
          if (Array.isArray(parsed) && parsed.length > 0) {
            customMentors = parsed
          }
        }
      } catch {
        // ignore
      }
    }

    setAllMentors([...customMentors, ...defaultMentors])
  }

  useEffect(() => {
    loadMentors()

    // 창이 활성화될 때마다 다시 로드
    window.addEventListener('focus', loadMentors)
    return () => window.removeEventListener('focus', loadMentors)
  }, [])

  const handleDeleteMentor = async (id?: string) => {
    if (!id) return

    // API 삭제 요청
    try {
      await fetch('/api/mentors', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
    } catch {
      // ignore
    }

    // 로컬 스토리지 삭제
    try {
      const stored = localStorage.getItem('goodwork_mentors')
      if (stored) {
        const custom: Mentor[] = JSON.parse(stored)
        const filtered = custom.filter((m) => m.id !== id)
        localStorage.setItem('goodwork_mentors', JSON.stringify(filtered))
      }
    } catch {
      // ignore
    }

    // 상태 업데이트
    setAllMentors((prev) => prev.filter((m) => m.id !== id))
  }

  return (
    <>
      <SiteHeader />
      <main className="wrap page-main">
        <div className="page-intro mentor-intro">
          <div>
            <p className="eyebrow">Learn by doing</p>
            <h1>Meet your next mentor.</h1>
            <p>Real workers, practical skills, and a little encouragement along the way.</p>
          </div>
          <Link href="/mentors/become" className="primary-button">
            Become a mentor <ArrowRight size={17} />
          </Link>
        </div>

        {/* Mentor Cards Grid */}
        <div className="mentor-grid">
          {allMentors.map((mentor) => (
            <article className="mentor-card" key={mentor.id || mentor.name}>
              <div className={`mentor-photo ${mentor.color}`}>
                <span>{mentor.initials}</span>
                <div className="photo-sun" />
                {mentor.isNew && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: '#217b58',
                      color: 'white',
                      fontSize: '11px',
                      fontWeight: 800,
                      padding: '4px 8px',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      zIndex: 3,
                    }}
                  >
                    <Sparkles size={12} /> NEW MENTOR
                  </span>
                )}
                {mentor.isNew && (
                  <button
                    onClick={() => handleDeleteMentor(mentor.id)}
                    title="Delete mentor"
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      border: 0,
                      borderRadius: '6px',
                      padding: '4px 6px',
                      cursor: 'pointer',
                      zIndex: 3,
                    }}
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>
              <div className="mentor-info">
                <p className="mentor-job">
                  {mentor.job} {mentor.location && `• ${mentor.location}`}
                </p>
                <h3>{mentor.name}</h3>
                <p className="teaches">
                  Teaches <strong>{mentor.skill}</strong>
                </p>
                <div className="mentor-footer">
                  <span>
                    <CalendarDays size={15} /> {mentor.isNew ? 'New class opening soon' : 'Next class Tue'}
                  </span>
                  <button className="text-button">
                    Join class <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="quote-panel">
          <div className="quote-mark">“</div>
          <blockquote>
            You don&apos;t need to have it all figured out. You just need someone who has taken the next step.
          </blockquote>
          <p>— Maya, Goodwork mentor</p>
        </section>
      </main>
    </>
  )
}
