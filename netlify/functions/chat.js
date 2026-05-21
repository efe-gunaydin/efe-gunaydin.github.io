exports.handler = async function (event) {

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  /* Preflight */
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const message = (body.message || '').trim();

    if (!message) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'message bos' }) };
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'GEMINI_API_KEY tanimli degil' }) };
    }

    const prompt = 'Sen be-rehber backend dev rehber sitesinin sp1der botusun. '
      + 'Elasticsearch, Jenkins, Grafana, Argo CD, Redis, Swagger, Postman, DBeaver, Figma araclari ve '
      + 'REST API, Protokoller, Monolith vs Mikroservis, Distributed Systems konularinda yardim edersin. '
      + 'Kisa ve net cevap ver. Turkce konuss. Max 3 cumle. '
      + 'Kullanici: ' + message;

    // MODEL BURADA GEMINI-1.5-FLASH OLARAK GÜNCELLENDİ
    const geminiRes = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await geminiRes.json();

    /* Hata durumunu logla */
    if (!geminiRes.ok) {
      console.error('Gemini error:', JSON.stringify(data));
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'Gemini API hatasi: ' + (data?.error?.message || 'bilinmiyor') }) };
    }

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Yanit bos dondu.';

    return { statusCode: 200, headers, body: JSON.stringify({ reply }) };

  } catch (err) {
    console.error('Function error:', err.message);
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};