import React, { useState } from 'react';
import axios from 'axios';

const UrlShortenerForm = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [qrCode, setQrCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://url-shortner-backend-ugvt.onrender.com/api/url/shorten', { originalUrl });
      setShortUrl(res.data.shortUrl);
      setQrCode(res.data.qrCode);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">URL Shortener</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter URL"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Shorten URL
          </button>
        </form>

        {shortUrl && (
          <div className="mt-6 text-center">
            <p className="text-gray-700">Shortened URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {shortUrl}
            </a>

            {qrCode && (
              <div className="mt-4">
                <img src={qrCode} alt="QR Code" className="w-32 h-32 mx-auto" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlShortenerForm;
