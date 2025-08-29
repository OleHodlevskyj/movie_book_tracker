'use client'
import { useEffect, useState } from "react";

interface HealthResponse {
  status: string;
  message: string;
  timestamp?: string;
  nextJsStatus?: any;
  error?: string;
}

export default function HealthCheck() {
  const [healthStatus, setHealthStatus] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch("http://localhost:4000/health");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: HealthResponse = await response.json();
        setHealthStatus(data);
        setError(null);
      } catch (err) {
        setError("Error connecting to API: " + (err as Error).message);
        setHealthStatus(null);
      }
    };

    checkHealth();
  }, []);

  if (error) return (
    <div style={{ padding: '20px', color: 'red' }}>
      <h1>API Health Check</h1>
      <p>Error: {error}</p>
      <p><small>Make sure both servers are running:<br/>
      • Next.js: npm run dev (port 3000)<br/>
      • Node.js: node server.js (port 4000)</small></p>
    </div>
  );
  
  if (!healthStatus) return (
    <div style={{ padding: '20px' }}>
      <p>Loading...</p>
    </div>
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>API Health Check</h1>
      <div style={{ 
        padding: '15px', 
        backgroundColor: healthStatus.status === 'OK' ? '#d1fae5' : '#fee2e2',
        borderRadius: '5px',
        marginBottom: '20px'
      }}>
        <p><strong>Status:</strong> {healthStatus.status}</p>
        <p><strong>Message:</strong> {healthStatus.message}</p>
        {healthStatus.timestamp && (
          <p><strong>Timestamp:</strong> {healthStatus.timestamp}</p>
        )}
        
        {healthStatus.nextJsStatus && (
          <details style={{ marginTop: '15px' }}>
            <summary>Next.js API Details</summary>
            <pre style={{ fontSize: '12px', marginTop: '10px', backgroundColor: '#f3f4f6', padding: '10px' }}>
              {JSON.stringify(healthStatus.nextJsStatus, null, 2)}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}