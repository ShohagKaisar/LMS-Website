'use client'

import { useState } from 'react'
import { Search, Download, MoreHorizontal, UserCheck, UserX, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ConfirmDialog } from '@/components/shared/ConfirmDialog'

const roles = ['All', 'Students', 'Instructors', 'Admins']

const users = [
  { id: '1', name: 'John Smith', email: 'john@example.com', role: 'student', status: 'Active', joined: '2024-06-15', avatar: 'J' },
  { id: '2', name: 'Prof. Sarah Chen', email: 'sarah@learnhub.com', role: 'instructor', status: 'Active', joined: '2024-02-01', avatar: 'S' },
  { id: '3', name: 'Maria Garcia', email: 'maria@example.com', role: 'student', status: 'Active', joined: '2024-07-20', avatar: 'M' },
  { id: '4', name: 'Prof. Emily Rodriguez', email: 'emily@learnhub.com', role: 'instructor', status: 'Active', joined: '2024-03-10', avatar: 'E' },
  { id: '5', name: 'Admin User', email: 'admin@learnhub.com', role: 'admin', status: 'Active', joined: '2024-01-15', avatar: 'A' },
  { id: '6', name: 'David Kim', email: 'david@example.com', role: 'student', status: 'Suspended', joined: '2024-08-05', avatar: 'D' },
  { id: '7', name: 'Lisa Wang', email: 'lisa@example.com', role: 'student', status: 'Active', joined: '2024-09-12', avatar: 'L' },
  { id: '8', name: 'Robert Brown', email: 'robert@example.com', role: 'student', status: 'Pending', joined: '2024-12-01', avatar: 'R' },
  { id: '9', name: 'James Wilson', email: 'james@learnhub.com', role: 'instructor', status: 'Active', joined: '2024-04-22', avatar: 'J' },
  { id: '10', name: 'Michael Park', email: 'michael@learnhub.com', role: 'instructor', status: 'Active', joined: '2024-05-18', avatar: 'M' },
]

export default function AdminUsersView() {
  const [search, setSearch] = useState('')
  const [activeRole, setActiveRole] = useState('All')
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filtered = users.filter(u => {
    const matchRole = activeRole === 'All' || u.role === activeRole.toLowerCase().slice(0, -1)
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    return matchRole && matchSearch
  })

  const statusColors: Record<string, string> = {
    Active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
    Suspended: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
    Pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">Users</h1>
          <p className="text-muted-foreground">{users.length} total users</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search users..." className="pl-9 w-64" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Button variant="outline"><Download className="h-4 w-4 mr-2" /> Export</Button>
        </div>
      </div>

      {/* Role Tabs */}
      <div className="flex gap-2">
        {roles.map((role) => (
          <Button
            key={role}
            variant={activeRole === role ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveRole(role)}
          >
            {role}
          </Button>
        ))}
      </div>

      <Card className="border-0 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead className="hidden sm:table-cell">Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Joined</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">{user.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="secondary" className="capitalize">{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColors[user.status]}>{user.status}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{user.joined}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><Shield className="h-4 w-4 mr-2" /> Edit Role</DropdownMenuItem>
                          {user.status === 'Pending' && (
                            <DropdownMenuItem><UserCheck className="h-4 w-4 mr-2" /> Approve</DropdownMenuItem>
                          )}
                          {user.status === 'Active' && (
                            <DropdownMenuItem><UserX className="h-4 w-4 mr-2" /> Suspend</DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-destructive" onClick={() => setDeleteId(user.id)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        title="Delete User"
        description="Are you sure you want to delete this user? This action is irreversible."
        confirmText="Delete"
        variant="destructive"
        onConfirm={() => setDeleteId(null)}
      />
    </div>
  )
}
