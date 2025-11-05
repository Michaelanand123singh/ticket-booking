'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useAuthCheck } from '@/hooks/useAuthCheck'
import { formatDate } from '@/lib/utils'
import { FiUsers, FiMail, FiCalendar, FiUserCheck, FiUserX } from 'react-icons/fi'
import toast from 'react-hot-toast'

interface User {
  id: string
  name: string
  email: string
  role: string
  emailVerified: boolean
  createdAt: string
  _count: {
    orders: number
  }
}

export default function AdminUsersPage() {
  const router = useRouter()
  const { user, token } = useAuthStore()
  const { isChecking } = useAuthCheck('/login', true)
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isChecking && token) {
      fetchUsers()
    }
  }, [isChecking, token])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setUsers(data)
      } else {
        toast.error('Failed to load users')
      }
    } catch (error) {
      toast.error('Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: newRole }),
      })

      if (response.ok) {
        toast.success('User role updated successfully')
        fetchUsers()
      } else {
        toast.error('Failed to update user role')
      }
    } catch (error) {
      toast.error('Failed to update user role')
    }
  }

  if (isChecking || !user || user.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  const totalUsers = users.length
  const verifiedUsers = users.filter((u) => u.emailVerified).length
  const adminUsers = users.filter((u) => u.role === 'ADMIN').length
  const regularUsers = users.filter((u) => u.role === 'USER').length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">User Management</h1>
          <p className="text-gray-600">View and manage all registered users</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Users</p>
                <p className="text-2xl font-bold mt-1">{totalUsers}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FiUsers className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Verified Users</p>
                <p className="text-2xl font-bold mt-1 text-green-600">{verifiedUsers}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FiUserCheck className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Admin Users</p>
                <p className="text-2xl font-bold mt-1 text-purple-600">{adminUsers}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FiUserCheck className="text-purple-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Regular Users</p>
                <p className="text-2xl font-bold mt-1">{regularUsers}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <FiUsers className="text-orange-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading users...</p>
          </div>
        ) : users.length > 0 ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-left py-3 px-4">Role</th>
                    <th className="text-left py-3 px-4">Verified</th>
                    <th className="text-left py-3 px-4">Orders</th>
                    <th className="text-left py-3 px-4">Joined</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((userData) => (
                    <tr key={userData.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-semibold">{userData.name}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <FiMail className="mr-2 text-gray-400" />
                          {userData.email}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={userData.role}
                          onChange={(e) => handleRoleChange(userData.id, e.target.value)}
                          className={`px-2 py-1 rounded text-xs border ${
                            userData.role === 'ADMIN'
                              ? 'bg-purple-100 text-purple-800 border-purple-300'
                              : 'bg-blue-100 text-blue-800 border-blue-300'
                          }`}
                        >
                          <option value="USER">USER</option>
                          <option value="ADMIN">ADMIN</option>
                        </select>
                      </td>
                      <td className="py-3 px-4">
                        {userData.emailVerified ? (
                          <span className="flex items-center text-green-600">
                            <FiUserCheck className="mr-1" />
                            Verified
                          </span>
                        ) : (
                          <span className="flex items-center text-gray-400">
                            <FiUserX className="mr-1" />
                            Not Verified
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">{userData._count.orders}</td>
                      <td className="py-3 px-4 text-sm">
                        <div className="flex items-center">
                          <FiCalendar className="mr-2 text-gray-400" />
                          {formatDate(userData.createdAt)}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => router.push(`/admin/users/${userData.id}`)}
                          className="text-indigo-600 hover:text-indigo-700 text-sm"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FiUsers className="mx-auto text-gray-400 mb-4" size={64} />
            <h2 className="text-2xl font-bold mb-2">No Users Found</h2>
            <p className="text-gray-600">No users have registered yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

