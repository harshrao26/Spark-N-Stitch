'use client'

import { useEffect, useState } from 'react'

export default function AdminUserList() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('/api/admin/users').then(res => res.json()).then(setUsers)
  }, [])

  const updateRole = async (email, role) => {
    await fetch('/api/admin/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, role }),
    })
    setUsers(users.map(u => u.email === email ? { ...u, role } : u))
  }

  return (
    <div>
      <h2 className="text-xl mb-2">Users</h2>
      <table className="w-full border">
        <thead>
          <tr><th>Email</th><th>Role</th><th>Action</th></tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.email}>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <select
                  value={user.role}
                  onChange={e => updateRole(user.email, e.target.value)}
                  className="border px-2 py-1"
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
