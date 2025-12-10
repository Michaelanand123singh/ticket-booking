import { FiUsers, FiTarget, FiAward } from 'react-icons/fi'

export const metadata = {
  title: 'About Us - TicketHub',
  description: 'Learn more about TicketHub and our mission to provide the best ticket booking experience.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">About TicketHub</h1>
            <p className="text-xl text-indigo-100">
              Your trusted partner for sports and concert ticket booking
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <FiTarget className="text-indigo-600" size={24} />
            </div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To provide a seamless, secure, and user-friendly platform for booking
              sports and concert tickets. We aim to make event ticket purchasing
              accessible to everyone while ensuring the best possible experience.
            </p>
          </div>

          <div>
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
              <FiAward className="text-purple-600" size={24} />
            </div>
            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To become the leading ticket booking platform globally, known for
              reliability, innovation, and exceptional customer service. We envision
              a future where booking event tickets is as simple as a few clicks.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the passionate individuals behind TicketHub who work tirelessly
              to bring you the best ticket booking experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'John Doe',
                role: 'CEO & Founder',
                description: 'Passionate about making events accessible to everyone.',
              },
              {
                name: 'Jane Smith',
                role: 'CTO',
                description: 'Tech enthusiast dedicated to building scalable solutions.',
              },
              {
                name: 'Mike Johnson',
                role: 'Head of Operations',
                description: 'Ensuring smooth operations and customer satisfaction.',
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-200 w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <FiUsers className="text-gray-400" size={48} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-indigo-600 mb-2">{member.role}</p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Values</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Reliability</h3>
            <p className="text-gray-600">
              We ensure all tickets are verified and authentic, providing you with
              complete peace of mind.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Security</h3>
            <p className="text-gray-600">
              Your data is protected with industry-standard security
              measures.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Customer First</h3>
            <p className="text-gray-600">
              We prioritize your experience and satisfaction above everything else.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

