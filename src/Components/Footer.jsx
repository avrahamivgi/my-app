import React from 'react'

function Footer() {
  return (
<>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style
    dangerouslySetInnerHTML={{
      __html:
        "\n        /* Footer styles */\n        footer {\n            background-color: #333;\n            color: #fff;\n            text-align: center;\n            padding: 10px;\n        }\n\n        /* Copyright text styles */\n        .copyright {\n            font-size: 14px;\n        }\n\n        /* Contact text styles */\n        .contact {\n            font-size: 16px;\n            font-weight: bold;\n        }\n    "
    }}
  />
  {/* Your website content goes here */}
  {/* Footer */}
  <footer style={{marginTop:"10px" , marginBottom:0}}>
    <div className="copyright">© Ori &amp; Avraham</div>
    <div className="contact">Contact us: 03-710-0777</div>
    <div>Jhon Bryce</div>
  </footer>
</>
  )
}

export default Footer