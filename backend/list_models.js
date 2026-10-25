require('dotenv').config();
const https = require('https');
const key = process.env.GROQ_API_KEY;
if (!key) { console.error('No GROQ_API_KEY'); process.exit(1); }
const req = https.request({
  hostname: 'api.groq.com', path: '/openai/v1/models', method: 'GET',
  headers: { 'Authorization': `Bearer ${key}` }
}, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    try { JSON.parse(d).data.map(m => m.id).sort().forEach(id => console.log(id)); }
    catch(e) { console.log(d); }
  });
});
req.on('error', e => console.error(e.message));
req.end();
