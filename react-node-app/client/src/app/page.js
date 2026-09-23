'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBackendData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/data');
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error('Error connecting to backend:', err);
      setError(err.message || 'Không thể kết nối đến server Express');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBackendData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white flex flex-col items-center justify-center p-6">
      <main className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent">
              DriveFlow
            </h1>
            <p className="text-sm text-slate-300 mt-1">
              Next.js Frontend & Express Backend Integration
            </p>
          </div>
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Next.js App Router
          </span>
        </div>

        <div className="bg-black/30 rounded-xl p-5 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-300">
              Trạng thái kết nối Express Server (Port 5000 via rewrite):
            </span>
            {loading ? (
              <span className="inline-flex items-center gap-1.5 text-xs text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                Đang kết nối...
              </span>
            ) : error ? (
              <span className="inline-flex items-center gap-1.5 text-xs text-rose-400">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                Chưa bật backend
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Đã kết nối thành công
              </span>
            )}
          </div>

          {error && (
            <div className="text-xs text-rose-300 bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
              <p className="font-semibold mb-1">Gợi ý:</p>
              <p>Hãy chạy server Express trong thư mục <code>react-node-app/server</code> bằng lệnh:</p>
              <pre className="mt-1 bg-black/40 p-2 rounded text-rose-200">npm install && npm start</pre>
            </div>
          )}

          {data && (
            <div className="mt-3">
              <p className="text-xs text-slate-400 mb-1 font-mono">Dữ liệu nhận từ endpoint <code>/api/data</code>:</p>
              <pre className="bg-black/60 p-4 rounded-lg text-emerald-300 text-xs overflow-x-auto border border-white/5 font-mono">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <div className="flex gap-3 justify-end pt-2">
          <button
            onClick={fetchBackendData}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-sm font-medium rounded-lg transition-colors shadow-lg shadow-blue-600/30"
          >
            {loading ? 'Đang tải...' : 'Thử kết nối lại API'}
          </button>
        </div>
      </main>

      <footer className="mt-8 text-xs text-slate-400 text-center space-y-1">
        <p>DriveFlow Project · Converted from Vite React to Next.js</p>
      </footer>
    </div>
  );
}
