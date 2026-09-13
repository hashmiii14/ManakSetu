import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Sparkles, Plus, Trash2, Copy, Check, RotateCcw, 
  BookOpen, ShieldCheck, ArrowRight, AlertTriangle, ExternalLink, 
  HelpCircle, MessageSquare, ChevronDown, CheckCircle2, Bot, User, Loader2
} from 'lucide-react';
import { askManakBot } from '../services/api';
import Logo from './Logo';

const STORAGE_KEY = 'manaksetu_chat_sessions_v2';

const SUGGESTED_CHIPS = [
  { label: "What is an Indian Standard?", prompt: "What is an Indian Standard (IS Code) and how are standards published under the BIS Act 2016?" },
  { label: "Find standard for product", prompt: "How do I identify the applicable Indian Standard and scheme for my product?" },
  { label: "How BIS certification works", prompt: "Explain the step-by-step procedure for obtaining a BIS product certification license (Scheme-I)." },
  { label: "Verify requirement", prompt: "How can a manufacturer verify whether a standard is subject to a mandatory Quality Control Order (QCO)?" },
  { label: "IS 2082 Testing Requirements", prompt: "What are the mandatory testing and safety parameters for electric storage geysers under IS 2082:2018?" },
  { label: "MSME Fee Concessions", prompt: "What concessions do Micro and Small enterprises receive on BIS application, audit, and marking fees?" }
];

export default function ManakBot({ onOpenStandard, onCheckCompliance, initialPrompt = '', embedded = false }) {
  const [sessions, setSessions] = useState([]);
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [inputMessage, setInputMessage] = useState(initialPrompt || '');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [errorState, setErrorState] = useState(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Sync initialPrompt if provided and input is currently empty
  useEffect(() => {
    if (initialPrompt && !inputMessage) {
      setInputMessage(initialPrompt);
    }
  }, [initialPrompt]);

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Initialize or load chat sessions from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSessions(parsed);
          setActiveSessionId(parsed[0].id);
          return;
        }
      }
    } catch (e) {
      console.warn("Failed to load stored chat history:", e);
    }

    // Default initial session
    const initialSession = createNewSessionObject();
    setSessions([initialSession]);
    setActiveSessionId(initialSession.id);
  }, []);

  // Sync to localStorage whenever sessions change
  useEffect(() => {
    if (sessions.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
      } catch (e) {
        console.warn("Failed to save chat sessions:", e);
      }
    }
  }, [sessions]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [sessions, activeSessionId, isLoading]);

  function createNewSessionObject(initialPrompt = null) {
    return {
      id: 'session-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      title: initialPrompt ? (initialPrompt.slice(0, 32) + '...') : 'New Conversation',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: []
    };
  }

  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0];

  const handleNewChat = () => {
    const newSession = createNewSessionObject();
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    setInputMessage('');
    setErrorState(null);
    if (textareaRef.current) textareaRef.current.focus();
  };

  const handleDeleteSession = (idToDelete, e) => {
    e.stopPropagation();
    const updated = sessions.filter(s => s.id !== idToDelete);
    if (updated.length === 0) {
      const fresh = createNewSessionObject();
      setSessions([fresh]);
      setActiveSessionId(fresh.id);
    } else {
      setSessions(updated);
      if (activeSessionId === idToDelete) {
        setActiveSessionId(updated[0].id);
      }
    }
  };

  const handleClearCurrentChat = () => {
    if (!activeSessionId) return;
    setSessions(prev => prev.map(s => {
      if (s.id === activeSessionId) {
        return { ...s, messages: [], updatedAt: new Date().toISOString() };
      }
      return s;
    }));
    setErrorState(null);
  };

  const handleSendMessage = async (textOverride = null) => {
    const textToSend = (textOverride || inputMessage).trim();
    if (!textToSend || isLoading) return;

    setErrorState(null);
    setInputMessage('');

    const userMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update active session immediately with user message
    setSessions(prev => prev.map(s => {
      if (s.id === activeSessionId) {
        const isFirst = s.messages.length === 0;
        return {
          ...s,
          title: isFirst ? (textToSend.slice(0, 32) + (textToSend.length > 32 ? '...' : '')) : s.title,
          messages: [...s.messages, userMessage],
          updatedAt: new Date().toISOString()
        };
      }
      return s;
    }));

    setIsLoading(true);

    try {
      // Build conversation history payload
      const historyPayload = (activeSession?.messages || []).map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await askManakBot(textToSend, historyPayload);

      const assistantMessage = {
        id: 'msg-' + (Date.now() + 1),
        role: 'assistant',
        content: res.answer,
        referenced_standards: res.referenced_standards || [],
        source: res.source || 'BIS Standards Knowledge Engine',
        confidence: res.confidence || 'High',
        disclaimer: res.disclaimer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setSessions(prev => prev.map(s => {
        if (s.id === activeSessionId) {
          return {
            ...s,
            messages: [...s.messages, assistantMessage],
            updatedAt: new Date().toISOString()
          };
        }
        return s;
      }));
    } catch (err) {
      console.error("[ManakBot] Ask error:", err);
      setErrorState({
        message: "ManakBot is temporarily unable to reach the knowledge engine. Please check your connection or retry.",
        lastQuery: textToSend
      });
    } finally {
      setIsLoading(false);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleRetry = () => {
    if (errorState?.lastQuery) {
      const q = errorState.lastQuery;
      setErrorState(null);
      handleSendMessage(q);
    }
  };

  // Render structured markdown paragraphs
  const renderMarkdown = (text) => {
    if (!text) return null;

    const sections = text.split('\n\n');

    return (
      <div className="space-y-3.5 text-xs sm:text-sm text-neutral-800 leading-relaxed">
        {sections.map((sec, sIdx) => {
          // Section Headers
          if (sec.startsWith('### ')) {
            const heading = sec.replace('### ', '');
            return (
              <div key={sIdx} className="pt-2 border-b border-neutral-100 pb-1.5 first:pt-0">
                <h3 className="font-bold text-neutral-900 text-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  <span>{heading}</span>
                </h3>
              </div>
            );
          }

          // Bullet points
          if (sec.startsWith('- ') || sec.startsWith('* ')) {
            const items = sec.split('\n');
            return (
              <ul key={sIdx} className="space-y-1.5 my-2 pl-1">
                {items.map((it, iIdx) => {
                  const cleaned = it.replace(/^[-*]\s+/, '');
                  return (
                    <li key={iIdx} className="flex items-start gap-2 text-neutral-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span dangerouslySetInnerHTML={{ 
                        __html: cleaned
                          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-neutral-900">$1</strong>')
                          .replace(/\*(.*?)\*/g, '<em class="italic text-neutral-800">$1</em>')
                          .replace(/`(IS\s*\d+[^`]*)`/g, '<code class="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 font-mono text-[11px] font-bold border border-emerald-200">$1</code>')
                      }} />
                    </li>
                  );
                })}
              </ul>
            );
          }

          // Numbered lists
          if (/^\d+\.\s+/.test(sec)) {
            const items = sec.split('\n');
            return (
              <ol key={sIdx} className="space-y-1.5 my-2 pl-1">
                {items.map((it, iIdx) => {
                  const numMatch = it.match(/^(\d+)\.\s+(.*)/);
                  const num = numMatch ? numMatch[1] : (iIdx + 1);
                  const body = numMatch ? numMatch[2] : it;
                  return (
                    <li key={iIdx} className="flex items-start gap-2.5 text-neutral-700">
                      <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                        {num}
                      </span>
                      <span dangerouslySetInnerHTML={{ 
                        __html: body
                          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-neutral-900">$1</strong>')
                          .replace(/\*(.*?)\*/g, '<em class="italic text-neutral-800">$1</em>')
                          .replace(/`(IS\s*\d+[^`]*)`/g, '<code class="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 font-mono text-[11px] font-bold border border-emerald-200">$1</code>')
                      }} />
                    </li>
                  );
                })}
              </ol>
            );
          }

          // Regular paragraph
          return (
            <p key={sIdx} className="text-neutral-700" dangerouslySetInnerHTML={{ 
              __html: sec
                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-neutral-900">$1</strong>')
                .replace(/\*(.*?)\*/g, '<em class="italic text-neutral-800">$1</em>')
                .replace(/`(IS\s*\d+[^`]*)`/g, '<code class="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 font-mono text-[11px] font-bold border border-emerald-200">$1</code>')
                .replace(/\[(.*?)\]\((https?:\/\/.*?)\)/g, '<a href="$2" target="_blank" rel="noreferrer" class="text-emerald-700 hover:underline font-semibold">$1</a>')
            }} />
          );
        })}
      </div>
    );
  };

  const chatWorkspace = (
    <div className="bg-white rounded-sm border border-slate-300 shadow-sm overflow-hidden flex flex-col md:flex-row h-[720px] w-full text-left">
      
      {/* Left Sidebar: Conversations & Quick Navigation */}
      <div className={`w-full md:w-64 bg-slate-50 border-r border-slate-200 flex flex-col shrink-0 ${isHistoryOpen ? 'block' : 'hidden md:flex'}`}>
        <div className="p-3 border-b border-slate-200 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-gov-800" />
            Conversations
          </span>
          <button
            onClick={handleNewChat}
            className="p-1.5 rounded-sm bg-gov-800 hover:bg-gov-900 text-white text-xs font-semibold inline-flex items-center gap-1 shadow-2xs transition-colors"
            title="New Chat"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New</span>
          </button>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {sessions.map(s => {
            const isActive = s.id === activeSessionId;
            return (
              <div
                key={s.id}
                onClick={() => {
                  setActiveSessionId(s.id);
                  setIsHistoryOpen(false);
                }}
                className={`group w-full text-left p-2.5 rounded-sm text-xs font-medium cursor-pointer transition-all flex items-center justify-between gap-1.5 ${
                  isActive 
                    ? 'bg-white text-gov-900 border border-slate-300 shadow-2xs font-semibold' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2 truncate flex-1">
                  <Bot className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-gov-800' : 'text-slate-400'}`} />
                  <span className="truncate">{s.title || 'Untitled Chat'}</span>
                </div>
                {sessions.length > 1 && (
                  <button
                    onClick={(e) => handleDeleteSession(s.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-600 text-slate-400 rounded-sm transition-opacity"
                    title="Delete chat"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Sidebar Bottom Status */}
        <div className="p-3 border-t border-slate-200 bg-slate-100/50 text-[11px] text-slate-500 flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            572 Standards Indexed
          </span>
          {activeSession?.messages.length > 0 && (
            <button
              onClick={handleClearCurrentChat}
              className="text-slate-400 hover:text-red-600 transition-colors"
              title="Clear current messages"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Main Chat Stream & Input Area */}
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        
        {/* Mobile Chat Header Bar */}
        <div className="md:hidden p-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
          <button
            onClick={() => setIsHistoryOpen(!isHistoryOpen)}
            className="font-bold text-slate-800 flex items-center gap-1.5 px-2.5 py-1 rounded-sm border border-slate-300 bg-white"
          >
            <MessageSquare className="w-3.5 h-3.5 text-gov-800" />
            <span>{activeSession?.title || 'Conversations'}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
          <button
            onClick={handleNewChat}
            className="px-2.5 py-1 rounded-sm bg-gov-800 text-white font-bold inline-flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            <span>New</span>
          </button>
        </div>

        {/* Chat Message Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Empty State Experience */}
          {(!activeSession || activeSession.messages.length === 0) && (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto py-8 space-y-6 animate-in fade-in">
              <div className="w-12 h-12 rounded-sm bg-gov-50 border border-gov-200 flex items-center justify-center text-gov-800 shadow-2xs">
                <Sparkles className="w-6 h-6 text-amber-600" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-gov-900">
                  Welcome to ManakBot
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Your intelligent assistant for Indian Standards, BIS licensing, statutory QCO rules, and manufacturing compliance.
                </p>
              </div>

              {/* Curated Suggestion Chips */}
              <div className="w-full space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block text-left">
                  Suggested Questions to Try:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SUGGESTED_CHIPS.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(chip.prompt)}
                      className="p-3 text-left rounded-sm border border-slate-200 hover:border-gov-600 bg-slate-50/60 hover:bg-gov-50/40 text-xs text-slate-800 hover:text-gov-900 transition-all flex items-start justify-between gap-2 group shadow-2xs"
                    >
                      <span className="font-semibold leading-snug">{chip.label}</span>
                      <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-gov-800 shrink-0 mt-0.5" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Message List */}
          {activeSession?.messages.map((msg, idx) => (
            <div 
              key={msg.id || idx} 
              className={`flex gap-3 text-left ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {/* Assistant Avatar */}
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-sm bg-gov-800 text-white flex items-center justify-center shrink-0 mt-0.5 border border-gov-900">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              {/* Message Bubble Container */}
              <div className={`max-w-[88%] sm:max-w-[82%] space-y-2 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                
                {/* User Bubble */}
                {msg.role === 'user' ? (
                  <div className="p-3 sm:p-3.5 rounded-sm bg-slate-900 text-white text-xs sm:text-sm font-medium leading-relaxed">
                    {msg.content}
                  </div>
                ) : (
                  /* Assistant Card */
                  <div className="p-4 rounded-sm bg-white border border-slate-300 shadow-xs space-y-3">
                    
                    {/* Top Metadata Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-100 text-[11px]">
                      <span className="font-bold text-gov-800 bg-gov-50 px-2 py-0.5 rounded-sm border border-gov-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Grounded Standards Answer
                      </span>
                      <span className="text-slate-400 font-mono text-[10px]">
                        {msg.source || 'BIS Knowledge Engine'}
                      </span>
                    </div>

                    {/* Referenced Standards Pills */}
                    {msg.referenced_standards && msg.referenced_standards.length > 0 && (
                      <div className="p-2.5 bg-slate-50 rounded-sm border border-slate-200 space-y-1.5">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                          Referenced Indian Standards:
                        </span>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {msg.referenced_standards.map((std, sIdx) => {
                            const code = typeof std === 'object' ? std.is_number : std;
                            const title = typeof std === 'object' ? std.title : '';
                            return (
                              <button
                                key={sIdx}
                                onClick={() => onOpenStandard && onOpenStandard({ isCode: code, title })}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-white border border-slate-300 hover:border-gov-700 text-xs font-mono font-bold text-gov-900 hover:bg-gov-50 transition-colors shadow-2xs group"
                                title={title || code}
                              >
                                <BookOpen className="w-3 h-3 text-gov-700 group-hover:scale-110 transition-transform" />
                                <span>{code}</span>
                                {title && (
                                  <span className="text-slate-500 font-sans font-normal truncate max-w-[150px] hidden sm:inline">
                                    • {title}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Structured Markdown Content */}
                    {renderMarkdown(msg.content)}

                    {/* Interactive Action Buttons Bar */}
                    <div className="pt-3 border-t border-slate-150 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleCopy(msg.content, idx)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium transition-colors border border-slate-200"
                          title="Copy answer"
                        >
                          {copiedIndex === idx ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span className="text-emerald-700 font-bold">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-slate-500" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>

                        {/* View Standard CTA */}
                        {msg.referenced_standards && msg.referenced_standards[0] && (
                          <button
                            onClick={() => {
                              const topRef = msg.referenced_standards[0];
                              const code = typeof topRef === 'object' ? topRef.is_number : topRef;
                              if (onOpenStandard) onOpenStandard({ isCode: code });
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-gov-50 hover:bg-gov-100 text-gov-800 text-[11px] font-semibold border border-gov-300 transition-colors"
                          >
                            <BookOpen className="w-3 h-3 text-gov-700" />
                            <span>View Standard</span>
                          </button>
                        )}

                        {/* Compliance Check CTA */}
                        {onCheckCompliance && (
                          <button
                            onClick={() => {
                              const topRef = msg.referenced_standards?.[0];
                              const code = typeof topRef === 'object' ? topRef.is_number : (topRef || 'Product');
                              onCheckCompliance(code);
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold transition-colors border border-slate-200"
                          >
                            <ShieldCheck className="w-3 h-3 text-slate-600" />
                            <span>Check Compliance</span>
                          </button>
                        )}
                      </div>

                      <span className="text-[10px] text-slate-400">
                        {msg.timestamp}
                      </span>
                    </div>

                    {/* Statutory Disclaimer Footer */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                      <span className="italic">
                        {msg.disclaimer || "AI-assisted guidance based on Indian Standards compendium. Verify statutory orders on manakonline.in."}
                      </span>
                      <a
                        href="https://www.manakonline.in"
                        target="_blank"
                        rel="noreferrer"
                        className="text-gov-800 hover:underline font-semibold inline-flex items-center gap-0.5 shrink-0 ml-2"
                      >
                        <span>manakonline.in</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>

                  </div>
                )}

              </div>

              {/* User Avatar */}
              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-sm bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {/* Typing / Loading Animation Indicator */}
          {isLoading && (
            <div className="flex gap-3 text-left justify-start animate-pulse">
              <div className="w-7 h-7 rounded-sm bg-gov-800 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="p-3.5 rounded-sm bg-slate-50 border border-slate-300 text-xs text-slate-700 flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-gov-800 animate-spin" />
                <span className="font-medium">Searching 572 BIS standards &amp; formulating grounded compliance advice...</span>
              </div>
            </div>
          )}

          {/* Error State with Retry Button */}
          {errorState && (
            <div className="p-4 rounded-sm bg-red-50 border border-red-200 text-red-800 text-xs flex items-start justify-between gap-3 animate-in fade-in">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Execution Error</p>
                  <p className="mt-0.5">{errorState.message}</p>
                </div>
              </div>
              <button
                onClick={handleRetry}
                className="px-3 py-1.5 rounded-sm bg-red-600 hover:bg-red-700 text-white font-bold flex items-center gap-1 shrink-0 transition-colors shadow-2xs"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Retry</span>
              </button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar Area */}
        <div className="p-3 sm:p-4 border-t border-slate-200 bg-white">
          <div className="relative flex items-center gap-2 bg-slate-50 rounded-sm border border-slate-300 focus-within:border-gov-800 focus-within:ring-1 focus-within:ring-gov-800 p-2 transition-all">
            <textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask any question regarding your product, IS code, or BIS compliance... (Enter to send, Shift+Enter for new line)"
              rows={1}
              className="flex-1 bg-transparent text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none resize-none max-h-32 px-2 py-1 leading-relaxed"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isLoading}
              className="p-2.5 rounded-sm bg-gov-800 hover:bg-gov-900 text-white transition-colors disabled:opacity-40 shadow-xs shrink-0"
              title="Send message"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 text-amber-400" />}
            </button>
          </div>

          <div className="flex items-center justify-between mt-2 px-1 text-[10px] text-slate-400">
            <span>Press <strong>Enter</strong> to send • <strong>Shift + Enter</strong> for new line</span>
            <span>Statutory BIS AI Guidance</span>
          </div>
        </div>

      </div>

    </div>
  );

  if (embedded) {
    return chatWorkspace;
  }

  return (
    <section id="assistant" className="py-8 md:py-12 bg-slate-50 border-b border-slate-300 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="text-left space-y-1.5 border-b border-slate-300 pb-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-gov-100 text-gov-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>ManakBot • Conversational Standards Intelligence</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gov-900 tracking-tight">
            Ask ManakBot Anything About Indian Standards
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl">
            Natural language discovery for products, IS numbers, mandatory Quality Control Orders, testing facilities, and statutory BIS procedures.
          </p>
        </div>

        {chatWorkspace}

      </div>
    </section>
  );
}
