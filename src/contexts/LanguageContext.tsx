import React, { createContext, useContext, useState, useEffect } from 'react';

interface Translation {
  [key: string]: string | Translation;
}

interface LanguageContextType {
  language: 'en' | 'de';
  setLanguage: (lang: 'en' | 'de') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<'en' | 'de', Translation> = {
  en: {
    // Common
    home: "Home",
    track: "Track",
    contact: "Contact",
    trackPackage: "Track Package",
    enterTrackingNumber: "Enter tracking number",
    tip: "💡 Tip: You can also scan QR codes from your delivery receipts",
    
    // Header/Navigation
    businessSolutions: "Business Solutions",
    personalShipping: "Personal Shipping",
    
    // Hero Section
    trustedDelivery: "✨ Most Trusted Delivery Service",
    heroTitle: "Track Your Package",
    heroSubtitle: "with Confidence",
    heroDescription: "Experience real-time tracking with our advanced logistics system. Get instant updates, precise delivery estimates, and complete transparency throughout your package journey.",
    
    // Stats
    happyCustomers: "Happy Customers",
    packagesDelivered: "Packages Delivered",
    countriesServed: "Countries Served",
    averageDelivery: "Average Delivery",
    
    // Features
    premiumFeatures: "🚀 Premium Features",
    whyChooseUs: "Why Choose GL Express?",
    featuresDescription: "Experience the difference with our advanced logistics platform designed for modern shipping needs",
    securePackaging: "Secure Packaging",
    securePackagingDesc: "Your packages are handled with the utmost care and security",
    fastDelivery: "Fast Delivery",
    fastDeliveryDesc: "Quick and reliable delivery to your doorstep",
    realTimeTracking: "Real-time Tracking",
    realTimeTrackingDesc: "Track your package every step of the way",
    insuranceCoverage: "Insurance Coverage",
    insuranceCoverageDesc: "All packages are insured for your peace of mind",
    
    // Testimonials
    customerLove: "💬 Customer Love",
    customerTestimonials: "What Our Customers Say",
    testimonialsDescription: "Don't just take our word for it - hear from thousands of satisfied customers",
    
    // CTA Section
    readyToShip: "Ready to Experience Better Shipping?",
    ctaDescription: "Join thousands of businesses and individuals who trust GL Express for their shipping needs",
    
    // Footer
    newsletterTitle: "Subscribe to Newsletter",
    newsletterDescription: "Get the latest updates on shipping, tracking features, and exclusive offers delivered to your inbox.",
    enterEmail: "Enter your email address",
    subscribe: "Subscribe",
    privacyNotice: "We respect your privacy. Unsubscribe at any time.",
    footerDescription: "Leading the way in modern package delivery and tracking solutions worldwide.",
    copyright: "© 2024 GL Express. All rights reserved. Built with ❤️ for better shipping.",
    
    // Tracking Page
    trackingTitle: "Package Tracking",
    trackingDescription: "Enter your tracking number to get real-time updates on your package delivery status.",
    trackingNumberLabel: "Tracking Number",
    exampleNumber: "Example: GL123456789",
    trackMyPackage: "Track My Package",
    noResults: "No tracking information found",
    noResultsDesc: "Please check your tracking number and try again. If you continue to have issues, please contact our support team.",
    
    // Package Status
    registered: "Registered",
    readyForPickup: "Ready for Pickup",
    inTransit: "In Transit",
    outForDelivery: "Out for Delivery",
    delivered: "Delivered",
    failedDelivery: "Failed Delivery",
    returned: "Returned",
    
    // Contact Page
    contactUs: "Contact Us",
    getInTouch: "Get in Touch",
    contactDescription: "Have questions about your package or need assistance? We're here to help you with all your shipping needs.",
    officeLocation: "Office Location",
    emailSupport: "Email Support",
    businessHours: "Business Hours",
    mondayFriday: "Monday - Friday: 9:00 AM - 6:00 PM",
    saturday: "Saturday: 10:00 AM - 2:00 PM",
    sunday: "Sunday: Closed",
    name: "Name",
    email: "Email",
    subject: "Subject",
    message: "Message",
    sendMessage: "Send Message",
    
    // Admin Panel
    adminPanel: "Admin Panel",
    packageManagement: "Package Management",
    addNewPackage: "Add New Package",
    trackingNumber: "Tracking Number",
    recipientName: "Recipient Name",
    recipientAddress: "Recipient Address",
    status: "Status",
    actions: "Actions",
    edit: "Edit",
    delete: "Delete",
    selectAll: "Select All",
    deleteSelected: "Delete Selected",
    confirmDelete: "Are you sure you want to delete the selected packages?",
    packagesDeleted: "Selected packages have been deleted successfully",
    
    // Services
    expressDelivery: "Express Delivery",
    internationalShipping: "International Shipping",
    helpCenter: "Help Center",
    shippingCalculator: "Shipping Calculator",
    careers: "Careers",
    press: "Press",
    partnerships: "Partnerships",
    about: "About"
  },
  de: {
    // Common
    home: "Startseite",
    track: "Verfolgen",
    contact: "Kontakt",
    trackPackage: "Paket verfolgen",
    enterTrackingNumber: "Sendungsnummer eingeben",
    tip: "💡 Tipp: Sie können auch QR-Codes von Ihren Lieferquittungen scannen",
    
    // Header/Navigation
    businessSolutions: "Geschäftslösungen",
    personalShipping: "Privater Versand",
    
    // Hero Section
    trustedDelivery: "✨ Vertrauenswürdigster Lieferservice",
    heroTitle: "Verfolgen Sie Ihr Paket",
    heroSubtitle: "mit Vertrauen",
    heroDescription: "Erleben Sie Echtzeit-Tracking mit unserem fortschrittlichen Logistiksystem. Erhalten Sie sofortige Updates, präzise Lieferschätzungen und vollständige Transparenz während der gesamten Paketreise.",
    
    // Stats
    happyCustomers: "Zufriedene Kunden",
    packagesDelivered: "Pakete zugestellt",
    countriesServed: "Länder bedient",
    averageDelivery: "Durchschnittliche Lieferung",
    
    // Features
    premiumFeatures: "🚀 Premium-Funktionen",
    whyChooseUs: "Warum GL Express wählen?",
    featuresDescription: "Erleben Sie den Unterschied mit unserer fortschrittlichen Logistikplattform für moderne Versandanforderungen",
    securePackaging: "Sichere Verpackung",
    securePackagingDesc: "Ihre Pakete werden mit größter Sorgfalt und Sicherheit behandelt",
    fastDelivery: "Schnelle Lieferung",
    fastDeliveryDesc: "Schnelle und zuverlässige Lieferung vor Ihre Haustür",
    realTimeTracking: "Echtzeit-Verfolgung",
    realTimeTrackingDesc: "Verfolgen Sie Ihr Paket bei jedem Schritt",
    insuranceCoverage: "Versicherungsschutz",
    insuranceCoverageDesc: "Alle Pakete sind für Ihre Ruhe versichert",
    
    // Testimonials
    customerLove: "💬 Kundenstimmen",
    customerTestimonials: "Was unsere Kunden sagen",
    testimonialsDescription: "Glauben Sie nicht nur uns - hören Sie von Tausenden zufriedener Kunden",
    
    // CTA Section
    readyToShip: "Bereit für besseren Versand?",
    ctaDescription: "Schließen Sie sich Tausenden von Unternehmen und Privatpersonen an, die GL Express für ihren Versand vertrauen",
    
    // Footer
    newsletterTitle: "Newsletter abonnieren",
    newsletterDescription: "Erhalten Sie die neuesten Updates zu Versand, Tracking-Funktionen und exklusive Angebote in Ihren Posteingang.",
    enterEmail: "E-Mail-Adresse eingeben",
    subscribe: "Abonnieren",
    privacyNotice: "Wir respektieren Ihre Privatsphäre. Jederzeit abbestellbar.",
    footerDescription: "Führend bei modernen Paketlieferungs- und Tracking-Lösungen weltweit.",
    copyright: "© 2024 GL Express. Alle Rechte vorbehalten. Mit ❤️ für besseren Versand erstellt.",
    
    // Tracking Page
    trackingTitle: "Paketverfolgung",
    trackingDescription: "Geben Sie Ihre Sendungsnummer ein, um Echtzeit-Updates zum Lieferstatus Ihres Pakets zu erhalten.",
    trackingNumberLabel: "Sendungsnummer",
    exampleNumber: "Beispiel: GL123456789",
    trackMyPackage: "Mein Paket verfolgen",
    noResults: "Keine Tracking-Informationen gefunden",
    noResultsDesc: "Bitte überprüfen Sie Ihre Sendungsnummer und versuchen Sie es erneut. Bei anhaltenden Problemen wenden Sie sich an unser Support-Team.",
    
    // Package Status
    registered: "Registriert",
    readyForPickup: "Abholbereit",
    inTransit: "Unterwegs",
    outForDelivery: "Zur Zustellung",
    delivered: "Zugestellt",
    failedDelivery: "Zustellung fehlgeschlagen",
    returned: "Zurückgesendet",
    
    // Contact Page
    contactUs: "Kontaktieren Sie uns",
    getInTouch: "Kontakt aufnehmen",
    contactDescription: "Haben Sie Fragen zu Ihrem Paket oder benötigen Hilfe? Wir sind da, um Ihnen bei allen Ihren Versandanforderungen zu helfen.",
    officeLocation: "Bürostandort",
    emailSupport: "E-Mail-Support",
    businessHours: "Geschäftszeiten",
    mondayFriday: "Montag - Freitag: 9:00 - 18:00 Uhr",
    saturday: "Samstag: 10:00 - 14:00 Uhr",
    sunday: "Sonntag: Geschlossen",
    name: "Name",
    email: "E-Mail",
    subject: "Betreff",
    message: "Nachricht",
    sendMessage: "Nachricht senden",
    
    // Admin Panel
    adminPanel: "Admin-Panel",
    packageManagement: "Paketverwaltung",
    addNewPackage: "Neues Paket hinzufügen",
    trackingNumber: "Sendungsnummer",
    recipientName: "Empfängername",
    recipientAddress: "Empfängeradresse",
    status: "Status",
    actions: "Aktionen",
    edit: "Bearbeiten",
    delete: "Löschen",
    selectAll: "Alle auswählen",
    deleteSelected: "Ausgewählte löschen",
    confirmDelete: "Sind Sie sicher, dass Sie die ausgewählten Pakete löschen möchten?",
    packagesDeleted: "Ausgewählte Pakete wurden erfolgreich gelöscht",
    
    // Services
    expressDelivery: "Express-Lieferung",
    internationalShipping: "Internationaler Versand",
    helpCenter: "Hilfezentrum",
    shippingCalculator: "Versandkostenrechner",
    careers: "Karriere",
    press: "Presse",
    partnerships: "Partnerschaften",
    about: "Über uns"
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'de'>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('gl-express-language') as 'en' | 'de' | null;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: 'en' | 'de') => {
    setLanguage(lang);
    localStorage.setItem('gl-express-language', lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};