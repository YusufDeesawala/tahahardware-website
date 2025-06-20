"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Target, Eye, Users, TrendingUp, Star, Sparkles, Zap } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-slate-700 to-slate-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-slate-400/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm px-6 py-2 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <Star className="w-4 h-4 mr-2" />
              About Taha Hardware
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
              <span className="bg-gradient-to-r from-blue-100 via-white to-blue-200 bg-clip-text text-transparent">
                Building Trust Through
              </span>
              <span className="bg-gradient-to-r from-blue-200 via-white to-slate-200 bg-clip-text text-transparent block">
                Excellence
              </span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
              For over two decades, Taha Hardware has been the cornerstone of industrial solutions, delivering unmatched
              quality and service to businesses across the region.
            </p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge className="mb-6 bg-blue-100 text-blue-800 border-blue-200 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Our Journey
              </Badge>
              <h2 className="text-4xl font-bold text-slate-800 mb-8">Our Story</h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p className="transform hover:scale-105 transition-transform duration-300 p-4 rounded-lg hover:bg-blue-50">
                  Founded in 2004, Taha Hardware began as a small family business with a simple mission: to provide the
                  highest quality industrial hardware solutions to businesses in our community.
                </p>
                <p className="transform hover:scale-105 transition-transform duration-300 p-4 rounded-lg hover:bg-blue-50">
                  Today, we've grown into a comprehensive supplier serving diverse industries with our extensive range
                  of brushes, hoses, and pneumatic products. Our commitment to excellence has remained unchanged.
                </p>
                <p className="transform hover:scale-105 transition-transform duration-300 p-4 rounded-lg hover:bg-blue-50">
                  We pride ourselves on being more than just suppliers – we're partners in your success, offering expert
                  guidance, reliable products, and exceptional service that keeps your operations running smoothly.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-100 via-slate-100 to-blue-50 p-8 flex items-center justify-center transform hover:scale-105 transition-transform duration-500">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Taha Hardware Facility"
                  width={400}
                  height={400}
                  className="rounded-xl shadow-lg"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-r from-blue-600 to-slate-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-white font-bold text-lg">20+</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-slate-100 text-slate-800 border-0 px-4 py-2">
              <Target className="w-4 h-4 mr-2" />
              Our Foundation
            </Badge>
            <h2 className="text-4xl font-bold text-slate-800 mb-6">Vision & Mission</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-white/90 backdrop-blur-sm group">
              <CardContent className="p-8">
                <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Eye className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-800 group-hover:text-blue-600 transition-colors">
                  Our Vision
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  To be the leading provider of industrial hardware solutions in the region, recognized for our
                  unwavering commitment to quality, innovation, and customer satisfaction. We envision a future where
                  every business can rely on Taha Hardware for their critical needs.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-white/90 backdrop-blur-sm group">
              <CardContent className="p-8">
                <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-r from-green-100 to-green-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-800 group-hover:text-green-600 transition-colors">
                  Our Mission
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  To deliver exceptional industrial hardware solutions through premium products, expert knowledge, and
                  personalized service. We are committed to building lasting partnerships with our clients while
                  maintaining the highest standards of integrity and excellence.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-slate-100 text-slate-800 border-0 px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Our Advantages
            </Badge>
            <h2 className="text-4xl font-bold text-slate-800 mb-6">What Sets Us Apart</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our unique combination of experience, quality, and service makes us the preferred choice
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: "Quality Assurance",
                description:
                  "Every product undergoes rigorous quality checks to ensure it meets our exacting standards.",
                stats: "99.8% Quality Rate",
                color: "from-yellow-500 to-yellow-600",
                bgColor: "from-yellow-50 to-yellow-100",
              },
              {
                icon: Users,
                title: "Expert Team",
                description:
                  "Our experienced professionals provide technical expertise and personalized recommendations.",
                stats: "50+ Years Combined Experience",
                color: "from-blue-500 to-blue-600",
                bgColor: "from-blue-50 to-blue-100",
              },
              {
                icon: TrendingUp,
                title: "Continuous Growth",
                description: "We constantly expand our product range and improve our services to meet evolving needs.",
                stats: "500+ Products Available",
                color: "from-purple-500 to-purple-600",
                bgColor: "from-purple-50 to-purple-100",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-white/90 backdrop-blur-sm group"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center`}
                    >
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-slate-800 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 mb-4 leading-relaxed">{feature.description}</p>
                  <Badge className="bg-blue-100 text-blue-800 border-0">{feature.stats}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Profile */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-slate-100 text-slate-800 border-0 px-4 py-2">
                <Users className="w-4 h-4 mr-2" />
                Leadership
              </Badge>
              <h2 className="text-4xl font-bold text-slate-800 mb-6">Meet Our Founder</h2>
              <p className="text-xl text-slate-600">The visionary behind Taha Hardware's success story</p>
            </div>

            <Card className="overflow-hidden shadow-2xl border-0 bg-white/90 backdrop-blur-sm hover:shadow-3xl transition-all duration-500">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=500&width=400"
                      alt="Founder"
                      width={400}
                      height={500}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
                  </div>
                  <div className="p-12 flex flex-col justify-center bg-gradient-to-br from-blue-50 via-white to-slate-50">
                    <div className="mb-6">
                      <h3 className="text-3xl font-bold mb-2 text-slate-800">Mohammed Taha</h3>
                      <p className="text-lg text-slate-600 mb-4">Founder & CEO</p>
                      <Badge className="bg-gradient-to-r from-blue-600 to-slate-600 text-white">
                        20+ Years Experience
                      </Badge>
                    </div>

                    <div className="space-y-4 text-slate-600 leading-relaxed">
                      <p className="p-4 rounded-lg bg-blue-50/50 hover:bg-blue-100/50 transition-colors duration-300">
                        "When I started Taha Hardware in 2004, my vision was simple: to create a company that businesses
                        could truly rely on. Two decades later, that vision continues to drive everything we do."
                      </p>
                      <p>
                        With over 20 years in the industrial hardware industry, Mohammed has built Taha Hardware from
                        the ground up, establishing it as a trusted name in quality and reliability. His commitment to
                        excellence and customer satisfaction remains the cornerstone of our company culture.
                      </p>
                      <p>
                        Under his leadership, Taha Hardware has expanded from a small local supplier to a comprehensive
                        industrial solutions provider, serving hundreds of satisfied customers across multiple
                        industries.
                      </p>
                    </div>

                    <div className="mt-8 flex items-center space-x-6">
                      <div className="text-center transform hover:scale-110 transition-transform duration-300">
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-slate-600 bg-clip-text text-transparent">
                          2004
                        </div>
                        <div className="text-sm text-slate-600">Founded</div>
                      </div>
                      <div className="text-center transform hover:scale-110 transition-transform duration-300">
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-slate-600 bg-clip-text text-transparent">
                          500+
                        </div>
                        <div className="text-sm text-slate-600">Happy Clients</div>
                      </div>
                      <div className="text-center transform hover:scale-110 transition-transform duration-300">
                        <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-slate-600 bg-clip-text text-transparent">
                          20+
                        </div>
                        <div className="text-sm text-slate-600">Years Experience</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
