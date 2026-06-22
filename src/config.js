export const config = {
  whatsappLink: 'https://wa.me/213563760613',
  whatsappMessage: 'السلام عليكم، حاب نعرف أكثر على نظام EZ LeadFlow',
  instagramLink: 'https://www.instagram.com/ziad.elshawa?igsh=MXA3YzVvZzh6Mm1rdw==',
  facebookLink: 'https://www.facebook.com/profile.php?id=61576817645518&mibextid=wwXIfr',
  email: 'contact@ezleadflow.com',

  profilePhoto: '/assets/ziad.jpg',
  logo: '/assets/logo.png',

  testimonialImages: [
    '/assets/testimonial-1.png',
    '/assets/testimonial-2.png',
    '/assets/testimonial-3.png',
    '/assets/testimonial-4.png',
    '/assets/testimonial-5.jpg',
    '/assets/testimonial-6.jpg',
    '/assets/testimonial-7.png',
    '/assets/testimonial-8.jpg',
  ],

  videoUrls: ['/assets/video-1.mp4'],
}

export const getWhatsappUrl = (message = config.whatsappMessage) =>
  `${config.whatsappLink}?text=${encodeURIComponent(message)}`
