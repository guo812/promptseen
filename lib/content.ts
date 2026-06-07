export const site = {
  name: 'PromptSeen Online',
  domain: 'https://promptseen.online',
  contactEmail: 'zjjhgtw@gmail.com',
  description:
    'Find and copy trending Prompt Seen style AI photo editing prompts for Instagram, Gemini, ChatGPT, profile photos, couples, festivals, cinematic edits, and South Asian, Indian, Pakistani, Bangladeshi, Nepali, Sri Lankan, and Arabic creator styles.',
  clarityId: 'x0vmlezgsz',
  gaId: '', // 396201330 is a GA property/numeric ID, not a GA4 Measurement ID (G-XXXXXXXXXX); skip injection until corrected.
  gscVerification: '',
} as const;

export const mainRoutes = [
  { href: '/', label: 'Home' },
  { href: '/prompts', label: 'Prompts' },
  { href: '/categories', label: 'Categories' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/generate', label: 'Generate' },
  { href: '/account', label: 'Account' },
] as const;

export type Prompt = {
  title: string;
  market: string;
  tag: string;
  tool: 'Gemini' | 'ChatGPT' | 'Dreamina' | 'Any AI image tool';
  useCase: string;
  prompt: string;
  image: string;
  imageAlt: string;
};

export const prompts: Prompt[] = [
  {
    title: 'Prompt Seen Cricket Stadium DP',
    market: 'India / Pakistan',
    tag: 'Sports',
    tool: 'Gemini',
    useCase: 'Reels profile photo',
    prompt:
      'Prompt Seen style Gemini photo editing prompt: create a cinematic AI portrait of me standing under stadium floodlights, wearing a stylish cricket jersey, dramatic rim light, shallow depth of field, rain particles, confident expression, ultra-realistic 4K Instagram DP edit.',
    image: '/assets/prompt-scenes/cricket-stadium-india-pakistan.png',
    imageAlt: 'Indian and Pakistani cricket creator portrait concept under stadium floodlights for Instagram Reels',
  },
  {
    title: 'Eid Moonlight Couple Edit',
    market: 'Arabic / Bangladesh',
    tag: 'Festival',
    tool: 'ChatGPT',
    useCase: 'Couple photo',
    prompt:
      'Transform this couple photo into an elegant Eid moonlight portrait, warm lanterns, modest festive outfits, glowing crescent moon in the background, cinematic bokeh, soft gold highlights, realistic skin texture.',
    image: '/assets/prompt-scenes/eid-couple-bangladesh-arabic.png',
    imageAlt: 'Bangladesh and Arabic Eid couple moonlight portrait prompt with lanterns for Instagram posts',
  },
  {
    title: 'Bollywood Retro Rain Poster',
    market: 'India / Nepal',
    tag: 'Cinematic',
    tool: 'Gemini',
    useCase: 'Poster edit',
    prompt:
      'Prompt Seen style Gemini prompt: turn my photo into a Bollywood-style rainy retro movie poster, neon street reflections, expressive pose, dramatic teal and amber lighting, 90s film grain, poster composition, high-fashion Instagram look.',
    image: '/assets/prompt-scenes/bollywood-rain-india-nepal.png',
    imageAlt: 'India and Nepal Bollywood rain movie poster AI prompt scene for cinematic Instagram edits',
  },
  {
    title: 'Ramadan Street Portrait',
    market: 'Arabic',
    tag: 'Ramadan',
    tool: 'Any AI image tool',
    useCase: 'Night portrait',
    prompt:
      'Create a respectful Ramadan night street portrait with glowing market lights, elegant traditional styling, soft cinematic shadows, realistic face preservation, warm lantern background, premium Instagram profile photo.',
    image: '/assets/prompt-scenes/ramadan-street-arabic.png',
    imageAlt: 'Arabic Ramadan night street portrait concept with warm market lights for profile photos',
  },
  {
    title: 'South Asian Graduation DP',
    market: 'India / Sri Lanka',
    tag: 'Profile',
    tool: 'ChatGPT',
    useCase: 'Display picture',
    prompt:
      'Generate a clean premium graduation display picture from my photo, modern campus background, confident smile, soft daylight, professional cinematic color grade, crisp details, realistic identity preservation.',
    image: '/assets/prompt-scenes/graduation-south-asia.png',
    imageAlt: 'India and Sri Lanka graduation display picture AI prompt scene with campus daylight',
  },
  {
    title: 'Dark Pinterest Boys Fit Check',
    market: 'South Asia',
    tag: 'Boys',
    tool: 'Gemini',
    useCase: 'Shorts cover',
    prompt:
      'Create a dark Pinterest fit-check edit for a young South Asian creator: black streetwear, clean urban corridor, cinematic smoke, cool cyan edge lighting, sharp realistic face preservation, editorial 4:5 Instagram composition, premium magazine mood.',
    image: '/assets/prompt-scenes/viral-attitude-south-asia.png',
    imageAlt: 'South Asian viral attitude boys neon street edit concept for Instagram Reels cover',
  },
  {
    title: 'Dreamina Arabic Luxury Portrait',
    market: 'Gulf / Arabic',
    tag: 'Luxury',
    tool: 'Dreamina',
    useCase: 'Profile photo',
    prompt:
      'Create a luxury editorial profile portrait with warm desert sunset tones, premium fabric texture, soft cinematic highlights, clean background separation, realistic face details, confident creator look.',
    image: '/assets/prompt-scenes/arabic-luxury-profile.png',
    imageAlt: 'Gulf Arabic luxury editorial profile portrait prompt with desert sunset tones',
  },
  {
    title: 'Festival Family Photo Upgrade',
    market: 'South Asia',
    tag: 'Family',
    tool: 'Any AI image tool',
    useCase: 'Festival post',
    prompt:
      'Enhance this family photo into a polished festival celebration portrait, warm lights, tasteful traditional outfits, natural smiles, realistic skin, balanced composition, social media-ready color grade.',
    image: '/assets/prompt-scenes/festival-family-south-asia.png',
    imageAlt: 'South Asian festival family portrait upgrade prompt with warm lights for Instagram posts',
  },
];

export const categoryGroups: Array<{ title: string; items: Array<[string, string]> }> = [
  {
    title: 'By AI tool',
    items: [
      ['Gemini Prompts', '/gemini-prompts'],
      ['ChatGPT Photo Prompts', '/chatgpt-photo-prompts'],
      ['Dreamina Prompts', '/dreamina-prompts'],
      ['Instagram Prompts', '/instagram-prompts'],
    ],
  },
  {
    title: 'By market',
    items: [
      ['India AI Photo Prompts', '/india-ai-photo-prompts'],
      ['Nepal AI Photo Prompts', '/nepal-ai-photo-prompts'],
      ['Bangladesh AI Photo Prompts', '/bangladesh-ai-photo-prompts'],
      ['Pakistan AI Photo Prompts', '/pakistan-ai-photo-prompts'],
      ['Sri Lanka AI Photo Prompts', '/sri-lanka-ai-photo-prompts'],
      ['Arabic AI Photo Prompts', '/arabic-ai-photo-prompts'],
    ],
  },
  {
    title: 'By creator job',
    items: [
      ['Couple AI Photo Prompts', '/couple-ai-photo-prompts'],
      ['Profile Photo Prompts', '/profile-photo-prompts'],
      ['Cinematic AI Photo Prompts', '/cinematic-ai-photo-prompts'],
      ['Boys AI Photo Prompts', '/boys-ai-photo-prompts'],
      ['Girls AI Photo Prompts', '/girls-ai-photo-prompts'],
      ['Trending Prompts', '/trending-prompts'],
    ],
  },
  {
    title: 'By festival / culture',
    items: [
      ['Cricket AI Photo Prompts', '/cricket-ai-photo-prompts'],
      ['Bollywood AI Photo Prompts', '/bollywood-ai-photo-prompts'],
      ['Diwali AI Photo Prompts', '/diwali-ai-photo-prompts'],
      ['Eid AI Photo Prompts', '/eid-ai-photo-prompts'],
      ['Ramadan AI Photo Prompts', '/ramadan-ai-photo-prompts'],
    ],
  },
];

export const categoryLinks: ReadonlyArray<readonly [string, string]> = categoryGroups.reduce<ReadonlyArray<readonly [string, string]>>(
  (items, group) => [...items, ...group.items],
  [],
);

export const pricing = [
  { name: 'Free', price: '$0', desc: 'Browse and copy prompt ideas.', cta: 'Start with Free Prompts', href: '/prompts', items: ['Prompt library access', 'Copy-ready prompts', 'Category browsing'] },
  { name: 'Starter', price: '$4.99', desc: 'Create more AI photos with starter credits.', cta: 'Buy Starter Credits', href: '/generate', items: ['Monthly generation credits', 'Gemini / ChatGPT prompt styles', 'Standard downloads'] },
  { name: 'Pro', price: '$9.99', desc: 'For creators posting every week.', cta: 'Generate HD AI Photos', href: '/generate', items: ['More credits', 'HD-ready prompt workflows', 'Priority trend packs'] },
  { name: 'Creator', price: '$19.99', desc: 'For agencies and prompt pages.', cta: 'Build Creator Workflow', href: '/generate', items: ['Bulk prompt planning', 'Creator content calendar', 'Priority support'] },
] as const;

export const faqs = [
  ['What is PromptSeen Online?', 'PromptSeen Online is an independent prompt discovery and AI photo workflow site for creators who want ready-to-copy photo prompts for Instagram, Reels, Shorts, and profile pictures.'],
  ['Is PromptSeen Online free to use?', 'You can browse and copy prompt ideas for free. Personalized image generation uses login and credits.'],
  ['Can I use these prompts in Gemini or ChatGPT?', 'Yes. The prompts are written to be adapted for common AI image workflows, including Gemini and ChatGPT image tools.'],
  ['Do I need to upload a photo?', 'Only if you want a personalized AI photo result. You can still browse and copy prompts without uploading.'],
  ['Are my uploaded photos stored?', 'Uploaded photos should only be processed for the requested generation workflow according to the published privacy policy and production storage settings.'],
  ['Can I use generated images on Instagram?', 'Usually yes for personal creator content, but you are responsible for rights, likeness, platform rules, and local regulations.'],
  ['How do credits work?', 'Credits are used for generation actions, not for browsing or copying prompt ideas.'],
  ['Is PromptSeen Online the official Prompt Seen website?', 'No. PromptSeen Online is an independent prompt resource and does not claim official affiliation with any third-party brand or account.'],
] as const;

export const legalPages = {
  'privacy-policy': {
    title: 'Privacy Policy',
    updated: 'June 2026',
    body: [
      'PromptSeen Online collects information needed to operate the site, provide account features, process AI photo generation requests, improve product quality, and respond to support requests.',
      'If photo upload and AI generation features are enabled, uploaded photos are used to process the requested generation workflow. Do not upload photos you do not have permission to use, sensitive identity documents, private images, or content involving minors without appropriate rights and consent.',
      'Analytics may include privacy-conscious pageview and product event measurement such as prompt copy, filter selection, sign-in clicks, and pricing clicks. Configured analytics providers may include Microsoft Clarity and other tools listed in the site configuration.',
      'Payment processing is handled by the payment provider. PromptSeen Online should not expose payment secrets in frontend code and should only store billing references required for credits, subscriptions, support, and compliance.',
      'Contact zjjhgtw@gmail.com for privacy, deletion, or support requests.',
    ],
  },
  'terms-of-service': {
    title: 'Terms of Service',
    updated: 'June 2026',
    body: [
      'PromptSeen Online provides prompt discovery and AI photo workflow assistance for creator content. It is an independent resource and does not claim official affiliation with any third-party Prompt Seen account, AI platform, or social network.',
      'You are responsible for the content you upload, the prompts you use, and how you publish generated outputs. Do not use the service to impersonate others, violate privacy, create deceptive content, or infringe intellectual property rights.',
      'AI results may vary by model, image quality, prompt choice, and provider availability. PromptSeen Online does not guarantee viral performance, copyright-free outputs, platform approval, or unlimited generation.',
      'Paid credits and subscriptions, if enabled, are subject to the final checkout terms, refund policy, and payment provider rules shown before purchase.',
      'Contact zjjhgtw@gmail.com for support or legal questions.',
    ],
  },
} as const;

export const extraLegalPages = {
  'cookie-policy': {
    title: 'Cookie Policy',
    updated: 'June 2026',
    body: ['PromptSeen Online may use essential cookies for product functionality and optional analytics cookies to improve the service.', 'Where required, analytics and marketing cookies should be enabled only after appropriate notice or consent.', 'You can control cookies through your browser settings.'],
  },
  'refund-policy': {
    title: 'Refund Policy',
    updated: 'June 2026',
    body: ['If paid credits or subscriptions are enabled, refunds follow the published checkout terms and payment provider rules.', 'Contact support with your account email, payment reference, and issue details.'],
  },
  'ai-content-policy': {
    title: 'AI Content Policy',
    updated: 'June 2026',
    body: ['Use AI generation responsibly. Do not create sexual, hateful, violent, deceptive, or non-consensual content.', 'Do not upload or generate content involving private individuals without permission, and do not misrepresent AI-generated images as real events.'],
  },
  contact: {
    title: 'Contact',
    updated: 'June 2026',
    body: ['For product questions, partnerships, privacy requests, or support, contact zjjhgtw@gmail.com.'],
  },
} as const;
