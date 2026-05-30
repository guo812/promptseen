export const site = {
  name: 'PromptSeen Online',
  domain: 'https://promptseen.online',
  description:
    'PromptSeen Online helps Instagram creators find, copy, and generate viral AI photo prompts for Reels, Shorts, profile photos, festivals, couples, and cinematic edits.',
};

export type PromptItem = {
  slug: string;
  title: string;
  market: string;
  audience: string;
  gender: 'Girl' | 'Boy' | 'Couple' | 'Unisex';
  country: string;
  tag: string;
  platform: string;
  image: string;
  imageAlt: string;
  sourceNote: string;
  prompt: string;
};

export const categories = [
  ['New Instagram Trend Prompt for Girl', '/new-instagram-trend-prompt-for-girl'],
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

export const prompts: PromptItem[] = [
  {
    slug: 'instagram-flash-filter-girl',
    title: 'Instagram Flash Filter Girl Portrait',
    market: 'India / Bangladesh',
    audience: 'South Asian girl creator',
    gender: 'Girl',
    country: 'India',
    tag: 'Instagram Flash',
    platform: 'Instagram + Gemini + GPT Image',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Young woman fashion portrait used as a safe stock-style effect preview',
    sourceNote: 'Effect preview uses stock-style photography, not scraped Instagram content.',
    prompt:
      'Transform my uploaded photo into a viral Instagram flash-filter portrait of a young South Asian woman. Preserve my real face, skin tone, and hairstyle. Add direct-camera flash, glossy magazine skin, soft black background, white crop top or elegant casual outfit, confident eye contact, subtle grain, high-fashion editorial composition, 9:16 vertical crop, realistic texture, no face distortion.',
  },
  {
    slug: 'korean-baseball-girl-trend',
    title: 'Korean Baseball Girl Jersey Trend',
    market: 'India / Nepal / Sri Lanka',
    audience: 'Girl profile photo user',
    gender: 'Girl',
    country: 'Nepal',
    tag: 'Korean Baseball',
    platform: 'TikTok + Instagram Reels',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Female street-fashion portrait preview for jersey-style AI photo trend',
    sourceNote: 'Stock-style preview for the outfit/pose idea; user result depends on uploaded photo.',
    prompt:
      'Create a Korean baseball stadium fashion portrait from my photo. Keep the same face 100 percent, natural skin, and realistic hair. Dress me in an oversized baseball jersey, pleated skirt, clean sneakers, stadium lights, cheering crowd bokeh, cute confident pose, pastel cinematic color, K-drama sports poster mood, 9:16 Instagram Reel cover, ultra-realistic.',
  },
  {
    slug: 'lofi-dusk-girl-aesthetic',
    title: 'Lofi Dusk Girl Aesthetic',
    market: 'Arabic / Pakistan',
    audience: 'Modest girl creator',
    gender: 'Girl',
    country: 'Pakistan',
    tag: 'Lofi Dusk',
    platform: 'Pinterest + Instagram',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Woman in warm light used as lofi dusk mood preview',
    sourceNote: 'Safe visual reference; do not imply this is an actual user generation.',
    prompt:
      'Turn my photo into a warm lofi dusk portrait for Instagram. Preserve my exact facial identity. Create a rooftop or balcony scene during sunset, modest elegant outfit, soft orange-purple sky, small fairy lights, dreamy film grain, peaceful expression, realistic skin, gentle wind in hair or scarf, cinematic 35mm lens look, Pinterest aesthetic, vertical 9:16.',
  },
  {
    slug: 'ai-collage-girl-photo-dump',
    title: 'AI Collage Girl Photo Dump',
    market: 'Bangladesh / India',
    audience: 'Instagram carousel creator',
    gender: 'Girl',
    country: 'Bangladesh',
    tag: 'AI Collage',
    platform: 'Instagram Carousel + Pinterest',
    image: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Portrait preview for AI photo-dump collage trend',
    sourceNote: 'Stock-style image used for layout inspiration.',
    prompt:
      'Create an Instagram photo-dump collage from my uploaded portrait. Keep my face consistent in every frame. Make 6 mini scenes: mirror selfie, coffee table, street walk, flower closeup, sunset silhouette, and magazine cover crop. Soft beige and pink palette, handwritten sticker labels, realistic phone-photo feel, trendy Gen Z collage layout, 4:5 feed post.',
  },
  {
    slug: 'makeup-analysis-girl-prompt',
    title: 'AI Makeup Analysis Girl Prompt',
    market: 'Arabic / South Asia',
    audience: 'Beauty creator',
    gender: 'Girl',
    country: 'United Arab Emirates',
    tag: 'Makeup Analysis',
    platform: 'TikTok + Pinterest',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Beauty portrait preview for AI makeup analysis prompt',
    sourceNote: 'Stock-style beauty preview; not a makeup claim about the person.',
    prompt:
      'Analyze my face from the uploaded photo and create a realistic beauty-editorial portrait with makeup that suits my undertone. Keep my identity unchanged. Add clean skin texture, softly defined brows, natural glam eyes, flattering lip color, subtle contour, studio beauty lighting, before-and-after friendly look, elegant modest styling, high-resolution vertical portrait.',
  },
  {
    slug: 'hairstyle-analysis-girl-prompt',
    title: 'AI Hairstyle Analysis Girl Prompt',
    market: 'India / Sri Lanka',
    audience: 'Style-change user',
    gender: 'Girl',
    country: 'Sri Lanka',
    tag: 'Hairstyle Analysis',
    platform: 'Pinterest + Instagram',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Female portrait preview for hairstyle analysis AI prompt',
    sourceNote: 'Stock-style portrait preview for hairstyle visualization.',
    prompt:
      'Use my uploaded photo to create a realistic hairstyle try-on portrait. Preserve my face, age, and skin tone exactly. Suggest a flattering long layered hairstyle with soft volume, natural shine, salon lighting, clean background, realistic hairline, no plastic skin, subtle fashion styling, before/after comparison friendly, 4K portrait.',
  },
  {
    slug: 'color-analysis-girl-prompt',
    title: 'AI Color Analysis Girl Prompt',
    market: 'Global / South Asia',
    audience: 'Fashion creator',
    gender: 'Girl',
    country: 'India',
    tag: 'Color Analysis',
    platform: 'Pinterest + TikTok',
    image: 'https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Fashion portrait preview for AI seasonal color analysis prompt',
    sourceNote: 'Stock-style preview for color palette explanation.',
    prompt:
      'Create a seasonal color analysis board using my uploaded photo. Keep my face natural and unchanged. Show me wearing four color palettes around the portrait: warm spring, soft summer, deep autumn, clear winter. Add labels, fabric swatches, clean editorial layout, realistic lighting, helpful fashion-consultant style, Pinterest-friendly 4:5 image.',
  },
  {
    slug: 'cinematic-cricket-portrait',
    title: 'Cinematic Cricket Portrait',
    market: 'India / Pakistan',
    audience: 'Sports fan creator',
    gender: 'Boy',
    country: 'India',
    tag: 'Sports',
    platform: 'Instagram Reels',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Cricket stadium preview for AI sports portrait prompt',
    sourceNote: 'Stock-style cricket preview.',
    prompt:
      'Create a cinematic AI portrait of me standing under stadium floodlights, wearing a stylish cricket jersey, dramatic rim light, shallow depth of field, rain particles, confident expression, ultra-realistic 4K social media edit.',
  },
  {
    slug: 'eid-moonlight-couple-edit',
    title: 'Eid Moonlight Couple Edit',
    market: 'Arabic / Bangladesh',
    audience: 'Couple creator',
    gender: 'Couple',
    country: 'Bangladesh',
    tag: 'Festival',
    platform: 'Instagram',
    image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Couple portrait preview for Eid moonlight AI edit prompt',
    sourceNote: 'Stock-style couple preview.',
    prompt:
      'Transform this couple photo into an elegant Eid moonlight portrait, warm lanterns, modest festive outfits, glowing crescent moon in background, cinematic bokeh, soft gold highlights, realistic skin texture.',
  },
];

export const trendingSignals = [
  'Gemini/Nano Banana face-preserving edits remain strong on Instagram Reels and TikTok.',
  'Girl-focused prompts currently cluster around flash-filter portraits, Korean baseball jerseys, lofi dusk, collage/photo dump, makeup analysis, hairstyle analysis, and color analysis.',
  'Prompt captions often ask users to comment “prompt”, “retro”, “image”, or “send”, which signals high engagement intent but does not prove rights to reuse the original post media.',
  'Pinterest demand is strongest for reusable boards: aesthetic girl portrait, color analysis, hairstyle try-on, and photo-dump collage layouts.',
];

export const pricing = [
  { name: 'Free', price: '$0', desc: 'Browse and copy prompts. Signup credits are intentionally small to protect API cost.', cta: 'Start Free', href: '/app/signup', items: ['Unlimited prompt browsing', 'Unlimited copy prompt', 'Signup bonus: 20 credits', '1 standard generation/day when enabled'] },
  { name: 'Starter', price: '$4.99/mo', desc: 'For light creators testing AI photos.', cta: 'Choose Starter', href: '/app/subscribe/starter', items: ['300 credits/month', 'No watermark', 'Standard generations', 'Limited premium model access'] },
  { name: 'Pro', price: '$9.99/mo', desc: 'Main plan for weekly Instagram creators.', cta: 'Choose Pro', href: '/app/subscribe/pro', items: ['1,000 credits/month', 'Premium generations', 'HD downloads', 'Priority prompt packs'] },
  { name: 'Creator', price: '$19.99/mo', desc: 'For prompt pages and small content teams.', cta: 'Choose Creator', href: '/app/subscribe/creator', items: ['2,500 credits/month', 'Batch workflow', 'Commercial creator use', 'Fastest queue'] },
];

export const creditCosts = [
  ['Copy Prompt', '0 credits'],
  ['Prompt Remix / Translate', '1 credit'],
  ['Jimeng / standard generation', '10 credits'],
  ['GPT Image 2 generation', '40 credits'],
  ['Gemini image generation', '30 credits'],
  ['HD Download / remove watermark', '10 credits'],
] as const;

export const faqs = [
  ['What is PromptSeen Online?', 'PromptSeen Online is a prompt discovery and AI photo creation tool for creators who want ready-to-use photo prompts for Instagram, Reels, Shorts, and profile pictures.'],
  ['Is PromptSeen Online free to use?', 'You can browse and copy prompt ideas for free. Image generation uses credits after login once production keys and provider policies are enabled.'],
  ['Can I use these prompts in Gemini or ChatGPT?', 'Yes. The prompts are written to be adapted for Gemini, ChatGPT image tools, GPT Image 2, and other image generation models.'],
  ['Are the preview photos copied from Instagram?', 'No. PromptSeen uses safe stock-style previews or generated previews. We do not scrape or republish creators’ Instagram photos without permission.'],
  ['Do I need to upload a photo?', 'Only if you want a personalized AI photo result. You can still browse and copy prompts without uploading.'],
  ['Are my uploaded photos stored?', 'Production uploads should be processed for the requested generation workflow. Free-user images should be short-retention, and privacy policy must match the final storage implementation.'],
  ['Can I use generated images on Instagram?', 'Usually yes for personal creator content, but you are responsible for rights, likeness, platform rules, and local regulations.'],
  ['How do credits work?', 'Credits protect you from API cost swings. Low-cost standard generations use fewer credits; premium GPT/Gemini style generations use more credits.'],
  ['Is PromptSeen Online the official Prompt Seen website?', 'No. PromptSeen Online is an independent prompt and AI photo workflow site and should not claim third-party affiliation.'],
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
