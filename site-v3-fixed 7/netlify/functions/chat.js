exports.handler = async function (event) {

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

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

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'GROQ_API_KEY tanimli degil' }) };
    }

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: 'Sen be-rehber adli backend developer rehber sitesinin sp1der botusun. '
              + 'Elasticsearch, Jenkins, Grafana, Argo CD, Redis, Swagger, Postman, DBeaver, Figma araclari ve '
              + 'REST API, Protokoller, Monolith vs Mikroservis, Distributed Systems konularinda yardim edersin. '
              + 'Kisa ve net cevap ver. Turkce konuss. Maksimum 3 cumle.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 200,
        temperature: 0.7
      })
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Groq error:', JSON.stringify(data));
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'Groq API hatasi: ' + (data?.error?.message || 'bilinmiyor') }) };
    }

    const reply = data?.choices?.[0]?.message?.content || 'Yanit alinamadi.';

    return { statusCode: 200, headers, body: JSON.stringify({ reply }) };

  } catch (err) {
    console.error('Function error:', err.message);
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
