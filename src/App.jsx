import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Discover from './pages/Discover'
import OpportunityDetail from './pages/OpportunityDetail'
import Applications from './pages/Applications'
import Reminders from './pages/Reminders'
import Profile from './pages/Profile'
import CounsellorDashboard from './pages/CounsellorDashboard'
import Learners from './pages/Learners'
import Matches from './pages/Matches'
import DHETAnalytics from './pages/DHETAnalytics'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/opportunities/:id" element={<OpportunityDetail />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/profile" element={<Profile />} />
        {/* Counsellor role */}
        <Route path="/counsellor-dashboard" element={<CounsellorDashboard />} />
        <Route path="/learners" element={<Learners />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/dhet-analytics" element={<DHETAnalytics />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
