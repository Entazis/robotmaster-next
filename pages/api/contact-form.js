const fetch = require('node-fetch');

async function handlePostRequest(req, res) {
  
  const searchParams = Object.keys(req.body).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(req.body[key]);
  }).join('&');
  
  try {
    const responseFromCRM = await fetch(process.env.CONTACT_FORM_CRM_URL,
        {
          method: 'POST',
          body: searchParams,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
        }
    ).then(res => res.text());
    return {success: /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/.test(responseFromCRM) && responseFromCRM.includes('Form submitted.')};
  } catch (e) {
    //TODO: handle response
    console.error('ERROR | CONTACT-FORM | handlePostRequest | ', e);
    return {success: false, message: e};
  }
  
}

export default async (req, res) => {
  if (req.method === 'POST') {
    const result = await handlePostRequest(req, res);
    (result.success) ? res.send('Ok!') : res.status(500).send(result.message);
  } else {
    res.send('Not found!');
  }
};