'use client'

import { useState } from 'react'
import { Camera, Save, Award, Bell, Shield, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useAppStore } from '@/lib/store'
import { ConfirmDialog } from '@/components/shared/ConfirmDialog'

export default function ProfileView() {
  const { currentUser } = useAppStore()
  const [saved, setSaved] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)

  const [name, setName] = useState(currentUser?.name || 'John Smith')
  const [email, setEmail] = useState(currentUser?.email || 'john@example.com')
  const [phone, setPhone] = useState('+1 (555) 123-4567')
  const [bio, setBio] = useState(currentUser?.bio || 'Aspiring full-stack developer passionate about building web applications.')

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const badges = [
    { name: 'First Course', icon: '🎓', earned: true },
    { name: 'Quick Learner', icon: '⚡', earned: true },
    { name: '7-Day Streak', icon: '🔥', earned: true },
    { name: 'Top Student', icon: '🏆', earned: false },
    { name: 'Community Hero', icon: '💬', earned: false },
    { name: 'Certified Pro', icon: '📜', earned: true },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Profile</h1>

      {/* Profile Header */}
      <Card className="border-0 shadow-md overflow-hidden">
        <div className="h-32 gradient-emerald relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(0,0,0,0.2),transparent)]" />
        </div>
        <CardContent className="p-6 -mt-12 relative">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                  {currentUser?.name?.charAt(0) || 'J'}
                </AvatarFallback>
              </Avatar>
              <button className="absolute -bottom-1 -right-1 h-8 w-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-md">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold">{name}</h2>
              <p className="text-sm text-muted-foreground">{email}</p>
              <Badge variant="secondary" className="mt-1 capitalize">{currentUser?.role || 'Student'}</Badge>
            </div>
            <div className="sm:ml-auto">
              <Button onClick={handleSave}>
                {saved ? '✓ Saved!' : <><Save className="h-4 w-4 mr-2" /> Save Changes</>}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info */}
          <Card className="border-0 shadow-sm">
            <CardHeader><CardTitle className="text-lg">Personal Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Full Name</Label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1.5" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1.5" />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1.5" />
                </div>
              </div>
              <div>
                <Label>Bio</Label>
                <Textarea value={bio} onChange={(e) => setBio(e.target.value)} className="mt-1.5" rows={3} />
              </div>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card className="border-0 shadow-sm">
            <CardHeader><CardTitle className="text-lg">Change Password</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Current Password</Label>
                <Input type="password" className="mt-1.5" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>New Password</Label>
                  <Input type="password" className="mt-1.5" />
                </div>
                <div>
                  <Label>Confirm New Password</Label>
                  <Input type="password" className="mt-1.5" />
                </div>
              </div>
              <Button variant="outline">Update Password</Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5" /> Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Course updates', desc: 'New lessons and announcements' },
                { label: 'Enrollment reminders', desc: 'Daily learning reminders' },
                { label: 'Marketing emails', desc: 'Promotions and new courses' },
                { label: 'Community activity', desc: 'Replies and mentions' },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={item.label !== 'Marketing emails'} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Badges */}
          <Card className="border-0 shadow-sm">
            <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Award className="h-5 w-5" /> Badges</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {badges.map((badge) => (
                  <div
                    key={badge.name}
                    className={`text-center p-2 rounded-lg ${badge.earned ? '' : 'opacity-40'}`}
                    title={badge.name}
                  >
                    <span className="text-2xl">{badge.icon}</span>
                    <p className="text-[10px] mt-1 truncate">{badge.name}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-0 border-destructive/20 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-destructive flex items-center gap-2">
                <Shield className="h-5 w-5" /> Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <Button variant="destructive" onClick={() => setDeleteDialog(true)}>
                <Trash2 className="h-4 w-4 mr-2" /> Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <ConfirmDialog
        open={deleteDialog}
        onOpenChange={setDeleteDialog}
        title="Delete Account"
        description="Are you sure you want to delete your account? This action is irreversible and all your data will be permanently removed."
        confirmText="Delete Account"
        variant="destructive"
        onConfirm={() => setDeleteDialog(false)}
      />
    </div>
  )
}
