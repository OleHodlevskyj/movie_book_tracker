export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      status: 'error', 
      message: 'Method not allowed' 
    });
  }

  try {
    const response = {
      status: 'ok',
      message: 'Next.js API is running',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: '1.0.0'
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      timestamp: new Date().toISOString()
    });
  }
}
