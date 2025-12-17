'use client'

import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, X, ArrowLeft, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import toast from 'react-hot-toast'

interface Sport {
    id: string
    name: string
    description: string
    imageUrl?: string
}

export default function AdminSportsPage() {
    const [sports, setSports] = useState<Sport[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [currentSport, setCurrentSport] = useState<Sport | null>(null)
    const [formData, setFormData] = useState({ name: '', description: '', imageUrl: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        fetchSports()
    }, [])

    const fetchSports = async () => {
        try {
            const response = await fetch('/api/admin/sports')
            if (!response.ok) {
                const errText = await response.text();
                console.error('Failed to fetch sports:', errText);
                throw new Error('Failed to fetch sports');
            }
            const data = await response.json()
            setSports(data)
        } catch (error) {
            console.error('Error fetching sports:', error)
            toast.error('Failed to load sports')
        } finally {
            setIsLoading(false)
        }
    }

    const handleEdit = (sport: Sport) => {
        setIsEditing(true)
        setCurrentSport(sport)
        setFormData({ name: sport.name, description: sport.description, imageUrl: sport.imageUrl || '' })
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this sport?')) return

        try {
            const response = await fetch(`/api/admin/sports/${id}`, {
                method: 'DELETE',
            })

            if (!response.ok) throw new Error('Failed to delete sport')

            setSports(sports.filter(s => s.id !== id))
            toast.success('Sport deleted successfully')
        } catch (error) {
            console.error('Error deleting sport:', error)
            toast.error('Failed to delete sport')
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            if (isEditing && currentSport) {
                const response = await fetch(`/api/admin/sports/${currentSport.id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                })

                if (!response.ok) {
                    const data = await response.json()
                    throw new Error(data.error || 'Failed to update sport')
                }

                const updatedSport = await response.json()
                setSports(sports.map(s => s.id === currentSport.id ? updatedSport : s))
                toast.success('Sport updated successfully')
            } else {
                const response = await fetch('/api/admin/sports', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                })

                const data = await response.json()

                if (!response.ok) {
                    console.error('Failed to create sport:', data)
                    throw new Error(data.error || 'Failed to create sport')
                }

                setSports([data, ...sports])
                toast.success('Sport added successfully')

            }
            resetForm()
        } catch (error) {
            console.error('Error saving sport:', error)
            toast.error(error instanceof Error ? error.message : 'Failed to save sport')
        } finally {
            setIsSubmitting(false)
        }
    }

    const resetForm = () => {
        setIsEditing(false)
        setCurrentSport(null)
        setFormData({ name: '', description: '', imageUrl: '' })
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
                <h1 className="text-3xl font-bold">Manage Sports</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Section */}
                <div className="lg:col-span-1">
                    <Card className="bg-white/5 border-white/10 text-white sticky top-24">
                        <CardHeader>
                            <CardTitle className="text-white">{isEditing ? 'Edit Sport' : 'Add New Sport'}</CardTitle>
                            <CardDescription className="text-gray-400">
                                {isEditing ? 'Update the details of the sport.' : 'Add a new sport to the catalog.'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-white">Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="e.g. Football"
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
                                        placeholder="Short description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        required
                                        className="bg-white/10 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="imageUrl" className="text-white">Image URL (Optional)</Label>
                                    <Input
                                        id="imageUrl"
                                        placeholder="/images/sport.jpg"
                                        value={formData.imageUrl}
                                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                        className="bg-white/10 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-500"
                                    />
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                {isEditing ? 'Updating...' : 'Adding...'}
                                            </>
                                        ) : (
                                            isEditing ? 'Update Sport' : 'Add Sport'
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
                <div className="lg:col-span-2">
                    <Card className="bg-white/5 border-white/10 text-white">
                        <CardHeader>
                            <CardTitle className="text-white">Sports List</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isLoading ? (
                                <div className="flex justify-center py-8">
                                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {sports.map((sport) => (
                                        <div key={sport.id} className="flex items-center justify-between p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                                            <div>
                                                <h3 className="font-semibold text-lg text-white">{sport.name}</h3>
                                                <p className="text-sm text-gray-400">{sport.description}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="outline" onClick={() => handleEdit(sport)} className="border-white/10 text-white hover:bg-white/10 hover:text-white">
                                                    <Edit2 className="h-4 w-4" />
                                                </Button>
                                                <Button size="sm" variant="destructive" onClick={() => handleDelete(sport.id)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}

                                    {sports.length === 0 && (
                                        <p className="text-center text-gray-500 py-8">No sports found. Add one to get started.</p>
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
