import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Camera, Calculator, GraduationCap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-gray-800 to-gray-900">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-down">
              Borrow What You Need, Lend What You Don't
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in-up">
              UniLend connects university students to share resources, save
              money, and make campus life easier.
            </p>
            <div className="flex justify-center space-x-4 animate-fade-in">
              <Link href={"/home"}>
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 transform hover:scale-105"
                >
                  Start Borrowing
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-12 animate-fade-in">
              How UniLend Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: BookOpen,
                  title: "List Your Items",
                  description:
                    "Share your rarely used items with fellow students who need them.",
                },
                {
                  icon: Camera,
                  title: "Browse & Borrow",
                  description:
                    "Find and request the items you need for your courses or projects.",
                },
                {
                  icon: Calculator,
                  title: "Save Money",
                  description:
                    "Access resources without the hefty price tag of buying new.",
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="bg-gray-700 border-gray-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center text-white">
                      <item.icon className="mr-2 h-6 w-6 text-blue-400" />
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Items Section */}
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-12 animate-fade-in">
              Popular Items on UniLend
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Graphing Calculator",
                  image: "/graphingcalc.webp?height=10&width=10",
                },
                {
                  name: "DSLR Camera",
                  image: "/dslr.jpg?height=200&width=200",
                },
                {
                  name: "Textbooks",
                  image: "/textbooks.gif?height=200&width=200",
                },
                { name: "Laptops", image: "/laptops.jpg?height=200&width=200" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg h-96 shadow-md overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={200}
                    height={200}
                    className="w-full h-72 bg-white object-fill transition-transform duration-300 transform hover:scale-110"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 text-white">
                      {item.name}
                    </h3>
                    <Button
                      variant="outline"
                      className="w-full text-gray-800 border-gray-300 hover:bg-gray-700 transition-colors duration-300"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-12 animate-fade-in">
              What Students Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  quote:
                    "UniLend saved me hundreds on textbooks this semester!",
                  author: "Alex, Computer Science",
                },
                {
                  quote:
                    "I borrowed a suit for my internship interview. Couldn't have done it without UniLend!",
                  author: "Jamie, Business Administration",
                },
              ].map((testimonial, index) => (
                <Card
                  key={index}
                  className="bg-gray-700 border-gray-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <CardContent className="pt-6">
                    <p className="text-lg text-gray-300 mb-4">
                      "{testimonial.quote}"
                    </p>
                    <p className="font-semibold text-white">
                      - {testimonial.author}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in-down">
              Ready to start sharing and saving?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto animate-fade-in-up">
              Join the UniLend community today and experience the power of
              collaborative consumption on campus.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100 transition-all transform hover:scale-105"
              asChild
            >
              <Link href="/signup">Sign Up Now</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <GraduationCap className="h-8 w-8 mr-2 text-blue-400" />
              <span className="text-2xl font-bold text-white">UniLend</span>
            </div>
            <nav className="flex flex-wrap justify-center md:justify-end space-x-4">
              <Link
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                About
              </Link>
              <Link
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                FAQ
              </Link>
              <Link
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Terms
              </Link>
            </nav>
          </div>
          <div className="mt-8 text-center text-gray-500">
            © {new Date().getFullYear()} UniLend. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
