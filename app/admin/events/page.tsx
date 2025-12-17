'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Calendar, ArrowLeft, Loader2, Clock } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import toast from 'react-hot-toast'

interface Sport {
    id: string
    name: string
}

interface Event {
    id: string
    name: string
    description: string
    imageUrl: string
    time: string
    sportId: string
    sport?: Sport
}

export default function AdminEventsPage() {
    const [events, setEvents] = useState<Event[]>([])
    const [sports, setSports] = useState<Sport[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [currentEvent, setCurrentEvent] = useState<Event | null>(null)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        imageUrl: '',
        time: '',
        sportId: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const [eventsRes, sportsRes] = await Promise.all([
                fetch('/api/admin/events'),
                fetch('/api/admin/sports')
            ])

            if (!eventsRes.ok || !sportsRes.ok) throw new Error('Failed to fetch data')

            const eventsData = await eventsRes.json()
            const sportsData = await sportsRes.json()

            setEvents(eventsData)
            setSports(sportsData)
        } catch (error) {
            console.error('Error fetching data:', error)
            toast.error('Failed to load events')
        } finally {
            setIsLoading(false)
        }
    }

    const handleEdit = (event: Event) => {
        setIsEditing(true)
        setCurrentEvent(event)
        setFormData({
            name: event.name,
            description: event.description,
            imageUrl: event.imageUrl,
            time: event.time,
            sportId: event.sportId
        })
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this event?')) return

        try {
            const response = await fetch(`/api/admin/events/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) throw new Error('Failed to delete event')

            setEvents(events.filter(e => e.id !== id))
            toast.success('Event deleted successfully')
        } catch (error) {
            console.error('Error deleting event:', error)
            toast.error('Failed to delete event')
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            if (isEditing && currentEvent) {
                const response = await fetch(`/api/admin/events/${currentEvent.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                })

                if (!response.ok) {
                    const data = await response.json()
                    throw new Error(data.error || 'Failed to update event')
                }

                const updatedEvent = await response.json()
                setEvents(events.map(e => e.id === currentEvent.id ? updatedEvent : e))
                toast.success('Event updated successfully')
            } else {
                const response = await fetch('/api/admin/events', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                })

                if (!response.ok) {
                    const data = await response.json()
                    console.error('Failed to create event:', data)
                    throw new Error(data.error || 'Failed to create event')
                }

                const newEvent = await response.json()
                setEvents([newEvent, ...events])
                toast.success('Event added successfully')
            }
            resetForm()
        } catch (error) {
            console.error('Error saving event:', error)
            toast.error(error instanceof Error ? error.message : 'Failed to save event')
        } finally {
            setIsSubmitting(false)
        }
    }

    const resetForm = () => {
        setIsEditing(false)
        setCurrentEvent(null)
        setFormData({ name: '', description: '', imageUrl: '', time: '', sportId: '' })
    }

    return (
        <div className="container mx-auto px-4 py-24 bg-[#11212D] min-h-screen text-white">
            <div className="mb-8">
                <Link href="/admin">
                    <Button variant="ghost" className="mb-4 pl-0 text-gray-400 hover:text-white hover:bg-transparent group">
                        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back to Dashboard
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold">Manage Events</h1>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="xl:col-span-1">
                    <Card className="bg-white/5 border-white/10 text-white sticky top-24">
                        <CardHeader>
                            <CardTitle className="text-white">{isEditing ? 'Edit Event' : 'Add New Event'}</CardTitle>
                            <CardDescription className="text-gray-400">
                                {isEditing ? 'Update the details of the event.' : 'Schedule a new event.'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-white">Event Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="e.g. World Cup Final"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        className="bg-white/10 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-white">Description</Label>
                                    <Input
                                        id="description"
                                        placeholder="Brief description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        required
                                        className="bg-white/10 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="imageUrl" className="text-white">Image URL (Required)</Label>
                                    <Input
                                        id="imageUrl"
                                        placeholder="/images/event.jpg"
                                        value={formData.imageUrl}
                                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                        required
                                        className="bg-white/10 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="sport" className="text-white">Sport</Label>
                                        <Select
                                            value={formData.sportId}
                                            onValueChange={(value) => setFormData({ ...formData, sportId: value })}
                                            required
                                        >
                                            <SelectTrigger className="bg-white/10 border-white/10 text-white">
                                                <SelectValue placeholder="Select sport" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#11212D] border-white/10 text-white">
                                                {sports.map(sport => (
                                                    <SelectItem key={sport.id} value={sport.id} className="hover:bg-white/10 focus:bg-white/10">
                                                        {sport.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="time" className="text-white">Time</Label>
                                        <Input
                                            id="time"
                                            value={formData.time}
                                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                            required
                                            placeholder="e.g. 20:00"
                                            className="bg-white/10 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-2 pt-4">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                {isEditing ? 'Updating...' : 'Adding...'}
                                            </>
                                        ) : (
                                            isEditing ? 'Update Event' : 'Add Event'
                                        )}
                                    </Button>
                                    {isEditing && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={resetForm}
                                            disabled={isSubmitting}
                                            className="border-white/10 text-white hover:bg-white/10 hover:text-white"
                                        >
                                            Cancel
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* List Section */}
                <div className="xl:col-span-2">
                    <Card className="bg-white/5 border-white/10 text-white">
                        <CardHeader>
                            <CardTitle className="text-white">Events List</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <div className="flex justify-center py-8">
                                    <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {events.map((event) => (
                                        <div key={event.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors gap-4">
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h3 className="font-semibold text-lg text-white">{event.name}</h3>
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                                                        {event.sport?.name || 'Unknown Sport'}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-400 mb-2">{event.description}</p>
                                                <div className="grid sm:grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-400">
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4" />
                                                        {event.time}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex sm:flex-col gap-2 justify-end">
                                                <Button size="sm" variant="outline" onClick={() => handleEdit(event)} className="border-white/10 text-white hover:bg-white/10 hover:text-white">
                                                    <Edit2 className="h-4 w-4" />
                                                </Button>
                                                <Button size="sm" variant="destructive" onClick={() => handleDelete(event.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}

                                    {events.length === 0 && (
                                        <p className="text-center text-gray-500 py-8">No events scheduled. Add one to get started.</p>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
