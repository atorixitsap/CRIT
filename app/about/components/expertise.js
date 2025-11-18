import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "./card"


export default function AiInsightsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 flex flex-col items-center">
      <div className="container px-4 md:px-6 flex flex-col items-center">
        {/* Hide heading on mobile */}
        <h2 className="hidden md:block text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center text-gray-900 mb-12">
          Our Expertise
        </h2>
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start justify-items-center">
          {/* Left Column */}
          <div className="flex flex-col gap-8">
            <Card className="rounded-full shadow-3xl border border-gray-200 bg-white">
              <CardHeader className="p-6 pb-4">
                <CardTitle className="text-xl font-semibold text-gray-800">
                  Domain Knowledge
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 text-gray-700 text-base">
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Expertise That Delivers:</strong> Our team's in-depth knowledge of SAP enables us to provide insightful guidance and effective solutions for your business.</li>
                  <li><strong>Domain-Focused Approach:</strong>  We apply our extensive SAP knowledge to optimize your business processes and drive tangible results.</li>
                  <li><strong>Comprehensive QA Solutions:</strong> Our domain knowledge equips us to tackle your most intricate SAP issues with confidence and precision.</li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Hide image and gradient on mobile */}
            <div className="hidden xl:block pl-10">
              <img
                src="https://res.cloudinary.com/duz9xipfm/image/upload/v1751344095/image_w8niqw.jpg"
                alt="Domain Knowledge Illustration"
                className="w-full max-w-sm h-64 object-cover rounded-lg shadow-3xl border border-gray-200"
              />
              <div className="w-full mt-10 max-w-sm h-42 bg-gradient-to-t from-[#fff5f5] to-red-200 rounded-t-3xl"></div>
            </div>
          </div>

          {/* Middle Column */}
          <div className="flex flex-col gap-8 items-center justify-center xl:mt-04 p-2 w-full">
            {/* Hide gradient on mobile */}
            <div className="hidden xl:block w-full max-w-sm h-32 bg-gradient-to-b from-[#fff5f5] to-red-200 rounded-b-3xl"></div>
            
            <Card className="rounded-2xl shadow-3xl border-0 bg-gradient-to-br from-red-500 to-red-600 p-6 text-white w-full max-w-sm h-64 flex items-center justify-center hidden lg:block">
              <CardContent className="p-5 pt-15 text-center">
                <div className="text-5xl font-bold mb-3">75%</div>
                <div className="text-sm font-semibold leading-relaxed">
                  of the services are available with us.
                </div>
              </CardContent>
            </Card>
            
            <Card className="rounded-full shadow-3xl border border-gray-200 bg-white p-2">
              <CardHeader className="p-6 pb-4">
                <CardTitle className="text-xl font-semibold text-gray-800">
                  Customer-Centric Approach
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 text-gray-700 text-base">
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Collaborative SAP Solutions:</strong> We work closely with you to understand your unique needs and deliver solutions that align with your business goals.</li>
                  <li><strong>Dedicated to Your Success:</strong> We go the extra mile to ensure your satisfaction, providing timely support and proactive communication.</li>
                  <li><strong>Robust Skillset:</strong> With a strong foundation in technology and QA practices, we ensure reliable and scalable solutions.</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-8">
            <Card className="rounded-full shadow-3xl border border-gray-200 bg-white">
              <CardHeader className="p-6 pb-4">
                <CardTitle className="text-xl font-bold text-gray-800">
                  A Focus on Results
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 text-gray-700 text-base">
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Error-Free SAP Deployments:</strong> Reduce errors and improve user satisfaction with our rigorous testing, validation, and quality assurance processes.</li>
                  <li><strong>Optimized SAP Performance:</strong> Achieve peak performance and efficiency with our expert tuning, monitoring, and optimization services.</li>
                  <li><strong>Performance Engineering:</strong> Optimize application speed, scalability, and reliability through proactive performance testing.</li>
                </ul>
              </CardContent>
            </Card>
            
            {/* Hide image and gradient on mobile */}
            <div className="hidden xl:block pl-10">
              <img
                src="https://res.cloudinary.com/duz9xipfm/image/upload/v1751344095/image_1_fgf2ck.jpg"
                alt="Team Collaboration"
                className="w-full max-w-sm h-64 object-cover rounded-lg shadow-3xl border border-gray-200"
              />
              <div className="w-full mt-10 max-w-sm h-42 bg-gradient-to-t from-[#fff5f5] to-red-200 rounded-t-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
