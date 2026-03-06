'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '關於九色鹿', href: '#philosophy' },
    { name: '品牌塑造', href: '#services' },
    { name: '為什麼是短影音', href: '#market-trends' }, // 🌟 這裡對應 MarketTrends 的 ID
    { name: '專業顧問服務', href: '#process' },      // 🌟 對應顧問團服務區塊的 ID
    { name: '核心顧問團隊', href: '#team' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#F7F5F0]/95 shadow-md py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center transition-opacity hover:opacity-80">
          <img 
            src="/images/NINEDR_2023LOGO_原色.png" 
            alt="九色鹿 ninedr" 
            className="h-10 md:h-14 w-auto object-contain" 
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[#706D67] hover:text-[#D0A9A0] transition-colors font-medium tracking-widest text-sm"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="mailto:info@ninedr.com"
            className="bg-[#2C2A28] text-[#F7F5F0] px-6 py-2 rounded-full hover:bg-[#D0A9A0] transition-all duration-300 text-sm tracking-widest"
          >
            聯繫我們
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-[#2C2A28]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#F7F5F0] border-t border-[#D2CFC9] py-6 px-6 flex flex-col gap-6 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[#706D67] text-lg font-medium"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="mailto:info@ninedr.com"
            className="bg-[#2C2A28] text-[#F7F5F0] py-3 rounded-xl text-center font-bold"
          >
            聯繫我們
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;