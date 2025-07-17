'use client'

import { motion } from 'framer-motion'
import HeroSection from '../components/HeroSection'
import TrustArchitecture from '../components/TrustArchitecture'
import DualPersonaFeatures from '../components/DualPersonaFeatures'
import AIEthicsFramework from '../components/AIEthicsFramework'
import AcademicIntegrity from '../components/AcademicIntegrity'
import InstitutionDashboard from '../components/InstitutionDashboard'
import StudentExperience from '../components/StudentExperience'
import SocialProof from '../components/SocialProof'
import PricingPreview from '../components/PricingPreview'
import FAQ from '../components/FAQ'
import FinalCTA from '../components/FinalCTA'

export default function HomePage() {
  return (
    <main className="bg-eggshell-white">
      {/* Hero Section - Dual Persona */}
      <HeroSection />
      
      {/* Trust Architecture */}
      <TrustArchitecture />
      
      {/* Dual Persona Features */}
      <DualPersonaFeatures />
      
      {/* AI Ethics Framework */}
      <AIEthicsFramework />
      
      {/* Academic Integrity Focus */}
      <AcademicIntegrity />
      
      {/* Institution Dashboard Preview */}
      <InstitutionDashboard />
      
      {/* Student Experience */}
      <StudentExperience />
      
      {/* Social Proof - Role-Specific */}
      <SocialProof />
      
      {/* Pricing Preview */}
      <PricingPreview />
      
      {/* FAQ */}
      <FAQ />
      
      {/* Final CTA */}
      <FinalCTA />
    </main>
  )
} 