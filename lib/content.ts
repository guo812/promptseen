export const site = {
  name: 'PromptSeen Online',
  domain: 'https://promptseen.online',
  description:
    'PromptSeen Online helps South Asian and Arabic Instagram creators find, copy, and generate viral AI photo prompts for Reels, Shorts, profile photos, festivals, couples, and cinematic edits.',
};

export const categories = [
  ['Gemini Prompts', '/gemini-prompts'],
  ['ChatGPT Photo Prompts', '/chatgpt-photo-prompts'],
  ['Instagram Prompts', '/instagram-prompts'],
  ['Trending Prompts', '/trending-prompts'],
  ['India AI Photo Prompts', '/india-ai-photo-prompts'],
  ['Nepal AI Photo Prompts', '/nepal-ai-photo-prompts'],
  ['Bangladesh AI Photo Prompts', '/bangladesh-ai-photo-prompts'],
  ['Pakistan AI Photo Prompts', '/pakistan-ai-photo-prompts'],
  ['Sri Lanka AI Photo Prompts', '/sri-lanka-ai-photo-prompts'],
  ['Arabic AI Photo Prompts', '/arabic-ai-photo-prompts'],
  ['Boys AI Photo Prompts', '/boys-ai-photo-prompts'],
  ['Girls AI Photo Prompts', '/girls-ai-photo-prompts'],
  ['Couple AI Photo Prompts', '/couple-ai-photo-prompts'],
  ['Profile Photo Prompts', '/profile-photo-prompts'],
  ['Cinematic AI Photo Prompts', '/cinematic-ai-photo-prompts'],
  ['Cricket AI Photo Prompts', '/cricket-ai-photo-prompts'],
  ['Bollywood AI Photo Prompts', '/bollywood-ai-photo-prompts'],
  ['Diwali AI Photo Prompts', '/diwali-ai-photo-prompts'],
  ['Eid AI Photo Prompts', '/eid-ai-photo-prompts'],
  ['Ramadan AI Photo Prompts', '/ramadan-ai-photo-prompts'],
] as const;

export const prompts = [
  {
    title: 'Cinematic Cricket Portrait',
    market: 'India / Pakistan',
    tag: 'Sports',
    prompt:
      'Create a cinematic AI portrait of me standing under stadium floodlights, wearing a stylish cricket jersey, dramatic rim light, shallow depth of field, rain particles, confident expression, ultra-realistic 4K social media edit.',
  },
  {
    title: 'Eid Moonlight Couple Edit',
    market: 'Arabic / Bangladesh',
    tag: 'Festival',
    prompt:
      'Transform this couple photo into an elegant Eid moonlight portrait, warm lanterns, modest festive outfits, glowing crescent moon in background, cinematic bokeh, soft gold highlights, realistic skin texture.',
  },
  {
    title: 'Bollywood Rain Poster',
    market: 'India / Nepal',
    tag: 'Cinematic',
    prompt:
      'Turn my photo into a Bollywood-style rainy movie poster, neon street reflections, expressive pose, dramatic teal and amber lighting, film grain, poster composition, high-fashion social media look.',
  },
  {
    title: 'Ramadan Street Portrait',
    market: 'Arabic',
    tag: 'Ramadan',
    prompt:
      'Create a respectful Ramadan night street portrait with glowing market lights, elegant traditional styling, soft cinematic shadows, realistic face preservation, warm lantern background, premium Instagram profile photo.',
  },
  {
    title: 'South Asian Graduation DP',
    market: 'India / Sri Lanka',
    tag: 'Profile',
    prompt:
      'Generate a clean premium graduation display picture from my photo, modern campus background, confident smile, soft daylight, professional cinematic color grade, crisp details, realistic identity preservation.',
  },
  {
    title: 'Viral Attitude Boys Edit',
    market: 'South Asia',
    tag: 'Boys',
    prompt:
      'Make this photo a viral attitude boys edit: black streetwear, urban night backdrop, neon cyan edge lighting, cinematic smoke, sharp jawline emphasis, ultra-realistic 9:16 Reels-ready composition.',
  },
];

export const pricing = [
  { name: 'Free', price: '$0', desc: 'Browse and copy prompt ideas.', cta: 'Start with Free Prompts', href: '/app/signup', items: ['Prompt library access', 'Copy-ready prompts', 'Category browsing'] },
  { name: 'Starter', price: '$6', desc: 'Create more AI photos with credits.', cta: 'Create More AI Photos', href: '/app/subscribe/starter', items: ['Monthly generation credits', 'Gemini / ChatGPT prompt styles', 'Standard downloads'] },
  { name: 'Pro', price: '$12', desc: 'For creators posting every week.', cta: 'Generate HD AI Photos', href: '/app/subscribe/pro', items: ['More credits', 'HD-ready prompt workflows', 'Priority trend packs'] },
  { name: 'Creator', price: '$24', desc: 'For agencies and prompt pages.', cta: 'Build My Creator Workflow', href: '/app/subscribe/creator', items: ['Team workflow ideas', 'Bulk prompt planning', 'Creator content calendar'] },
];

export const faqs = [
  ['What is PromptSeen Online?', 'PromptSeen Online is a prompt discovery and AI photo creation tool for creators who want ready-to-use photo prompts for Instagram, Reels, Shorts, and profile pictures.'],
  ['Is PromptSeen Online free to use?', 'You can browse and copy prompt ideas for free. Image generation may use credits once the generator workflow is enabled.'],
  ['Can I use these prompts in Gemini or ChatGPT?', 'Yes. The prompts are written to be adapted for common AI image workflows, including Gemini and ChatGPT image tools.'],
  ['Do I need to upload a photo?', 'Only if you want a personalized AI photo result. You can still browse and copy prompts without uploading.'],
  ['Are my uploaded photos stored?', 'The production upload policy should be confirmed before launch. The legal pages describe privacy expectations and require final review before accepting real user uploads.'],
  ['Can I use generated images on Instagram?', 'Usually yes for personal creator content, but you are responsible for rights, likeness, platform rules, and local regulations.'],
  ['How do credits work?', 'Credits are planned for generation actions, not for browsing. Exact credit pricing is subject to product confirmation.'],
  ['Can I cancel my subscription anytime?', 'Subscription cancellation and refunds should follow the final payment provider and refund policy.'],
  ['Is PromptSeen Online the official Prompt Seen website?', 'No. PromptSeen Online should not claim to be an official site for any third-party brand or account.'],
  ['Who is this best for?', 'South Asian and Arabic creators, students, profile-photo users, Reels creators, and prompt page operators.'],
];

export const legalPages = {
  'privacy-policy': {
    title: 'Privacy Policy',
    body: ['We collect only the information needed to operate PromptSeen Online, improve the product, and provide support.', 'If photo upload and AI generation features are enabled, uploaded photos should be processed only for the requested generation workflow and handled according to the final production storage policy.', 'Do not upload photos you do not have permission to use. Do not upload sensitive identity documents, private images, or content involving minors without appropriate rights and consent.', 'Analytics may be used to understand page views and core product events. Production analytics IDs must be configured through environment variables or platform secrets.'],
  },
  'terms-of-service': {
    title: 'Terms of Service',
    body: ['PromptSeen Online provides prompt discovery and AI photo workflow assistance for creator content.', 'You are responsible for the content you upload, the prompts you use, and how you publish generated outputs.', 'Do not use the service to impersonate others, violate privacy, create deceptive content, or infringe intellectual property rights.', 'Prompt examples are provided for inspiration and may require review before commercial or public use.'],
  },
  'cookie-policy': {
    title: 'Cookie Policy',
    body: ['PromptSeen Online may use essential cookies for product functionality and optional analytics cookies to improve the service.', 'Where required, analytics and marketing cookies should be enabled only after appropriate notice or consent.', 'You can control cookies through your browser settings.'],
  },
  'refund-policy': {
    title: 'Refund Policy',
    body: ['If paid credits or subscriptions are enabled, refunds should follow the final billing provider rules and the published refund terms.', 'Unused credits, failed generations, duplicate payments, and subscription cancellations require final operational policy review before accepting payments.', 'Contact support with your account email, payment reference, and issue details.'],
  },
  'ai-content-policy': {
    title: 'AI Content Policy',
    body: ['Use AI generation responsibly. Do not create sexual, hateful, violent, deceptive, or non-consensual content.', 'Do not upload or generate content involving private individuals without permission, and do not misrepresent AI-generated images as real events.', 'Generated outputs may be imperfect and should be reviewed before public posting.'],
  },
  contact: {
    title: 'Contact',
    body: ['For product questions, partnerships, privacy requests, or support, contact the PromptSeen Online team through the official support channel configured for this domain.', 'Support email is pending final setup.'],
  },
} as const;
