'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Check, Heart, MapPin, Sparkles } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'

export default function BecomeMentorPage() {
  const [submitted, setSubmitted] = useState(false)

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

        <form
          className="profile-form"
          onSubmit={(e) => {
            e.preventDefault()
            setSubmitted(true)
          }}
        >
          <label>
            Full Name
            <input required placeholder="e.g. Maya Chen" />
          </label>

          <label>
            What is your current trade or job?
            <input required placeholder="e.g. Urban Farmer, Electrician, Store Manager" />
          </label>

          <label>
            Where are you based?
            <div className="input-icon">
              <MapPin size={16} />
              <input required placeholder="Neighborhood or city" />
            </div>
          </label>

          <label>
            What skill or topic would you like to teach?
            <textarea
              required
              rows={4}
              placeholder="e.g. Tool safety basics, resume reviews, customer service confidence, bike repair..."
            />
          </label>

          <label>
            Email or Phone (so we can reach out)
            <input type="text" required placeholder="email@example.com or phone number" />
          </label>

          <button className="primary-button" type="submit">
            {submitted ? (
              <>
                <Check size={18} /> Application submitted!
              </>
            ) : (
              'Submit mentor application'
            )}
          </button>

          {submitted && (
            <p className="success-message" role="status">
              Thank you for stepping up! Our community coordinator will reach out within 2–3 business days.
            </p>
          )}
        </form>
      </main>
    </>
  )
}
