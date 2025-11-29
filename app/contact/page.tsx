import ContactForm from '@/components/ContactForm'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
          <p className="text-xl text-gray-600 mb-12">
            Have questions or feedback? We'd love to hear from you!
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}