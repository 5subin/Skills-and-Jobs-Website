import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataDir = path.join(process.cwd(), 'data')
const filePath = path.join(dataDir, 'mentors.json')

function getMentors() {
  try {
    if (!fs.existsSync(filePath)) {
      return []
    }
    const content = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(content || '[]')
  } catch {
    return []
  }
}

function saveMentors(mentors: unknown[]) {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    fs.writeFileSync(filePath, JSON.stringify(mentors, null, 2), 'utf-8')
  } catch (err) {
    console.error('Error saving mentors:', err)
  }
}

export async function GET() {
  const mentors = getMentors()
  return NextResponse.json(mentors)
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const mentors = getMentors()
    mentors.unshift(body)
    saveMentors(mentors)
    return NextResponse.json({ success: true, mentors })
  } catch {
    return NextResponse.json({ error: 'Failed to save mentor' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    let mentors = getMentors()
    mentors = mentors.filter((m: { id?: string }) => m.id !== id)
    saveMentors(mentors)
    return NextResponse.json({ success: true, mentors })
  } catch {
    return NextResponse.json({ error: 'Failed to delete mentor' }, { status: 500 })
  }
}
