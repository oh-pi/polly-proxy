import React, { useState, useCallback, FC, useMemo } from 'react';

// --- SVG Icons ---

const CopyIcon: FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const CheckIcon: FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const InfoIcon: FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
);

// --- Helper Components ---

const Header: FC = () => (
  <header className="text-center p-4 md:p-6">
    <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-500">
      Pollinations AI Proxy Server Generator
    </h1>
    <p className="mt-2 text-md md:text-lg text-slate-400 max-w-3xl mx-auto">
      Generate a Node.js server script to create an OpenAI-compatible API for Pollinations.ai image generation.
    </p>
  </header>
);

interface ConfigPanelProps {
  port: number;
  setPort: (value: number) => void;
  width: number;
  setWidth: (value: number) => void;
  height: number;
  setHeight: (value: number) => void;
}

const ConfigPanel: FC<ConfigPanelProps> = ({ port, setPort, width, setWidth, height, setHeight }) => {
    return (
    <div className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-slate-200 mb-4">Proxy Server Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
                <label className="font-medium text-slate-300">Server Port</label>
                <input type="number" value={port} onChange={(e) => setPort(Number(e.target.value))} className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-shadow" />
            </div>
            <div className="space-y-2">
                <label className="font-medium text-slate-300">Default Width: {width}px</label>
                <input type="range" min="256" max="2048" step="64" value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
            </div>
            <div className="space-y-2">
                <label className="font-medium text-slate-300">Default Height: {height}px</label>
                <input type="range" min="256" max="2048" step="64" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
            </div>
        </div>
    </div>
    );
};

interface CodePanelProps {
  serverCode: string;
}

const CodePanel: FC<CodePanelProps> = ({ serverCode }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(serverCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-700 rounded-lg">
      <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-t-lg">
        <h3 className="font-mono text-sm text-slate-300">proxy-server.js</h3>
        <button onClick={handleCopy} className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-slate-700 hover:bg-slate-600 rounded-md transition-colors">
          {isCopied ? <CheckIcon className="h-4 w-4 text-emerald-400" /> : <CopyIcon className="h-4 w-4" />}
          <span>{isCopied ? 'Copied!' : 'Copy Code'}</span>
        </button>
      </div>
      <pre className="p-4 text-sm overflow-x-auto">
        <code className="text-cyan-300 whitespace-pre-wrap">{serverCode}</code>
      </pre>
    </div>
  );
};

const Instructions: FC<{ port: number }> = ({ port }) => (
    <div className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 space-y-4">
        <div className="flex items-center space-x-3">
             <InfoIcon className="h-8 w-8 text-cyan-400 flex-shrink-0"/>
             <h2 className="text-2xl font-bold text-slate-200">How to Run Your Proxy Server</h2>
        </div>
        <p className="text-slate-400">This script creates a local server on your machine that translates requests from apps like SillyTavern into a format Pollinations.ai understands.</p>
        <div className="space-y-3">
            <div className="p-4 bg-slate-900/50 rounded-lg">
                <h3 className="font-semibold text-lg text-slate-300">Step 1: Save the Code</h3>
                <p className="text-slate-400">Copy the code above and save it in a new file named <code className="text-amber-300 bg-slate-700 px-1 py-0.5 rounded">proxy-server.js</code>.</p>
            </div>
            <div className="p-4 bg-slate-900/50 rounded-lg">
                <h3 className="font-semibold text-lg text-slate-300">Step 2: Install Dependencies</h3>
                <p className="text-slate-400">Open a terminal or command prompt in the same folder where you saved the file. You'll need Node.js installed. Then, run this command:</p>
                 <code className="block text-cyan-300 bg-slate-900 mt-2 p-3 rounded-md border border-slate-700 break-all text-sm">npm install express cors</code>
            </div>
             <div className="p-4 bg-slate-900/50 rounded-lg">
                <h3 className="font-semibold text-lg text-slate-300">Step 3: Run the Server</h3>
                <p className="text-slate-400">In the same terminal, run the following command:</p>
                 <code className="block text-cyan-300 bg-slate-900 mt-2 p-3 rounded-md border border-slate-700 break-all text-sm">node proxy-server.js</code>
                <p className="text-slate-400 mt-2">The server is now running and listening for requests.</p>
            </div>
             <div className="p-4 bg-slate-900/50 rounded-lg">
                <h3 className="font-semibold text-lg text-slate-300">Step 4: Configure Your App (e.g., SillyTavern)</h3>
                <p className="text-slate-400">In your application's image generation settings, set the API endpoint to:</p>
                <code className="block text-cyan-300 bg-slate-900 mt-2 p-3 rounded-md border border-slate-700 break-all text-sm">http://localhost:${port}/v1</code>
                 <p className="text-slate-400 mt-2">Ensure the API type is set to "OpenAI". The server will now handle image generation requests from your app.</p>
            </div>
        </div>
    </div>
);

// --- Server Code Generation Logic ---

const generateServerCode = (port: number, defaultWidth: number, defaultHeight: number): string => `// Generated by Pollinations AI Proxy Generator
// See instructions in the web UI for how to run this.

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = ${port};
const DEFAULT_WIDTH = ${defaultWidth};
const DEFAULT_HEIGHT = ${defaultHeight};

app.use(cors());
app.use(express.json());

// OpenAI-compatible route for image generation
// SillyTavern and other clients will POST to this endpoint.
app.post('/v1/images/generations', (req, res) => {
    console.log('Received image generation request:', req.body);

    const { prompt, size } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: { message: 'A "prompt" is required.' } });
    }

    let width = DEFAULT_WIDTH;
    let height = DEFAULT_HEIGHT;

    // Translate OpenAI 'size' format (e.g., "1024x1024") to width/height
    if (size) {
        const parts = String(size).toLowerCase().split('x');
        if (parts.length === 2) {
            const w = parseInt(parts[0], 10);
            const h = parseInt(parts[1], 10);
            if (!isNaN(w) && !isNaN(h)) {
                width = w;
                height = h;
            }
        }
    }

    const seed = Math.floor(Math.random() * 1000000); // Random seed for variety
    const encodedPrompt = encodeURIComponent(prompt.trim());
    
    // Construct the direct URL to Pollinations.ai
    const imageUrl = \`https://image.pollinations.ai/prompt/\${encodedPrompt}?width=\${width}&height=\${height}&seed=\${seed}&nologo=true\`;

    console.log(\`Proxying to: \${imageUrl}\`);

    // Create a response that mimics the OpenAI API structure
    const openAIResponse = {
        created: Math.floor(Date.now() / 1000),
        data: [
            {
                // The client will use this URL to fetch the image
                url: imageUrl, 
            },
        ],
    };
    
    res.json(openAIResponse);
});

// Health check endpoint for diagnostics
app.get('/v1', (req, res) => {
    res.status(200).send('Pollinations.ai to OpenAI Proxy Server is running.');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(\`Server started. OpenAI-compatible endpoint available at http://localhost:\${PORT}/v1\`);
    console.log(\`Your image generation endpoint is: POST http://localhost:\${PORT}/v1/images/generations\`);
    console.log('Configure your client (e.g., SillyTavern) to use this address.');
});
`;


// --- Main App Component ---

const App: FC = () => {
  const [port, setPort] = useState<number>(8111);
  const [width, setWidth] = useState<number>(1024);
  const [height, setHeight] = useState<number>(1024);

  const serverCode = useMemo(() => generateServerCode(port, width, height), [port, width, height]);
  
  return (
    <div className="min-h-screen bg-slate-900 bg-grid-slate-700/[0.2] font-sans">
        <main className="container mx-auto max-w-7xl p-4 md:p-8 space-y-8">
            <Header />
            <ConfigPanel 
                port={port}
                setPort={setPort}
                width={width}
                setWidth={setWidth}
                height={height}
                setHeight={setHeight}
            />
            <CodePanel serverCode={serverCode} />
            <Instructions port={port} />
        </main>
    </div>
  );
};

export default App;
