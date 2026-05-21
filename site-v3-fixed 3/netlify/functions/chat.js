/* netlify/functions/chat.js
   Gemini API proxy — key Netlify env var'da, HTML'de görünmez
   Endpoint: POST /.netlify/functions/chat
   Body: { "message": "kullanıcının sorusu" }
*/

exports.handler = async function (event) {

  /* Sadece POST kabul et */
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  /* CORS — sitenin kendi domain'inden gelen istekler */
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  try {
    const body = JSON.parse(event.body || '{}');
    const message = (body.message || '').trim();

    if (!message) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'message boş' }) };
    }

    /* Key Netlify Environment Variables'dan gelir — HTML'de yok */
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'GEMINI_API_KEY env var tanımlı değil' })
      };
    }

    const systemPrompt = 'Sen be-rehber adlı backend developer rehber sitesinin sp1der botusun. '
      + 'Elasticsearch, Jenkins, Grafana, Argo CD, Redis, Swagger, Postman, DBeaver, Figma araçları ve '
      + 'REST API, Haberleşme Protokolleri, Monolith vs Mikroservis, Distributed Systems konularında yardım edersin. '
      + 'Kısa ve net cevap ver. Türkçe konuş. Maksimum 3 cümle.';

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: systemPrompt + '\n\nKullanıcı: ' + message }]
          }]
        })
      }
    );

    const data = await response.json();

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Yanıt alınamadı.';

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply })
    };

  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message })
    };
  }
};
