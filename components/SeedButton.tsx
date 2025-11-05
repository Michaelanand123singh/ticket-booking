'use client'

import { useState } from 'react'

export default function SeedButton() {
  const [loading, setLoading] = useState(false)

  const handleSeed = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/seed', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      const data = await response.json()
      
      if (data.success) {
        const message = `Success! Added ${data.created.length} tickets to the database.\n\n` +
          `Created: ${data.created.length}\n` +
          (data.skipped ? `Skipped (already exist): ${data.skipped.length}\n` : '') +
          (data.errors ? `Errors: ${data.errors.length}\n` : '')
        
        alert(message)
        // Clear cache and reload
        window.location.reload()
      } else {
        const errorMsg = `Error: ${data.error}\n\n${data.details ? `Details: ${data.details.substring(0, 200)}...` : ''}`
        alert(errorMsg)
        console.error('Seed API error:', data)
      }
    } catch (error: any) {
      alert(`Failed to add tickets: ${error.message}\n\nPlease check the console for details.`)
      console.error('Seed fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold text-blue-900 mb-2">Database is Empty</h3>
        <p className="text-blue-700 mb-4">
          Click the button below to add all dummy concert and sports data to your database.
        </p>
        <button
          onClick={handleSeed}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Adding tickets...' : 'Add All Dummy Data to Database'}
        </button>
      </div>
    </section>
  )
}

