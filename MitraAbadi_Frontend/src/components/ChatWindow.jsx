import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import api from "../lib/api";

function ChatWindow({ onClose }) {
  const [sessionToken, setSessionToken] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    // Selalu buat sesi baru — chat tidak disimpan antar kunjungan
    api.post('/chatbot/session', {}, { signal: controller.signal })
      .then(res => {
        setSessionToken(res.data.session_token);
        setMessages([{
          role: 'assistant',
          text: 'Halo! Saya Asisten Mitra Abadi. Saya bisa membantu Anda menemukan kain yang tepat, mengecek stok, atau menjelaskan spesifikasi produk. Ada yang bisa saya bantu?',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }]);
      })
      .catch((err) => {
        if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED') return;
        setMessages([{ role: 'assistant', text: 'Maaf, layanan chat sedang tidak tersedia.', time: '' }]);
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    if (loading) return;
    const userMsg = text || input.trim();
    if (!userMsg || !sessionToken) return;
    setInput("");
    setMessages(prev => [...prev, {
      role: 'user',
      text: userMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }]);
    setLoading(true);
    try {
      const res = await api.post('/chatbot/message', { session_token: sessionToken, message: userMsg });
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: res.data.response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: 'Maaf, terjadi kesalahan. Silakan coba lagi.',
        time: '',
      }]);
    }
    setLoading(false);
  };

  return (
    <div className="fixed bottom-28 right-8 z-50 w-[420px] max-w-[calc(100vw-2rem)] flex flex-col shadow-2xl border border-stone-200 overflow-hidden rounded-xl bg-white animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="px-6 py-5 flex items-center justify-between border-b border-stone-100 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#e61e25] flex items-center justify-center rounded-lg shadow-sm">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10h-2V8h2m0 8h-2v-6h2m-1-9A10 10 0 002 12a10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2z"/></svg>
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight text-stone-900">Asisten Virtual Mitra Abadi</h2>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-stone-500">Aktif</span>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="text-stone-400 hover:text-stone-700 transition-colors p-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <div className="bg-white p-6 h-80 overflow-y-auto flex flex-col gap-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col gap-1 max-w-[85%] ${m.role === "user" ? "self-end items-end" : "self-start"}`}>
            <div className={`p-4 rounded-xl text-sm leading-relaxed ${m.role === "assistant" ? "bg-stone-100 rounded-tl-none text-stone-800" : "bg-[#e61e25] text-white rounded-tr-none"}`}>
              {m.role === "assistant" ? (
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc list-inside space-y-0.5 mt-1">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal list-inside space-y-0.5 mt-1">{children}</ol>,
                    li: ({ children }) => <li className="text-sm">{children}</li>,
                    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                  }}
                >
                  {m.text}
                </ReactMarkdown>
              ) : (
                m.text
              )}
            </div>
            <span className="text-[10px] text-stone-400 font-bold uppercase tracking-tighter mx-1">{m.time} • {m.role === "assistant" ? "Asisten AI" : "Anda"}</span>
          </div>
        ))}
        {loading && (
          <div className="flex flex-col gap-1 max-w-[85%] self-start">
            <div className="p-4 rounded-xl text-sm bg-stone-100 rounded-tl-none">
              <span className="flex gap-1">{[0,1,2].map(i => <span key={i} className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{animationDelay:`${i*0.15}s`}}></span>)}</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="bg-white p-4 border-t border-stone-100">
        <div className="relative flex items-center">
          <input
            className="w-full bg-transparent border-0 border-b-2 border-stone-200 py-3 pr-10 text-sm focus:ring-0 focus:border-[#e61e25] transition-colors placeholder:text-stone-400 font-medium outline-none"
            placeholder="Tanyakan tentang produk tekstil kami..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={() => sendMessage()} className="absolute right-0 text-[#e61e25] p-2 hover:bg-red-50 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
