import { Facebook, Twitter, Instagram } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = ["Home", "Events", "About Us", "Contact"];
  const legalLinks = ["Privacy Policy", "Terms of Service"];

  const socialLinks = [
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Instagram, label: "Instagram", href: "#" },
  ];

  return (
    <footer className="py-10 px-6 md:px-12 mt-12 border-t border-gray-300">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg text-green-600">MyTiq</h3>
          <p className="text-sm text-gray-600 mt-2">
            Your ticket to unforgettable experiences.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            {quickLinks.map((link) => (
              <li
                key={link}
                className="hover:text-black transition cursor-pointer"
              >
                {link}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            {legalLinks.map((link) => (
              <li
                key={link}
                className="hover:text-black transition cursor-pointer"
              >
                {link}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Follow Us</h4>
          <div className="flex gap-4 text-gray-600 text-xl">
            {socialLinks.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  className="hover:text-black transition"
                >
                  <Icon size={22} />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-500">
        © {currentYear} MyTiq. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
