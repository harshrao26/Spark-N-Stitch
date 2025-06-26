'use client'
import Image from 'next/image'
import {
  FaLock,
  FaUserShield,
  FaListUl,
  FaShareAlt,
  FaCookie,
  FaGlobe,
  FaExclamationCircle,
  FaUserSecret,
  FaExternalLinkAlt,
  FaChild,
  FaSyncAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa'
import banner from '@/assets/privacy-banner.png' // ✅ Place banner image in /public

const Section = ({ icon: Icon, title, children }) => (
  <div className="mb-10">
    <h2 className="flex items-center gap-3 text-xl font-semibold text-gray-800 mb-2">
      <Icon className="text-pink-600" />
      {title}
    </h2>
    <div className="text-gray-700 text-sm leading-relaxed">{children}</div>
  </div>
)

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#fdf8f2] text-gray-800 min-h-screen pt-6 pb-16 px-4 md:px-16">
      {/* Banner */}
      <div className="relative w-full h-48 md:h-64 overflow-hidden rounded-xl mb-10 shadow">
        <Image
          src={banner}
          alt="Privacy Policy"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-sm md:text-base max-w-2xl">
            How Spark & Stitch collects, uses, and protects your personal data.
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="max-w-5xl mx-auto space-y-10">
        <p className="text-xs text-gray-500 text-center -mt-6 mb-4">
          Effective Date: June 15, 2025
        </p>

        <Section icon={FaUserShield} title="1. Information We Collect">
          <p className="font-semibold mb-1">a) Information You Provide:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Full name, email, phone number</li>
            <li>Shipping & billing addresses</li>
            <li>Account login, order history</li>
            <li>Customer service interactions</li>
          </ul>
          <p className="font-semibold mt-3 mb-1">b) Automatically Collected:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>IP address, device info, browser type</li>
            <li>Usage patterns and cookies</li>
          </ul>
          <p className="font-semibold mt-3 mb-1">c) From Third Parties:</p>
          <ul className="list-disc ml-6 space-y-1">
            <li>Payment processors</li>
            <li>Marketing & shipping partners</li>
          </ul>
        </Section>

        <Section icon={FaListUl} title="2. How We Use Your Information">
          <ul className="list-disc ml-6 space-y-1">
            <li>To fulfill orders and provide support</li>
            <li>Send updates & promotional offers</li>
            <li>Improve site experience & analytics</li>
            <li>Prevent fraud and meet legal duties</li>
          </ul>
        </Section>

        <Section icon={FaShareAlt} title="3. Sharing Your Information">
          <p>We do <strong>not</strong> sell your data. Limited sharing may happen with:</p>
          <ul className="list-disc ml-6 space-y-1 mt-2">
            <li>Payment processors (e.g., Razorpay, Stripe)</li>
            <li>Couriers (Delhivery, India Post, etc.)</li>
            <li>Email & analytics providers</li>
            <li>Legal entities when required</li>
          </ul>
        </Section>

        <Section icon={FaCookie} title="4. Cookies & Tracking">
          <p>
            We use cookies for personalization, performance, and traffic analysis. You can manage them via browser settings.
          </p>
        </Section>

        <Section icon={FaLock} title="5. Your Rights">
          <ul className="list-disc ml-6 space-y-1">
            <li>Request access or deletion of your data</li>
            <li>Opt-out of promotional communications</li>
            <li>Withdraw consent at any time</li>
            <li>For EU/UK: file complaints with data protection bodies</li>
          </ul>
        </Section>

        <Section icon={FaUserSecret} title="6. Data Security">
          <p>
            We use encryption and secure systems to protect your data. Still, always use strong passwords and remain cautious.
          </p>
        </Section>

        <Section icon={FaExternalLinkAlt} title="7. Third-Party Links">
          <p>
            Our website may contain links to other sites. We are not responsible for their content or privacy practices.
          </p>
        </Section>

        <Section icon={FaChild} title="8. Children’s Privacy">
          <p>
            Our services are not intended for users under 13. We do not knowingly collect their data.
          </p>
        </Section>

        <Section icon={FaGlobe} title="9. International Users">
          <p>
            Your data may be processed in India or elsewhere. By using our site, you consent to such transfers.
          </p>
        </Section>

        <Section icon={FaSyncAlt} title="10. Policy Updates">
          <p>
            This policy may be updated from time to time. Please check back for changes. Last updated: June 2025.
          </p>
        </Section>

        <Section icon={FaEnvelope} title="11. Contact Us">
          <div className="flex flex-col gap-2 mt-2 text-sm">
            <p className="flex items-center gap-2"><FaEnvelope /> business.sparknstitch@gmail.com</p>
            <p className="flex items-center gap-2"><FaMapMarkerAlt /> Jay Yogeshaver Complex, D124, Randesan, Gandhinagar, 382421, India</p>
            <p className="flex items-center gap-2"><FaGlobe /> www.sparknstitch.com</p>
          </div>
        </Section>
      </div>
    </div>
  )
}

export default PrivacyPolicy
