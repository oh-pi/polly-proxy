
import React, { useState, useCallback, FC, useMemo } from 'react';

// --- SVG Icons ---
const CopyIcon: FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>);
const CheckIcon: FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12" /></svg>);
const InfoIcon: FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>);
const ImageIcon: FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect><circle cx="9" cy="9" r="2"></circle><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path></svg>);
const ChatIcon: FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>);
const SpeakerIcon: FC<{ className?: string }> = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>);

// --- Helper Components ---

const Header: FC = () => (
  <header className="text-center p-4 md:p-6">
    <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-500">
      Pollinations AI Proxy Server Generator
    </h1>
    <p className="mt-2 text-md md:text-lg text-slate-400 max-w-3xl mx-auto">
      Generate a Node.js server to create an OpenAI-compatible API for various AI services, with image generation powered by Pollinations.ai.
    </p>
  </header>
);

const EndpointsConfig: FC<any> = ({ port, setPort, width, setWidth, height, setHeight }) => {
    return (
    <div className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 space-y-6">
        <div>
            <h2 className="text-xl font-semibold text-slate-200 mb-1">Proxy Server Configuration</h2>
            <p className="text-sm text-slate-400">Configure the main server port and the endpoints you want to activate.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="space-y-2 md:col-span-3">
                <label className="font-medium text-slate-300">Server Port</label>
                <input type="number" value={port} onChange={(e) => setPort(Number(e.target.value))} className="w-full md:w-1/3 p-2 bg-slate-900 border border-slate-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-shadow" />
            </div>
        </div>

        <div className="border-t border-slate-700 pt-6 space-y-4">
            {/* Image Generation Endpoint */}
            <div className="p-4 bg-slate-900/50 rounded-lg border border-cyan-500/30">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <ImageIcon className="h-6 w-6 text-cyan-400"/>
                        <div>
                            <h3 className="font-semibold text-slate-200">Image Generation</h3>
                            <p className="text-xs font-mono text-slate-400">/v1/images/generations</p>
                        </div>
                    </div>
                    <div className="text-sm font-medium text-cyan-400 px-2 py-1 rounded-full bg-cyan-900/50">Active</div>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 pt-4 border-t border-slate-700">
                    <div className="space-y-2">
                        <label className="font-medium text-slate-300 text-sm">Default Width: {width}px</label>
                        <input type="range" min="256" max="2048" step="64" value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                    </div>
                    <div className="space-y-2">
                        <label className="font-medium text-slate-300 text-sm">Default Height: {height}px</label>
                        <input type="range" min="256" max="2048" step="64" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
                    </div>
                </div>
            </div>

            {/* Placeholder Endpoints */}
            {[
                { Icon: ChatIcon, title: 'Chat Completions', path: '/v1/chat/completions' },
                { Icon: SpeakerIcon, title: 'Text-to-Speech (TTS)', path: '/v1/audio/speech' }
            ].map(({Icon, title, path}) => (
                <div key={title} className="p-4 bg-slate-800/60 rounded-lg border border-slate-700 opacity-60" title="Pollinations.ai does not offer a public API for this service. This endpoint is a placeholder.">
                    <div className="flex justify-between items-center">
                         <div className="flex items-center space-x-3">
                            <Icon className="h-6 w-6 text-slate-500"/>
                            <div>
                                <h3 className="font-semibold text-slate-400">{title}</h3>
                                <p className="text-xs font-mono text-slate-500">{path}</p>
                            </div>
                        </div>
                        <div className="text-sm font-medium text-slate-400 px-2 py-1 rounded-full bg-slate-700/50">Not Available</div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    );
};

const CodePanel: FC<{ serverCode: string }> = ({ serverCode }) => {
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
      <pre className="p-4 text-sm overflow-x-auto"><code className="text-cyan-300 whitespace-pre-wrap">{serverCode}</code></pre>
    </div>
  );
};

const Instructions: FC<{ port: number }> = ({ port }) => (
    <div className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 space-y-4">
        <div className="flex items-center space-x-3">
             <InfoIcon className="h-8 w-8 text-cyan-400 flex-shrink-0"/>
             <h2 className="text-2xl font-bold text-slate-200">How to Run Your Proxy Server</h2>
        </div>
        <p className="text-slate-400">This script creates a local server that exposes multiple OpenAI-compatible endpoints. Image generation is routed to Pollinations.ai, while other endpoints are included as placeholders.</p>
        <div className="space-y-3">
            <div className="p-4 bg-slate-900/50 rounded-lg">
                <h3 className="font-semibold text-lg text-slate-300">Step 1: Save the Code</h3>
                <p className="text-slate-400">Copy the code above and save it in a file named <code className="text-amber-300 bg-slate-700 px-1 py-0.5 rounded">proxy-server.js</code>.</p>
            </div>
            <div className="p-4 bg-slate-900/50 rounded-lg">
                <h3 className="font-semibold text-lg text-slate-300">Step 2: Install Dependencies</h3>
                <p className="text-slate-400">Open a terminal or command prompt in the folder where you saved the file. You need Node.js installed. Run:</p>
                 <code className="block text-cyan-300 bg-slate-900 mt-2 p-3 rounded-md border border-slate-700 break-all text-sm">npm install express cors</code>
            </div>
             <div className="p-4 bg-slate-900/50 rounded-lg">
                <h3 className="font-semibold text-lg text-slate-300">Step 3: Run the Server</h3>
                <p className="text-slate-400">In the same terminal, run:</p>
                 <code className="block text-cyan-300 bg-slate-900 mt-2 p-3 rounded-md border border-slate-700 break-all text-sm">node proxy-server.js</code>
            </div>
             <div className="p-4 bg-slate-900/50 rounded-lg">
                <h3 className="font-semibold text-lg text-slate-300">Step 4: Configure Your App</h3>
                <p className="text-slate-400">In your application's API settings (e.g., SillyTavern), set the endpoint to:</p>
                <code className="block text-cyan-300 bg-slate-900 mt-2 p-3 rounded-md border border-slate-700 break-all text-sm">http://localhost:${port}/v1</code>
                 <p className="text-slate-400 mt-2">Set the API type to "OpenAI". The server will now handle image generation and provide valid error responses for other endpoints.</p>
            </div>
        </div>
    </div>
);

// --- Server Code Generation Logic ---

const generateServerCode = (port: number, defaultWidth: number, defaultHeight: number): string => `// Generated by Pollinations AI Proxy Generator
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = ${port};
const DEFAULT_WIDTH = ${defaultWidth};
const DEFAULT_HEIGHT = ${defaultHeight};

app.use(cors());
app.use(express.json());

// --- Helper for sending standardized errors ---
const sendNotImplementedError = (res, endpoint) => {
    console.warn(\`Received request for \${endpoint}, which is not implemented in this proxy.\`);
    res.status(501).json({
        error: {
            message: \`The endpoint '\${endpoint}' is not implemented. This proxy uses Pollinations.ai, which only supports image generation.\`,
            type: 'not_implemented',
            param: null,
            code: null
        }
    });
};

// --- [ACTIVE] Image Generation Endpoint ---
// Proxies requests to Pollinations.ai
app.post('/v1/images/generations', (req, res) => {
    console.log('Received /v1/images/generations request:', req.body);
    const { prompt, size } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: { message: 'A "prompt" is required.' } });
    }

    let width = DEFAULT_WIDTH;
    let height = DEFAULT_HEIGHT;

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

    const seed = Math.floor(Math.random() * 1000000);
    const encodedPrompt = encodeURIComponent(prompt.trim());
    const imageUrl = \`https://image.pollinations.ai/prompt/\${encodedPrompt}?width=\${width}&height=\${height}&seed=\${seed}&nologo=true\`;

    console.log(\`Proxying to: \${imageUrl}\`);

    const openAIResponse = {
        created: Math.floor(Date.now() / 1000),
        data: [{ url: imageUrl }],
    };
    
    res.json(openAIResponse);
});

// --- [PLACEHOLDER] Chat Completions Endpoint ---
app.post('/v1/chat/completions', (req, res) => {
    sendNotImplementedError(res, '/v1/chat/completions');
});

// --- [PLACEHOLDER] Text-to-Speech (TTS) Endpoint ---
app.post('/v1/audio/speech', (req, res) => {
    sendNotImplementedError(res, '/v1/audio/speech');
});

// --- Health Check Endpoint ---
app.get('/v1', (req, res) => {
    res.status(200).send('Pollinations.ai to OpenAI Proxy Server is running.');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(\`Server started. OpenAI-compatible endpoint available at http://localhost:\${PORT}/v1\`);
    console.log('-> Image Generation: POST http://localhost:\${PORT}/v1/images/generations (ACTIVE)');
    console.log('-> Chat Completions: POST http://localhost:\${PORT}/v1/chat/completions (Placeholder)');
    console.log('-> TTS: POST http://localhost:\${PORT}/v1/audio/speech (Placeholder)');
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
            <EndpointsConfig 
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
