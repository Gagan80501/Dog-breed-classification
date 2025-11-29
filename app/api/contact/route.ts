import { NextResponse } from 'next/server'
import { cosmic } from '@/lib/cosmic'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message, inquiry_type } = body
    
    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }
    
    // Create contact submission in Cosmic
    await cosmic.objects.insertOne({
      type: 'contact-submissions',
      title: name,
      metadata: {
        name,
        email,
        subject: subject || '',
        message,
        inquiry_type: inquiry_type || { key: 'general', value: 'General Inquiry' },
        status: { key: 'new', value: 'New' }
      }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error creating contact submission:', error)
    return NextResponse.json(
      { error: 'Failed to submit contact form' },
      { status: 500 }
    )
  }
}