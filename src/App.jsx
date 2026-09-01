import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import CreateSurprise from '@/pages/CreateSurprise'
import SurprisePage from '@/pages/SurprisePage'
import MySurprises from '@/pages/MySurprises'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create/:occasionId" element={<CreateSurprise />} />
        <Route path="/s/:slug" element={<SurprisePage />} />
        <Route path="/my-surprises" element={<MySurprises />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
