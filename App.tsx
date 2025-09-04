
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

const ToggleSwitch: FC<{ checked: boolean; onChange: (checked: boolean) => void; }> = ({ checked, onChange }) => (
    <button
        type="button"
        className={`${checked ? 'bg-cyan-500' : 'bg-slate-600'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-800`}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
    >
        <span
            aria-hidden="true"
            className={`${checked ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
        />
    </button>
);


const EndpointsConfig: FC<any> = ({ 
    port, setPort, 
    width, setWidth, 
    height, setHeight, 
    isChatActive, setIsChatActive, 
    chatProvider, setChatProvider,
    chatModel, setChatModel, 
    customChatUrl, setCustomChatUrl,
    isTtsActive, setIsTtsActive,
    ttsProvider, setTtsProvider,
    customTtsUrl, setCustomTtsUrl
}) => {
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

             {/* Chat Completions Endpoint */}
            <div className={`p-4 rounded-lg border transition-all duration-300 ${isChatActive ? 'bg-slate-900/50 border-cyan-500/30' : 'bg-slate-800/60 border-slate-700 opacity-70'}`}>
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <ChatIcon className={`h-6 w-6 ${isChatActive ? 'text-cyan-400' : 'text-slate-500'}`}/>
                        <div>
                            <h3 className={`font-semibold ${isChatActive ? 'text-slate-200' : 'text-slate-400'}`}>Chat Completions</h3>
                            <p className={`text-xs font-mono ${isChatActive ? 'text-slate-400' : 'text-slate-500'}`}>/v1/chat/completions</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className={`text-sm font-medium px-2 py-1 rounded-full ${isChatActive ? 'text-cyan-400 bg-cyan-900/50' : 'text-slate-400 bg-slate-700/50'}`}>
                            {isChatActive ? 'Active' : 'Not Available'}
                        </div>
                        <ToggleSwitch checked={isChatActive} onChange={setIsChatActive} />
                    </div>
                </div>
                 {isChatActive && (
                     <div className="mt-4 pt-4 border-t border-slate-700 space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="chat-provider" className="font-medium text-slate-300 text-sm">Chat Provider</label>
                            <select id="chat-provider" value={chatProvider} onChange={(e) => setChatProvider(e.target.value)} className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-shadow">
                                <option value="gemini">Google Gemini</option>
                                <option value="custom">Custom OpenAI-compatible URL</option>
                            </select>
                        </div>
                        
                        {chatProvider === 'gemini' && (
                            <div className="space-y-2">
                                <label htmlFor="chat-model" className="font-medium text-slate-300 text-sm">Model</label>
                                <select id="chat-model" value={chatModel} onChange={(e) => setChatModel(e.target.value)} className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-shadow">
                                    <option value="gemini-2.5-flash">gemini-2.5-flash</option>
                                </select>
                            </div>
                        )}

                        {chatProvider === 'custom' && (
                             <div className="space-y-2">
                                <label htmlFor="custom-url" className="font-medium text-slate-300 text-sm">Endpoint Base URL</label>
                                <input id="custom-url" type="text" value={customChatUrl} onChange={(e) => setCustomChatUrl(e.target.value)} placeholder="http://localhost:1234/v1" className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-shadow" />
                                <p className="text-xs text-slate-500">The proxy will forward requests to this URL. E.g., for LM Studio.</p>
                            </div>
                        )}
                    </div>
                 )}
            </div>
            
            {/* Text-to-Speech Endpoint */}
            <div className={`p-4 rounded-lg border transition-all duration-300 ${isTtsActive ? 'bg-slate-900/50 border-cyan-500/30' : 'bg-slate-800/60 border-slate-700 opacity-70'}`}>
                 <div className="flex justify-between items-center">
                     <div className="flex items-center space-x-3">
                        <SpeakerIcon className={`h-6 w-6 ${isTtsActive ? 'text-cyan-400' : 'text-slate-500'}`}/>
                        <div>
                            <h3 className={`font-semibold ${isTtsActive ? 'text-slate-200' : 'text-slate-400'}`}>Text-to-Speech (TTS)</h3>
                            <p className={`text-xs font-mono ${isTtsActive ? 'text-slate-400' : 'text-slate-500'}`}>/v1/audio/speech</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className={`text-sm font-medium px-2 py-1 rounded-full ${isTtsActive ? 'text-cyan-400 bg-cyan-900/50' : 'text-slate-400 bg-slate-700/50'}`}>
                            {isTtsActive ? 'Active' : 'Not Available'}
                        </div>
                        <ToggleSwitch checked={isTtsActive} onChange={setIsTtsActive} />
                    </div>
                </div>
                {isTtsActive && (
                    <div className="mt-4 pt-4 border-t border-slate-700 space-y-4">
                        <div className="space-y-2">
                             <label htmlFor="tts-provider" className="font-medium text-slate-300 text-sm">TTS Provider</label>
                             <select id="tts-provider" value={ttsProvider} onChange={(e) => setTtsProvider(e.target.value as any)} className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-shadow">
                                <option value="placeholder">Placeholder (Returns Error)</option>
                                <option value="custom">Custom URL Proxy</option>
                             </select>
                        </div>
                        {ttsProvider === 'placeholder' && (
                            <p className="text-sm text-slate-400">This option will return a placeholder error, as a public TTS API is not yet integrated.</p>
                        )}
                         {ttsProvider === 'custom' && (
                            <div className="space-y-2">
                                <label htmlFor="custom-tts-url" className="font-medium text-slate-300 text-sm">Endpoint URL</label>
                                <input id="custom-tts-url" type="text" value={customTtsUrl} onChange={(e) => setCustomTtsUrl(e.target.value)} placeholder="http://localhost:5002/api/tts" className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-shadow" />
                                <p className="text-xs text-slate-500">The proxy will forward TTS requests to this URL. The target should expect a POST request and return an audio stream.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
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
        <h3 className="font-mono text-sm text-slate-300">proxy-server.mjs</h3>
        <button onClick={handleCopy} className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-slate-700 hover:bg-slate-600 rounded-md transition-colors">
          {isCopied ? <CheckIcon className="h-4 w-4 text-emerald-400" /> : <CopyIcon className="h-4 w-4" />}
          <span>{isCopied ? 'Copied!' : 'Copy Code'}</span>
        </button>
      </div>
      <pre className="p-4 text-sm overflow-x-auto"><code className="text-cyan-300 whitespace-pre-wrap">{serverCode}</code></pre>
    </div>
  );
};

const Instructions: FC<{ port: number, dependencies: string, isChatActive: boolean, chatProvider: string }> = ({ port, dependencies, isChatActive, chatProvider }) => (
    <div className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 space-y-4">
        <div className="flex items-center space-x-3">
             <InfoIcon className="h-8 w-8 text-cyan-400 flex-shrink-0"/>
             <h2 className="text-2xl font-bold text-slate-200">How to Run Your Proxy Server</h2>
        </div>
        <p className="text-slate-400">This script creates a local server that exposes multiple OpenAI-compatible endpoints. Image generation is routed to Pollinations.ai, while other endpoints are included as placeholders.</p>
        <div className="space-y-3">
            <div className="p-4 bg-slate-900/50 rounded-lg">
                <h3 className="font-semibold text-lg text-slate-300">Step 1: Save the Code</h3>
                <p className="text-slate-400">Copy the code above and save it in a file named <code className="text-amber-300 bg-slate-700 px-1 py-0.5 rounded">proxy-server.mjs</code>. The `.mjs` extension is important for it to be treated as a modern JavaScript module.</p>
            </div>
             {isChatActive && chatProvider === 'gemini' && (
                <div className="p-4 bg-slate-900/50 rounded-lg">
                    <h3 className="font-semibold text-lg text-slate-300">Step 2: Set Environment Variable (For Gemini)</h3>
                    <p className="text-slate-400">Create a <code className="text-amber-300 bg-slate-700 px-1 py-0.5 rounded">.env</code> file in the same directory and add your Google Gemini API key:</p>
                    <code className="block text-cyan-300 bg-slate-900 mt-2 p-3 rounded-md border border-slate-700 break-all text-sm">API_KEY="YOUR_GEMINI_API_KEY"</code>
                    <p className="text-slate-400 mt-2">You will also need to install <code className="text-amber-300 bg-slate-700 px-1 py-0.5 rounded">dotenv</code> by adding it to the install command below.</p>
                </div>
             )}
            <div className="p-4 bg-slate-900/50 rounded-lg">
                <h3 className="font-semibold text-lg text-slate-300">Step {isChatActive && chatProvider === 'gemini' ? '3' : '2'}: Install Dependencies</h3>
                <p className="text-slate-400">Open a terminal or command prompt in the folder where you saved the file. You need Node.js installed. Run:</p>
                 <code className="block text-cyan-300 bg-slate-900 mt-2 p-3 rounded-md border border-slate-700 break-all text-sm">{dependencies}</code>
            </div>
             <div className="p-4 bg-slate-900/50 rounded-lg">
                <h3 className="font-semibold text-lg text-slate-300">Step {isChatActive && chatProvider === 'gemini' ? '4' : '3'}: Run the Server</h3>
                <p className="text-slate-400">In the same terminal, run:</p>
                 <code className="block text-cyan-300 bg-slate-900 mt-2 p-3 rounded-md border border-slate-700 break-all text-sm">node proxy-server.mjs</code>
            </div>
             <div className="p-4 bg-slate-900/50 rounded-lg">
                <h3 className="font-semibold text-lg text-slate-300">Step {isChatActive && chatProvider === 'gemini' ? '5' : '4'}: Configure Your App</h3>
                <p className="text-slate-400">In your application's API settings, set the API Base URL / Endpoint to:</p>
                <code className="block text-cyan-300 bg-slate-900 mt-2 p-3 rounded-md border border-slate-700 break-all text-sm">http://localhost:${port}/v1</code>
                 <p className="text-slate-400 mt-2">Set the API type to "OpenAI". If you are using the custom URL proxy, your application's API key will be forwarded automatically.</p>
            </div>
        </div>
    </div>
);

// --- Server Code Generation Logic ---

const generateServerCode = (
    port: number,
    defaultWidth: number,
    defaultHeight: number,
    isChatActive: boolean,
    chatProvider: 'gemini' | 'custom',
    chatModel: string,
    customChatUrl: string,
    isTtsActive: boolean,
    ttsProvider: 'placeholder' | 'custom',
    customTtsUrl: string,
): string => {

    const getImports = () => {
        let imports = `import express from 'express';\nimport cors from 'cors';\n`;
        const needsFetch = (isChatActive && chatProvider === 'custom') || (isTtsActive && ttsProvider === 'custom');

        if (isChatActive && chatProvider === 'gemini') {
            imports += `import 'dotenv/config';\n`;
            imports += `import { GoogleGenAI } from '@google/genai';\n`;
        }
        if (needsFetch) {
            imports += `import fetch from 'node-fetch';\n`;
        }
        return imports;
    }

    const getChatCompletionsCode = () => {
        if (!isChatActive) {
            return `
// --- [PLACEHOLDER] Chat Completions Endpoint ---
app.post('/v1/chat/completions', (req, res) => {
    sendNotImplementedError(res, '/v1/chat/completions');
});
`;
        }
        if (chatProvider === 'gemini') {
            return `
// --- [ACTIVE] Chat Completions Endpoint (Powered by Google Gemini) ---
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const geminiModel = '${chatModel}';

app.post('/v1/chat/completions', async (req, res) => {
    console.log('Received /v1/chat/completions request for model:', req.body.model);
    
    if (!process.env.API_KEY) {
        return res.status(500).json({ error: { message: 'API_KEY environment variable not set for Gemini.' } });
    }
    
    const { messages } = req.body;
    
    if (!messages || messages.length === 0) {
        return res.status(400).json({ error: { message: 'Messages are required.' } });
    }

    // Convert OpenAI messages to a simple string prompt for Gemini
    const prompt = messages.map(msg => \`\${msg.role}: \${msg.content}\`).join('\\n');

    try {
        const response = await ai.models.generateContent({
            model: geminiModel,
            contents: prompt,
        });
        
        const openAIResponse = {
            id: 'chatcmpl-' + Math.random().toString(36).substr(2, 9),
            object: 'chat.completion',
            created: Math.floor(Date.now() / 1000),
            model: req.body.model || geminiModel,
            choices: [{
                index: 0,
                message: {
                    role: 'assistant',
                    content: response.text,
                },
                finish_reason: 'stop',
            }],
            usage: {
                prompt_tokens: 0, // Not provided by Gemini API
                completion_tokens: 0, // Not provided by Gemini API
                total_tokens: 0, // Not provided by Gemini API
            },
        };
        res.json(openAIResponse);

    } catch (error) {
        console.error('Error calling Gemini API:', error);
        res.status(500).json({ error: { message: 'An error occurred with the Gemini API.', details: error.message } });
    }
});
`;
        }

        if (chatProvider === 'custom') {
            return `
// --- [ACTIVE] Chat Completions Endpoint (Proxy to Custom URL) ---
const CUSTOM_CHAT_URL = '${customChatUrl.replace(/\/$/, '')}/chat/completions';

app.post('/v1/chat/completions', async (req, res) => {
    console.log(\`Proxying /v1/chat/completions to \${CUSTOM_CHAT_URL}\`);
    
    try {
        const response = await fetch(CUSTOM_CHAT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Forward the Authorization header if it exists
                ...(req.headers.authorization && { 'Authorization': req.headers.authorization })
            },
            body: JSON.stringify(req.body)
        });

        // Forward the response from the custom endpoint back to the client
        const responseData = await response.json();
        res.status(response.status).json(responseData);

    } catch (error) {
        console.error('Error proxying to custom endpoint:', error);
        res.status(500).json({ error: { message: 'Failed to proxy request to custom endpoint.', details: error.message } });
    }
});
`;
        }
        return '';
    };

    const getTtsCode = () => {
        if (!isTtsActive) {
            return `
// --- [PLACEHOLDER] Text-to-Speech (TTS) Endpoint ---
app.post('/v1/audio/speech', (req, res) => {
    sendNotImplementedError(res, '/v1/audio/speech');
});
`;
        }
        if (ttsProvider === 'custom') {
            return `
// --- [ACTIVE] Text-to-Speech (TTS) Endpoint (Proxy to Custom URL) ---
const CUSTOM_TTS_URL = '${customTtsUrl.replace(/\/$/, '')}';

app.post('/v1/audio/speech', async (req, res) => {
    console.log(\`Proxying /v1/audio/speech to \${CUSTOM_TTS_URL}\`);

    try {
        const response = await fetch(CUSTOM_TTS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Forward the Authorization header if it exists
                ...(req.headers.authorization && { 'Authorization': req.headers.authorization })
            },
            body: JSON.stringify(req.body)
        });
        
        if (!response.ok) {
           const errorBody = await response.text();
           console.error(\`Error from custom TTS endpoint (\${response.status}): \${errorBody}\`);
           return res.status(response.status).send(errorBody);
        }

        // Forward the audio stream from the custom endpoint back to the client
        res.setHeader('Content-Type', response.headers.get('Content-Type') || 'audio/mpeg');
        response.body.pipe(res);

    } catch (error) {
        console.error('Error proxying TTS request to custom endpoint:', error);
        res.status(500).json({ error: { message: 'Failed to proxy TTS request to custom endpoint.', details: error.message } });
    }
});
`;
        }

        return `
// --- [ACTIVE] Text-to-Speech (TTS) Endpoint ---
app.post('/v1/audio/speech', (req, res) => {
    console.log('Received /v1/audio/speech request. This endpoint is active but does not generate audio.');
    res.status(400).json({
        error: {
            message: 'The requested voice or model is not available. This proxy currently does not support TTS generation.',
            type: 'invalid_request_error'
        }
    });
});
`;
    };
    
    const getTtsStatus = () => {
        if (!isTtsActive) return 'Placeholder';
        if (ttsProvider === 'custom') return 'ACTIVE - Using Custom URL';
        return 'ACTIVE - Placeholder';
    };

    return `// Generated by Pollinations AI Proxy Generator
${getImports()}
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
${getChatCompletionsCode()}
${getTtsCode()}
// --- Health Check Endpoint ---
app.get('/v1', (req, res) => {
    res.status(200).send('Pollinations.ai to OpenAI Proxy Server is running.');
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(\`Server started. OpenAI-compatible endpoint available at http://localhost:\${PORT}/v1\`);
    console.log('-> Image Generation: POST http://localhost:\${PORT}/v1/images/generations (ACTIVE)');
    console.log('-> Chat Completions: POST http://localhost:\${PORT}/v1/chat/completions (${isChatActive ? `ACTIVE - Using ${chatProvider === 'gemini' ? 'Gemini' : 'Custom URL'}` : 'Placeholder'})');
    console.log('-> TTS: POST http://localhost:\${PORT}/v1/audio/speech (${getTtsStatus()})');
});
`;
}

// --- Main App Component ---

const App: FC = () => {
  const [port, setPort] = useState<number>(8111);
  const [width, setWidth] = useState<number>(1024);
  const [height, setHeight] = useState<number>(1024);
  const [isChatActive, setIsChatActive] = useState<boolean>(false);
  const [chatProvider, setChatProvider] = useState<'gemini' | 'custom'>('gemini');
  const [chatModel, setChatModel] = useState<string>('gemini-2.5-flash');
  const [customChatUrl, setCustomChatUrl] = useState<string>('http://localhost:1234/v1');
  const [isTtsActive, setIsTtsActive] = useState<boolean>(false);
  const [ttsProvider, setTtsProvider] = useState<'placeholder' | 'custom'>('placeholder');
  const [customTtsUrl, setCustomTtsUrl] = useState<string>('http://localhost:5002/api/tts');


  const serverCode = useMemo(() => generateServerCode(port, width, height, isChatActive, chatProvider, chatModel, customChatUrl, isTtsActive, ttsProvider, customTtsUrl), [port, width, height, isChatActive, chatProvider, chatModel, customChatUrl, isTtsActive, ttsProvider, customTtsUrl]);
  
  const dependencies = useMemo(() => {
      const deps = new Set(['express', 'cors']);
      if(isChatActive) {
          if (chatProvider === 'gemini') {
            deps.add('@google/genai');
            deps.add('dotenv');
          } else if (chatProvider === 'custom') {
            deps.add('node-fetch@2');
          }
      }
      if (isTtsActive && ttsProvider === 'custom') {
          deps.add('node-fetch@2');
      }
      return `npm install ${Array.from(deps).join(' ')}`;
  }, [isChatActive, chatProvider, isTtsActive, ttsProvider]);

  return (
    <div className="min-h-screen bg-slate-900 bg-grid-slate-700/[0.2] font-sans">
        <main className="container mx-auto max-w-7xl p-4 md:p-8 space-y-8">
            <Header />
            <EndpointsConfig 
                port={port} setPort={setPort}
                width={width} setWidth={setWidth}
                height={height} setHeight={setHeight}
                isChatActive={isChatActive} setIsChatActive={setIsChatActive}
                chatProvider={chatProvider} setChatProvider={setChatProvider}
                chatModel={chatModel} setChatModel={setChatModel}
                customChatUrl={customChatUrl} setCustomChatUrl={setCustomChatUrl}
                isTtsActive={isTtsActive} setIsTtsActive={setIsTtsActive}
                ttsProvider={ttsProvider} setTtsProvider={setTtsProvider}
                customTtsUrl={customTtsUrl} setCustomTtsUrl={setCustomTtsUrl}
            />
            <CodePanel serverCode={serverCode} />
            <Instructions port={port} dependencies={dependencies} isChatActive={isChatActive} chatProvider={chatProvider}/>
        </main>
    </div>
  );
};

export default App;
