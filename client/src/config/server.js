const dev = process.env.NODE_ENV !== 'production'

// TODO: Remember to change the URL to your own website
export const server = dev ? 'http://localhost:4000' : 'https://yourwebsite.com'
